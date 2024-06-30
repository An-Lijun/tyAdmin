import { defineStore } from 'pinia';
// @ts-ignore
export default defineStore('useAppStore', {
  state: () => ({
    // 用户信息
    isFold: false,
  }),
  persist: {
    enabled: true,
  }
})
