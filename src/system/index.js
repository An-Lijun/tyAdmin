import RenderTail from '../utils/src/tail'
import { isProd } from '../common/auth/index'
import useAppStore from '@/store/modules/app'
import { generateColor } from 'toyar-design/dist/index.js'
import  IfVisible from '../utils/src/userActive'
import {TyAlert} from 'toyar-design'
// ------------------------------------------------------------------- how to use -------------------------------------------------------------------------



setTimeout(()=>{
  const appStore =useAppStore()
appStore.tColors = generateColor('#27C346', { list: true }).slice(2, 9)

appStore.sColors = generateColor('#F756A9', { list: true }).slice(2, 9)

})
class NoDebugger {
  constructor(options) {
    this.interval = null
    // 封装添加事件监听器的逻辑
    this.addEventListeners(['pageshow', 'resize'], this.onConsoleOpened);

    options?.disRightClick && this.disRightClick()
    options?.disF12 && this.disF12()

    window.addEventListener('unload', () => {
      this.removeEventListeners(['pageshow', 'resize'], this.onConsoleOpened);
      clearInterval(this.interval)
    });
  }
  // 封装添加事件监听器的方法
  addEventListeners(events, handler) {
    events.forEach(event => {
      window.addEventListener(event, handler.bind(this));
    });
  }
  // 封装移除事件监听器的方法
  removeEventListeners(events, handler) {
    events.forEach(event => {
      window.removeEventListener(event, handler);
    });
  }
  // 禁用右键菜单
  disRightClick() {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });
  }
  //  禁用F12
  disF12() {
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === 123 || e.key === 'F12') {
        e.preventDefault();
      }
    });
  }

  // 当控制台打开时
  onConsoleOpened() {
    const block = () => {
      // 清除控制台
      if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        const password = prompt("非法调试请输入管理员密码", "");
        if (password != '000000') {
          console.clear()
          document.body.innerHTML = "检测到非法调试,请关闭控制台后刷新重试!";
          console.log('body内容已清除');
          this.sremoveScriptsInHead();
          this.interval = setInterval(() => {
            Function('debugger')();
          }, 50);
        }
      }
    }
    try {
      block();
    } catch (err) { }
  }
  // 清除head中的js
  removeScriptsInHead() {
    const scripts = document.querySelectorAll('head script');
    scripts.forEach(script => script.remove());
    console.log('Head 中的 <script> 标签已清除');
  }
}




export default function (vue) {
  window.onload = function () {
    let RT = new RenderTail(undefined, ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])
    RT.init()

    if (isProd) {
      new NoDebugger({
        disRightClick: true,
        disF12: true
      })
    }

    new IfVisible(4*1000, {
      statusChanged: (val) => {
        switch (val) {
          case 'active':
            document.title = '欢迎回来 | ToyarAdmin'
            break
          case 'hidden':
            document.title = '【期待您下次使用 | ToyarAdmin】'
            break
          case 'idle':
            vue.config.globalProperties.$router.push({
              path:'/lock'
            })
            const { distroy } = TyAlert('由于您长时间未使用已自动锁屏', {
              type: 'warning',
              sure: {
                code: () => {
                  distroy()
                }
              },
              cancel: {
                code: () => {
                  distroy()
                }
              },
            });
        }
      
      }
      })



  }
}

const paragraph = document.querySelector('#app');
const mediaQueries = {
  '(max-width: 575px)':'xs',
  '(min-width: 576px) and (max-width: 767px)':'sm',
  '(min-width: 768px) and (max-width: 991px)':'md',
  '(min-width: 992px) and (max-width: 1199px)':'lg',
  '(min-width: 1200px) and (max-width: 1399px)':'xl',
  '(min-width: 1399px)':'xxl'

}

function handleMediaQueryChange(mq) {
        Object.keys(mediaQueries).forEach((key) => {
            paragraph.classList.remove(mediaQueries[key]);
        });
        paragraph.classList.add(mediaQueries[mq.media]);
}

Object.keys(mediaQueries).forEach(key => {
    const mq = window.matchMedia(key);
    handleMediaQueryChange(mq);
    mq.addEventListener('change', handleMediaQueryChange);
});



