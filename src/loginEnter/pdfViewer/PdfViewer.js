/**
 * PDF查看器类 - 封装PDF.js的核心功能
 * 提供滚动懒加载、Canvas复用、性能优化等特性
 */
export class PdfViewer {
  /**
   * 构造函数
   * @param {Object} options - 配置选项
   * @param {HTMLElement} options.container - 容器元素
   * @param {string} options.url - PDF文件URL
   * @param {ArrayBuffer|string} options.data - PDF二进制数据（优先级高于url）
   * @param {number} options.scale - 缩放比例，默认1.5
   * @param {number} options.renderRange - 可视范围，默认前后各2页
   * @param {number} options.debounceDelay - 滚动防抖延迟(ms)，默认60
   * @param {Function} options.onPageChange - 页码变化回调
   * @param {Function} options.onLoadComplete - 加载完成回调
   */
  constructor(options = {}) {
    // 配置参数
    this.container = options.container;
    this.url = options.url;
    this.data = options.data;
    this.scale = options.scale || 1.5;
    this.renderRange = options.renderRange || 2;
    this.debounceDelay = options.debounceDelay || 60;
    
    // 回调函数
    this.onPageChange = options.onPageChange || (() => {});
    this.onLoadComplete = options.onLoadComplete || (() => {});
    
    // 状态变量
    this.pdfDoc = null;
    this.totalPage = 0;
    this.currentPage = 1;
    this.pageHeightCache = [];
    
    // Canvas池相关
    this.canvasPool = [];
    this.renderTasks = {};
    this.renderedPages = {};
    
    // 控制变量
    this.scrollTimer = null;
    this.isDestroyed = false;
    
    // 初始化
    this.init();
  }
  
  /**
   * 初始化
   */
  init() {
    // 创建占位元素
    this.createSpacer();
    
    // 配置PDF.js Worker
    this.configureWorker();
    
    // 添加滚动事件监听
    this.addScrollListener();
  }
  
  /**
   * 创建高度占位元素
   */
  createSpacer() {
    this.spacer = document.createElement('div');
    this.spacer.className = 'pdf-viewer-spacer';
    this.spacer.style.position = 'relative';
    this.spacer.style.width = '1px';
    this.container.appendChild(this.spacer);
  }
  
