import type { App } from 'vue';
// @ts-ignore
import toyar from 'toyar-design/dist/index.js'
import 'toyar-design/dist/style.css'

export default function installComponents(app: App<Element>) {
  app.use(toyar);
}

