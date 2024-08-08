/**
 *  工具函数
 *  自动将/lang/xxx/index 文件下
 *  export default的文件进行导出,合并成vue-i18n需要的数据格式
 *   export default {
 *      userNm:{
 *        zh:'牛',
 *        en:'niu'
 *      }
 *   }
 * 
 */

function injectLangs(){
  //获取文件夹下的对象列表
  const modules = import.meta.glob('./*/index.ts', { eager: true });
  const messages ={}
  
  for (const key in modules) {
    //获取其中一个对象
    let module =modules[key].default
    if(!module){
      console.error(`${key} not has export default`)
    }
    for (const constant in module) {
        //constant 这个是语言模块
        let constantVal = module[constant]
        for (const lang in constantVal) {
            if(Reflect.has(messages,lang)){
              messages[lang][constant] = constantVal[lang]
            }else{
              messages[lang] ={
                [constant]:constantVal[lang]
              }
            }
        } 
    } 
  }
  return messages
}

export default injectLangs()