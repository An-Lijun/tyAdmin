<template>
  <TyForm ref="formRef" style="width: 500px" size="large" :formData="formData" :rules="rules" class="animationBox">
    <TyFormItem prop="username" class="entry">
      <template #label> 账户 </template>
      <TyInput v-model="formData.username"></TyInput>
    </TyFormItem>
    <TyFormItem prop="password" class="entry">
      <template #label> 密码 </template>
      <TyInputPassword size="large" v-model="formData.password">
      </TyInputPassword>
    </TyFormItem>
    <TyFormItem class="captchaItem entry" prop="account" v-if="errCount > 1" style="position: relative">
      <template #label> 验证码 </template>
      <div style="display: flex; align-items: center">
        <TyInput v-model="formData.account">
          <template #innerAft>
            <div style="width: 120px"></div>
          </template>
        </TyInput>
        <canvas @click="resetCaptcha" ref="captchaRef" class="captcha"></canvas>
      </div>
    </TyFormItem>
    <TyButton @click="login" block size="large" style="margin-top: 20px" class="entry">登录</TyButton>
    <div class="selfButtonList entry">
      <TyButton type="secondary"> 手机登录 </TyButton>
      <TyButton type="secondary"> 二维码登录 </TyButton>
      <TyButton type="secondary" @click="toRegistry"> 注册 </TyButton>
    </div>
  </TyForm>
</template>
<script setup>
import Captcha from './captcha.js'
import http from '@/common/communication/src/http/index'
import { router } from '@/router'
const userStore = useUserStore()
import { nextTick, onMounted, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { TyMessage } from 'toyar-design'
import useMenuStore from '@/store/modules/menu'
import generateRoutes from '@/router/generateRoutes'
const emit = defineEmits('changeType')
const menuStore = useMenuStore()

const errCount = ref(0)
let ccCode, restore
const formData = ref({
  username: 'admin',
  password: 'admin',
  account: ''
})
const formRef = ref()

const captchaRef = ref()
const resetCaptcha = () => {
  restore = ccCode.render()
}
const toRegistry = () => {
  emit('changeType', 'registry')
}
const coCodeFn = (data, cb) => {
  if (data !== restore) {
    return cb('请输入正确的验证码')
  }
  cb()
}
const rules = {
  username: [
    { required: true, message: `用户名是必填字段`, trigger: ['blur'] }
  ],
  password: [{ required: true, message: `密码是必填字段`, trigger: ['blur'] }],
  account: [
    { required: true, message: `验证码是必填字段`, trigger: ['blur'] },
    {
      validate: coCodeFn
    }
  ]
}
const login = () => {
  formRef.value.validateAll().then(async res => {
    try {
      const { data } =
        (await http.post('/api/user/login', {
          username: formData.value.username,
          password: formData.value.password
        })) || {}

      if (data && data.code === 200) {
        userStore.token = data.data.token
        TyMessage.success('登录成功')
        errCount.value = 0
        const { data: lsData } = await http.get('/api/menu/list')
        generateRoutes(lsData.data)
        localStorage.setItem('dynamicRoutes', JSON.stringify(lsData.data));
 
        nextTick(() => {
          router.push({
            name: 'dashboard'
          })
        })
      }
    } catch (error) {
      console.log(error)

      errCount.value = errCount.value + 1
      if (errCount.value >= 2) {
        if (!ccCode) {
          nextTick(() => {
            ccCode = new Captcha(captchaRef.value)
            restore = ccCode.render()
          })
        } else {
          restore = ccCode.render()
        }
      }
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

.selfButtonList {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  :deep(.ty-button) {
    padding: 0 45px;
  }
}

:deep(.ty-form-item__label) {
  color: var(--text-1);
}

.captcha {
  width: 120px;
  height: 36px;
  border: unset;
  position: absolute;
  right: 25px;

  &:hover {
    cursor: pointer;
  }
}
</style>
