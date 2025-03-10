<template>
  <TyMenu theme="rDesign" @open="handleOpenMenu" :isFold="appStore.isFold" style="width: unset" v-model="menuStore.activeMenu"
    :option="routerTransMenu(pageRoute, '')"
    @click="handleOpenMenu"
  >
    <template #header>
      <div style="
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        ">
        <svgIcon icon="logov3" v-if="appStore.isFold" style="
            position: relative;
            transform: scale(0.5);
        "  /> 
        <div v-else class="logoContainer">
          <svgIcon icon="logov3"  style="
          transform: scale(0.5);
        "  />
          <span class="logoNm">
            ToyarAdmin
          </span>
        </div>
      </div>
    </template>
  </TyMenu>
</template>
<script setup>
import svgIcon from '@/components/svgIcon.vue'
import { ref } from 'vue'
import useAppStore from '@/store/modules/app'
import useMenuStore from '@/store/modules/menu'
import { pageRoute } from '@/router/index'
const menuStore = useMenuStore()
const appStore = useAppStore()
function routerTransMenu(menuLs, pPath) {
  const getMenuPath = (pPath, path) => {
    if (!pPath) {
      return path
    }
    return pPath + '/' + path
  }
  const getMenuItem = (item) => {

    let obj = {
      label: item.label,
      type: item.type,
      path: getMenuPath(pPath, item.path),
      key: pPath + item.path,
    }

    if (item.icon) {
      obj.icon = item.icon
    }
    if (item.children?.length && item.type === 'subMenu') {
      obj.children = routerTransMenu(item.children, item.path);
    }
    return obj;
  }

  // 对于没有type 的视为非菜单路由
  return menuLs.map(item => {
    return getMenuItem(item);
  });
}
const handleOpenMenu =(menu)=>{
  let list = menuStore.visitingMenu
  if(menu.label && !list.find(item=>item.path === menu.path) ){
    
    menuStore.addVisitingMenu(menu)
  }
}
routerTransMenu(pageRoute, '')
 
</script>
<style lang="scss" scoped>
.logoContainer{
  display: flex;
  align-items: center;
  .logoNm{
   color: var(--text-1);
   font-size: 17px;
    margin-right: 15px;
    font-weight: bold;
  }
}

</style>
