<template>
  <TyForm  style="width: 500px;"  size="large" :formData="formData">
    <TyFormItem>
      <template #label> 账户 </template>
      <TyInput v-model="formData.account"></TyInput>
    </TyFormItem>
    <TyFormItem>
      <template #label> 密码 </template>
      <TyInputPassword size="large" v-model="formData.password">
      </TyInputPassword>
    </TyFormItem>
    <TyFormItem class="captchaItem">
      <div style="display: flex; align-items: center;">
        <TyInput v-model="formData.account"></TyInput>
        <canvas @click="resetCaptcha" ref="captchaRef" style="width: 150px;height: 40px;"></canvas>
      </div>
    </TyFormItem>
    <TyButton @click="login" block size="large" style="margin-top: 20px">登录</TyButton>
    <div class="selfButtonList">
      <TyButton type="secondary">
        手机登录
      </TyButton>
      <TyButton type="secondary">
        二维码登录
      </TyButton>
      <TyButton type="secondary" @click="toRegistry">
        注册
      </TyButton>
    </div>
  </TyForm>
</template>
<script setup>
import Captcha from './captcha.js'
import http from '@/common/communication/src/http/index'
import { router } from '@/router';
const userStore = useUserStore()
import { onMounted, ref } from 'vue'
import useUserStore from '@/store/modules/user'
const formData = ref({
  account: '',
  password: ''
})
const emit = defineEmits('changeType')

const toRegistry=()=>{
   emit('changeType','registry')
}
const login = () => {
  userStore.token = "1111111111"
  router.push({
    name: 'Dashboard'
  })
}
let ccCode, restore
onMounted(() => {
  ccCode = new Captcha(captchaRef.value)
  restore = ccCode.render()
})
const captchaRef = ref()
const resetCaptcha = () => {
  restore = ccCode.render()

}

</script>
<style lang="scss" scoped>
::v-deep .ty-form-item__label {
  text-align: left;
}

.captchaItem ::v-deep .ty-form-item__label {
  &::after {
    display: none;
  }
}

.selfButtonList {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  :deep(.ty-button) {
    padding: 0 45px;
  }
}
</style>