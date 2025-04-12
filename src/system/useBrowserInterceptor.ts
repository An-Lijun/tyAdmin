import { onUnmounted } from 'vue'

interface IBrowserInterceptEvents {
  popstate?: (next: () => void) => void // 监听浏览器前进后退
  beforeunload?: EventListener // 监听标签页刷新和关闭
}

// addStopHistory ...

const useBrowserInterceptor = (events: IBrowserInterceptEvents) => {
  const { popstate, beforeunload } = events
  let popstateCallback: EventListener | undefined
  let beforeunloadCallback: EventListener | undefined

  let isHistoryBack = false
  // 拦截浏览器后退 ...

  // 拦截标签页关闭和刷新
  if (beforeunload) {
    beforeunloadCallback = (event) => {
      if (!isHistoryBack) beforeunload(event)
    }
    window.addEventListener('beforeunload', beforeunloadCallback)
  }

  // 销毁事件
  onUnmounted(() => {
    // 不是后退且不是导航守卫触发的，仅仅是组件卸载，才需要清除模拟拦截后退时添加的历史记录
    if (popstate && !isHistoryBack) {
      history.go(-1)
    }
    popstateCallback && window.removeEventListener('popstate', popstateCallback)
    beforeunloadCallback && window.removeEventListener('beforeunload', beforeunloadCallback)
  })
}

export default useBrowserInterceptor
