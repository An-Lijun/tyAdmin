import type { Router} from 'vue-router';
import useUserStore from '@/store/modules/user'


// Don't change the order of creation
export default function installRouterGuard(router: Router) {
  createPageGuard(router)
}

function createPageGuard(router: Router){
  const userStore =useUserStore()
  
  router.beforeEach((to) => {
    if (
      !userStore.token&& to.fullPath !=='/login'
    ) {
      // 将用户重定向到登录页面
      return { name: 'Login' }
    }
    return true
  })
}