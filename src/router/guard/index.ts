import type { Router } from 'vue-router';
import useUserStore from '@/store/modules/user'
import useAppStore from '@/store/modules/app'

export default function installRouterGuard(router: Router) {
  createPageGuard(router)
}

function createPageGuard(router: Router) {
  const appStore = useAppStore()
  
  router.beforeEach((to, from) => {
    const userStore = useUserStore()

    if (!userStore.token && to.fullPath !== '/login') {
      return { name: 'login' }
    }
    
    if (appStore && to.fullPath !== '/login') {
      appStore.loading = true
    }
    
    return true
  })
  
  router.afterEach((to) => {
    if (appStore) {
      appStore.loading = false
    }
  })
  
  router.onError((error) => {
    if (appStore) {
      appStore.loading = false
    }
    console.error('Navigation error:', error)
  })
}