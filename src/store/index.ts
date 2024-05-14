import type { App } from 'vue';
import { createPinia } from 'pinia';
// @ts-ignore
import piniaPersist from 'pinia-plugin-persist'
const store = createPinia();

export default function installStore(app: App<Element>) {
  // 持久化
  store.use(piniaPersist)
  app.use(store);
}

export { store };
