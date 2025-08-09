
import auth from './directive/auth';
// import pinyin from './directive/pinyin';

import type { App } from 'vue';

export default function installAuth(app: App<Element>) {
  app.directive('auth', auth);
  // app.directive('pinyin', pinyin);


}

export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';