import { defineStore } from 'pinia';
// @ts-ignore
export default defineStore('useMenuStore', {
  state: () => ({
    // 用户信息
    activeMenu:''
  }),
  persist: {
    enabled: true,
  }
})
