
/**
 * 根据模板返回html 模板
 * 
 * @param {Selecter | HtmlString} source 
 * @param {*} data object
 * @returns 
 */

export function genTemplate(temp,data){
  // let temp = document.querySelector(source)?.innerHTML|| source
  let pattern = /{{\s*([a-zA-Z]+)\s*(\|{2}|\|{0})\s*(.*)\s*}}/;
  while (pattern.exec(temp)) {
    let pattResult = pattern.exec(temp) || [/ /, ''];
    let temp1 =pattResult[3]
    if(temp1 && temp1.startsWith('"') || temp1.startsWith("'")){
      temp1 = temp1.slice(1,-1)
    }else{
      temp1= data[temp1]
    }
    temp = temp.replace(pattResult[0], data[pattResult[1]]|| temp1);
  }
  return temp;
}