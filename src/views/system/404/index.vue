<template>
  <div class="ty-container">
    <svgIcon icon="404"></svgIcon>
    <div class="right">
      <div class="title">404</div>
      <div class="subTitle">抱歉，你访问的页面不存在或无权访问</div>
      <TyButton>返回首页</TyButton>
    </div>
  </div>
</template>
<script setup>
import svgIcon from '@/components/svgIcon.vue'
</script>
<style lang="scss" scoped>
.ty-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 500px;
  display: flex;
  align-items: center;
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .title {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      text-align: center;
      margin-bottom: 24px;
    }
    .subTitle {
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}
</style>
