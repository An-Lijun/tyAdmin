
/**
 * 根据模板返回html 模板
 * 
 * @param {Selecter | HtmlString} source 
 * @param {*} data object
 * @returns 
 */

/**
 * 根据模板返回html模板
 * 
 * @param {Selecter | HtmlString} source 
 * @param {Object} data 
 * @returns {String} 渲染后的HTML字符串
 */
export function genTemplate(source, data) {
  // 如果source是选择器，则获取对应元素的innerHTML，否则直接使用source
  let temp = typeof source === 'string' && source.trim().startsWith('<') 
    ? source 
    : document.querySelector(source)?.innerHTML || source;
  
  // 改进的正则表达式：匹配 {{ variable || "default" }} 格式
  const pattern = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(\|\|\s*(['"])((?:\\.|[^\\])*?)\4)?\s*}}/g;
  
  return temp.replace(pattern, (match, variable, hasDefault, quote, defaultValue) => {
    // 检查变量是否存在于data中
    if (data.hasOwnProperty(variable)) {
      return data[variable];
    }
    
    // 如果有默认值，返回默认值
    if (hasDefault) {
      return defaultValue.replace(/\\(['"])/g, '$1'); // 处理转义的引号
    }
    
    // 变量不存在且无默认值，返回空字符串或保留原始标签
    return ''; // 或者保留原始标签: match
  });
}