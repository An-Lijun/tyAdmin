<template>
  <TyButton @click="btnClick($event)" class="waterBtn"   v-bind="attrs">

    <slot />

    <span class="waterpop" ref="waterpop" >
    </span>
  </TyButton>
</template>
<script setup>
import { ref,useAttrs } from 'vue'

const attrs = useAttrs()
const waterpop = ref()
 const emit = defineEmits(['click']);
const btnClick = (e) => {

  let target = e.currentTarget
  let x = e.clientX - target.offsetLeft;
  let y = e.clientY - target.offsetTop;
  let rip = waterpop.value
  rip.style.left = x + "px";
  rip.style.top = y + "px";

  rip.style.display = 'block'
  emit('click')
  setTimeout(function () {
    rip.style.display = 'none'
  }, 1000)
  
}
</script>
<style lang="scss" scoped>
.waterBtn {
  overflow: hidden;
  position: relative;
}

.waterpop {
  position: absolute;
  background-color: #fff;
  transform: translate(-50%, -50%);
  pointer-events: none;
  border-radius: 50%;
  animation: animate 1s linear infinite;
  display: none;
}

@keyframes animate {
  0% {
    width: 0px;
    height: 0px;
    opacity: 0.5;

  }

  100% {
    width: 400px;
    height: 400px;
    opacity: 0;
  }
}
</style>
