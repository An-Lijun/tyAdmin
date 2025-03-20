import { defineConfig } from 'vite'
import { resolve } from 'path'
import createPlugins from './config/vitePlugin';

// https://vitejs.dev/config/
export default defineConfig((options)=>{
  return{
    build:{
      rollupOptions:{
        input:{
          index:resolve(__dirname,'src/i.html')
        }
      },
    },
    resolve: {
      // 路径别名
      alias: [
        // @/xxxx => src/xxxx
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
      ],
    },
    css: {
      // postcss 配置
      postcss: {
        plugins: [
          // autoprefixer,//自动加浏览器前缀
        ]
      }
    },
    server:{
      // host:'0.0.0.0' ,//ip地址
      port: 80, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      proxy:{
        // 本地开发环境通过代理access接口
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: createPlugins(options)
  }
})
