import type { App } from 'vue';
// @ts-ignore
import 'toyar-design/dist/toyar-design.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default function installComponents(app: App<Element>) {
  app.use(mavonEditor)
}

