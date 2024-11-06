<template>
  <TyDrawer :modelValue="model" width="320">
    <template #header> 系统设置 </template>
    <div>
      <ty-divider style="--font-body-3: 14px;--color-bg-1:var(--color-bg-3);--toyar-gray-2:var(--toyar-gray-3)">
        <ty-icon icon="ty-layout-line" class="mw-10"></ty-icon>
        颜色风格
      </ty-divider>

      <div class="flex-center">
        <div class="theme-swatches">
          <div v-for="theme in themeStateLs" :key="theme" class="theme-swatch"
            :class="{ active: theme.value === appStore.themeState }" @click="changeThemeState(theme.value, $event)">
            <TyIcon :icon="theme.icon" /> {{ theme.label }}
          </div>
        </div>
      </div>


      <div class="flex-around" style="margin-top: 20px;">
        <template v-for="item in themeColorLs" :key="item">
          <div class="theme-color" @click="selectedColor(item)" :class="{
            active: item === appStore.pColor
          }">
            <span :style="{ background: item }">
            </span>
          </div>
        </template>
        <input class="selThemeColor" type="color" v-model="appStore.pColor" />
      </div>




      <div class="flex-between">
        <label> 主题颜色</label>

      </div>


      <div style="height: 30px">
        <ty-divider style="--font-body-3: 14px;--color-bg-1:var(--color-bg-3);--toyar-gray-2:var(--toyar-gray-3)">
          <ty-icon icon="ty-layout-line" class="mw-10"></ty-icon>
          排版样式
        </ty-divider>
      </div>
      <div class="tyadmin-layout">
        <TyRow :gutter="16">
          <TyCol :span="12">
            <div @click="changeLayout(1)" class="layout-1  layout" :class="{
              active: appStore.layout === 1
            }">
              <div class="left"></div>
              <div class="right">
                <div class="top"></div>
                <div class="bottom"></div>
              </div>
            </div>
          </TyCol>
          <TyCol :span="12">
            <div @click="changeLayout(2)" class="layout-2 layout" :class="{
              active: appStore.layout === 2
            }">
              <div class="top"></div>
              <div class="bottom">
                <div class="left"></div>
                <div class="right"></div>
              </div>
            </div>
          </TyCol>
        </TyRow>
      </div>
      <div style="height: 30px">
        <ty-divider style="--font-body-3: 14px;--color-bg-1:var(--color-bg-3);--toyar-gray-2:var(--toyar-gray-3)">
          <ty-icon icon="ty-t-shirt-line" class="mw-10"></ty-icon>
          全局主题
        </ty-divider>
      </div>


      <div class="flex-between">
        <label> 灰色模式</label>
        <TySwitch v-model="appStore.isBlackModel" size="mini" />
      </div>
      <div class="flex-between">
        <label> 色弱模式</label>
        <TySwitch v-model="appStore.isTritanopeModel" size="mini" />
      </div>
      <div style="height: 30px">
        <ty-divider style="--font-body-3: 14px;--color-bg-1:var(--color-bg-3);--toyar-gray-2:var(--toyar-gray-3)">
          <ty-icon icon="ty-settings-4-line" class="mw-10"></ty-icon>
          界面设置
        </ty-divider>
      </div>
    </div>
  </TyDrawer>
</template>
<script setup>
import useAppStore from '@/store/modules/app'
import { ref, watch } from 'vue'
import { TyThemeChange } from 'toyar-design'
const props = defineProps(['model'])
const appStore = useAppStore()
let body = document.querySelector('body')

const selectedColor = (color) => {
  appStore.pColor = color
}
const changeLayout = (value) => {
  appStore.layout = value
}
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
const changeThemeState = (value, e) => {

  changeBtn(() => appStore.themeState = value, e)
}

const themeStateLs = [
  {
    label: '明亮',
    icon: 'ty-sun-line',
    value: 1
  },
  {
    label: '暗黑',
    icon: 'ty-moon-line',
    value: 2
  },
  {
    label: '系统',
    icon: 'ty-contrast-fill',
    value: 3
  }
  // ty-contrast-2-fill
]

const themeColorLs = [
  '#F53F3F',
  '#00B42A',
  '#3491FA',
  '#F77234',
  '#F5319D'
]

