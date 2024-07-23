// 这里 css 纯文字没有色彩容易写错 抽离成css文件 好处是这样也能使用预处理器了
import basePrintStyleStr from './style/basePrintStyleStr.css?raw'
import tableStyleStr from './style/tableStyleStr.css?raw'

// 默认表格打印样式
export const basePrintStyle =basePrintStyleStr

// 自带的表格样式
export const tableStyle = tableStyleStr


// 1元素节点 3 文本节点 9 文档节点(dom树的根节点)
export const nodeTypeArr = [1, 3, 9];
export const getHeaderTpl = (data) => {
  return `
      <thead class="base-printHeader" style="width:100%">
        <tr style="width:100%"> 
          <td  class="base-printHeader__inner">${data}</td>
        </tr>
      </head>
      `
}

export const getBodyrTpl = (data) => {
  return `
    <tbody class="base-printBody">
      <tr>
        <td width="100%"> 
        ${data}
        </td>
      </tr>  
    </tbody>
     `
}

export const getFooterTpl = (data) => {
  return`
      <tfoot class="base-printFooter" style="width:100%">
        <tr style="width:100%"> 
          <td  class="base-printFooter__inner">${data}</td>
        </tr>
      </tfoot>
      `
}