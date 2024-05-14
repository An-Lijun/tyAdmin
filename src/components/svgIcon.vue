<template>
  <div class="ty-svgIcon" ref="svgIcon">
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
  icon: {
    type: String,
    required: true
  }
})
const svgIcon = ref()
;(icon =>
  import(`../assets/system/${icon}.svg?raw`)
    .then(obj => {
      svgIcon.value.innerHTML = obj.default || 'undefined'
    })
    .catch(e => {
      svgIcon.value.innerHTML = 'undefined'
    }))(props.icon)

// 本来打算使用?raw 读出字符串渲染到根html中然后使用svguse 进行使用但是没有这个方式简单

// let svgIconDom = document.querySelector('#ty_svgIconArea')
// if (!svgIconDom) {
//   let SVG_NS = window.location.href
//   // 1、创建svg容器
//   let svg = document.createElementNS(SVG_NS, 'svg')
//   // svg.style.display = 'none'
//   // style="display:none;"
// }

// const modules = import.meta.glob('../assets/system/**.svg', { eager: true });
// let start ='../assets/system/'
// let icon = modules[start + props.icon+'.svg']
// console.log(icon);
// console.log(icon.default);
</script>
<style lang="scss" scoped>
.ty-svgIcon {
}
</style>
