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

const viewsModules = import.meta.glob('../views/**/*.vue')

const getComponentMap = () => {
  const map: Record<string, () => Promise<typeof import('*.vue')>> = {}
  for (const path in viewsModules) {
    const relativePath = path.replace('../views/', '').replace('.vue', '')
    map[relativePath] = viewsModules[path]
  }
  return map
}

const componentMap = getComponentMap()

const normalizeMenuPath = (menuPath: string): string => {
  if (menuPath.endsWith('Index')) {
    return menuPath.replace(/Index$/, '/index')
  }
  return menuPath
}

const generateRoutes = (menuData: ApiMenu[] = [], parentPath = ''): RouteRecordRaw[] => {
  const res = menuData
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
        const normalizedPath = normalizeMenuPath(item.path)
        const fullPath = parentPath
          ? `${parentPath}/${normalizedPath}`
          : normalizedPath
        
        const component = componentMap[fullPath]
        if (component) {
          route.component = component
        }
      }

      router.addRoute('home', route)
      return route
    })

  return res
}

export default generateRoutes