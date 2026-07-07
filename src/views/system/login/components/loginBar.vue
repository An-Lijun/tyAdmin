<template>
  <div class="tyAdmin-login-btn entry">
    <div class="logo">
      <SvgIcon icon="logov3" />
      <span> Toyar Admin </span>
    </div>
    <div class="tya-control">
      <div class="color" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <div class="red color-item" v-show="isShowColor" @click="handleChange('red')"></div>
        <div class="primary color-item" v-show="isShowColor"  @click="handleChange('xblue')"></div>
        <div class="yellow color-item" v-show="isShowColor"  @click="handleChange('yellow')"></div>
        <div class="cyan color-item" v-show="isShowColor"  @click="handleChange('cyan')"></div>
        <div class="magenta color-item" v-show="isShowColor"  @click="handleChange('magenta')"></div>
        <TyiPaletteLine :size="18" />

      </div>
      <TyiLayoutLeftFill :size="18" />

      <TyiMoonFill :size="18" v-if="isDark" @click="changeThemeState($event, false)" />
      <TyiSunFill :size="18" v-else @click="changeThemeState($event, true)" />

    </div>
  </div>
</template>
<script setup lang="ts">
import { changeThemFn } from '@/hooks/index'
import SvgIcon from '@/components/svgIcon.vue'
import useAppStore from '@/store/modules/app'
const appStore = useAppStore()

const isDark = ref(true)
const isShowColor = ref(false)
const handleChange =(val)=>{
  const color ={
    red:'#F76965',
    yellow:'#FBE94B',
    cyan:'#3FD4CF',
    xblue:'#3C7EFF',
    magenta:'#F756A9'
  }
  appStore.pColor = color[val]
  
}
const changeThemeState = (e, value) => {
  console.log(e)
  isDark.value = value
  changeThemFn(isDark.value ? 1 : 2, e)
}
const mouseenter = () => {
  isShowColor.value = true
}
const mouseleave = () => {
  isShowColor.value = false
}
</script>
<style lang="scss" scoped>
.tyAdmin-login-btn {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 48px);
  z-index: 99;
  display: flex;
  padding: 24px;
  justify-content: space-between;

  .logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: var(--text-1);
    font-weight: 500;

    ::v-deep .ty-svgIcon {
      svg {
        width: 34px !important;
        height: 34px !important;
        margin-right: 10px;
      }
    }
  }

  :deep(.ty-switch) {
    .checkedText {
      font-size: 0 !important;
      background-image: url('../../../assets/system/sun.svg');
      display: inline-block;
      width: 15px;
      background-size: contain;
      height: 15px;
    }

    .uncheckedText {
      font-size: 0 !important;
      background-image: url('../../../assets/system/moon.svg');
      display: inline-block;
      width: 15px;
      background-size: contain;
      height: 15px;
    }
  }

  .tya-control {
    padding: 5px 12px;
    border-radius: 24px;
    display: inline-flex;
    align-items: center;
    background-color: var(--fill-3);
    transition: width 0.3s ease;

    .ty-icon {
      margin: 0 5px
    }

    .color {
      transition: width 0.3s ease;
      display: inline-flex;

      .color-item {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        margin: 0 5px;
      }

      .red {
        background: var(--toyar-red-6);
      }

      .primary {
        background: var(--toyar-xblue-6);
      }

      .yellow {
        background: var(--toyar-yellow-6);
      }

      .cyan {
        background: var(--toyar-cyan-6);
      }

      .magenta {
        background: var(--toyar-magenta-6);
      }
    }
  }
}
</style>
