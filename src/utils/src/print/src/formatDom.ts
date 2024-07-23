
import { nodeForEach } from "./utils";
// 用于对特殊标签内容进行展示

export function formatDom(originalDom) {

  //dom = dom.cloneNode(true) 这里使用cloneNode 不会克隆自定义属性 如vue 对 v-model select 的 selectedIndex 所以这里使用克隆+单独处理
  // 这里因为cloneNode 的自定义属性取不到 我们不能更改原来dom 所以这里需要遍历

  const dom = originalDom.cloneNode(true)

  //获取真实dom 和clone dom 的 所有 input select textarea
  const orCopiedInputs = originalDom.querySelectorAll('input,select,textarea');
  const copiedInputs = dom.querySelectorAll('input,select,textarea');

  //获取 真实dom和clone dom 的canvas
  let canvasList = dom.querySelectorAll('canvas');
  let orCanvasList = originalDom.querySelectorAll('canvas');


  // 处理input 主要是 input select radio checbox textarea
  nodeForEach(copiedInputs, (item, i) => {

    let orCopiedInput = orCopiedInputs[i];
    let copiedInput = copiedInputs[i];

    let tagNm = item.tagName  // checkbox radio input  text
    let typeInput = item.getAttribute('type')

    // textarea select
    if (!typeInput) {
      typeInput = tagNm === 'SELECT' ? 'select' : tagNm === 'TEXTAREA' ? 'textarea' : ''
    }

    // 处理input框 主要是 radio checkbox input
    if (tagNm === 'INPUT') {
      // 如果是 radio checkbox 勾选
      // 因为v-model 绑定 inputcheckbox 时候不是checked 这里加进去
      if (['radio', 'checkbox'].includes(typeInput)) {
        copiedInput.setAttribute('checked', item.checked);
      } else {
        // 否则直接当做input 因为v-model 绑定 input 时候value没值 这里加进去
        copiedInput.value = item.value;
        copiedInput.setAttribute('value', item.value);
      }
    }
    
    // 处理select
    else if (typeInput === 'select') {
      // let options = copiedInput.querySelectorAll('option')
      // let selectedIndex = -1
      // 这里 vue 使用的是selectedIndex 如果是 多选则需要使用selectedOptions 所以这里优化了
      //   selectedIndex = copiedInput.selectedIndex
      //   copiedInput.options[selectedIndex].setAttribute('selected', true);
      let orSelectedArr = orCopiedInput.selectedOptions
      let orLen = orSelectedArr.length
      let valueArr = []
      for (let index = 0; index < orLen; index++) {
        valueArr.push(orSelectedArr[index].value)
      }
      let selectedArr = copiedInput.options
      let len = selectedArr.length
      for (let index = 0; index < len; index++) {
        let option = selectedArr[index]
        if (valueArr.includes(option.value)) {
          option.setAttribute('selected', true)
        }
      }

    }
    else if (typeInput === 'textarea') {
      // 处理textarea
      copiedInput.innerHTML = item.value;
      // copiedInput.setAttribute('html', item.value);
    }
  })


  // 处理所有canvas
  nodeForEach(orCanvasList, (orItem, i) => {
    let _parent = canvasList[i].parentNode
    let item = canvasList[i]
    // 替换克隆后的canvas节点为背景图 
    if (item.tagName.toLowerCase() === 'canvas') {
      let div = document.createElement('div')
      div.style.cssText = orItem.style.cssText
      div.style.display = 'inline-block'
      div.className = orItem.className
      div.style.background = `url(${orItem.toDataURL()})`
      div.style.backgroundSize = `100% 100%`
      _parent.replaceChild(div, item)

    } else {
      item.style.display = 'block'
    }
  })

  return dom
}