watch(
  () => appStore.isBlackModel,
  newV => {
    if (newV) {
      body.style.filter = 'grayscale(1)'
      appStore.isTritanopeModel = false
    } else if (body.style.filter === 'grayscale(1)') {
      body.style.filter = ''
    }
  },
  {
    immediate: true
  }
)

watch(
  () => appStore.isTritanopeModel,
  newV => {
    if (newV) {
      body.style.filter = 'invert(80%)'
      appStore.isBlackModel = false
    } else if (body.style.filter === 'invert(80%)') {
      body.style.filter = ''
    }
  },
  {
    immediate: true
  }
)
let html = document.querySelector('html')
watch(
  () => appStore.themeState,
  newV => {
    html?.setAttribute('toyar-theme', newV === 1 ? 'light' : 'dark')
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
.flex-between {
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-items: center;
  margin-bottom: 16px;
}

.flex-around {
  display: flex;
  justify-content: space-around;
  height: 30px;
  align-items: center;
  margin-bottom: 16px;
}

.selThemeColor {
  width: 35px;
  height: 35px;
  border: 1px solid var(--primary-4);
  box-sizing: border-box;
  border-radius: 5px;
  background: var(--color-bg-2);

}

.theme-color {
  border: 1px solid var(--primary-4);
  width: 35px;
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    border: 2px solid var(--primary-6);
  }

  span {
    display: inline-block;
    width: 25px;
    height: 15px;
    border-radius: 50%;
    transform: rotate(-45deg)
  }

  &.active {
    border: 2px solid var(--primary-6);

    span {
      transform: rotate(0deg);

    }
  }
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-swatches {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border-radius: 5px;
  background: var(--toyar-gray-3);
  color: var(--text-1);
  margin-top: 20px;

  .theme-swatch {
    min-width: 50px;
    height: 25px;
    line-height: 25px;
    padding: 0 3px;
    text-align: center;
    font-size: 13px;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
      color: var(--primary-6)
    }

    &.active {
      background: var(--color-bg-2);
    }
  }
}

.tyadmin-layout {
  .active {
    position: relative;
    border: var(--border-2) solid var(--primary-6);
    box-sizing: border-box;

    &:after {
      content: '';
      display: inline-block;
      width: 35px;
      height: 35px;
      position: absolute;
      background-color: var(--primary-6);
      right: 0;
      color: #fff;
      bottom: 0;
      line-height: 30px;
      text-align: right;
      font-size: 10px;
      clip-path: polygon(100% 0, 0% 100%, 100% 100%);
      background-image: url('../../../../assets/analysis/right.png');
      background-position: right bottom;
      background-size: 60%;
      background-repeat: no-repeat;
    }
  }

  .layout {
    &:hover {
      cursor: pointer;
    }
  }

  .layout-1 {
    height: 70px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: var(--border-radius-8);
    padding: 5px 0;
    box-shadow: var(--box-shadow-3);

    .left {
      height: 100%;
      width: 25%;
      background-color: var(--primary-6);
      border-radius: var(--border-radius-4);
    }

    .right {
      height: 100%;
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .top {
        height: 25%;
        background-color: var(--primary-3);
        border-radius: var(--border-radius-2);
      }

      .bottom {
        height: 65%;
        background-color: var(--primary-2);
        border-radius: var(--border-radius-2);
        border: var(--border-1) dashed var(--primary-5);
      }
    }
  }

  .layout-2 {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border-radius: var(--border-radius-8);
    padding: 0 5px;
    box-shadow: var(--box-shadow-3);

    .top {
      height: 25%;
      width: 100%;
      background-color: var(--primary-6);
      border-radius: var(--border-radius-4);
    }

    .bottom {
      height: 55%;
      display: flex;
      justify-content: space-between;

      .left {
        background-color: var(--primary-3);
        border-radius: var(--border-radius-2);
        height: 100%;
        width: 15%;
      }

      .right {
        height: 100%;
        width: 80%;
        box-sizing: border-box;
        background-color: var(--primary-2);
        border-radius: var(--border-radius-2);
        border: var(--border-1) dashed var(--primary-5);
      }
    }
  }


}
</style>
