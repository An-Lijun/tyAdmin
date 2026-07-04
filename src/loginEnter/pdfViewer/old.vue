<template>
  <component :is="containerComponent" v-bind="containerProps">
    <div class="t_preview_pdf">
      <div class="viewer" ref="viewer" :class="bShowToolbar ? 'toolbarHeight' : ''">
        <!-- 撑出真实高度 -->
        <div class="spacer" ref="spacer"></div>
      </div>
      <Toolbar class="noUseDialog" v-if="!useDialog" v-bind="toolbarProps" @refuse="onClickRefuse"
        @ensure="onClickEnsure" @jump-to-page="onJumpToPage">
        <template #checkbox>
          <slot name="checkbox"></slot>
        </template>
      </Toolbar>
    </div>
    <!-- 工具栏插槽（条件渲染位置） -->
    <template v-if="useDialog" #footer>
      <Toolbar class="useDialog" v-bind="toolbarProps" :textContent="textContent" @refuse="onClickRefuse"
        @ensure="onClickEnsure" @jump-to-page="onJumpToPage">
        <template #checkbox>
          <slot name="checkbox"></slot>
        </template>
      </Toolbar>
    </template>
  </component>
</template>

<script>

import Toolbar from '../tPreviewPdfGroup/Toolbar.vue';
export default {
  // components: { Button },
  name: 'tPreviewPdf',
  mixins: [pdfPropsMixin],
  components: { Toolbar },

  props: {
    url: {
      type: String,
      default: ''
    },
    workerSrc: {
      type: String,
      default: ''
    },
    cMapUrl: {
      type: String,
      default: ''
    },

    bShowToolbar: {
      //是否展示工具栏
      type: Boolean,
      default: false
    },

    httpHeaders: {
      //自定义参数
      type: Object,
      default() {
        return null;
      }
    },
    data: {
      //直接pdf的二进制数据，注意：一旦设置了这个参数，url就失效了，它的优先级更高
      type: [
        String,
        Int8Array,
        Uint8Array,
        Uint8ClampedArray,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
        ArrayBuffer
      ],
      default: null
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    /**当useSystemFonts值为 true 时，对于 PDF 文档中未嵌入的字体，将回退使用系统字体。
                 在 Web 环境下默认值为 true，在 Node.js 环境下默认值为 false；
                若 disableFontFace === true，则无论处于何种环境，该选项一律默认为 false（以避免字体完全失效）。 */
    useSystemFonts: {
      type: Boolean,
      default: true
    },

    scale: {
      //外部传入的自定义尺寸。该参数在scaleType=fixed时有效
      type: Number,
      default: 1
    },

    scaleType: {
      //缩放类型
      type: String,
      default: 'autoPerPage', //   fixed--固定尺寸(会按照传入的scale来)     fitToWidth--自适应外部尺寸（按照最宽页来计算放大倍数）   autoPerPage--每一页都自己放大到最大程度，使得每一页的宽度刚好等于dom宽度
      validator(value, props) {
        // The value must match one of these strings
        return ['fixed', 'fitToWidth', 'autoPerPage'].includes(value);
      }
    },

    showPageBar: {
      type: Boolean,
      default: false //是否展示页面操作栏，比如跳转到第几页
    },
    showRefuseBtn: {
      type: Boolean,
      default: true //是否展示拒绝按钮
    },
    showEnsureBtn: {
      type: Boolean,
      default: true //是否展示确认按钮
    },
    agreeBtnText: {
      type: String,
      default: '我已阅读并同意' //确认按钮文字
    },
    refuseBtnText: {
      type: String,
      default: '拒绝' //拒绝按钮文字
    },
    defaultEndTime: {
      //倒计时时间   从后管查的，然后传进来，默认不传就是0(即不需要倒计时)
      type: Number,
      default: 0
    },
    needWaitTime: {
      //是否需要等待倒计时结束才能点击确认按钮
      type: Boolean,
      default: true
    },
    needReadEnd: {
      //是否需要阅读到底才能点击确认按钮
      type: Boolean,
      default: true
    },


    useDialog: {
      //是否使用对话框模式
      type: Boolean,
      default: false
    },
    title: {
      //对话框标题
      type: String,
      default: '协议详情'
    },
    visible: {
      //对话框显示状态
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      pageHeightCache: [], // 每页 CSS 高度
      totalPage: 0, //总共的页数
      currentPageNo: 1, //当前正在显示的页码
      // bDisable:false,//标记倒计时是否结束，即是否
      bReadingEnd: false, //标记是否阅读到底部了。
      endTime: 0, //倒计时剩余时间

      dialogVisible: false, //对话框显示状态
      textContent: "",//对话框文本内容
      pdfjsLib: null,//pdfjs库对象,放在data里是为了保证能有任何时候只要初始化成功就ok了。省因为频繁获取导致获取失败的情况。
    };
  },
  mounted() {
    if (this.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = this.workerSrc;
    }
    if (!this.useDialog) {
      this.renderPdfnew();
    }
  },

  methods: {
    /* 计算某页顶部到文档顶的距离 */
    offsetTop(pageNo) {
      let off = 0;
      for (let i = 1; i < pageNo; i++) {
        off += this.pageHeightCache[i - 1];
      }
      return off;
    },

    // 对话框关闭事件
    onDialogClose() {
      this.$emit('dialog-close');
      this.dialogVisible = false;
    },

    renderPdfnew() {
      var _this = this;
      const RENDER_RANGE = 2; // 可视 ±2
      const SCALE = window.devicePixelRatio || 1;
      _this.calcEndTime();

      this.pdfjsLib = this.pdfjsLib ? this.pdfjsLib : window['pdfjs-dist/build/pdf'] || window['pdfjsLib'];//兼容两种引入方式

      let DEFAULT_SCALE = 1.25;
      if (this.scale > 0) {
        DEFAULT_SCALE = this.scale;
      }
      let pageScale = DEFAULT_SCALE; //如果是fixed模式，就走固定放大倍率
      const viewer = this.$refs.viewer; //用于存放canvas
      const spacer = this.$refs.spacer; //撑出真实高度
      const info = this.$refs.info; //展示当前第几页了

      const btnJump = this.$refs.btnJump; //跳转按钮

      let pdfDoc = null;
      _this.totalPage = 0;
      // let pageHeightCache = _this.pageHeightCache;   // 每页 CSS 高度
      let renderTasks = {}; // idx -> {canvas, ctx, task, promise}
      let visibleStart = 1; // 当前 正在窗口正中显示的pdf文件的页码
      let scrollTimer = null;
      let arr_finishRender = new Array(5); //用于记录当前在canvas中绘制过的。防止任何情况下（比如突然跳转某一页，比如快速拖拽到某一页）显示某一页的时候，这一页没有渲染出来的情况。
      let scaleObj = {}; //记录每一页的放大倍数

      /* ==========  工具  ========== */
      const range = (s, e) =>
        Array.from({ length: e - s + 1 }, (_, i) => i + s);

      function getOnePageScale(virtual_pageNo) {
        if (_this.scaleType == 'fixed' || _this.scaleType == 'fitToWidth') {
          //以固定放大倍数
          return pageScale;
        } else if (_this.scaleType === 'autoPerPage') {
          //每一页都放大
          return scaleObj[virtual_pageNo] || pageScale;
        } else {
          return scaleObj[virtual_pageNo] || pageScale;
        }
      }

      /* 一次性拿完所有高度 */
      async function cacheAllHeights() {
        const jobs = [];
        const viewerWidth = viewer.clientWidth - 1; // 容器 CSS 宽
        if (_this.scaleType == 'fitToWidth') {
          let maxWidth = 0;
          for (let i = 1; i <= _this.totalPage; i++) {
            const p = await pdfDoc.getPage(i);
            const base = p.getViewport({ scale: 1 });
            if (base.width > maxWidth) {
              maxWidth = base.width;
            }
          }
          pageScale = viewerWidth / maxWidth;
        }

        for (let i = 1; i <= _this.totalPage; i++) {
          const p = await pdfDoc.getPage(i);

          if (_this.scaleType === 'autoPerPage') {
            const base = p.getViewport({ scale: 1 });
            pageScale = viewerWidth / base.width;
            scaleObj[i] = pageScale;
          }

          _this.pageHeightCache.push(
            p.getViewport({ scale: pageScale }).height
          );

          // const p = pdfDoc.getPage(i).then(p=>{
          //   _this.pageHeightCache[i-1]=p.getViewport({scale:DEFAULT_SCALE}).height;
          // });
          // if(_this.scaleType === 'autoPerPage'){
          //       const base = p.getViewport({scale:1});
          //       pageScale = viewerWidth / base.width;
          //       scaleObj[virtual_Num] = pageScale
          //     }
        }
        // await Promise.all(jobs);
        // 用 spacer 撑出总高
        let totalH = 0;
        _this.pageHeightCache.forEach((h) => (totalH += h));
        spacer.style.height = totalH + 'px';
      }

      /* 根据滚动位置算出“应该处于第几页” */
      function scroll2page() {
        let st = viewer.scrollTop; // 已经卷进去的 px
        let sh = viewer.scrollHeight;
        if (sh <= st + viewer.offsetHeight + 20) {
          _this.bReadingEnd = true;
          //到底了
          _this.$emit('fileToEnd', {
            msgType: 'fileToEnd', //表示阅读完毕，文件翻到最后了。
            chineseMeaning: '表示阅读完毕，文件翻到最后了。',
            fileUrl: _this.url
          });
        }
        let acc = 0; // 累加器：从第 1 页顶到当前页顶的 px
        for (let i = 0; i < _this.totalPage; i++) {
          const h = _this.pageHeightCache[i]; // 第 i+1 页的 CSS 高度
          if (st < acc + h / 2) {
            return i + 1; // 卷动距离 < 累加高度+半页 → 视为在看这一页
          }
          acc += h;
        }
        return _this.totalPage; // 卷到底了，最后一页
      }

      /* ==========  复用式渲染  ========== */
      async function renderPageInCanvas(pageNo, canvas, ctx) {
        const idx = pageNo - 1;
        const page = await pdfDoc.getPage(pageNo);
        let curScale = getOnePageScale(pageNo);
        const vp = page.getViewport({ scale: curScale });
        // 重置 canvas 尺寸
        canvas.width = vp.width * SCALE;
        canvas.height = vp.height * SCALE;
        canvas.style.width = vp.width + 'px';
        canvas.style.height = vp.height + 'px';
        canvas.style.top = _this.offsetTop(pageNo) + 'px';
        ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        const task = page.render({ canvasContext: ctx, viewport: vp });
        renderTasks[idx] = { canvas, ctx, task, promise: task.promise };
        await task.promise;
      }

      /* 初始化 5 个 canvas 对象（只创建一次） */
      function createCanvasPool() {
        const viewer = _this.$refs.viewer;
        const pool = [];
        for (let i = 0; i < RENDER_RANGE * 2 + 1; i++) {
          const c = document.createElement('canvas');
          c.className = 'page-canvas';
          c.style.display = 'none';
          c.style.position = 'absolute'; /* 关键 */
          c.style.left = '50%';
          c.style.transform = 'translateX(-50%)';
          c.id = 'page' + i;
          viewer.appendChild(c);
          pool.push({ canvas: c, ctx: c.getContext('2d') });
        }
        return pool;
      }
      const canvasPool = createCanvasPool();

      /* 根据要绘制的pdf页码（从1开始的），计算出要绘制到哪个canvas上，并开始绘制*/
      async function repaintVisible(arr_pageNo) {
        for (let i = 0; i < arr_pageNo.length; i++) {
          let pageNo = arr_pageNo[i];
          if (pageNo <= _this.totalPage && pageNo > 0) {
            //先计算对应的canvas
            let canvasIndex = (pageNo - 1) % canvasPool.length;
            //console.log('canvasIndex = ', canvasIndex);
            const { canvas, ctx } = canvasPool[canvasIndex];
            canvas.style.display = 'block';

            // 1. 取消上一次渲染（如果还在进行）
            const old = renderTasks[canvasIndex];
            if (old && old.task && !old.task.destroyed) {
              old.task.cancel();
            }

            // 2. 清空画布
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            await renderPageInCanvas(pageNo, canvas, ctx);
            arr_finishRender[canvasIndex] = pageNo;
          }
        }
      }

      /* ==========  滚动监听  ========== */
      viewer.addEventListener('scroll', (e) => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          const cp = scroll2page(); //获取当前显示的是pdf第几页（从1开始的）

          let find = arr_finishRender.includes(cp);
          if (!find) {
            const pages = range(cp - RENDER_RANGE, cp + RENDER_RANGE);
            requestAnimationFrame(() => repaintVisible(pages));
          }
          const needStart = Math.max(1, cp);
          if (needStart !== visibleStart) {
            // currentPage = cp;
            // info.textContent = `${cp} / ${_this.totalPage}`;
            _this.textContent = `${cp} / ${_this.totalPage}`;
            //通过下一页的大小判断当前运动方向是往页数增加方向还是减小方向
            let nextPage =
              needStart > visibleStart ? needStart + 2 : needStart - 2;
            visibleStart = needStart;
            if (nextPage > 0 && nextPage <= _this.totalPage) {
              requestAnimationFrame(() => repaintVisible([nextPage]));
            }
          }
        }, 60);
      });

      /* ==========  对外加载  ========== */
      async function loadPdf(url) {
        viewer.scrollTop = 0;
        pdfDoc = null;
        _this.totalPage = 0;
        _this.pageHeightCache = [];
        renderTasks = {};
        visibleStart = 1;
        console.log('url = ***********', url);
        let params = {};
        if (url) {
          params.url = url;
        }
        if (_this.data) {
          params.data = _this.data;
        }
        if (_this.httpHeaders) {
          params.httpHeaders = _this.httpHeaders;
        }
        if (_this.withCredentials) {
          params.withCredentials = _this.withCredentials;
        }
        if (_this.useSystemFonts) {
          params.useSystemFonts = _this.useSystemFonts;
        }
        if (_this.cMapUrl) {
          params.cMapUrl = _this.cMapUrl;
        }
        const loading = _this.pdfjsLib.getDocument(
          params
          //   {
          //   url:url,
          //   data:_this.data,
          //   httpHeaders: _this.httpHeaders,
          //   // 2. 带 cookie（默认 same-origin，跨域时后端需允许 credentials）
          //   withCredentials: _this.withCredentials,  // 等价 fetch 的 credentials: 'include'
          //   /**当useSystemFonts值为 true 时，对于 PDF 文档中未嵌入的字体，将回退使用系统字体。
          //   在 Web 环境下默认值为 true，在 Node.js 环境下默认值为 false；
          //   若 disableFontFace === true，则无论处于何种环境，该选项一律默认为 false（以避免字体完全失效）。 */
          //   useSystemFonts:_this.useSystemFonts,//
          //   // JSON.stringify({
          //   //   custNo:"2000899665",
          //   //   userNo:"001",
          //   //   tooken:"12346"
          //   // }),
          //   cMapUrl:_this.cMapUrl,
          // }
        );
        pdfDoc = await loading.promise;
        _this.totalPage = pdfDoc.numPages;
        await cacheAllHeights();
        // info.textContent = `1 / ${_this.totalPage}`;
        _this.textContent = `1 / ${_this.totalPage}`;
        repaintVisible([1, 2, 3]);
      }

      // /* ==========  跳转按钮  ========== */
      // btnJump.onclick=()=>{
      //   const p=parseInt(jumpInp.value,10);
      //   if(!isNaN(p)&&p>=1&&p<=totalPage){
      //     viewer.scrollTop=offsetTop(p);
      //   }
      // };
      // console.log("url = ***********", this.url);
      loadPdf(this.url);
    },

    //跳转到目标页面
    onJumpToPage() {
      const jumpInp = this.$refs.jumpPage; //输入跳转页码
      const p = parseInt(jumpInp.value, 10);
      if (isNaN(p)) {
        this.$emit('error', {
          msgType: 'notNumType', //表示不是真正的页码。
          chineseMeaning: '请输入正确的页码格式。'
        });
      } else if (p < 1 || p > this.totalPage) {
        this.$emit('error', {
          msgType: 'outLimit', //页码超出限制。
          chineseMeaning: '页码超出限制'
        });
      } else if (!isNaN(p) && p >= 1 && p <= this.totalPage) {
        this.$refs.viewer.scrollTop = this.offsetTop(p);
      }
    },

    onClickRefuse() {
      this.$emit('refuse');
    },

    onClickEnsure() {
      if (!this.bReadingEnd) {
        this.$hMessage.info('请阅读完整协议');
      } else if (this.endTime <= 0) {
        this.$emit('agree');
      }
    },

    //倒计时  num--要计时的秒数
    calcEndTime() {
      var _this = this;
      var setTimeHandler = null;
      clearTimeout(setTimeHandler);
      _this.endTime = this.defaultEndTime;

      daojishi();
      function daojishi() {
        if (_this.endTime > 0) {
          setTimeHandler = setTimeout(() => {
            _this.endTime--;
            daojishi();
          }, 1000);
        } else {
          clearTimeout(setTimeHandler);
        }
      }
    }
  },

  computed: {
    endTimeTips() {
      if (this.endTime > 0) {
        return '(' + this.endTime + ')';
      } else {
        return '';
      }
    },

    // 动态容器组件
    containerComponent() {
      return this.useDialog ? 'h-msg-box' : 'div';
    },

    // 动态容器属性
    containerProps() {
      if (this.useDialog) {
        return {
          value: this.dialogVisible,
          title: this.title,
          width: '80%',
          height: 'calc(100% - 150px)',
          class: 'tpreviewpdf-dialog',
          'on-on-close': this.onDialogClose
        };
      }
      return { class: 't-preview-container' };
    },

    toolbarProps() {
      return {
        bShowToolbar: this.bShowToolbar,
        showRefuseBtn: this.showRefuseBtn,
        showEnsureBtn: this.showEnsureBtn,
        refuseBtnText: this.refuseBtnText,
        agreeBtnText: this.agreeBtnText,
        endTimeTips: this.endTimeTips,
        endTime: this.endTime,
        bReadingEnd: this.bReadingEnd,
        showPageBar: this.showPageBar
      };
    }
  },

  watch: {

    dialogVisible(val) {
      if (val && this.useDialog) {
        this.$nextTick(() => {
          this.renderPdfnew();
        });
      }
    },

    visible(val) {
      this.dialogVisible = val;
      this.$emit('update:visible', this.dialogVisible);
    }
  }
};
</script>
<style scoped>
.t-preview-container {
  height: 100%;
}

