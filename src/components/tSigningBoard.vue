<template>
  <div class="uiSigningBoard" :style="{
    width: width + 'px',
    height: height + 'px'
  }">
    <header class="uiSigningBoard__header">
      请使用签名笔在方框中用正楷字体签字
    </header>
    <div class="uiSigningBoard__content" ref="content">
      <canvas @mouseenter="handleCanvasEnter" @mouseleave="handleCanvasLeave" ref="uiSigningBoardCanvas"
        class="uiSigningBoard__Canvas" :width="cWidth" :height="cHeight">
      </canvas>
      <div class="uiSigningBoard__btn">
        <slot>
          <ty-button @click="back" type="dashed"> 取消 </ty-button>
          <ty-button @click="clearBoard" style="margin: 0 10px;" type="secondary"> 清屏</ty-button>
          <ty-button @click="save"> 确定 </ty-button>
        </slot>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    padding: {
      type: Number,
      default: 20
    },
    lineWidth: {
      type: Number,
      default: 1
    },
    lineColor: {
      type: String,
      default: '#000'
    },
    pageMargin: {
      type: Number,
      default: 10
    },
    fileType:{
      type:String,
    }
  },
  data() {
    return {
      cWidth: 0,
      cHeight: 0,
      ctx: null,
      canvas: null
    }
  },
  methods: {
    back() {
      this.$emit('back')
    },
    clearBoard() {
      this.ctx.clearRect(0, 0, this.cWidth, this.cHeight)
    },
    draw(e) {
      this.ctx.lineTo(e.offsetX, e.offsetY)
      this.ctx.stroke()
    },
    mouseDown(e) {
      this.ctx.beginPath()
      this.ctx.lineWidth = this.lineWidth
      this.ctx.strokeStyle = this.lineColor
      this.ctx.moveTo(e.offsetX, e.offsetY)
      this.canvas.addEventListener('mousemove', this.draw)
    },
    mouseUp() {
      this.canvas.removeEventListener('mousemove', this.draw)
    },
    handleCanvasEnter() {
      this.canvas.addEventListener('mousedown', this.mouseDown)
      this.canvas.addEventListener('mouseup', this.mouseUp)
    },
    handleCanvasLeave() {
      this.canvas.removeEventListener('mousedown', this.mouseDown)
      this.canvas.removeEventListener('mouseup', this.mouseUp)
      this.canvas.removeEventListener('mousemove', this.draw)
    },
    save() {
      if(!this.fileType){
        return
      }
      if(this.fileType ==='base64') {

          this.$emit('finished', this.canvas.toDataURL( 'image/png',1 ))
          return this.clearBoard()
      } 
      const { jsPDF } = window.jspdf
      if (!jsPDF) return
      const doc = new jsPDF({
        unit: 'mm', // 单位，本示例为mm
        format: 'a4', // 页面大小
        orientation: 'landscape', // 页面方向，portrait: 纵向，landscape: 横向
        putOnlyUsedFonts: true, // 只包含使用的字体
        compress: true, // 压缩文档
        precision: 16 // 浮点数的精度
      })

      const width = doc.internal.pageSize.getWidth() //   pdf页面一页最大宽
      const height = doc.internal.pageSize.getHeight() //  pdf页面一页最大高

      const pdfCentWidth = width - this.pageMargin * 2 // 内容最大宽
      const pdfCentHeight = height - this.pageMargin * 2 // 内容最大高

      const widthRatio = pdfCentWidth / this.cWidth // 换算比例宽
      const heightRatio = pdfCentHeight / this.cHeight // 换算比例高
      const ratio = Math.min(widthRatio, heightRatio)
      // 得到图片宽高
      const w = this.cWidth * ratio
      const h = this.cHeight * ratio
      var imgURL = this.canvas.toDataURL({ format: 'image/jpeg', quality: 1 })
      doc.addImage(imgURL, 'JPEG', this.pageMargin, this.pageMargin, w, h)
      doc.save('PDF存档.pdf')
    }
  },
  mounted() {
    if(this.width === '100%' ){
      const {width} = this.$refs.content.getBoundingClientRect()
      this.cWidth = width - this.padding * 2
    }else{
      this.cWidth = this.width - this.padding * 2
    }
    if(this.height === '100%' ){
      const {height} = this.$refs.content.getBoundingClientRect()
      this.cHeight = height - this.padding * 2 - 60 - 50
    }else{
      this.cHeight = this.height - this.padding * 2 - 60 - 50
    }
    this.canvas = this.$refs.uiSigningBoardCanvas
    let ctx = this.canvas.getContext('2d')
    this.ctx = ctx
  }
}
</script>

<style lang="scss" scoped>
.uiSigningBoard {
  background-color: #fff;
  background-image: repeating-linear-gradient(45deg,
      rgba(120, 120, 120, 0.1) 25%,
      transparent 25%,
      transparent 75%,
      rgba(120, 120, 120, 0.1) 75%,
      rgba(120, 120, 120, 0.1)),
    repeating-linear-gradient(45deg,
      rgba(120, 120, 120, 0.1) 25%,
      #fff 25%,
      #fff 75%,
      rgba(120, 120, 120, 0.1) 75%,
      rgba(120, 120, 120, 0.1));
  background-position: 0 0, 20px 20px;
  background-size: 40px 40px;

  &>.uiSigningBoard__header {
    user-select: none;
    height: 60px;
    line-height: 60px;
    background-color: var(--primary-5);
    font-size: 30px;
    text-align: center;
    color: #fff;
  }

  &>.uiSigningBoard__content {
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    &>.uiSigningBoard__Canvas {
      background-color: #fff;
      width: 100%;
    }

    &>.uiSigningBoard__btn {
      height: 40px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
