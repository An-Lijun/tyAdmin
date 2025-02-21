import useAppStore from '@/store/modules/app'
import { generateColor } from 'toyar-design/dist/index.js'
import { onBeforeRouteLeave } from 'vue-router'
import { TyAlert } from 'toyar-design'
import { watch } from 'vue'
export function watchPcolor() {
  const appStore = useAppStore()

  watch(() => appStore.pColor, (newV) => {
    appStore.pColors = generateColor(newV, { list: true }).slice(2, 9)
  }, {
    immediate: true
  })
}

export function leaveAlert() {
  const handleRouteLeave = () => {
    return new Promise((resolve, reject) => {
      const { distroy } = TyAlert('Are you sure you want to leave?', {
        type: 'warning',
        sure: {
          code: () => {
            console.log("reslove");
            resolve(true);
            distroy()
          }
        },
        cancel: {
          code: () => {
            console.log("cancel");
            reject(false);
            distroy()
          }
        },
      });
    });
  };

  onBeforeRouteLeave(async (to, from) => {
    try {
      await handleRouteLeave()
      return true
    } catch (error) {
      return false
    }
  })

}

export const changeThemFn = (value, event) => {
  const appStore = useAppStore()

  let html = document.querySelector('html')

  const changeBtn = (func, $eve) => {
    const x = $eve.clientX
    const y = $eve.clientY
    // 计算鼠标点击位置距离视窗的最大圆半径
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )
    document.documentElement.style.setProperty('--x', x + 'px')
    document.documentElement.style.setProperty('--y', y + 'px')
    document.documentElement.style.setProperty('--r', endRadius + 'px')
    // 判断浏览器是否支持document.startViewTransition
    if (document.startViewTransition) {
      // 如果支持就使用document.startViewTransition方法
      document.startViewTransition(() => {
        func.call() // 这里的函数是切换主题的函数，调用changeBtn函数时进行传入
      })
    } else {
      // 如果不支持，就使用最原始的方式，切换主题
      func.call()
    }
  }
  changeBtn(() => appStore.themeState = value, event)

  watch(
    () => appStore.themeState,
    newV => {
      html?.setAttribute('toyar-theme', newV === 1 ? 'light' : 'dark')
    },
    {
      immediate: true
    }
  )
}