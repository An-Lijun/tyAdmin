import { createApp } from 'vue'
import 'normalize.css' //格式化
import '@/assets/style/index.scss'
import App from './App.vue'

import installStore from './store'
import installRouter from './router'
import installComponents from './components'
import installI18n from './locales/index'
import installAuth from './common/auth'
import installSystem from './system/index'
import { loadingFadeOut } from 'virtual:app-loading'
import * as echarts from 'echarts';
async function bootstrap() {
  // 创建app
  const app = createApp(App);
  // 注册权限
  installAuth(app)
  // 创建国际化
  installI18n(app);
  // 配置 store
  installStore(app)
  // 注册路由
  installRouter(app)
  // 注册ui组件
  installComponents(app)
  // 挂载echarts
  installSystem(app)
  //暂时不采取全局注册任何东西
  // app.config.globalProperties.$echarts = echarts;

  // 挂载app
  app.mount('#app')
  loadingFadeOut()
}

bootstrap()
