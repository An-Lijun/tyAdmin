<template>
  <div class="pdfViewer">
    <uiFrame :frameSrc="src" />
  </div>
</template>
<script setup>
import uiFrame from './uiFrame.vue'
import { ref } from 'vue'
const props = defineProps({
  file: {
    type: String,
    required: true
  }
})
let src = ref('/static/pdfjs/web/viewer.html?file=')
console.log(props.file);

src.value = src.value + encodeURIComponent(props.file)
// 生产环境下
// if (process.env.NODE_ENV === 'production') {
//   this.pdfurl = fileUrl + '' + encodeURIComponent(path)
// } else {
// // 开发环境
//   this.pdfurl = fileUrl + '?file=' + encodeURIComponent(path)
// }

</script>
<style lang="scss" scoped></style>
