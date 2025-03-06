// src/router/generateRoutes.js
// 动态导入组件
// 递归生成路由
import {router} from "./index";
function capitalizeFirstLetter(str) {
  return str.replace(/^./, function(match) {
      return match.toUpperCase();
  });
}


const getPath=(path)=>{
  const pathArr = path.split('/')
  return pathArr[0]+ capitalizeFirstLetter(pathArr[1])
}

const generateRoutes = (menuData,basePath='') => {
  let res= menuData.map(item => {
    const path = item.path.includes('/')?  getPath(item.path):item.path
    const route = {
      path: `${path}`,
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
      route.component=() => import(`${basePath?'../views/' +basePath+'/'+item.path:'../views/' +item.path}.vue`)
    }
    router.addRoute('home',route)

    return route;
  });
  
  return res
};

export default generateRoutes;