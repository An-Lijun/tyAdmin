<template>
  <div class="hourse-container" :style="{
    '--horse-width': width + 'px',
    '--horse-height': width / 38 * 25 + 'px',
    '--color-horse': color,
    '--color-horse-back': backColor,
    '--speed': speed + 's',
    '--delay-gap': speed*10,
  }"
    @mouseenter="fn($event)"
  >
    <div class="horse animate">
      <headHorse />
      <neckHorse />
      <frontLegHorse />
      <tailHorse />
      <bodyHorse />
      <backLegHorse />
    </div>
  </div>
</template>
<script setup>
import headHorse from './comp/head.vue'
import neckHorse from './comp/neck.vue'
import bodyHorse from './comp/body.vue'
import tailHorse from './comp/tail.vue'
import frontLegHorse from './comp/frontLeg.vue'
import backLegHorse from './comp/backLeg.vue'

const props = defineProps({
  width: {
    type: Number,
    default: '380'
  },
  color: {
    type: String,
    default: 'rgba(50, 50, 50, 1)'
  },
  backColor: {
    type: String,
    default: ' rgba(30, 30, 30, 1)'
  },
  speed: {
    type: Number,
    default: 0.8
  },
})
const fn=(e)=>{
  console.log(


  );
  e.target.class
}
</script>
<style lang="scss" scoped>
.hourse-container {
  --outlines: transparent;
  --color-hair: rgba(70, 70, 70, 1);
  --color-hoof: rgba(0, 0, 0, 1);
  
   &>* {
    position: relative;
  }

  .horse {
    width: var(--horse-width);
    height: var(--horse-height);
    border: 0px solid var(--outlines);

    &>*,
    &>*::after,
    &>*::before {
      border: 1px dashed var(--outlines);
    }

    &>* {
      position: absolute;
      top: var(--part-y, 0);
      left: var(--part-x, 0);
      width: var(--part-width, 10px);
      height: var(--part-height, 10px);
      border-radius: var(--part-radius, 0);
      transform: rotate(var(--part-rotate, 0deg));
      transform-origin: var(--part-origin, 50% 50%);
      -webkit-animation-delay: var(--delay, 0s) !important;
      animation-delay: var(--delay, 0s) !important;
    }

    &>* *,
    &>* *:after,
    &>* *:before {
      position: absolute;
      background-color: var(--color-horse);
      top: var(--shape-y, 0);
      left: var(--shape-x, 0);
      width: var(--shape-width, 10px);
      height: var(--shape-height, 10px);
      border-radius: var(--shape-radius, 0);
      transform: rotate(var(--shape-rotate, 0deg));
      transform-origin: var(--shape-origin, 50% 50%);
      -webkit-animation-delay: var(--delay, 0s) !important;
      animation-delay: var(--delay, 0s) !important;
    }



  }
}

.actived {
  --outlines: white;
  --speed: 8s;
  --color-horse: rgba(50, 50, 50, 0.3);
  --color-horse-back: rgba(30, 30, 30, 0.3);
  --color-hair: rgba(70, 70, 70, 0.3);
  --color-hoof: rgba(0, 0, 0, 0.3);
}
</style>
