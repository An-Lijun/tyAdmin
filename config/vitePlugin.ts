import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import customServerPlugin  from './src/vite-mock-server';
import Pages from 'vite-plugin-pages';
import { viteMockServe } from 'vite-plugin-mock'
import { loadEnv } from 'vite'
export default function createPlugins(options): Array<any> {
  // {                                                                                                  13:22:32
  //   mode: 'development',
  //   command: 'serve',
  //   isSsrBuild: false,
  //   isPreview: false
  // }

  const env = loadEnv(options.mode, process.cwd());

  const plugins: any[] = [vue()]

  plugins.push(
    ...[
      createHtmlPlugin({
        // 生成html模板
        minify: true,
        entry: 'src/main.ts',
        template: './index.html',
      }),
      Pages({
        // 页面文件所在目录，默认为 src/pages
        dirs: 'src/views/system',
        // 支持的文件扩展名
        extensions: ['vue', 'js', 'jsx', 'ts', 'tsx'],
        syncIndex: true,
        importMode: (filepath) => {
          if (filepath.includes('home')) {
            return 'sync';
          }
          return 'async';
        },
        extendRoute(route, parent) {
          if (route.name === 'home') {
            route.path='/'
          }

          return route;
        },
        exclude: ['**/components/*.vue'] // 排除某些文件
      }),
      viteMockServe({
        mockPath: 'mock', // mock文件夹路径
        enable: env.VITE_MOCK_OPEN==="true" && options.mode === 'development'   // 只有开发环境才开启mock
      }),
      customServerPlugin({
        mockPath:'mock', // mock文件夹路径
      })
    ]
  )

  return plugins;
}