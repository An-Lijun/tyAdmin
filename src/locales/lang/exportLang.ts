const modules = import.meta.glob('./*/index.ts', { eager: true });

const messages ={}

// 自动将lang下面export default 的文件进行合并导出
function injectLangs(){
  for (const key in modules) {
    if(!modules[key].default){
      console.error(`${key} not has export default`)
    }
    let module =modules[key].default
    for (const constant in module) {
        // if(messages)
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
}
injectLangs()
export default messages