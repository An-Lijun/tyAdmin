import { nodeReduce } from "./utils";

export function getStyle() {
  const domStyle = document.styleSheets;
  const style = nodeReduce(domStyle, (style, sty) => {
    let str = ''
    let rules = sty?.cssRules || sty?.rules;
    try {
      for (let index = 0; index < rules.length; index++) {
        str += rules[index].cssText;
      }
      return str + style
    } catch (error) {
      console.error(sty?.href + error);
    }
  }, '')

  let styleDom = document.createElement('style')
  styleDom.innerText = style
  return styleDom
}