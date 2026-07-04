import { createApp } from 'vue'
import App from './login.vue'
import { loadingFadeOut } from 'virtual:app-loading'

const app = createApp(App);
// 挂载app
app.mount('#app')
loadingFadeOut()
