import { defineStore } from 'pinia';
// @ts-ignore
export default defineStore('useAppStore', {
  state: () => ({
    // 用户信息
    isFold: false, // 是否折叠
    pColor:'#165dff',// 主题色
    pColors:[], // 主题色 色阶
    tColors:[], // 次级色 色阶
    sColors:[], // 三级色 色阶
    isBlackModel:false, // 黑白模式
    isTritanopeModel:false, // 三色色盲模式
    themeState:1, // 主题状态 (1:暗黑模式 2:明亮模式)
    layout:2 // 布局模式
  }),
  persist: {
    enabled: true,// 开启持久化
  }
})
