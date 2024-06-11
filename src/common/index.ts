
//这里为什么是 ../ 因为这里import.meta.url 这里是根据文件来的,所以默认这里是 http://xxx:xxx/src/common
//这里为了统一所以../配置公共路径
export function getAsset(imgUrl:string) {
  return new URL('../'+imgUrl, import.meta.url).href;
}

export function openWindow(url,option={}){

  //const windowFeatures = "left=100,top=100,width=320,height=320";
  const {
    target = '_self', //_self、_blank、_parent 和 _top。 mozillaWindow
    popup = true,
    top,
    left,
    width,
    height,
    noreferrer,
    noopener
  } = option

  let windowFeatures =`popup=${popup},left=${left},top=${top},
  width=${width},height=${height},noreferrer:${noreferrer},noopener:${noopener}`

 return window.open(url, target, windowFeatures.slice(0,-1))
  
}





// export function  numberAnimation({  number, s }) {
//   let handle, //句柄
//     content = 0; //内容
//     let time = number / (s * 60); //秒数
//   //requestAnimationFrame 每秒大约60帧 就是每秒的执行次数 所以这里  *60
//   // number / (s * 60) 每一次执行 需要相加的大小
//   let fn = () => {
//     if (number - time <= content) {
//       //number - time  因为精度问题 最后一次执行 不一定满足 === number
//       cancelAnimationFrame(handle);
//       content = number;
//     } else {
//       content += time;
//       handle = requestAnimationFrame(fn);
//     }
//     return content
//     // variable.value= parseInt(content)
//     // dom.innerText = parseInt(content);
//     //取整 
//   };
//   requestAnimationFrame(fn);
// }
// // numberAnimation({
// //   number: 20,
// //   s: 2
// // })