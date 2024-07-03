import { defineStore } from 'pinia';
// @ts-ignore
export default defineStore('useAppStore', {
  state: () => ({
    // 用户信息
    isFold: false,
    pColor:'#165dff',
    pColors:[],
    isBlackModel:false,
    isTritanopeModel:false,
    isDark:false,
    layout:2
  }),
  persist: {
    enabled: true,
  }
})
