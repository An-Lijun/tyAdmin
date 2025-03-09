import type { App } from 'vue';
// @ts-ignore
import 'toyar-design/dist/index2.js'

// import toyar from 'toyar-design/dist/index.js'
// import 'toyar-design/dist/style.css'
import toyar from './dists/index.js'
import './dists/style.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default function installComponents(app: App<Element>) {
  app.use(toyar);
  app.use(mavonEditor)
}

