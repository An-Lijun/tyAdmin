// 索引签名是string
interface option {
  [key: string]: any
}


/**
 * 
 * @param url 资源相对路径
 * @returns   资源的绝对路径
 * 这里为什么是 ../ 因为这里import.meta.url 这里是根据文件来的,
 * 所以默认这里是 http://xxx:xxx/src/common 这里为了统一所以../配置公共路径
 * 
 */
export function getAssetURL(url: string) {
  return new URL('../' + url, import.meta.url).href;
}



//const windowFeatures = "left=100,top=100,width=320,height=320";
// const {
//   target = '_self', //_self、_blank、_parent 和 _top。 mozillaWindow
//   popup = true,
//   top,
//   left,
//   width,
//   height,
//   noreferrer,
//   noopener
// } = option


/**
 * 
 * @param url  url 地址 
 * @param option option 配置
 * @returns   window.open 返回的window对象
 * 
 * 打开浏览器window 窗口在当天/新的窗口打开
 * 或者使用模态化 打开新的窗口
 * 
 */
export function openWindow(url: URL, option: option = { target: '_self' }) {
  let windowFeatures = '';
  for (const key in option) {
    if (Object.prototype.hasOwnProperty.call(option, key) && key !== 'target') {
      windowFeatures += `${key} = ${option[key]},`
    }
  }
  return window.open(url, option.target || '_self', windowFeatures.slice(0, -1))
}


export function numberAnimation({ number, s }) {
  let handle, //句柄
    content = 0; //内容
  let time = number / (s * 60); //秒数
  //requestAnimationFrame 每秒大约60帧 就是每秒的执行次数 所以这里  *60
  // number / (s * 60) 每一次执行 需要相加的大小
  let fn = () => {
    if (number - time <= content) {
      //number - time  因为精度问题 最后一次执行 不一定满足 === number
      cancelAnimationFrame(handle);
      content = number;
    } else {
      content += time;
      handle = requestAnimationFrame(fn);
    }
    return content
    //取整 
  };
  requestAnimationFrame(fn);
}
