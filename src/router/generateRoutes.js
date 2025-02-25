// src/router/generateRoutes.js
// 动态导入组件
const loadComponent = (path) => {
  return () => import(`${path}.vue`)
};

// 递归生成路由
const generateRoutes = (menuData,basePath='') => {
  let res= menuData.map(item => {
    const route = {
      path: `${item.path}`,
      name: item.path,
      label: item.label,

      icon: item.icon||"",
      type: item.type||""
    };
    

    if (item.children) {
      route.children = generateRoutes(item.children,item.path);
      if (item.redirect) {
        route.redirect = {
          name: item.redirect
        };
      }
    }else{
      let data = basePath?'../views/' +basePath+'/'+item.path:'../views/' +item.path
      route.component=loadComponent(data)
    }

    return route;
  });
  
  return res
};

export default generateRoutes;