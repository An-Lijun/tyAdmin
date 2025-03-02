import { defineComponent, h, ref } from 'vue';
import { RouterView } from 'vue-router';
import { TyContainer, TyAside, TyMain } from 'toyar-design';
import Menu from './components/Menu.vue';
import SHeader from './components/SHeader.vue';
import SFooter from './components/SFooter.vue';
import useAppStore from '@/store/modules/app';

// 定义样式类型
type StyleObject = Record<string, string>;

// 侧边栏样式
const asideStyles: StyleObject = {
    transition: 'width 0.5s',
    overflow: 'hidden'
};

// 主内容区域样式
const mainContentStyles: StyleObject = {
    background: 'var(--fill-2)'
};

// 路由视图包裹层样式
const routerViewWrapperStyles: StyleObject = {
    width: '100%',
    'overflow-y': 'auto',
    'max-height': 'calc(100vh - 130px)'
};

// 创建侧边栏组件
const createAside = (appStore: ReturnType<typeof useAppStore>) => {
    const asideHeight = appStore.layout === 1 ? '100vh' : 'calc(100vh - 80px)';

    return h(TyAside, {
        
        style: {
            width: appStore.isFold ? '50px' : '210px',
            ...asideStyles,
            height: asideHeight
        }
    }, h(Menu));
};

// 创建主内容区域组件
const createMainContent = () => {
    return h(TyMain, {
        style: mainContentStyles
    }, [
        h('div', {
            class: 'animationRightToLeft',
            style: routerViewWrapperStyles
        }, [h(RouterView)])
    ]);
};

// 渲染不同布局
const renderLayout = (appStore: ReturnType<typeof useAppStore>) => {
    switch (appStore.layout) {
        case 1:
            return h(TyContainer, [
                createAside(appStore),
                h(TyContainer, { column: true }, [
                    h(SHeader),
                    createMainContent(),
                    h(SFooter)
                ])
            ]);
        case 2:
            return h(TyContainer, { column: true }, [
                h(SHeader),
                h(TyContainer, [
                    createAside(appStore),
                    h(TyContainer, { column: true }, [
                        createMainContent(),
                        h(SFooter)
                    ])
                ])
            ]);
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
