import { getStyle } from './getStyle'
import { getLink } from './getLink'
import { getPrintStyle } from './getPrintStyle'
import { createDom, is } from './utils'
// import { Modal } from 'ant-design-vue'
import { formatDom } from './formatDom'
import { h } from 'vue'
import { nodeTypeArr, tableStyle } from './constant'
import { genTemplate } from './genTemplate'
import { genDialog } from './dialog'
interface Container {
  style?: Node,
  link?: Array<Node>,
  selfStyle?: Node,
  body: Node,
}
// 如果是选择器 或者dom 则尽量使用原来的样式
export function getContainer(el, custStyle, data = {},iframe): Promise<Container> {
  return new Promise((reslove, reject) => {
    if (is(el, 'string')) {

      //若以 . # 开头 如果是则认为是选择器
      if (el.startsWith('.') || el.startsWith('#')) {
        // 这里如果是dom 则需要匹配这个checkbox 
        let dom = document.querySelector(el)
        return reslove({
          style: getStyle(),
          link: getLink(),
          selfStyle: getPrintStyle(custStyle),
          body: formatDom(dom)
        })
      }

      if (el.includes('DOCTYPE')) {

        let inner = el.slice(el.indexOf('<body>') + 6, el.indexOf('</body>'))
        inner = genTemplate(inner, data)

        return reslove({
          selfStyle: getPrintStyle(custStyle),
          body: createDom(inner)
        })
      }

      // 否则认为是 html 字符串
      return reslove({
        selfStyle: getPrintStyle(custStyle),
        body: createDom(el)
      })
    }

    // 如果是OBject 则判断是否为node 是的话直接返回克隆后的节点
    else if (el.nodeType && nodeTypeArr.includes(el.nodeType)) {
      return reslove({
        style: getStyle(),
        link: getLink(),
        selfStyle: getPrintStyle(custStyle),
        body: el.cloneNode(true)
      })
    }

    //则认为这是表格数据
    else if (is(el, 'object') && el.columns && el.data) {

      let filterCoLumns = el.columns.filter(item => item.title !== '操作')
      let selectedVal = filterCoLumns.map(item => item.dataIndex);

      const changeSelected = (value) => {
        if (selectedVal.includes(value)) {
          return selectedVal = selectedVal.filter(item => item !== value)
        }
        selectedVal.push(value)
      }
      const clickOkFn = () => {
        let columns = el.columns.filter(item =>
          selectedVal.includes(item.dataIndex)
        )
        const getBody = () => {
          let str = ''

          const getTrInner = (element) => {
            columns.forEach(item => {
              str += '<td>' + element[item.dataIndex] + '</td>'
            })
          }
          el.data.forEach(element => {
            str += '<tr>'
            getTrInner(element)
            str += '</tr>'
          });

          return str
        }
        let domStr = `
          <table width="100%">
            <thead>
              <tr>
                 ${columns.map(item => `<th> ${item.title}</th>`).join(' ')}
              </tr>
            </thead>
    
            <tbody>
                  ${getBody()}
            </tbody>
          </table>
        `
        reslove(
          {
            selfStyle: getPrintStyle(tableStyle + custStyle),
            body: createDom(domStr)
          }
        )
      }
      genDialog(iframe,filterCoLumns, changeSelected, clickOkFn)



    }

    else {
      reject(new Error(`参数EL格式不支持`))
    }
  })
}