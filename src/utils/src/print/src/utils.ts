
export function createDom(htmlStr) {
  let div = document.createElement('div')
  div.innerHTML = htmlStr
  return div.childNodes[1]
}

export function getStringType(value) {
  return Object.prototype.toString.call(value).toLowerCase();
}

export function is(value, type) {
  return getStringType(value) === `[object ${type.toLowerCase()}]`;
}

export function nodeForEach(nodeLs,fn){
  [].forEach.call(nodeLs,fn)
}


export function nodeReduce(nodeLs,fn,origin){
  return [].reduce.call(nodeLs,fn,origin) 
}