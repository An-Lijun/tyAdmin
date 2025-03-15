<template>
  <span>
    <slot :value="value">
      {{ value }}
    </slot>
  </span>
</template>
<script setup>
import { computed, onUnmounted, ref } from 'vue'
const props = defineProps({
  value: {
    type: String,
  },
  second: {
    type: Number
  }
})
let value = ref(0)
let handle //句柄
function numberAnimation(number) {
  let content = 0; //内容
  let time = number / (props.second * 60); //秒数
  let animation = () => {
    if (number - time <= content) {
      cancelAnimationFrame(handle);
      content = number;
    } else {
      content += time;
      handle = requestAnimationFrame(animation);
    }
    value.value = parseInt(content)
  };
  requestAnimationFrame(animation);
}
numberAnimation(props.value)


onUnmounted(() => {
  cancelAnimationFrame(handle);
})
</script>
<style lang="scss" scoped></style>
