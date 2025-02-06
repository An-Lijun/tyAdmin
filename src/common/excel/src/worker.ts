import XLSX from 'xlsx-js-style'


function getWorkSheet(data) {
    
    if (data.type === 'array') {
        return XLSX.utils.aoa_to_sheet(data.data);
    }

    if (data.type === 'json') {
        return XLSX.utils.json_to_sheet(data.data);
    }
}

self.addEventListener('message', ({ data:orData }) => {
   console.log(orData);
    
    let data = JSON.parse(orData);
    let workSheet = getWorkSheet(data)

    if (data.handler) {
        const func = new Function('return ' + data.handler)();
        // 执行函数并输出结果
        func(workSheet)
    }
    
    self.postMessage(JSON.stringify(workSheet))

})