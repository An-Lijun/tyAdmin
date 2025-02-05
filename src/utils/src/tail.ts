class TailElement {
  //构造函数
  constructor(character) {
      this.character = character
      this.lifeSpan = 150 // 初始化一个元素的生命周期为120,后续通过减少生命周期来控制拖尾符号的消失
      // 初始化样式
      this.initialStyles = {
          position: "fixed", // 绝对定位
          top: "0",
          display: "block", // 块级元素
          pointerEvents: "none", // 不响应鼠标事件
          "z-index": "10000000", // 层级最高
          fontSize: "25px", // 字体大小
          "will-change": "transform", // 动画
          color: "#000000" // 颜色
      }
  }
  ApplyStyle(element, styles) {
      for (let key in styles) {
          element.style[key] = styles[key]
      }

  }
  init(x, y, color) {
      //初始化

      this.velocity = { x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2), y: 1 } // 初始化速度
      this.position = { x: x - 10, y: y - 20 } // 初始化位置
      this.initialStyles.color = color // 初始化颜色
      this.element = document.createElement("span") // 创建元素
      this.element.innerHTML = this.character  // 添加字符
      this.ApplyStyle(this.element, this.initialStyles) // 添加样式
      this.update() // 更新字符状态
      document.body.appendChild(this.element) // 添加元素到页面
  }

  //更新
  update() {
      //移动，缩放
      this.position.x += this.velocity.x // x轴移动
      this.position.y += this.velocity.y // y轴移动
      this.lifeSpan-- // 减少生命周期
      this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + this.lifeSpan / 120 + ")" // 缩放
  }

  //销毁
  die() {
      this.element.parentNode.removeChild(this.element) // 移除元素
  }
}

export default class RenderTail {
  constructor(colors, characters) {
      this.colors = colors || ["#F8F8FF", "#FFFFFF", "#ADD8E6", "#7BF2EA", "#C0C0C0", "#E0E0E0"] // 颜色数组
      this.characters = characters || ["✺", "❆", "❄", "❄", "❄", "✺", "❉", "✹", "✵", "❁", "❆"]  // 拖尾符号类型数组
      this.elementGroup = []
      this.reqAF=null
  }

  init() {
      document.addEventListener("mousemove", this.onMouseMove.bind(this))
      this.render()
  }
  createElement(x, y, color) {
      const num = Math.floor(Math.random() * this.characters.length) // 随机抽取一个字符
      const e = new TailElement(this.characters[num]) // 创建元素
      e.init(x, y, color) // 初始化元素的位置和颜色
      this.elementGroup.push(e) // 添加元素到数组
  }
  onMouseMove(t) {
      const num = Math.floor(Math.random() * this.colors.length) // 随机颜色
      this.createElement(t.clientX, t.clientY, this.colors[num]) // 添加元素到数组
  }
  render() {
      // 遍历元素数组
      for (let i = 0; i < this.elementGroup.length; i++) {
          this.elementGroup[i].update() // 更新元素位置和状态
          // 判断元素是否已经消失
          if (this.elementGroup[i].lifeSpan < 0) {
              this.elementGroup[i].die() // 元素消失，移除元素
              this.elementGroup.splice(i, 1)
          }
      }
    this.reqAF =  requestAnimationFrame(this.render.bind(this)) // 循环渲染
  }
  stopRender(){
    cancelAnimationFrame(this.reqAF)
  }

}

