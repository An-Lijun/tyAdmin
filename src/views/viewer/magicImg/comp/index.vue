<template>
  <div id="box" class="box" :style="{
    width:width+'px',
    height:height+'px'
  }">
    <template v-for="rowItem in row">
      <template v-for="colItem in col">
        <div :style="getStyle(rowItem, colItem)" class="small-box" :class="getCompClass">

        </div>
      </template>
    </template>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  row: {
    type: Number,
    default: 14
  },
  col: {
    type: Number,
    default: 10
  },
  width: {
    type: Number,
    default: 500
  },
  height: {
    type: Number,
    default: 300
  },
  direction: {
    type: String,
    default: 'column'
    // leftToRight  
  },
  type: {
    type: String,
    default: ''
    //suipian
  }

})
const smallBoxWidth = props.width / props.col
const smallBoxHeight = props.height / props.row
const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const getStyle = (i, j) => {
  // 设置背景偏移量，让小块的背景显示对应图片的位置，和以前那种精灵图一样
  const offsetX = j * smallBoxWidth * -1
  const offsetY = i * smallBoxHeight * -1
  let delay = i * 100; // 延迟时间为毫秒(ms)，注意不要太小了
  if (props.direction === 'leftToRight') {
    delay = j * 100;
  }
  if (props.type === 'suiji') {
    delay = getRandom(0, props.col + props.row) * 100;
  }
  if (props.direction === 'leftTopToRightBottom') {
    delay = (i + j) * 100;
  }
  if (props.direction === 'center') {
    delay = ((Math.abs(props.col / 2 - j) + Math.abs(props.row / 2 - i))) * 100;
  }
  if (props.direction === 'around') {

    delay = (props.col / 2 - Math.abs(props.col / 2 - j) + (props.col / 2 - Math.abs(props.row / 2 - i))) * 100;
  }
  return {
    width: smallBoxWidth + 'px',
    height: smallBoxHeight + 'px',
    backgroundPosition: `${offsetX}px ${offsetY}px`,
    backgroundSize: `${props.width}px ${props.height}px`,
    backgroundImage: "url('https://img95.699pic.com/photo/60017/2391.jpg_wh860.jpg')",
    animationDelay: `${delay}ms`
  }
}
const getCompClass = computed(() => {
  return props.type
})

</script>

<style>
body {
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {

  display: inline-flex;
  /* 小块自动换行排列 */
  flex-wrap: wrap;
  justify-content: center;
}

.small-box {
  box-sizing: border-box;
  background-repeat: no-repeat;
}

.small-box {
  /* ... */
  opacity: 0;
  animation: smallBoxAnimate 2000ms linear forwards;
}

@keyframes smallBoxAnimate {
  0% {
    opacity: 0;
  }

  40% {
    opacity: 0;
  }

  70% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}





.suipian {
  /* ... */
  --rotateX: rotateX(0);
  --rotateY: rotateY(0);
  transform: var(--rotateX) var(--rotateY) scale(0.8);
  background-image: url('https://img95.699pic.com/photo/60017/2391.jpg_wh860.jpg');
  box-sizing: border-box;
  background-repeat: no-repeat;
  animation: suipianAnimate 2000ms linear forwards;

}

@keyframes suipianAnimate {
  0% {
    opacity: 0;
    transform: var(--rotateX) var(--rotateY) scale(0.8);
  }

  40% {
    opacity: 0;
    transform: var(--rotateX) var(--rotateY) scale(0.8);
  }

  70% {
    opacity: 1;
    transform: rotateX(0) rotateY(0) scale(0.8);
  }

  100% {
    opacity: 1;
    transform: rotateX(0) rotateY(0) scale(1);
  }
}
</style>
''
