import { onUnmounted } from 'vue'

interface IBrowserInterceptEvents {
  popstate?: (next: () => void) => void // 监听浏览器前进后退
}

// 作用：添加一个历史记录，以便后续模拟拦截后退
function addStopHistory() {
  const state = { id: 'stopBack' }
  // if (history.state.id === 'stopBack') return
  history.pushState(state, '', window.location.href)
}

const useBrowserInterceptor = (type='hash',events: IBrowserInterceptEvents) => {
  const { popstate } = events
  
  let popstateCallback: EventListener | undefined

  let isHistoryBack = false
  // 拦截浏览器后退
  if (popstate) {
    addStopHistory()
    popstateCallback = () => {
      addStopHistory()
      popstate(() => {
        isHistoryBack = true
        history.go(-2)
      })
    }
    if(type === 'hash'){
      window.addEventListener('hashchange', popstateCallback)
    }
    if(type === 'history'){
      window.addEventListener('popstate', popstateCallback)
    }
  }

  // 销毁事件
  onUnmounted(() => {
    // 不是历史后退触发的，仅仅是组件卸载，才需要清除模拟拦截后退时添加的历史记录
    if (popstate && !isHistoryBack) {
      history.go(-1)
    }
    if(type === 'hash'){
      popstateCallback && window.removeEventListener('hashchange', popstateCallback)
    }
    if(type === 'history'){
      popstateCallback && window.removeEventListener('popstate', popstateCallback)
    }
  })
}

export default useBrowserInterceptor
