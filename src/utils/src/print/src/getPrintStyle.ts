import { basePrintStyle } from "./constant";

// 用于生成打印样式的函数(打印默认样式 自定义样式)
export function getPrintStyle(custStyle):Node {
  const style = document.createElement('style');
  style.media = 'print';
  let str = basePrintStyle + custStyle
  style.innerText= str.replaceAll('\n','')
  return style
}