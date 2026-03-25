// src/router/generateRoutes.js
import { router } from './index'

/**
 * 首字母大写工具
 */
const capitalizeFirstLetter = str => str?.charAt(0).toUpperCase() + str.slice(1) || ''

/**
 * 格式化路由路径：/user/list → userList
 */
const formatRoutePath = path => {
  if (!path.includes('/')) return path
  const [first, second] = path.split('/').filter(Boolean)
  return first + capitalizeFirstLetter(second)
}

/**
 * 递归生成路由并自动注册到 VueRouter
 * @param {Array} menuData 菜单数据
 * @param {String} parentPath 父级路径（用于拼接组件目录）
 */
const generateRoutes = (menuData = [], parentPath = '') => {
  return menuData.map(item => {
    // 路由基础配置
    const route = {
      path: formatRoutePath(item.path),
      name: item.path,
      meta: {
        label: item.label,
        icon: item.icon || '',
        type: item.type || ''
      }
    }

    // 重定向
    if (item.redirect) route.redirect = { name: item.redirect }

    // 递归子路由
    if (item.children?.length) {
      route.children = generateRoutes(item.children, item.path)
    }
    // 动态导入组件（叶子节点）
    else {
      const componentPath = parentPath
        ? `../views/${parentPath}/${item.path}.vue`
        : `../views/${item.path}.vue`
        
      route.component = () => import(/* @vite-ignore */componentPath)
    }

    // 挂载到父路由 home
    router.addRoute('home', route)
    return route
  })
}

export default generateRoutes