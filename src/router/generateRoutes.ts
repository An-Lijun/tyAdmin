import type { RouteRecordRaw } from 'vue-router'
import { router } from './index'

export interface ApiMenu {
  id: number
  label: string
  path: string
  parentId: number
  menuOrder: string
  status: string
  icon: string
  type: 'subMenu' | 'menu'
  redirect: string
  children?: ApiMenu[]
}

interface MenuRouteMeta {
  label: string
  icon: string | null
  type: string
}

const generateRoutes = (menuData: ApiMenu[] = [], parentPath = ''): RouteRecordRaw[] => {
  return menuData
    .filter(item => item.status === '1')
    .map(item => {
      const route: RouteRecordRaw = {
        path: item.path,
        name: item.path,
        meta: {
          label: item.label,
          icon: item.icon || null,
          type: item.type || ''
        } as MenuRouteMeta
      }

      if (item.redirect) route.redirect = { name: item.redirect }


      if (item.children?.length) {
        route.children = generateRoutes(item.children, item.path)
      } else {
        const componentPath = parentPath
          ? `../views/${parentPath}/${item.path}.vue`
          : `../views/${item.path}.vue`
        route.component = () => import(/* @vite-ignore */componentPath)
      }

      router.addRoute('home', route)
      console.log(route)
      return route
    })
}

export default generateRoutes