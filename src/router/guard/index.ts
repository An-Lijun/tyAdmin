import type { Router } from 'vue-router';
import useUserStore from '@/store/modules/user'
import useAppStore from '@/store/modules/app'
import useMenuStore from '@/store/modules/menu'
import generateRoutes from '@/router/generateRoutes'

let isDynamicRoutesLoaded = false

export default function installRouterGuard(router: Router) {
  createPageGuard(router)
}

function createPageGuard(router: Router) {

  const appStore = useAppStore()
  router.beforeEach((to) => {
    const userStore = useUserStore()
    const menuStore = useMenuStore()

    if (appStore) {
      appStore.loading = true
    }
    
    if (!userStore.token && to.fullPath !== '/login') {
      return { name: 'login' }
    }
    
    if (userStore.token && !isDynamicRoutesLoaded) {
      const persistedMenu = menuStore.menu
      if (persistedMenu && persistedMenu.length > 0) {
        generateRoutes(persistedMenu)
        isDynamicRoutesLoaded = true
        return { path: to.fullPath, replace: true }
      }
    }
    
    return true
  })
  router.afterEach(() => {
    if (appStore) {
      appStore.loading = false
    }
  })
}