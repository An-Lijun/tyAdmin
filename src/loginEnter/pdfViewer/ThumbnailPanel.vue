<template>
  <!-- 缩略图面板 -->
  <div class="thumbnail-panel">
    <!-- 面板头部 -->
    <div class="panel-header">
      <!-- 工具栏按钮 -->
      <div class="toolbar-buttons">
        <button class="tool-btn" title="展开/折叠">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>
        <button class="tool-btn" title="更多选项">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>
      </div>
      
      <!-- 面板标题 -->
      <span class="panel-title">页面</span>
    </div>
    
    <!-- 缩略图列表 -->
    <div class="thumbnail-list" ref="listRef">
      <div 
        v-for="(thumb, index) in thumbnails" 
        :key="index"
        class="thumbnail-item"
        :class="{ active: currentPage === index + 1 }"
        @click="handleThumbnailClick(index + 1)"
      >
        <div class="thumbnail-wrapper">
          <canvas 
            :ref="el => setCanvasRef(index, el)" 
            class="thumbnail-canvas"
          ></canvas>
        </div>
        <!-- 页码标记 -->
        <span class="thumbnail-number">{{ index + 1 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';

const props = defineProps({
  /** PDF文档对象 */
  pdfDoc: {
    type: Object,
    default: null
  },
  /** 总页数 */
  totalPage: {
    type: Number,
    default: 0
  },
  /** 当前页码 */
  currentPage: {
    type: Number,
    default: 1
  },
  /** 缩略图宽度 */
  thumbnailWidth: {
    type: Number,
    default: 140
  }
});

const emit = defineEmits(['page-click']);

// 响应式状态
const listRef = ref(null);
const canvasRefs = ref({});
const thumbnails = ref([]);

/**
 * 设置canvas引用
 */
const setCanvasRef = (index, el) => {
  canvasRefs.value[index] = el;
};

/**
 * 渲染缩略图
 */
const renderThumbnails = async () => {
  console.log('renderThumbnails called:', {
    pdfDoc: !!props.pdfDoc,
    totalPage: props.totalPage
  });
  
  if (!props.pdfDoc || !props.totalPage || props.totalPage === 0) {
    console.log('条件不满足，跳过渲染');
    return;
  }
  
  // 预填充缩略图数组
  thumbnails.value = Array(props.totalPage).fill(null);
  
  // 使用Promise.all直接并行渲染所有缩略图
  const promises = [];
  for (let i = 0; i < props.totalPage; i++) {
    promises.push(renderThumbnail(i + 1, i));
  }
  
  await Promise.all(promises);
  console.log('所有缩略图渲染完成');
};

/**
 * 渲染单个缩略图
 */
const renderThumbnail = async (pageNo, index) => {
  const canvas = canvasRefs.value[index];
  if (!canvas) return;
  
  // 获取canvas上下文
  const ctx = canvas.getContext('2d');
  
  // 获取设备像素比
  const dpr = window.devicePixelRatio || 1;
  
  // 设置默认占位样式
  const defaultWidth = props.thumbnailWidth;
  const defaultHeight = Math.round(defaultWidth * 1.414); // A4比例
  
  try {
    // 检查pdfDoc是否有效
    if (!props.pdfDoc) {
      throw new Error('无效的PDF文档对象');
    }
    
    // 获取真实的PDF文档对象（处理Proxy包装）
    const pdfDocument = props.pdfDoc.toValue ? props.pdfDoc.toValue() : props.pdfDoc;
    
    // 检查是否有getPage方法
    if (typeof pdfDocument.getPage !== 'function') {
      throw new Error('PDF文档对象没有getPage方法');
    }
    
    // 获取页面
    const page = await pdfDocument.getPage(pageNo);
    
    // 获取视口
    const viewport = page.getViewport({ scale: 1 });
    
    // 计算缩放比例：以宽度为主，保持宽高比
    const maxWidth = props.thumbnailWidth;
    const maxHeight = 200;
    const scaleByWidth = maxWidth / viewport.width;
    const scaleByHeight = maxHeight / viewport.height;
    const scale = Math.min(scaleByWidth, scaleByHeight);
    
    const thumbnailViewport = page.getViewport({ scale });
    
    // 设置canvas尺寸
    canvas.width = thumbnailViewport.width * dpr;
    canvas.height = thumbnailViewport.height * dpr;
    canvas.style.width = thumbnailViewport.width + 'px';
    canvas.style.height = thumbnailViewport.height + 'px';
    canvas.style.display = 'block';
    
    // 重置context变换矩阵
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    
    // 填充白色背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 设置缩放
    ctx.scale(dpr, dpr);
    
    // 渲染缩略图
    const renderTask = page.render({
      canvasContext: ctx,
      viewport: thumbnailViewport
    });
    
    await renderTask.promise;
    
    console.log(`缩略图 ${pageNo} 渲染完成: ${thumbnailViewport.width}x${thumbnailViewport.height}`);
    
  } catch (error) {
    console.error(`渲染缩略图 ${pageNo} 失败:`, error);
    
    // 设置占位样式
    canvas.width = defaultWidth * dpr;
    canvas.height = defaultHeight * dpr;
    canvas.style.width = defaultWidth + 'px';
    canvas.style.height = defaultHeight + 'px';
    canvas.style.display = 'block';
    
    // 绘制灰色占位背景和页码
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制页码文字
    ctx.fillStyle = '#999';
    ctx.font = `${14 * dpr}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`第 ${pageNo} 页`, canvas.width / 2, canvas.height / 2);
  } finally {
    // 更新缩略图数组标记
    thumbnails.value[index] = true;
  }
};

/**
 * 点击缩略图处理
 */
const handleThumbnailClick = (pageNo) => {
  emit('page-click', pageNo);
};

/**
 * 滚动到当前页缩略图
 */
const scrollToCurrentThumbnail = async () => {
  await nextTick();
  
  if (!listRef.value) return;
  
  const activeThumbnail = listRef.value.querySelector('.thumbnail-item.active');
  if (activeThumbnail) {
    const listTop = listRef.value.scrollTop;
    const listHeight = listRef.value.clientHeight;
    const thumbTop = activeThumbnail.offsetTop;
    const thumbHeight = activeThumbnail.offsetHeight;
    
    // 如果当前缩略图不在可见区域，滚动到可见区域
    if (thumbTop < listTop || thumbTop + thumbHeight > listTop + listHeight) {
      listRef.value.scrollTop = thumbTop - listHeight / 2 + thumbHeight / 2;
    }
  }
};

// 监听当前页码变化，自动滚动缩略图列表
watch(() => props.currentPage, async () => {
  await scrollToCurrentThumbnail();
});

// 监听PDF文档变化，重新渲染缩略图
watch(() => props.pdfDoc, async () => {
  if (props.pdfDoc) {
    await renderThumbnails();
  }
}, { immediate: true });

// 监听总页数变化
watch(() => props.totalPage, async () => {
  if (props.pdfDoc) {
    await renderThumbnails();
  }
});

onMounted(async () => {
  await renderThumbnails();
});
</script>

<style lang="scss" scoped>
/* 缩略图面板 - Adobe风格 */
.thumbnail-panel {
  width: 180px;
  height: 100%;
  background: #ffffff;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 面板头部 */
.panel-header {
  padding: 8px 12px;
  border-bottom: 1px solid #e0e0e0;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 工具栏按钮组 */
.toolbar-buttons {
  display: flex;
  gap: 4px;
}

/* 工具按钮 */
.tool-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  
  &:hover {
    background: #e0e0e0;
    color: #333;
  }
  
  &:active {
    background: #d0d0d0;
  }
}

/* 面板标题 */
.panel-title {
  font-size: 12px;
  font-weight: 600;
  color: #333;
  letter-spacing: 0.2px;
}

/* 缩略图列表 */
.thumbnail-list {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px;
  background: #fafafa;
}

/* 缩略图项 */
.thumbnail-item {
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
  border-radius: 6px;
  transition: all 0.15s ease;
  
  &:hover .thumbnail-wrapper {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }
  
  &.active {
    .thumbnail-wrapper {
      border: 2px solid #1a73e8;
      box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.15);
    }
    
    .thumbnail-number {
      background: #1a73e8;
      color: #ffffff;
      border-color: #1a73e8;
    }
  }
}

/* 缩略图包装器 */
.thumbnail-wrapper {
  background: #ffffff;
  border-radius: 5px;
  border: 2px solid transparent;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.15s ease;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: #ccc;
  }
}

/* 缩略图画布 */
.thumbnail-canvas {
  width: 100%;
  max-height: 200px;
  display: block;
  object-fit: contain;
  background: #fff;
}

/* 页码标记 - 圆形底部居中 */
.thumbnail-number {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 18px;
  background: #666666;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fafafa;
  transition: all 0.15s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
</style>