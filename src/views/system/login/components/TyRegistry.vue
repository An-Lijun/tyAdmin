<template>
  <TyForm style="width: 500px;" size="large" :formData="formData" :rules="rules" ref="formRef"  class="animationBox">
    <TyFormItem prop="username"  class="entry">
      <template #label> 账户 </template>
      <TyInput v-model="formData.username"></TyInput>
    </TyFormItem>
    <TyFormItem prop="password"  class="entry">
      <template #label> 密码 </template>
      <TyInputPassword size="large" v-model="formData.password">
      </TyInputPassword>
    </TyFormItem>
    <TyFormItem prop="repassword"  class="entry">
      <template #label> 确认密码 </template>
      <TyInputPassword size="large" v-model="formData.repassword">
      </TyInputPassword>
    </TyFormItem>
    <TyFormItem prop="email"  class="entry">
      <template #label> 邮箱 </template>
      <TyInput v-model="formData.email"></TyInput>
    </TyFormItem>

    <TyButton @click="registry" block size="large" style="margin-top: 20px"  class="entry"
      >注册</TyButton
    >

  </TyForm>
</template>
<script setup>
import http from '@/common/communication/src/http/index'
import { router } from '@/router'
import { onMounted, ref } from 'vue'
import {TyMessage} from 'toyar-design'

const formData = ref({
  username: '',
  password: '',
  repassword: '',
  email: ''
})
const formRef = ref()

const rules = {
  username: [
    { required: true, message: `用户名是必填字段`, trigger: ['blur'] }
  ],
  password: [{ required: true, message: `密码是必填字段`, trigger: ['blur'] }],
  repassword: [
    { required: true, message: `确认密码是必填字段`, trigger: ['blur'] }
  ],
  email: [{ required: true, message: `邮箱是必填字段`, trigger: ['blur'] }]
}

const registry = () => {
  formRef.value.validateAll().then(async res => {
    if(formData.value.password !== formData.value.repassword){
      TyMessage.error('两次密码不一致')
      return 
    }
    formData.value.account
    const {data} = await http.post('/api/user/registry', {
      username:  formData.value.username,
      password: formData.value.password,
      email: formData.value.email
    }) ||{}
    
    if(data&&data.code === 200){
      TyMessage.success('注册成功')
    }
  })
}
</script>
<style lang="scss" scoped>
:deep(.ty-form-item__label) {
  text-align: left;
}

.captchaItem :deep(.ty-form-item__label) {
  &::after {
    display: none;
  }
}



:deep(.ty-form-item__label){
  color: var(--text-1);
}


</style>
