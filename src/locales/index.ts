import type { App } from 'vue';
import type { I18n, I18nOptions } from 'vue-i18n';
import { createI18n } from 'vue-i18n';
import messages from './lang/exportLang'
export let i18n: I18n;
// 1、创建中文语言包对象
const localeData: I18nOptions = {
  legacy: false,
  // messages,
  locale: 'zh',
  messages,
  sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
  silentTranslationWarn: true, // true - warning off
  missingWarn: false,
  silentFallbackWarn: true,
};

export default function (app: App){
  i18n = createI18n(localeData) as I18n;
  app.use(i18n);
}