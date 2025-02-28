
import Menu from './components/Menu.vue'
import SHeader from './components/SHeader.vue'
import SFooter from './components/SFooter.vue'
import useAppStore from '@/store/modules/app'
import { defineComponent, h } from 'vue'
import { RouterView } from 'vue-router'
import { TyContainer, TyAside, TyMain } from 'toyar-design'
export default defineComponent({
  name: 'home',
  methods: {
    genLayout(h) {
      if (this.appStore.layout === 1) {
        return h(TyContainer, {},
          [
            h(TyAside, {
              width: this.appStore.isFold ? '50' : '210',
              style: {
                height: '100vh',
                transition: 'width 0.5s',
                overflow: 'hidden'
              }
            }, h(Menu)
            ),

            h(TyContainer, { column: true },
              [h(SHeader),
              h(TyMain, {
                style:{
                  background:' var(--fill-2)'
                }
              },
                h('div', {
                  class: 'animationRightToLeft',
                  style: {
                    width: '100%',
                    'overflow-y': 'auto',
                    'max-height': 'calc(100vh - 130px)'
                  }
                }, h(RouterView))),
              h(SFooter)
              ]
            )
          ]
        )
      }

      if (this.appStore.layout === 2) {
        return h(TyContainer, {
          column: true
        }, [
          h(SHeader),
          h(TyContainer, {}, [
            h(TyAside, {
              width: this.appStore.isFold ? '50' : '210',
              style: {
                transition: 'width 0.5s',
                overflow: 'hidden',
                height:'calc(100vh - 80px)'

              }
            }, h(Menu)),
            h(TyContainer, { column: true }, [
              h(TyMain, {
                style:{
                  background:' var(--fill-2)'
                }
              },
                h('div', {
                  class: 'animationRightToLeft',
                  style: {
                    width: '100%',
                    'overflow-y': 'auto',
                    'max-height': 'calc(100vh - 130px)'
                  }
                }, h(RouterView))),
              h(SFooter)
            ])
          ])
        ])
      }
    }
  },
  render(props) {
    this.appStore = useAppStore()
    return this.genLayout(h)
  }
})