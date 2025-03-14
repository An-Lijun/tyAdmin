<template>
  <!-- 二维码容器，使用动态样式绑定宽度和高度 -->
  <div class="qrcode-container">
    <!-- 用于绘制二维码的 canvas 元素 -->
    <canvas ref="qrcodeCanvas"></canvas>
  </div>
</template>

<script setup name="QRCode">

import { ref, onMounted, watch } from 'vue'
// 引入生成二维码数据的模块
import QRCode from './src/qrcode.js'
// 引入绘制二维码的模块
import * as Draw from './src/type.js'


// 定义组件的 props
const props = defineProps({
  // 二维码包含的值，默认为示例链接
  value: {
    type: String,
    default: 'https://passer-by.com/'
  },
  // 二维码的宽度，默认为 300
  width: {
    type: Number,
    default: 300
  },
  options: {
    type: Object,
    default: () => ({
    })
  }
})

// 引用 canvas 元素
const qrcodeCanvas = ref(null)
// canvas 的 2D 上下文对象
let context = null



let options = Object.assign({
  type: 'normaler', // 二维码的模板样式，默认为 'normaler'
  level: 'H',  // 二维码的纠错级别，默认为 'H'
  logo: '', // 二维码中间的 logo 图片链接，默认为空
  text: '',   // 二维码中间的文本内容，默认为空
  textColor: '', // 文本的颜色，默认为空
  textStroke: '',  // 文本的描边颜色，默认为空
  foregroundImage: '',// 二维码前景图片链接，默认为空
  backgroundImage: '',// 二维码背景图片链接，默认为空
  foregroundColor: '',// 二维码前景颜色，默认为空
  backgroundColor: '',// 二维码背景颜色，默认为空
  innerColor: '',// 二维码内部颜色，默认为空
  outerColor: '' // 二维码外部颜色，默认为空
}, props.options)

/**
 * 获取二维码的纠错级别
 * 如果存在 logo，则使用 'H' 级别，否则使用传入的 level
 * @returns {string} 二维码的纠错级别
 */
const getQRCodeLevel = () => {
  return options.logo ? 'H' : options.level
}


/**
 * 获取绘制二维码所需的选项
 * @returns {object} 包含绘制选项的对象
 */
const getDrawOptions = () => {
  return {
    foregroundImage: options.foregroundImage,
    backgroundImage: options.backgroundImage,
    foregroundColor: options.foregroundColor,
    backgroundColor: options.backgroundColor,
    innerColor: options.innerColor,
    outerColor: options.outerColor,
    logo: options.logo,
    text: options.text,
    textColor: options.textColor,
    textStroke: options.textStroke
  }
}

/**
 * 绘制二维码的函数
 * 清除 canvas 内容，生成二维码数据并调用绘制模块进行绘制
 */
const drawQRCode = () => {
  // 如果 canvas 上下文不存在，则不进行绘制
  if (!context) return
  // 获取二维码的纠错级别
  const level = getQRCodeLevel()
  // 生成二维码数据
  const data = QRCode(props.value, level)
  // 清除 canvas 上的内容
  context.clearRect(0, 0, qrcodeCanvas.value.width, qrcodeCanvas.value.width)
  // 调用绘制模块的对应模板方法进行绘制
  Draw[options.type || 'normaler'](context, data, getDrawOptions())
}

// 组件挂载后执行的钩子函数
onMounted(() => {
  // 获取 canvas 的 2D 上下文
  context = qrcodeCanvas.value.getContext('2d')
  // 设置 canvas 的宽度为传入宽度的两倍，提高清晰度
  qrcodeCanvas.value.width = props.width 
  // 设置 canvas 的高度为传入高度的两倍，提高清晰度
  qrcodeCanvas.value.height = props.width 
  // 调用绘制二维码的函数
  drawQRCode()
})

// 监听关键的 props 变化，当这些 props 变化时重新绘制二维码
// watch([
//   () => props.value,
//   () => options.template,
//   () => options.level,
//   () => options.logo,
//   () => options.text,
//   () => options.textColor,
//   () => options.textStroke,
//   () => options.foregroundImage,
//   () => options.backgroundImage,
//   () => options.foregroundColor,
//   () => options.backgroundColor,
//   () => options.innerColor,
//   () => options.outerColor
// ], () => {
//   // 当监听的 props 变化时，重新绘制二维码
//   drawQRCode()
// })
</script>

<style scoped>
.qrcode-container {
  display: inline-block;
}
</style>