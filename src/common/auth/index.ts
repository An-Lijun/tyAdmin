
import auth from './directive/auth';
import type { App } from 'vue';

export default function installAuth(app: App<Element>) {
  app.directive('auth', auth);

}

export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';