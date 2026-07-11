import { defineStore } from 'pinia'
import { generateColor, TyColor } from 'toyar-design/dist/index.js'
const pcolor = TyColor('#165dff') // 十六进制

// @ts-ignore
export default defineStore('useAppStore', {
  state: () => ({
    // 用户信息
    isFold: false, // 是否折叠
    pColor: '#165dff', // 主题色
    pColors: generateColor('#165dff', { list: true }).slice(2, 9) || [], // 主题色 色阶
    tColors:
      generateColor(pcolor.rotate(-15).hex(), { list: true }).slice(2, 9) || [], // 次级色 色阶
    sColors:
      generateColor(pcolor.rotate(15).hex(), { list: true }).slice(2, 9) || [], // 三级色 色阶
    isBlackModel: false, // 黑白模式
    isTritanopeModel: false, // 三色色盲模式
    themeState: 1, // 主题状态 (1:暗黑模式 2:明亮模式)
    layout: 2, // 布局模式
    loading: false
  }),
  actions: {
    setPrimaryColor (color: string) {
      const pcolor = TyColor(color) // 十六进制
      this.pColor = color
      this.pColors = generateColor(color, { list: true }).slice(2, 9)
      this.tColors = generateColor(pcolor.rotate(-15).hex(), {
        list: true
      }).slice(2, 9)
      this.sColors = generateColor(pcolor.rotate(15).hex(), {
        list: true
      }).slice(2, 9)
    }
  },
  persist: {
    enabled: true // 开启持久化
  }
})
