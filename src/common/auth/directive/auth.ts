// import { useAppStore } from '@/store/modules'

type bindingType ={
  value:string
}

type rolesType=Array<string>

type authItemType={
  name:string,
  authority:rolesType
}


/**
 * 一个权限校验指令
 * @param el
 * @param binding
 * 
 * @example
 * v-auth="'10000-button-add'"
 */

export default {
  created (el:Element, binding:bindingType) {
    const roleIds:rolesType =  []
    // localStorage.getItem('roleIds').split(',') ||
    // const appStore = useAppStore()
    const appStore ={
      auths:[]
    }
    const { value } = binding

    if (value) {
      const auths = appStore.auths as Array<authItemType>
      if (auths.length > 0) {
        const currentAuth = auths.find((auth) => auth.name === value) as authItemType
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