.t_preview_pdf {
  color: #f8463e;
  cursor: pointer;
  height: 100%;
  overflow-y: auto;
  position: relative;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* html,body{height:100%} */
.toolbar {
  position: absolute;
  bottom: 0;
  height: 40px;
  width: 100%;
  background: #fafafa;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  gap: 10px;
}

.toolbar input[type='text'] {
  width: 60px;
  text-align: center;
}

.viewer {
  height: calc(100%);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  /* 关键：绝对定位的参照 */
  background: #eee;
  box-sizing: border-box;
}

.viewer.toolbarHeight {
  padding-bottom: 40px;
}

.page-canvas {
  position: absolute;
  /* 关键 */
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
}

.spacer {
  position: relative;
  width: 1px;
}

/* 撑高度用 */
.optBtnLine {
  text-align: center;
}

.optBtnLine .optBtn {
  padding: 5px 12px;
}

.useDialog.toolbar {
  background: transparent;
  position: static;
  border: none;
  padding: 0;
  height: auto;
}
</style>


<style lang="scss">
.tpreviewpdf-dialog {
  .h-modal-header {
    border-bottom: 1px solid #d5d5d5;

    .h-modal-header-inner {
      color: #2f2828;
    }
  }

  .h-modal-body {
    padding: 12px 24px;
  }

}
</style>