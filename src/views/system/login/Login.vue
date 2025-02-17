<template>
  <TyContainer>
    <TyMain> 
      <div class="tyAdmin-login">
          <div class="tyAdmin-login-btn">
          <TySwitch checkedText="0" uncheckedText="1" 
            v-model="isDark" 
          />
          </div>
          <AppLogo/>
          <AppForm/>
      </div>
    </TyMain>
  </TyContainer>
</template>
<script setup lang="ts">
import AppLogo from './AppLogo.vue'
import AppForm from './AppForm.vue'
import {  watch,ref } from 'vue'
import useAppStore from '@/store/modules/app'

const isDark = ref(false)
let html = document.querySelector('html')

watch(
  () => isDark.value,
  newV => {
    html?.setAttribute('toyar-theme',isDark.value ? 'light' : 'dark')
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
.tyAdmin-login{
  position: relative;
  height: 100%;
  &::before{
    content: '';
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin-left: -50%;
    position: absolute;
    background: url(@/assets/svg/login-bg.svg);
    background-size: auto 100%;
    background-position: right;
  }
  &::after{
    position: absolute;
    display: inline-block;
    content: '';
    background: url(@/assets/system/stripe.svg);
    height: 50%;
    width: 25%;
    background-repeat: no-repeat;
    background-size: 150% 150%;
    background-position: center;
    top: 50%;
    left: 25%;
    transform: translate(-50%,-50%);
  }
  .tyAdmin-login-btn{
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 99;
    ::v-deep .ty-switch{
      .checkedText{
        font-size: 0 !important;
        background-image: url('../../../assets/system/sun.svg');
        display: inline-block;
        width: 15px;
        background-size: contain;
        height: 15px;
      }
      .uncheckedText{
        font-size: 0 !important;
        background-image: url('../../../assets/system/moon.svg');
        display: inline-block;
        width: 15px;
        background-size: contain;
        height: 15px;
      }
    }
  }
}
html[toyar-theme="dark"]{
 .ty-main{
    background: var(--toyar-gray-1);
  }
  .tyAdmin-login{
    &::before{
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      margin-left: -50%;
      position: absolute;
      background: url(@/assets/svg/logo-bgDark.svg);
      background-size: auto 100%;
      background-position: right;
    }
  }
}
html[toyar-theme='light']{
  .ty-main{
    background: var(--fill-white);
  }
}


</style>
