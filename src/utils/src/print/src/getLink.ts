import { nodeForEach } from './utils'

// 复制原dom所有link标签
export function getLink() {
  let arr=[]
   nodeForEach(document.querySelectorAll('link'), item=>{
    if (item.href.indexOf('.css') >= 0) {
      let link = document.createElement('link');
      link.href =item.href
      link.type='text/css'
      arr.push(link)
    }
  });
  return arr
}
