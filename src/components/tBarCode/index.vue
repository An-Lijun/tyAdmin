<template>
  <div class="barcode">
    <canvas ref="cts"></canvas>
  </div>
</template>
<script lang="ts" setup>
import JsBarcode from 'jsbarcode'
import {ref,onMounted} from 'vue'
// 全部配置
//       format: "CODE39",//选择要使用的条形码类型
//       width:3,//设置条之间的宽度
//       height:100,//高度
//       displayValue:true,//是否在条形码下方显示文字
//       text:"Axjy",//覆盖显示的文本
//       fontOptions:"bold italic",//使文字加粗体或变斜体
//       font:"fantasy",//设置文本的字体
//       textAlign:"right",//设置文本的水平对齐方式
//       textPosition:"top",//设置文本的垂直位置
//       textMargin:5,//设置条形码和文本之间的间距
//       fontSize:15,//设置文本的大小
//       background:"#eee",//设置条形码的背景
//       lineColor:"#FF7F50",//设置条和文本的颜色。
//       margin:15//设置条形码周围的空白边距
/**
 * 常用条形码组成说明 
 * CODEBAR  这是一个自检码，没有校验位;用照片实验室，图书馆，内容仅支持0~9、+ - / $ . : 等6个特殊符号
 * Code11条码 只允许11种字元，分别是0-9和"-",为降低检查错误率，可使用两位的检验码。 
 * Code39条码字符集包括数字 、大写字母以及- . $ / + %等字符,通常运用于资产管理、会员卡、店内码管理、产品卷标
 * Code 39 Extended 这是一个扩展版本，支持完整的ASCII字符集的Code39条码。如果有一个要求使用Code39条码以外的数字和大写字母字符，然后这是推荐的条码。这是基于Code39条形码，这也是非常简单和容易使用
 * Code93条码 是 full ASCII 模式，可使用ASCII全部128个字符。
 * Code128A 字符集 包括大写字母、数字、常用标点符号和一些控制符。
 * Code128B字符集 包括大小写字母、数字、常用标点符号。
 * Code128C字符集 为纯数字序列
 * Code128Auto 是将上述三种字符集最佳优化组合。
 * EAN13商品条码 是纯数字，而且位数是12位，最后一位为校验码，组成13位数字。主要用于各种商品零售行业包装印刷
 * EAN8商品条码 是纯数字，而且位数是7位，最后一位为校验码，组成8位数字。主要用于各种商品零售行业包装印刷。
 * GS1-128 (EAN-128) 是由UPC/EAN指定代表意义规则的128码，编码方式同code128条码。
 * ISBN条码：ISBN是“国际标准书号”类型是基于EAN-13,主要用于出版物书籍类产品。
 * 交叉25码（Interleaved 2 of 5），常用于物流管理，字符集仅为数字且个数为偶数,为奇数将自动在前面加"0"。
 * MSI条形码 必须是纯的数字0-9，带有一位检验码。主要使用在图书馆和零售应用中。在MSI字体中，使用圆括号来表示开始和结束字符。
 * UPC-A条码 商品条码是纯数字，而且位数是11位，在编码过后外加一位校验码，组成12位数字,主要在美国和加拿大使用。
 * UPC-E条码 商品条码是纯数字，是由UPC-A缩减而成，位数是7位，而且首位必须为0，在编码过后外加一位校验码，组成8位数字。
 * UPC E 2 Digits 特性同 UPC-A，后面附加之2码条形码通常使用于价格用途。
 * UPC-E 5 digits 特性同 UPC-A，后面附加之5码条形码通常使用于价格用途
 * POSTNET (邮政数字编码技术)条形码用来对美国邮件代码进行编码,由5位或9位或11位数字组成
 * Intelligent Mail 这是“智能邮件”是指美国邮政为国内邮递服务提供的服务条码，你可以提供5位数字（邮政编码）9位数字（邮政编码+ 4代码）11位数字（邮政编码+ 4代码+ 2位数字）
 */
const props = defineProps({
  value:{
    type:String,
    required:true
  },
  options:{
    type:Object
  }
})
const cts = ref()
onMounted(() => {
  JsBarcode(cts.value,props.value,props.options)
})

</script>
<style lang="scss" scoped>
</style>
