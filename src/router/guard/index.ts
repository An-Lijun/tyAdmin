import type { Router } from 'vue-router';
import useUserStore from '@/store/modules/user'
import useAppStore from '@/store/modules/app'

export default function installRouterGuard(router: Router) {
  createPageGuard(router)
}

function createPageGuard(router: Router) {

  const appStore = useAppStore()
  router.beforeEach((to) => {
    const userStore = useUserStore()

    if (appStore) {
      appStore.loading = true
    }
    if (
      !userStore.token && to.fullPath !== '/login'
    ) {
      // 将用户重定向到登录页面
      return { name: 'login' }
    }
    return true
  })
  router.afterEach(() => {
    if (appStore) {

      appStore.loading = false
    }
  })
}