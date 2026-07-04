<template>
  <!-- PDF查看器主容器 -->
  <div class="pdf-viewer-container">
    <!-- 左侧缩略图面板 -->
    <ThumbnailPanel 
      v-if="pdfDoc"
      :pdf-doc="pdfDoc"
      :total-page="totalPage"
      :current-page="currentPage"
      :thumbnail-width="140"
      @page-click="handleThumbnailClick"
    />
    
    <!-- 右侧主查看区域 -->
    <div class="viewer-wrapper">
      <!-- 加载状态 -->
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-spinner"></div>
        <span class="loading-text">加载中...</span>
      </div>
      
      <!-- 错误提示 -->
      <div v-if="error" class="error-message">
        {{ error.message }}
      </div>
      
      <!-- 查看区域 -->
      <div class="viewer" ref="viewerRef"></div>
      
      <!-- 工具栏 -->
      <div class="toolbar">
        <!-- 页码显示 -->
        <span class="page-info">{{ currentPage }} / {{ totalPage }}</span>
        
        <!-- 跳转输入框 -->
        <div class="jump-section">
          <input 
            type="number" 
            v-model.number="jumpPage" 
            min="1" 
            :max="totalPage"
            placeholder="页码"
            class="jump-input"
          />
          <button @click="handleJump" class="jump-btn">跳转</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import testPdf from './test.pdf';
import { usePdfViewer } from './usePdfViewer';
import ThumbnailPanel from './ThumbnailPanel.vue';

// 视图引用
const viewerRef = ref(null);
const jumpPage = ref(1);
const pdfDoc = ref(null);

// 使用PDF查看器Hook
const { 
  currentPage, 
  totalPage, 
  isLoading, 
  error, 
  init, 
  jumpToPage,
  getPdfDoc 
} = usePdfViewer({
  url: testPdf,
  scale: 1.5,
  renderRange: 2,
  debounceDelay: 60
});

/**
 * 页面挂载时初始化
 */
onMounted(async () => {
  if (viewerRef.value) {
    try {
      await init(viewerRef.value);
      
      // 获取PDF文档对象供缩略图面板使用
      pdfDoc.value = getPdfDoc();
      console.log('PDF文档加载完成:', pdfDoc.value);
      
      if (pdfDoc.value) {
        console.log('PDF页数:', pdfDoc.value.numPages);
      } else {
        console.error('PDF文档为空');
      }
    } catch (err) {
      console.error('PDF初始化失败:', err);
    }
  }
});

/**
 * 监听PDF文档变化
 */
watch(isLoading, (loading) => {
  if (!loading) {
    pdfDoc.value = getPdfDoc();
    console.log('PDF文档更新:', pdfDoc.value);
  }
});

/**
 * 监听页码变化
 */
watch(currentPage, (page) => {
  console.log('当前页码:', page);
});

/**
 * 处理跳转
 */
const handleJump = () => {
  if (jumpPage.value && jumpPage.value >= 1 && jumpPage.value <= totalPage.value) {
    jumpToPage(jumpPage.value);
  }
};

/**
 * 处理缩略图点击
 */
const handleThumbnailClick = (pageNo) => {
  jumpToPage(pageNo);
};
</script>

<style lang="scss" scoped>
/* PDF查看器容器 - 左右布局 */
.pdf-viewer-container {
  width: 800px;
  height: 600px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  position: relative;
}

/* 右侧主查看区域 */
.viewer-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 加载遮罩 */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 40px;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

/* 错误提示 */
.error-message {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: #fef0f0;
  color: #dc3545;
  font-size: 14px;
  text-align: center;
  z-index: 10;
}

/* 查看区域 */
.viewer {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  background: #eee;
}

/* 工具栏 */
.toolbar {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background: #f5f5f5;
  border-top: 1px solid #ddd;
}

/* 页码信息 */
.page-info {
  font-size: 14px;
  color: #666;
}

/* 跳转区域 */
.jump-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.jump-input {
  width: 60px;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
}

.jump-btn {
  padding: 4px 12px;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background: #2980b9;
  }
}

/* 高度占位元素 */
:deep(.pdf-viewer-spacer) {
  position: relative;
  width: 1px;
}

/* 页面canvas */
:deep(.pdf-page-canvas) {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  display: none;
}
</style>