import type { App } from 'vue';
import { createPinia } from 'pinia';
// @ts-ignore
import piniaPersist from 'pinia-plugin-persist'
import {watchPcolor} from '@/hooks/index'
const store = createPinia();

export default function installStore(app: App<Element>) {
  store.use(piniaPersist)
  app.use(store);
  watchPcolor()
}

export { store };
