import { defineStore } from 'pinia';
// @ts-ignore
export default defineStore('useUserStore', {
  state: () => ({
    // 用户信息
    userInfo: null,
    // token
    token: "",
    // 权限列表
    roleList: [],
    // 超时时间
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  persist: {
    enabled: true,
  }
})
