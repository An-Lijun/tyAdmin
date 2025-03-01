import { defineStore } from 'pinia';
// @ts-ignore
export default defineStore('useUserStore', {
  state: () => ({
    // 用户信息
    userInfo: null, // 用户信息
    // token 
    token: "", // token
    // 权限列表
    roleList: [], // 权限列表
    // 超时时间
    sessionTimeout: false, // 超时时间
    // Last fetch time
    lastUpdateTime: 0, // 最后更新时间
  }),
  persist: {
    enabled: true,
  }
})
