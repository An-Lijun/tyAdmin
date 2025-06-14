<template>
  <div ref="floatDrag" class="ty-SuspensionBoll" id="float-box"
    :style="{ left: left + 'px', top: top + 'px', right: right + 'px !important', zIndex: zIndex }"
     @mousemove.prevent @mousedown="mouseDown" @mouseup="mouseUp" :class="[left<=0?'left':left>=clientWidth-70?'right':'',flag?'isOpened':'']">
    <div class="drag" @dblclick="handelFlex" >
      <TyiAppsFill color="#fff" :size="30" />
    </div>
    <div class="content" id="content"  :class="{
      isOpened:flag
    }">
      <div class="item-container">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script >

export default {
  name: 'DragBall',
  props: {
    distanceRight: {
      type: Number,
      default: 36,
    },

    isScrollHidden: {
      type: Boolean,
      default: false,
    },
    isCanDraggable: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: Number,
      default: 50,
    },
    value: {
      type: String,
      default: '悬浮球！',
    },
  },
  data() {
    return {
      clientWidth: null,
      clientHeight: null,
      left: null,
      top: null,
      right: null,
      timer: null,
      currentTop: 0,
      mousedownX: 0,
      mousedownY: 0,

      flag: false, // 控制悬浮框是否展开
      box: '', // 悬浮球的dom
      activeIndex: 0, //高亮显示

    };
  },
  created() {
    this.clientWidth = document.documentElement.clientWidth;
    this.clientHeight = document.documentElement.clientHeight;
  },
  mounted() {
    this.isCanDraggable &&
      this.$nextTick(() => {
        this.floatDrag = this.$refs.floatDrag;
        // 获取元素位置属性
        this.floatDragDom = this.floatDrag.getBoundingClientRect();
        // 设置初始位置
        this.right = 0;
        this.top = this.clientHeight - this.floatDragDom.height;
        this.initDraggable();
      });
    window.addEventListener('resize', this.handleResize);
    this.box = document.getElementById("float-box")
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    // 伸缩悬浮球
    handelFlex() {
      this.flag = !this.flag
    },

    // 获取要改变得样式属性
    getStyleAttr(obj, attr) {
      if (obj.currentStyle) {
        // IE 和 opera
        return obj.currentStyle[attr];
      } else {
        return window.getComputedStyle(obj, null)[attr];
      }
    },
    /**
     * 窗口resize监听
     */
    handleResize() {
      this.checkDraggablePosition();
    },
    /**
     * 初始化draggable
     */
    initDraggable() {
      this.floatDrag.addEventListener('touchstart', this.toucheStart);
      this.floatDrag.addEventListener('touchmove', (e) => this.touchMove(e));
      this.floatDrag.addEventListener('touchend', this.touchEnd);
    },
    mouseDown(e) {
      const event = e || window.event;
      this.mousedownX = event.screenX;
      this.mousedownY = event.screenY;
      const that = this;
      let floatDragWidth = this.floatDragDom.width / 2;
      let floatDragHeight = this.floatDragDom.height / 2;
      if (event.preventDefault) {
        event.preventDefault();
      }
      this.canClick = false;
      this.floatDrag.style.transition = 'none';
      document.onmousemove = function (e) {
        var event = e || window.event;
        that.left = event.clientX - floatDragWidth;
        that.top = event.clientY - floatDragHeight;
        if (that.left < 0) that.left = 0;
        if (that.top < 0) that.top = 0;
        // 鼠标移出可视区域后给按钮还原
        if (
          event.clientY < 0 ||
          event.clientY > Number(this.clientHeight) ||
          event.clientX > Number(this.clientWidth) ||
          event.clientX < 0
        ) {
          this.right = 0;
          this.top = this.clientHeight - this.floatDragDom.height;
          document.onmousemove = null;
          this.floatDrag.style.transition = 'all 0.3s';
          return;
        }
        if (that.left >= document.documentElement.clientWidth - floatDragWidth * 2) {
          that.left = document.documentElement.clientWidth - floatDragWidth * 2;
        }
        if (that.top >= that.clientHeight - floatDragHeight * 2) {
          that.top = that.clientHeight - floatDragHeight * 2;
        }
      };
    },
    mouseUp(e) {
      //判断只是单纯的点击，没有拖拽
      document.onmousemove = null;
      this.checkDraggablePosition();
      this.floatDrag.style.transition = 'all 0.3s';
    },
    /**
     * 判断元素显示位置
     * 在窗口改变和move end时调用
     */
    checkDraggablePosition() {
      this.clientWidth = document.documentElement.clientWidth;
      this.clientHeight = document.documentElement.clientHeight;
      if (this.left + this.floatDragDom.width / 2 >= this.clientWidth / 2) {
        // 判断位置是往左往右滑动
        this.left = this.clientWidth - this.floatDragDom.width;
      } else {
        this.left = 0;
      }
      if (this.top < 0) {
        // 判断是否超出屏幕上沿
        this.top = 0;
      }
      if (this.top + this.floatDragDom.height >= this.clientHeight) {
        // 判断是否超出屏幕下沿
        this.top = this.clientHeight - this.floatDragDom.height;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.ty-SuspensionBoll {
  position: fixed;
  z-index: 10003 !important;
  left: 0;
  top: 20%;
  width: 70px;
  // background: rgba(167, 160, 161, .5);
  cursor: pointer;
  user-select: none;

  display: block;
  background: black;
  // border-radius: 50%;
  margin: 0;
  &.left{
    transform: translateX(-80%);
    border-radius: 0;
  }
  &.right{
    transform: translateX(80%);
    border-radius: 0;
  }
  &:hover{
    transform: translateX(0);
    border-radius: 50%;
  }

  &.isOpened:hover{
    transform: translateX(0);
    border-radius: 40px;
  }
  .drag {
    width: 70px;
    height: 70px;
    // background: #f2e96a;
    text-align: center;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .content {
    width: 70px;
    display: grid;
    grid-template-rows: 0fr;
    transition: all 0.3s;
    overflow: hidden;
    &.isOpened{
     grid-template-rows: 1fr;
      margin-bottom: 20px;
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

    .item-container {
      width: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      min-height: 0;
      overflow: hidden;
      height: unset;
    }
  }
}


</style>
