<template>
  <div class="waterProgress">
    <svg version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" x="0px" y="0px"
      style="display: none">
      <defs></defs>
      <symbol id="wave">
        <path
          d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z">
        </path>
        <path
          d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z">
        </path>
        <path
          d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z">
        </path>
        <path
          d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z">
        </path>
      </symbol>
    </svg>
    <div class="container">
      <div class="progress" ref="progress" :style="{
        background: fill,
        transform: 'translate(0,' + (100 - data) + '%)'
      }">
        <svg viewBox="0 0 560 20" class="water_wave water_wave_front" :style="{ fill: fill }">
          <use xlink:href="#wave"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  fill: {
    type: String,
    default: '#4d6de3'
  },
  data: {
    type: String,
    default: '100'
  },
})



</script>
<style lang="scss" scoped>
@keyframes moveToLeft {
  0% {
    left: 0px;
  }

  100% {
    left: -100%;
  }
}

.waterProgress {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .container {
    width: 100%;
    height: 100%;

    .water_wave_front {
      animation: moveToLeft 3s infinite ease-out;
      left: 0;
      position: absolute;
      transform: translate(0, -50%);
      width: 200%;

    }

    .progress {}
  }

}
</style>
