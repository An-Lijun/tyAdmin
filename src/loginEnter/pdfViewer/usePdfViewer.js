/**
 * Vue Hooks: PDF查看器封装
 * 用于在Vue组件中便捷地使用PdfViewer类
 */

import { ref, onUnmounted } from 'vue';
import { PdfViewer } from './PdfViewer';

/**
 * PDF查看器Hook
 * @param {Object} options - 配置选项
 * @param {string} options.url - PDF文件URL
 * @param {ArrayBuffer|string} options.data - PDF二进制数据
 * @param {number} options.scale - 缩放比例
 * @param {number} options.renderRange - 可视范围
 * @param {number} options.debounceDelay - 防抖延迟
 * @returns {Object} - 返回的状态和方法
 */
export function usePdfViewer(options = {}) {
  // 状态
  const currentPage = ref(1);
  const totalPage = ref(0);
  const isLoading = ref(false);
  const error = ref(null);
  
  // PDF查看器实例
  let pdfViewer = null;
  
  /**
   * 初始化PDF查看器
   * @param {HTMLElement} container - 容器元素
   */
  const init = async (container) => {
    if (!container) {
      error.value = new Error('容器元素不能为空');
      return;
    }
    
    isLoading.value = true;
    error.value = null;
    
    try {
      // 创建PdfViewer实例
      pdfViewer = new PdfViewer({
        container,
        url: options.url,
        data: options.data,
        scale: options.scale || 1.5,
        renderRange: options.renderRange || 2,
        debounceDelay: options.debounceDelay || 60,
        onPageChange: handlePageChange,
        onLoadComplete: handleLoadComplete
      });
      
      // 加载PDF
      await pdfViewer.loadPdf();
      
    } catch (err) {
      error.value = err;
      console.error('PDF查看器初始化失败:', err);
    } finally {
      isLoading.value = false;
    }
  };
  
  /**
   * 页码变化处理
   */
  const handlePageChange = (page, total) => {
    currentPage.value = page;
    totalPage.value = total;
  };
  
  /**
   * 加载完成处理
   */
  const handleLoadComplete = (total) => {
    totalPage.value = total;
  };
  
  /**
   * 跳转到指定页码
   * @param {number} pageNo - 页码
   */
  const jumpToPage = (pageNo) => {
    if (pdfViewer) {
      pdfViewer.jumpToPage(pageNo);
    }
  };
  
  /**
   * 获取当前页码
   * @returns {number}
   */
  const getCurrentPage = () => {
    return pdfViewer ? pdfViewer.getCurrentPage() : 1;
  };
  
  /**
   * 获取总页数
   * @returns {number}
   */
  const getTotalPage = () => {
    return pdfViewer ? pdfViewer.getTotalPage() : 0;
  };
  
  /**
   * 刷新PDF
   */
  const refresh = async () => {
    if (pdfViewer) {
      isLoading.value = true;
      try {
        // 销毁旧实例
        pdfViewer.destroy();
        
        // 重新初始化
        const container = pdfViewer.container;
        await init(container);
      } catch (err) {
        error.value = err;
        console.error('PDF刷新失败:', err);
      } finally {
        isLoading.value = false;
      }
    }
  };
  
  /**
   * 销毁PDF查看器
   */
  const destroy = () => {
    if (pdfViewer) {
      pdfViewer.destroy();
      pdfViewer = null;
    }
  };
  
  // 自动清理（组件卸载时）
  onUnmounted(() => {
    destroy();
  });
  
  /**
   * 获取PDF文档对象（供缩略图面板使用）
   * @returns {Object|null}
   */
  const getPdfDoc = () => {
    return pdfViewer ? pdfViewer.pdfDoc : null;
  };
  
  /**
   * 获取查看器实例（供高级操作使用）
   * @returns {Object|null}
   */
  const getViewer = () => {
    return pdfViewer;
  };
  
  return {
    // 状态
    currentPage,
    totalPage,
    isLoading,
    error,
    
    // 方法
    init,
    jumpToPage,
    getCurrentPage,
    getTotalPage,
    getPdfDoc,
    getViewer,
    refresh,
    destroy
  };
}
