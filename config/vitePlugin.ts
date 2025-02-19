import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import Pages from 'vite-plugin-pages';

export default function createPlugins(isBuild: boolean, env: any):Array<any>{
  
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
      exclude: ['**/components/*.vue'] // 排除某些文件
    }),
  ]
  )

  return plugins;
}