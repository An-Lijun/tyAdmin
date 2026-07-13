import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import createPlugins from './config/vitePlugin';

export default defineConfig((options) => {
  const env = loadEnv(options.mode, process.cwd())
  
  const alias = [
    {
      find: '@',
      replacement: resolve(__dirname, 'src'),
    },
  ]

  if (env.VITE_AUTO_COMPONENT !== 'NodeModules') {
    alias.push(
      {
        find: /^toyar-design$/,
        replacement: resolve(__dirname, 'toyar/dist/index.js'),
      },
      {
        find: /^toyar-design\/dist\/index\.js$/,
        replacement: resolve(__dirname, 'toyar/dist/index.js'),
      },
      {
        find: /^toyar-design\/dist\/toyar-design\.css$/,
        replacement: resolve(__dirname, 'toyar/dist/toyar-design.css'),
      }
    )
  }

  return {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html')
        }
      },
    },
    resolve: {
      alias,
    },
    css: {
      // postcss 配置
      postcss: {
        plugins: [
          // autoprefixer,//自动加浏览器前缀
        ]
      }
    },
    server: {
      // host:'0.0.0.0' ,//ip地址
      port: 8088, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      proxy: {
        // 本地开发环境通过代理access接口
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      optimizeDeps: {
        // 强制预构建 pdfjs-dist，解决 Vite 解析问题
        include: ['pdfjs-dist']
      },
    },
    plugins: createPlugins(options)
  }
})
