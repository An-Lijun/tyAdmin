<template>
  <transition name="zoom">
    <div v-if="modelValue" class="tyAdmin_wrapper" @wheel="handleScroll">
      <div class="tyAdmin_image">
        <img ref="tyAdmin_img" :src="previewImgList[currentIndex] || ''">
      </div>
      <div class="tyAdmin_close tyAdmin_btn" @click="closeTyAdmin">&times;</div>
      <div class="tyAdmin_navigation">
        <span class="tyAdmin_navigation_left tyAdmin_btn" @click="prevImage">
          <TyIcon icon="ty-arrow-left-s-fill" style="color: #fff;"></TyIcon>
        </span>
        <span class="tyAdmin_navigation_right tyAdmin_btn" @click="nextImage">
          <TyIcon icon="ty-arrow-right-s-fill" style="color: #fff;"></TyIcon>
        </span>
      </div>
      <div class="tyAdmin_toolbar">
        <span class="tyAdmin_btn" @click="shrinkHandle">-</span>
        <span class="tyAdmin_btn" @click="largeHandle">+</span>
        <span class="tyAdmin_btn" @click="turnLeftHandle">↺</span>
        <span class="tyAdmin_btn" @click="initImgHandle">▣</span>
        <span class="tyAdmin_btn" @click="turnRightHandle">↻</span>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    modelValue:{
      type: Boolean,
      default: false
    },
    previewImgList: { // url数组
      type: Array,
      default: () => []
    },
    index: { // 当前图片索引
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      imgHandle: { // 图片控制
        scale: 1,
        rotate: 0
      },
      currentIndex:0
    }
  },

  watch: {
    modelValue: { // 给body动态增加style属性，禁止背景内容的鼠标滚轮滚动
      handler(newVal) {
        if(newVal) {
          this.currentIndex =this.index
          document.body.style.overflow = "hidden";
          this.initImgHandle() // 每次打开图片初始化
        } else {
          document.body.style.overflow = "";
        }
      }
    },
  },
  methods: {
    // 鼠标滚轮
    handleScroll(event) {
      if (event.deltaY > 0) {
        // 向下滚动事件
        this.shrinkHandle()
      } else {
        // 向上滚动事件
        this.largeHandle()
      }
    },
    // 向左翻转
    async turnLeftHandle() {
      this.imgHandle.rotate = this.imgHandle.rotate - 90
      await this.$nextTick()
      const element = this.$refs.tyAdmin_img
      element.style.transform = `scale(${this.imgHandle.scale}) rotate(${this.imgHandle.rotate}deg)`
    },
    // 向右翻转
    async turnRightHandle() {
      this.imgHandle.rotate = this.imgHandle.rotate + 90
      await this.$nextTick()
      const element = this.$refs.tyAdmin_img
      element.style.transform = `scale(${this.imgHandle.scale}) rotate(${this.imgHandle.rotate}deg)`
    },
    // 初始化还原图片缩放旋转控制
    async initImgHandle() {
      this.imgHandle = {
        scale: 1,
        rotate: 0
      }
      await this.$nextTick()
      const element = this.$refs.tyAdmin_img
      element.style.transform = `scale(${this.imgHandle.scale}) rotate(${this.imgHandle.rotate}deg)`
    },
    // 放大图片
    async largeHandle() {
      console.log(this.imgHandle.scale, 'scale')
      this.imgHandle.scale = Number((this.imgHandle.scale + 0.2).toFixed(2)) // 使用toFixed防止小数点精度不准
      const element = this.$refs.tyAdmin_img
      element.style.transform = `scale(${this.imgHandle.scale}) rotate(${this.imgHandle.rotate}deg)`
    },
    // 缩小图片
    async shrinkHandle() {
      console.log(this.imgHandle.scale, 'scale')
      if (this.imgHandle.scale === 0.2) { // 最低缩放到0.2倍
        return
      }
      this.imgHandle.scale = Number((this.imgHandle.scale - 0.2).toFixed(2)) // 使用toFixed防止小数点精度不准
      const element = this.$refs.tyAdmin_img
      element.style.transform = `scale(${this.imgHandle.scale}) rotate(${this.imgHandle.rotate}deg)`
    },
    // 上一张图片
    prevImage() {
      if (this.currentIndex === 0) {
        this.currentIndex = this.previewImgList.length - 1
      } else {
        this.currentIndex--
      }
      this.initImgHandle()
    },
    // 下一张图片
    nextImage() {
      if (this.currentIndex === this.previewImgList.length - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
      this.initImgHandle()
    },
    // 关闭预览图片组件
    closeTyAdmin() {
      this.$emit('update:modelValue',false)
    }
  },
  mounted() { // 插入body
    document.body.appendChild(this.$el);
  },
  destroyed() { // 组件销毁后同步清除元素
    this.$el.parentNode.removeChild(this.$el);
  }
}
</script>
<style lang="scss" scoped>
.tyAdmin_wrapper{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 9999;
  .tyAdmin_image{
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100vw;
      height: 100vh;
      object-fit: scale-down;
      transition: transform 0.3s ease; 
    }
  }
  .tyAdmin_close{
    position: absolute;
    right: 20px;
    top: 20px;
    transition: transform 0.2s ease-out;
    &:hover{
      transform: scale(1.2);
    }
  }
  .tyAdmin_navigation{
    &_left{
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translate(0, -50%);
      transition: transform 0.2s ease-out;
    }
    &_right{
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translate(0, -50%);
      transition: transform 0.2s ease-out;
    }
    &_left:hover,&_right:hover{
      transform: translate(0, -50%) scale(1.2);
    }
  }
  .tyAdmin_toolbar{
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    align-items: center;
    span{
      margin-right: 10px;
      transition: transform 0.2s ease-out;
      &:hover{
        transform: scale(1.1) ;
      }
    }
    span:last-child{
      margin-right: 0;
    }
  }
  .tyAdmin_btn{
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #fff;
    background-color: #606266;
    border-radius: 50%;
    cursor: pointer;
    user-select: none;
  }
}
.zoom-enter, .zoom-leave-to { // 元素进入和离开时的动作
  transform: scale(0);
}
.zoom-enter-active, .zoom-leave-active { // 元素进入和离开时的过渡动画定义
  transition: transform 0.3s;
}

.slide-enter, .slide-leave-to { // 元素进入和离开时的动作
  transform: translateX(100%);
}
.slide-enter-active, .slide-leave-active { // 元素进入和离开时的过渡动画定义
  transition: transform 0.3s ease-in-out;
}
.tyAdmin_navigation_left, .tyAdmin_navigation_right{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>  
