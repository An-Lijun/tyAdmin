import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'

export default function createPlugins(isBuild: boolean, env: any):Array<any>{
  
  const plugins: any[] = [vue()]

  plugins.push(
    createHtmlPlugin({
      // 生成html模板
      minify: true,
      entry: 'src/main.ts',
      template: './index.html',
    })
  )

  return plugins;
}