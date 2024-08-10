/**
 * 
 * https://juejin.cn/post/7133405853746462734#heading-23
 * https://code.google.com/archive/p/crypto-js/ 
 * 
 */


const worker = new Worker(new URL('./src/worker.ts',import.meta.url), { type: "module" })

export const encrypt = (arr)=>{
   return new Promise(resolve=>{
      worker.onmessage = e=>{
         resolve(e.data);
      }
      worker.postMessage(JSON.stringify(arr))
   })
}
