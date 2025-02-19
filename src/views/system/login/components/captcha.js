export default class Captcha {
  constructor(canvas, isRenderColor = true, dirtyLines = 20) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d')
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.dirtyLines = dirtyLines;
      this.isRenderColor = isRenderColor;
  }
  getRandRGB() {
      if (!this.isRenderColor) {
          return 'rgb(0,0,0)'
      }
      return 'rgb(' + this.getRandom(256) + ',' + this.getRandom(256) + ',' + this.getRandom(256) + ')';
  }
  /* 随机字符函数 */
  getRandText() {
      // 去掉i,I,l,o,O等易混淆字母
      let str = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ0123456789'
      return str.split('')[this.getRandom(57)]
  }
  getRandom(data) {
      return Math.floor(Math.random() * data)
  }

  /* 随机干扰线条函数 */
  drawline() {
      // 若省略beginPath，则每点击一次验证码会累积干扰线的条数
      this.ctx.beginPath()
      // 起点与终点在canvas宽高内随机
      this.ctx.moveTo(this.getRandom(this.width), this.getRandom(this.height))
      this.ctx.lineTo(this.getRandom(this.width), this.getRandom(this.height))
      this.ctx.lineWidth = 1
      this.ctx.strokeStyle = this.getRandRGB()
      this.ctx.stroke()
  }

  /* 生成验证码 */
  render() {
      // 每次生成code先将其清空防止叠加
      let code = ''
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.ctx.strokeStyle = '#FFF'
      this.ctx.strokeRect(0, 0, this.width, this.height)

      // 生成干扰线，数量随意
      for (let i = 0; i < this.dirtyLines; i++) {
          this.drawline()
      }
      // 循环生成5位验证码
      for (let k = 0; k < 5; k++) {
          this.ctx.font = '76px Arial'
          // 将初始状态保存
          this.ctx.save()
          // 获得-1到1的随机数
          let rA = 1 - Math.random() * 2
          // 获取随机倾斜角
          let angle = rA / 8
          let ranNum = this.getRandText()
          // 旋转生成的随机字符
          this.ctx.rotate(angle)
          this.ctx.fillStyle = this.getRandRGB()
          // 把rand()生成的随机数文本依次填充到canvas中，注意x坐标
          this.ctx.fillText(ranNum, 20 + 45 * k, 100)
          // 恢复初始状态，以便下一次循环
          this.ctx.restore()
          code += ranNum
      }
      // 返回生成的验证码字符串
      return code
  }
}