<template>
  <div ref="floatDrag" class="ty-SuspensionBoll" :class="computedClass" :style="boxStyle" @mousemove.prevent
    @mousedown="mouseDown" @mouseup="mouseUp">
    <div class="drag" @dblclick="handelFlex">
      <TyiAppsFill color="#fff" :size="30" />
    </div>
    <div class="content" :class="{
      isOpened: isOpened
    }">
      <div class="item-container">
        <div class="slot-item" v-for="item in $slots.default()" :key="item.key">
          <component :is="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue';

const props = defineProps({
  isCanDraggable: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: Number,
    default: 50,
  },
});

const floatDrag = ref(null);
let floatDragDom = null;

const clientWidth = ref(null);
const clientHeight = ref(null);
const left = ref(null);
const top = ref(null);
const right = ref(null);
const timer = ref(null);

const isOpened = ref(false);
const activeIndex = ref(0);
let canClick = false;

clientWidth.value = document.documentElement.clientWidth;
clientHeight.value = document.documentElement.clientHeight;

const boxStyle = computed(() => ({
  left: left.value + 'px',
  top: top.value + 'px',
  right: right.value + 'px !important',
  zIndex: props.zIndex,
}));

const computedClass = computed(() =>
  [left.value <= 0 ? 'left' : left.value >= clientWidth.value - 110 ? 'right' : '', isOpened.value ? 'isOpened' : '']
)

onMounted(() => {
  props.isCanDraggable &&
    nextTick(() => {
      floatDragDom = floatDrag.value.getBoundingClientRect();
      right.value = 0;
      top.value = clientHeight.value - floatDragDom.height;
      initDraggable();
    });
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
});

const handelFlex = () => {
  isOpened.value = !isOpened.value;
};

const getStyleAttr = (obj, attr) => {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return window.getComputedStyle(obj, null)[attr];
  }
};

const handleResize = () => {
  checkDraggablePosition();
};

const initDraggable = () => {
  floatDrag.value.addEventListener('touchstart', toucheStart);
  floatDrag.value.addEventListener('touchmove', (e) => touchMove(e));
  floatDrag.value.addEventListener('touchend', touchEnd);
};

const mouseDown = (e) => {
  const event = e || window.event;
  let floatDragWidth = floatDragDom.width / 2;
  let floatDragHeight = floatDragDom.height / 2;
  if (event.preventDefault) {
    event.preventDefault();
  }
  canClick = false;
  floatDrag.value.style.transition = 'none';
  document.onmousemove = function (e) {
    var event = e || window.event;
    left.value = event.clientX - floatDragWidth;
    top.value = event.clientY - floatDragHeight;
    if (left.value < 0) left.value = 0;
    if (top.value < 0) top.value = 0;
    if (
      event.clientY < 0 ||
      event.clientY > Number(clientHeight.value) ||
      event.clientX > Number(clientWidth.value) ||
      event.clientX < 0
    ) {
      right.value = 0;
      top.value = clientHeight.value - floatDragDom.height;
      document.onmousemove = null;
      floatDrag.value.style.transition = 'all 0.3s';
      return;
    }
    if (left.value >= document.documentElement.clientWidth - floatDragWidth * 2) {
      left.value = document.documentElement.clientWidth - floatDragWidth * 2;
    }
    if (top.value >= clientHeight.value - floatDragHeight * 2) {
      top.value = clientHeight.value - floatDragHeight * 2;
    }
  };
};

const mouseUp = (e) => {
  document.onmousemove = null;
  checkDraggablePosition();
  floatDrag.value.style.transition = 'all 0.3s';
};

const checkDraggablePosition = () => {
  clientWidth.value = document.documentElement.clientWidth;
  clientHeight.value = document.documentElement.clientHeight;
  if (left.value + floatDragDom.width / 2 >= clientWidth.value / 2) {
    left.value = clientWidth.value - floatDragDom.width;
  } else {
    left.value = 0;
  }
  if (top.value < 0) {
    top.value = 0;
  }
  if (top.value + floatDragDom.height >= clientHeight.value) {
    top.value = clientHeight.value - floatDragDom.height;
  }
};

const handleScroll = () => { };
const toucheStart = () => { };
const touchMove = () => { };
const touchEnd = () => { };
</script>

<style scoped lang="scss">
.ty-SuspensionBoll {
  position: fixed;
  z-index: 10003 !important;
  left: 0;
  top: 20%;
  width: 50px;
  cursor: pointer;
  user-select: none;
  display: block;
  padding: 10px;
  background: rgba(255, 255, 255, 0.4);
  // border: 1px solid #333;
  margin: 0;
  backdrop-filter: blur(20px);

  &.left {
    transform: translateX(-90%);
    border-radius: 0;
  }

  &.right {
    transform: translateX(90%);
    border-radius: 0;
  }

  &:hover {
    transform: translateX(0);
    border-radius: 50%;

    // background: rgba(255, 255, 255, 0.9);
    .drag {
      border-radius: 50%;

    }

    .slot-item {
      &:last-child {
        border-radius: 0 0 50% 50%;
      }
    }

    // backdrop-filter: blur(20px);
    // -webkit-backdrop-filter: blur(20px);
  }

  &.isOpened:hover {
    transform: translateX(0);
    border-radius: 40px;

    // background: rgba(0, 0, 0, 0.9);
    // -webkit-backdrop-filter: blur(20px);
    .drag {
      border-radius: 50% 50% 0 0;
    }
  }

  .drag {
    width: 50px;
    height: 50px;
    // background: #f2e96a;
    text-align: center;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #165DFF;

  }

  .content {
    width: 50px;
    display: grid;
    grid-template-rows: 0fr;
    transition: all 0.3s;
    overflow: hidden;

    &.isOpened {
      grid-template-rows: 1fr;
    }

    .label {
      width: 70px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      color: white;
    }

    .label:hover {
      color: rgb(243, 82, 19);
      transition: all 0.5;
    }

    &.isOpened {
      .item-container {
        padding: 0px;

      }
    }

    .item-container {
      // width: 70px;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      min-height: 0;
      overflow: hidden;
      height: unset;

      .slot-item {
        height: 50px;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #165DFF;

      }
    }
  }
}
</style>
