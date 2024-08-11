
import auth from './directive/auth';
import type { App } from 'vue';

export default function installAuth(app: App<Element>) {
  app.directive('auth', auth);

}