  /**
   * 配置PDF.js - 动态加载库
   */
  async configureWorker() {
    // 尝试从全局获取或动态导入PDF.js
    if (window.pdfjsLib) {
      this.pdfjsLib = window.pdfjsLib;
    } else {
      try {
        // 尝试动态导入PDF.js
        const pdfjsLib = await import('pdfjs-dist');
        this.pdfjsLib = pdfjsLib.default || pdfjsLib;
      } catch (error) {
        throw new Error('PDF.js库加载失败，请确保已安装pdfjs-dist依赖');
      }
    }
    
    // 配置Worker
    if (!this.pdfjsLib.GlobalWorkerOptions.workerSrc) {
      try {
        this.pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.min.mjs',
          import.meta.url
        ).href;
      } catch (error) {
        // 如果无法获取worker路径，使用CDN fallback
        this.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }
    }
  }
  
  /**
   * 添加滚动事件监听
   */
  addScrollListener() {
    this.container.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
  }
  
  /**
   * 移除滚动事件监听
   */
  removeScrollListener() {
    this.container.removeEventListener('scroll', this.handleScroll.bind(this));
  }
  
  /**
   * 加载PDF文档
   * @returns {Promise}
   */
  async loadPdf() {
    if (this.isDestroyed) return;
    
    try {
      // 确保PDF.js已配置
      if (!this.pdfjsLib) {
        await this.configureWorker();
      }
      
      const params = {};
      if (this.data) {
        params.data = this.data;
      } else if (this.url) {
        params.url = this.url;
      } else {
        throw new Error('No PDF source provided');
      }
      
      const loadingTask = this.pdfjsLib.getDocument(params);
      this.pdfDoc = await loadingTask.promise;
      this.totalPage = this.pdfDoc.numPages;
      
      // 初始化Canvas池
      this.initCanvasPool();
      
      // 缓存页面高度
      await this.cacheAllPageHeights();
      
      // 渲染初始页面
      await this.renderVisiblePages([1, 2, 3]);
      
      // 触发加载完成回调
      this.onLoadComplete(this.totalPage);
      
    } catch (error) {
      console.error('PDF加载失败:', error);
      throw error;
    }
  }
  
  /**
   * 初始化Canvas池
   */
  initCanvasPool() {
    if (this.canvasPool.length > 0) return;
    
    const poolSize = this.renderRange * 2 + 1;
    
    for (let i = 0; i < poolSize; i++) {
      const canvas = document.createElement('canvas');
      canvas.className = 'pdf-page-canvas';
      canvas.style.display = 'none';
      canvas.style.position = 'absolute';
      canvas.style.left = '50%';
      canvas.style.transform = 'translateX(-50%)';
      canvas.id = `pdf-page-${i}`;
      this.container.appendChild(canvas);
      
      this.canvasPool.push({
        canvas,
        ctx: canvas.getContext('2d'),
        currentPage: null
      });
    }
  }
  
  /**
   * 缓存所有页面高度（并行获取）
   */
  async cacheAllPageHeights() {
    const heights = [];
    const promises = [];
    
    for (let i = 1; i <= this.totalPage; i++) {
      promises.push(this.getPageHeight(i, heights));
    }
    
    await Promise.all(promises);
    this.pageHeightCache = heights;
    
    // 设置占位元素高度
    const totalHeight = heights.reduce((sum, h) => sum + h, 0);
    this.spacer.style.height = `${totalHeight}px`;
  }
  
  /**
   * 获取指定页面高度
   * @param {number} pageNum - 页码
   * @param {Array} heights - 高度数组
   */
  async getPageHeight(pageNum, heights) {
    const page = await this.pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: this.scale });
    heights[pageNum - 1] = viewport.height;
  }
  
  /**
   * 计算某页顶部到文档顶部的距离
   * @param {number} pageNo - 页码
   * @returns {number}
   */
  getOffsetTop(pageNo) {
    let offset = 0;
    for (let i = 1; i < pageNo; i++) {
      offset += this.pageHeightCache[i - 1] || 0;
    }
    return offset;
  }
  
  /**
   * 根据滚动位置计算当前页码
   * @returns {number}
   */
  calculateCurrentPage() {
    if (!this.container) return 1;
    
    const scrollTop = this.container.scrollTop;
    let accumulatedHeight = 0;
    
    for (let i = 0; i < this.totalPage; i++) {
      const pageHeight = this.pageHeightCache[i];
      if (scrollTop < accumulatedHeight + pageHeight / 2) {
        return i + 1;
      }
      accumulatedHeight += pageHeight;
    }
    
    return this.totalPage;
  }
  
  /**
   * 渲染指定页面到指定canvas
   * @param {number} pageNo - 页码
   * @param {Object} canvasItem - canvas项
   */
  async renderPage(pageNo, canvasItem) {
    if (!this.pdfDoc || !canvasItem || this.isDestroyed) return;
    
    const { canvas, ctx } = canvasItem;
    
    // 取消之前的渲染任务
    if (canvasItem.currentPage !== null && canvasItem.currentPage !== pageNo) {
      const canvasIndex = this.canvasPool.indexOf(canvasItem);
      const taskInfo = this.renderTasks[canvasIndex];
      if (taskInfo && taskInfo.task && !taskInfo.task.destroyed) {
        taskInfo.task.cancel();
      }
    }
    
    canvasItem.currentPage = pageNo;
    
    const page = await this.pdfDoc.getPage(pageNo);
    const viewport = page.getViewport({ scale: this.scale });
    
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = viewport.width * dpr;
    canvas.height = viewport.height * dpr;
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    canvas.style.top = `${this.getOffsetTop(pageNo)}px`;
    canvas.style.display = 'block';
    
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    
    const renderTask = page.render({
      canvasContext: ctx,
      viewport
    });
    
    const canvasIndex = this.canvasPool.indexOf(canvasItem);
    this.renderTasks[canvasIndex] = {
      task: renderTask,
      promise: renderTask.promise
    };
    
    try {
      await renderTask.promise;
      this.renderedPages[pageNo] = canvasIndex;
    } catch (e) {
      if (e.name !== 'RenderingCancelledException') {
        console.error('PDF渲染错误:', e);
      }
    }
  }
  
  /**
   * 渲染可见区域的页面
   * @param {number[]} pageNumbers - 页码数组
   */
  async renderVisiblePages(pageNumbers) {
    const promises = [];
    
    for (const pageNo of pageNumbers) {
      if (pageNo < 1 || pageNo > this.totalPage) continue;
      
      // 检查是否已渲染且未被复用
      if (this.renderedPages[pageNo] !== undefined) {
        const existingIndex = this.renderedPages[pageNo];
        if (this.canvasPool[existingIndex]?.currentPage === pageNo) {
          continue;
        }
      }
      
      const canvasIndex = (pageNo - 1) % this.canvasPool.length;
      const canvasItem = this.canvasPool[canvasIndex];
      
      if (canvasItem) {
        promises.push(this.renderPage(pageNo, canvasItem));
      }
    }
    
    await Promise.all(promises);
  }
  
  /**
   * 滚动事件处理（防抖）
   */
  handleScroll() {
    clearTimeout(this.scrollTimer);
    
    this.scrollTimer = setTimeout(() => {
      if (this.isDestroyed) return;
      
      const newPage = this.calculateCurrentPage();
      
      if (newPage !== this.currentPage) {
        this.currentPage = newPage;
        this.onPageChange(newPage, this.totalPage);
      }
      
      requestAnimationFrame(() => {
        if (this.isDestroyed) return;
        
        const startPage = Math.max(1, newPage - this.renderRange);
        const endPage = Math.min(this.totalPage, newPage + this.renderRange);
        
        const pagesToRender = [];
        for (let i = startPage; i <= endPage; i++) {
          pagesToRender.push(i);
        }
        
        this.renderVisiblePages(pagesToRender);
      });
    }, this.debounceDelay);
  }
  
  /**
   * 跳转到指定页码
   * @param {number} pageNo - 页码
   */
  jumpToPage(pageNo) {
    if (pageNo < 1 || pageNo > this.totalPage) return;
    
    const offsetTop = this.getOffsetTop(pageNo);
    this.container.scrollTop = offsetTop;
  }
  
  /**
   * 获取当前页码
   * @returns {number}
   */
  getCurrentPage() {
    return this.currentPage;
  }
  
  /**
   * 获取总页数
   * @returns {number}
   */
  getTotalPage() {
    return this.totalPage;
  }
  
  /**
   * 清理资源
   */
  destroy() {
    this.isDestroyed = true;
    
    // 清除定时器
    clearTimeout(this.scrollTimer);
    
    // 取消所有渲染任务
    Object.values(this.renderTasks).forEach(taskInfo => {
      if (taskInfo.task && !taskInfo.task.destroyed) {
        taskInfo.task.cancel();
      }
    });
    
    // 移除滚动事件监听
    this.removeScrollListener();
    
    // 移除canvas元素
    this.canvasPool.forEach(item => {
      if (item.canvas.parentNode) {
        item.canvas.parentNode.removeChild(item.canvas);
      }
    });
    this.canvasPool = [];
    
    // 移除占位元素
    if (this.spacer && this.spacer.parentNode) {
      this.spacer.parentNode.removeChild(this.spacer);
    }
    
    // 清空引用
    this.container = null;
    this.pdfDoc = null;
  }
}