<template>
  <TyContainer>
    <TyMain> 
      <div class="tyAdmin-login">
          <AppLogo/>
          <AppForm/>
      </div>
    </TyMain>
  </TyContainer>
</template>
<script setup lang="ts">
import AppLogo from './AppLogo.vue'
import AppForm from './AppForm.vue'

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
}
::v-deep .ty-main{
  background: var(--fill-2);
}
</style>
