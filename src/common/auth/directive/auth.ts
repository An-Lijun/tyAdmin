// import { useAppStore } from '@/store/modules'
export default {
  created (el, binding) {
    const roleIds = localStorage.getItem('roleIds').split(',') || []
    // const appStore = useAppStore()
    const appStore ={
      auths:[]
    }
    const { value } = binding

    if (value) {
      const auths = appStore.auths
      if (auths.length > 0) {
        const currentAuth = auths.find((auth) => auth.name === value)
        const hasPermission = currentAuth.authority.some((id) => roleIds.includes(id))
        if (!hasPermission) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
    } else {
      throw new Error(`need roles! Like v-auth="10000-button-add"`)
    }
  }
}
