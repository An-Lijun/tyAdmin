<template>
  <TyForm style="width: 500px;" size="large" :formData="formData" :rules="rules" ref="formRef">
    <TyFormItem prop="username">
      <template #label> 账户 </template>
      <TyInput v-model="formData.username"></TyInput>
    </TyFormItem>
    <TyFormItem prop="password">
      <template #label> 密码 </template>
      <TyInputPassword size="large" v-model="formData.password">
      </TyInputPassword>
    </TyFormItem>
    <TyFormItem prop="repassword">
      <template #label> 确认密码 </template>
      <TyInputPassword size="large" v-model="formData.repassword">
      </TyInputPassword>
    </TyFormItem>
    <TyFormItem prop="email">
      <template #label> 邮箱 </template>
      <TyInput v-model="formData.email"></TyInput>
    </TyFormItem>

    <TyButton @click="registry" block size="large" style="margin-top: 20px"
      >注册</TyButton
    >
    <div class="selfButtonList">
      <TyButton type="secondary"> 手机登录 </TyButton>
      <TyButton type="secondary"> 二维码登录 </TyButton>
      <TyButton type="secondary" @click="toLogin"> 登录 </TyButton>
    </div>
  </TyForm>
</template>
<script setup>
import http from '@/common/communication/src/http/index'
import { router } from '@/router'
import { onMounted, ref } from 'vue'
import {TyMessage} from 'toyar-design'
const emit = defineEmits('changeType')

const formData = ref({
  username: '',
  password: '',
  repassword: '',
  email: ''
})
const formRef = ref()
const toLogin=()=>{
   emit('changeType','password')
}
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
    const {data} = await http.post('/reigstry', {
      username:  formData.value.username,
      password: formData.value.password,
      email: formData.value.email
    }) ||{}
    
    if(data&&data.code === 200){
      TyMessage.success('注册成功')
    }
  })
}
onMounted(() => {})
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
