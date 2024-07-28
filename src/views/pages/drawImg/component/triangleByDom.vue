<template>
  <div class="tyAdmin-triangle-container" :style="{
    height:height+'px'
  }">
    <div class="tyAdmin-triangle" :style="style">
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue'
const props = defineProps({
  height: {
    type: Number,
    default: 50
  },
  color: {
    type: String,
    default: '#000'
  },
  type: {
    default: 'isosceles'
  }
  // isosceles 等腰 equilateral等边 right 直角
})
let style = ref('')
let boxHeight = ref('0')
onMounted(() => {

  switch (props.type) {
    case 'isosceles':
      return style.value = `
      border: ${props.height}px solid transparent;
      border-bottom: ${props.height}px solid ${props.color};
    `
    case 'equilateral':
      let bd = 100 / (Math.sqrt(3) / 2) / 2
      return style.value = `
        border: ${bd}px solid transparent;
        border-bottom: ${props.height}px solid ${props.color};
      `
    case 'right':
      return style.value = `
        border: ${props.height}px solid transparent;
        border-bottom: ${props.height}px solid ${props.color};
        border-left: 0px;
      `
  }


})
</script>
<style lang="scss" scoped>
.tyAdmin-triangle-container {
  position: relative;
  overflow: hidden;
  .tyAdmin-triangle {
    position: absolute;
    width: 0;
    height: 0;
    bottom: 0px;
  }
}
</style>
