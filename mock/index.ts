//  mockProdServer.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// 获取当前文件的绝对路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件所在的目录
const __dirname = dirname(__filename);

let mocks = [];

// 异步读取文件夹
fs.readdir(path.resolve(__dirname,'./src'), (err, files) => {
  if (err) {
      console.error('读取文件夹时出错:', err);
      return;
  }

  // 过滤出 .js 文件
  const jsFiles = files.filter(file => path.extname(file) === '.js');
// 要读取的文件夹路径
  // const folderPath = './src';
  // 遍历 .js 文件并读取内容
  jsFiles.forEach(async file => {
      // const filePath = path.join(folderPath, file);
      
      const module = await import('file://'+path.resolve(__dirname,`./src/${file}`));
      
      // 检查是否有 default 导出
      if (module.default) {
          // 将 default 导出的对象添加到数组中
          mocks.push(module.default);
      }
  });
});

export default mocks