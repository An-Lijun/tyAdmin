const worker = new Worker(new URL('./src/worker.ts',import.meta.url), { type: "module" })
import XLSX from 'xlsx-js-style'

export const handleExcel = (baseData)=>{
   
   return new Promise(resolve=>{
      worker.onmessage = ({data})=>{
         
         const workBook = XLSX.utils.book_new()
         XLSX.utils.book_append_sheet(workBook, JSON.parse(data), 'Sheet1')

         XLSX.writeFile(workBook, baseData.fileNm)
         resolve(data);
      }
      if(baseData.handler){
         baseData.handler = baseData.handler.toString()
      }
      worker.postMessage(JSON.stringify(baseData))
   })
}

export const handleExcelTable = (elt, opts)=>{
   let workSheet =  XLSX.utils.table_to_sheet(elt, opts);
   const workBook = XLSX.utils.book_new()
   XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1')
   XLSX.writeFile(workBook, opts.fileNm)
}