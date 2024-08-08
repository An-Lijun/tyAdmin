import { defineStore } from 'pinia';
// @ts-ignore
export default defineStore('useMenuStore', {
  state: () => ({
    // 用户信息
    menu:[], // 全部菜单
    activeMenu:'', // 当前激活的menu菜单
    openedMenu:[], // 当前已经打开的菜单
    visitingMenu:[], // 当前正在访问过的菜单
    
  }),
  actions:{
    // 设置所有菜单
    setMenu(menu: any[]) {
      this.menu = menu;
    },
    
    // 设置当前激活的menu菜单
    setActiveMenu(menuId: string) {
      this.activeMenu = menuId;
    },
    // 添加当前已打开的menu菜单
    addOpenedMenu(menuId: string) {
      if (!this.openedMenu.includes(menuId)) {
        this.openedMenu.push(menuId);
      }
    },
    // 移除当前已打开的menu菜单
    removeOpenedMenu(menuId: string) {
      const index = this.openedMenu.indexOf(menuId);
      if (index !== -1) {
        this.openedMenu.splice(index, 1);
      }
    },
    // 添加当前正在访问的menu菜单
    addVisitingMenu(menuId: string) {
      if (!this.visitingMenu.includes(menuId)) {
        this.visitingMenu.push(menuId);
      }
    },
    // 移除当前正在访问的menu菜单
    removeVisitingMenu(menuId: string) {
      const index = this.visitingMenu.indexOf(menuId);
      if (index !== -1) {
        this.visitingMenu.splice(index, 1);
      }
    },
    removeVisitedMenuByIndex(type: string, index: number){
      switch (type) {
        case 'index':
          this.visitingMenu.splice(index, 1)
          break
        case 'left':
          this.visitingMenu.splice(1, index - 1)
          break
        case 'right':
          this.visitingMenu.splice(index + 1, this.visitingMenu.length - index)
          break
        case 'all':
          this.visitingMenu.splice(1, this.visitingMenu.length)
          break
      }
    },
    // 清空所有状态
    clear() {
      this.activeMenu = '';
      this.openedMenu = [];
      this.visitingMenu = [];
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: window.localStorage,
        paths: ['openedMenu']
      }
    ]
  }
})
