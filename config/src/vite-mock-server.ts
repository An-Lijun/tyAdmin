// vite-mock-server.js
import http from 'http';
import net from 'net';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
import { loadEnv } from 'vite'

const env = loadEnv('development', process.cwd());

// 获取当前文件的绝对路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件所在的目录
const __dirname = dirname(__filename);


function isPortTaken(port, callback) {
    const server = net.createServer();

    server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            callback(true);
        } else {
            console.error('发生其他错误:', err);
            callback(false);
        }
    });

    server.once('listening', () => {
        server.close();
        callback(false);
    });

    server.listen(port, '0.0.0.0');
}


function convertToCamelCase(str) {
    const parts = str.split('/');
    return parts.reduce((acc, part, index) => {
        if (index === 0) {
            return part;
        }
        return acc + part.charAt(0).toUpperCase() + part.slice(1);
    }, '');
}

function writeMockData(params, options) {

    const { url, data, method } = JSON.parse(params)

    let fileName = convertToCamelCase(url)
    let filePath = path.resolve(__dirname, `../../${options.mockPath}/src/${fileName}.js`);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, `export default {
        url: "${url}", // 接口的请求地址
        method: "${method}", // 请求方法
        response: () => {
            return ${JSON.stringify(data)} // 模拟的响应数据
        },
    }`);

    } else {
        console.log('文件已存在');
    }
}

function customServerPlugin(options) {
    return {
        name: 'custom-server-plugin',
        configureServer(server) {

            if(env.VITE_MOCK_OPEN === 'true'){
                isPortTaken(env.VITE_MOCK_PORT, (isTaken) => {
                    if (isTaken) {
                        console.log(`端口 ${env.VITE_MOCK_PORT} 已被占用。`);
                    } else {
                        console.log(`端口 ${env.VITE_MOCK_PORT} 未被占用。`);
                        // 创建自定义 HTTP 服务器
                        const customServer = http.createServer((req, res) => {
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            // 设置允许的请求方法
                            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
                            // 设置允许的请求头
                            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                            // 处理 OPTIONS 请求
                            if (req.method === 'OPTIONS') {
                                // 如果是 OPTIONS 请求，直接返回 200 状态码
                                res.writeHead(200);
                                res.end();
                                return;
                            }
    
                            if (req.method === 'POST' && req.url === '/handleCallFunction') {
                                let body = '';
                                // 监听 data 事件，逐块读取请求体数据
                                req.on('data', (chunk) => {
                                    body += chunk.toString();
                                });
                                // 监听 end 事件，当请求体数据读取完毕时触发
                                req.on('end', () => {
                                    try {
                                        // 尝试解析请求体数据为 JSON 对象
                                        writeMockData(body, options)
                                        // 设置响应头，指定响应内容为 JSON 格式
                                        res.writeHead(200, { 'Content-Type': 'application/json' });
                                        // 发送响应数据
                                        res.end(JSON.stringify({ result: 'success' }));
                                    } catch (error) {
                                        // 若解析请求体数据出错，返回 400 错误响应
                                        console.log(error);
                                        res.writeHead(400, { 'Content-Type': 'application/json' });
                                        res.end(JSON.stringify({ error: 'Invalid JSON data in request body' }));
                                    }
                                });
                            }
                        });
                        // 启动自定义服务器
                        customServer.listen(8866, () => {
                            console.log(`Custom server is running on port ${env.VITE_MOCK_PORT}`);
                        });
                        // 在 Vite 服务器关闭时关闭自定义服务器
                        server.httpServer.on('close', () => {
                            customServer.close();
                        });
                    }
                });
            }
        },
    };
}
export default customServerPlugin;

