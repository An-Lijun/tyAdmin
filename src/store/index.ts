import type { App } from 'vue';
import { createPinia } from 'pinia';
// @ts-ignore
import piniaPersist from 'pinia-plugin-persist'
import useMenuStore from '@/store/modules/menu'
import generateRoutes from '@/router/generateRoutes'

const store = createPinia();

export default function installStore(app: App<Element>) {
  store.use(piniaPersist)
  app.use(store);
  const menuStore = useMenuStore()
  if(menuStore.menu && Array.isArray(menuStore.menu) &&menuStore.menu.length){

    generateRoutes(menuStore.menu)
  }
}

export { store };
