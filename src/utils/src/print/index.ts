import { getContainer } from './src/getContainer'
import getIframe from './src/getIframe'
import { getPackageBody } from './src/getPackageBody'



/**
 * printerJs  参考 print-nb jQuery-print printJs 并做了自己的处理
 * @param el 
 * 支持类型
 * 1. selecter (目前只支持 class和id)  当为选择器时默认copy原dom 的所有样式也可以通过option的 custStyle进行自定义(注意权重)
 * 2. html 字符串 此时认为这个是完全自定义打印不会copy原dom的样式
 * 3. node节点 copy原dom 的所有样式 
 * 4. tableObject{ column, data} column与antdesignTable组件的属性保持一致 并且弹出table列选择打印弹窗 并且有table自己的默认样式 
 * 5. htmlTemplate 将整个html作为文本模板传入,在options中传递data作为数据来源 特殊语法 {{data}} 在模板里面动态显示数据(注意style 和 结构都要写在body上不然不生效)
 * 
 * 
 * 未来要支持 
 *    http 链接
 *    data:base64
 *    pdf
 *    excel
 * @param options  用于自定义打印页眉页脚 自定义样式
 * header 用于配置页眉 不传则不生成页眉
 * footer 用于配置页脚 不传则不生成页脚
 * custStyle传递Style 用于自定义css
 * data 用于传递 htmltemplate 的动态值
 * waterMark 用于显示打印水印
 * 
 * 目前暂时未解决 页脚生成页数信息问题
 */

interface Ioptions {
  header?: string,
  footer?: string,
  custStyle?: string,
  data?: object,
  waterMark?: string,
  beforePrint?:Function,
  afterPrint?:Function
}
import { createWaterMark } from './src/createWatermark'

export default async function print(el, options: Ioptions = {
  header: '',
  footer: '',
  custStyle: '',
  waterMark: '',
  beforePrint:()=>{},
  afterPrint:()=>{},

}) {

  const { iframe, iframeDoc } = getIframe()
  const { style, link, selfStyle, body } = await getContainer(el, options.custStyle, options.data)
  

  //创建一个文档片段，此时还没有插入到DOM树中
  const frag = document.createDocumentFragment()
  link?.forEach(link=>{
    frag.appendChild(link)
  })
  style && frag.appendChild(style)
  selfStyle && frag.appendChild(selfStyle)

  iframeDoc.head.appendChild(frag)
  iframeDoc.head.appendChild(selfStyle)
  iframeDoc.body.appendChild(getPackageBody(body, options))
  const html= iframeDoc.querySelector('html')
  html?.setAttribute('toyar-theme', 'light'  )
  if (options.waterMark) {
    createWaterMark(iframeDoc,options.waterMark)
  }

  iframe.contentWindow.addEventListener("beforeprint", (event) => {
    options.beforePrint&& options.beforePrint()
  });
  iframe.contentWindow.addEventListener("afterprint", (event) => {
    
    options?.afterPrint&& options.afterPrint()
    setTimeout(() => {
      document.body.removeChild(iframe)
    });
  });
  
  //这里由于上面代码挂载需要时间所以用延迟执行
  setTimeout(() => {
    iframe.contentWindow.print();
  });
}