import { defineComponent, h } from 'vue';
import { RouterView } from 'vue-router';
import { TyContainer, TyAside, TyMain } from 'toyar-design';
import Menu from './components/Menu.vue';
import SHeader from './components/SHeader.vue';
import SFooter from './components/SFooter.vue';
import useAppStore from '@/store/modules/app';

type StyleObject = Record<string, string>;

const asideStyles: StyleObject = {
  transition: 'width 0.5s',
  overflow: 'hidden'
};

const mainContentStyles: StyleObject = {
  background: 'var(--fill-2)'
};

const routerViewWrapperStyles: StyleObject = {
  width: '100%',
  'overflow-y': 'auto',
  'max-height': 'calc(100vh - 130px)'
};

const createAside = (appStore: ReturnType<typeof useAppStore>) => {
  const asideHeight = appStore.layout === 1 ? '100vh' : 'calc(100vh - 80px)';
  return h(TyAside, {
    style: {
      width: appStore.isFold ? '50px' : '210px',
      ...asideStyles,
      height: asideHeight
    }
  }, { default: () => h(Menu) }); // 修复这里
};

const createMainContent = () => {
  return h(TyMain, {
    style: mainContentStyles
  }, {
    default: () => h('div', {
      class: 'animationRightToLeft',
      style: routerViewWrapperStyles
    }, h(RouterView))
  }); // 修复这里
};

const renderLayout = (appStore: ReturnType<typeof useAppStore>) => {
  switch (appStore.layout) {
    case 1:
      return h(TyContainer, null, {
        default: () => [
          createAside(appStore),
          h(TyContainer, { column: true }, {
            default: () => [
              h(SHeader),
              createMainContent(),
              h(SFooter)
            ]
          })
        ]
      }); // 修复这里
    case 2:
      return h(TyContainer, { column: true }, {
        default: () => [
          h(SHeader),
          h(TyContainer, null, {
            default: () => [
              createAside(appStore),
              h(TyContainer, { column: true }, {
                default: () => [
                  createMainContent(),
                  h(SFooter)
                ]
              })
            ]
          })
        ]
      }); // 修复这里
    default:
      console.error(`Invalid layout type: ${appStore.layout}`);
      return h('div', 'Invalid layout. Please check the configuration.');
  }
};

export default defineComponent({
  name: 'Home',
  setup() {
    const appStore = useAppStore();
    return () => renderLayout(appStore);
  }
});