<template>
  <div class="tyAdmin-login-btn entry">
    <div class="logo">
       <SvgIcon icon="logov3"  />
      <span>
        Toyar Admin
      </span>
    </div>
    <TySwitch checkedText="0" uncheckedText="1" v-model="isDark" @click="changeThemeState($event)" />
  </div>
</template>
<script setup lang="ts">
import { changeThemFn } from '@/hooks/index'
import SvgIcon from '@/components/svgIcon.vue';

const isDark = ref(true)
const changeThemeState = (e) => {
  let value = isDark.value ? 1 : 2
  changeThemFn(value, e)
}

</script>
<style lang="scss" scoped>
  .tyAdmin-login-btn {
    position: fixed;
    top: 0;
    left:0;
    width:calc(100% - 48px);
    z-index: 99;
    display: flex;
    padding:24px;
    justify-content: space-between;
    .logo{
      display:inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: var( --text-1);
      font-weight: 500;
      ::v-deep .ty-svgIcon{

        svg{
          width:34px !important;
          height:34px !important;
          margin-right:10px;
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
  }
</style>
