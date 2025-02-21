<template>
  <TyContainer>
    <TyMain>
      <div class="tyAdmin-login animationBox">
        <div class="tyAdmin-login-btn entry">
          <TySwitch checkedText="0" uncheckedText="1" v-model="isDark" @click="changeThemeState($event)" />
        </div>
        <AppLogo />
        <AppForm />
      </div>
    </TyMain>
  </TyContainer>
</template>
<script setup lang="ts">
import AppLogo from './components/AppLogo.vue'
import AppForm from './components/AppForm.vue'
import { ref } from 'vue'
import { changeThemFn } from '@/hooks/index'

const isDark = ref(true)
const changeThemeState = (e) => {
  let value = isDark.value ? 1 : 2
  changeThemFn(value, e)
}

</script>
<style lang="scss" scoped>
.tyAdmin-login {
  position: relative;
  height: 100%;

  &::before {
    content: '';
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin-left: -45%;
    position: absolute;
    background: url(@/assets/svg/login-bg.svg);
    background-size: auto 100%;
    background-position: right;
  }

  .tyAdmin-login-btn {
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 99;

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
  }
}

html[toyar-theme="dark"] {
  .ty-main {
    background: var(--toyar-gray-1);
  }

  .tyAdmin-login {
    &::before {
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
// .xl{
//   .tyAdmin-login {
//     &::before{
//       // margin-left: -60%;
//       display: none;
//     }
//   }
// }

html[toyar-theme='light'] {
  .ty-main {
    background: var(--fill-white);
  }
}
</style>
