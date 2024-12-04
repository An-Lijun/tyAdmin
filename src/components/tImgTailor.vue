<template>
  <div class="ty-tailor" @click="uploadClick">
    <slot></slot>
    <input ref="inputRef" type="file" name="" hidden id="" @change="fileChange($event)">

  </div>
  <TyDialog v-model="isShowDialog" :title=title>
    <div class="ty-tailor-content">
      <div class="ty-tailor-img">
        <img :src="src" alt="" width="500px" class="poImg" ref="poImg">
        <img :src="src" alt="" width="500px">
        <div class="mask"></div>
      </div>
    </div>
  </TyDialog>
</template>
<script setup>
import { ref,onMounted } from 'vue'
const inputRef = ref()
const isShowDialog = ref(false)
let title = ref('')
let src = ref('')
let poImg = ref()
const uploadClick = () => {
  inputRef.value.click();
}

const fileChange = (e) => {
  const file = e.target.files[0];
  title.value = file.name
  src.value = window.URL.createObjectURL(file)
  isShowDialog.value = true
  poImg.value.onload = () => {
  };
}




  

</script>
<style lang="scss" scoped>
.ty-tailor {
  display: inline-block;
}

::v-deep .ty-dialog {
  width: unset !important;
  display: inline-block;
}

::v-deep .ty-dialog__body {
  .ty-tailor-img {
    position: relative;

    .mask {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 2;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }

    .poImg {
      top: 0;
      left: 0;
      position: absolute;
      z-index: 3;
      height: 100%;
      width: 100%;
      user-select: none;
      -webkit-user-drag: none;
    }
  }
}






/* 裁剪器 */
.cropper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}

.cropper__view {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  user-select: none;
  outline: 1px solid #39f;
}

.cropper-dashed {
  /* 虚线 */
  border: 0 dashed #eee;
  display: block;
  opacity: .5;
  position: absolute;
}

.cropper-dashed.dashed-h {
  border-bottom-width: 1px;
  border-top-width: 1px;
  height: 33.33333%;
  left: 0;
  top: 33.33333%;
  width: 100%;
}

.cropper-dashed.dashed-v {
  border-left-width: 1px;
  border-right-width: 1px;
  height: 100%;
  left: 33.33333%;
  top: 0;
  width: 33.33333%;
}

.cropper-center {
  /* 中心点 */
  display: block;
  height: 0;
  left: 50%;
  opacity: .75;
  position: absolute;
  top: 50%;
  width: 0;
}

.cropper-center:after,
.cropper-center:before {
  background-color: #eee;
  content: " ";
  display: block;
  position: absolute;
}

.cropper-center:before {
  height: 1px;
  left: -3px;
  top: 0;
  width: 7px;
}

.cropper-center:after {
  height: 7px;
  left: 0;
  top: -3px;
  width: 1px;
}

.cropper-line {
  /* 四边线 */
  background-color: #39f;
  display: block;
  height: 100%;
  opacity: .1;
  position: absolute;
  width: 100%;
}

.cropper-line.line-e {
  cursor: e-resize;
  right: -3px;
  top: 0;
  width: 5px;
}

.cropper-line.line-n {
  cursor: n-resize;
  height: 5px;
  left: 0;
  top: -3px;
}

.cropper-line.line-w {
  cursor: w-resize;
  left: -3px;
  top: 0;
  width: 5px;
}

.cropper-line.line-s {
  bottom: -3px;
  cursor: s-resize;
  height: 5px;
  left: 0;
}

.cropper-point {
  /* 六个点 */
  background-color: #39f;
  height: 5px;
  opacity: .75;
  width: 5px;
  display: block;
  position: absolute;
}

.cropper-point.point-e {
  cursor: e-resize;
  margin-top: -3px;
  right: -3px;
  top: 50%;
}

.cropper-point.point-n {
  cursor: n-resize;
  left: 50%;
  margin-left: -3px;
  top: -3px;
}

.cropper-point.point-w {
  cursor: w-resize;
  left: -3px;
  margin-top: -3px;
  top: 50%;
}

.cropper-point.point-s {
  bottom: -3px;
  cursor: s-resize;
  left: 50%;
  margin-left: -3px;
}

.cropper-point.point-ne {
  cursor: ne-resize;
  right: -3px;
  top: -3px;
}

.cropper-point.point-nw {
  cursor: nw-resize;
  left: -3px;
  top: -3px;
}

.cropper-point.point-sw {
  bottom: -3px;
  cursor: sw-resize;
  left: -3px;
}

.cropper-point.point-se {
  bottom: -3px;
  cursor: se-resize;
  opacity: 1;
  right: -3px;
}

.cropper-move {
  /* 移动区 */
  display: block;
  height: 100%;
  opacity: .1;
  position: absolute;
  width: 100%;
  cursor: move;
  background-color: #fff;
  left: 0;
  top: 0;
}
</style>
