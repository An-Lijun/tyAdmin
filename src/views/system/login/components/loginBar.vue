<template>
  <div class="tyAdmin-login-btn entry" >
    <div class="logo">
      <SvgIcon icon="logov3" />
      <span> Toyar Admin </span>
    </div>
    <div class="tya-control">
      <div class="color" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <div class="color-content" :class="{ isShowColor: isShowColor }">
          <div class="red color-item" @click="handleChange('red')"></div>
          <div class="primary color-item" @click="handleChange('xblue')"></div>
          <div class="yellow color-item" @click="handleChange('yellow')"></div>
          <div class="cyan color-item" @click="handleChange('cyan')"></div>
          <div
            class="magenta color-item"
            @click="handleChange('magenta')"
          ></div>
        </div>
        <TyiPaletteLine :size="18" />
      </div>
      <TyPoppover trigger="click" class="lang" placement="bottom">
        <TyiLayoutLeftFill :size="18" />
        <template #content>
          <div
            @click="changeLayout(item)"
            class="download-box"
            v-for="item in [{label:'居左',value:'left'},{label:'居中',value:'center'},{label:'居右',value:'right'}]"
          >
            <span> {{ item.label }} </span>
          </div>
        </template>
      </TyPoppover>
      <TyiMoonFill
        :size="18"
        v-if="isDark"
        @click="changeThemeState($event, false)"
      />
      <TyiSunFill :size="18" v-else @click="changeThemeState($event, true)" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { changeThemFn } from '@/hooks/index'
import SvgIcon from '@/components/svgIcon.vue'

import useAppStore from '@/store/modules/app'
const appStore = useAppStore()
const emit = defineEmits(['changeLayout'])
const isDark = ref(true)
const isShowColor = ref(false)
const handleChange = val => {
  const color = {
    red: '#F76965',
    yellow: '#FBE94B',
    cyan: '#3FD4CF',
    xblue: '#3C7EFF',
    magenta: '#F756A9'
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

const changeLayout =(item) =>{
  // layout.value = item.value
    emit('changeLayout', item);
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

  .tya-control {
    padding: 5px 12px;
    border-radius: 24px;
    display: inline-flex;
    align-items: center;
    background-color: var(--fill-3);

    .ty-icon {
      margin: 0 5px;
    }

    .color {
      .color-content {
        width: 0px;
        overflow: hidden;
        height: 18px;

        display: inline-block;
        &.isShowColor {
          width: 140px;
          transition: width 0.5s ease;
        }
      }
      .color-item {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: inline-block;
        width: 18px;
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
  &.left{

  }
}
</style>
