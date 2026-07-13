<template>
  <TyForm ref="formRef" style="width: 500px" size="large" :formData="formData" :rules="rules" :labelWidth="0" @submit.prevent>
    <TyFormItem prop="username" class="entry" :isShowStr="false">
      <TyInput v-model="formData.username"></TyInput>
    </TyFormItem>
    <TyFormItem prop="password" class="entry">
      <TyInputPassword size="large" v-model="formData.password">
      </TyInputPassword>
    </TyFormItem>
    <TyFormItem class="captchaItem entry" prop="account" v-if="errCount > 1" style="position: relative">
      <div style="display: flex; align-items: center">
        <TyInput v-model="formData.account">
          <template #innerAft>
            <div style="width: 120px"></div>
          </template>
        </TyInput>
        <canvas @click="resetCaptcha" ref="captchaRef" class="captcha"></canvas>
      </div>
    </TyFormItem>
    <TyButton html-type="button" @click.prevent="login" block size="large" style="margin-top: 20px" class="entry">登录</TyButton>

  </TyForm>
</template>
<script setup>
import Captcha from './captcha.js'
import http from '@/common/communication/src/http/index'
import { router } from '@/router'
import { nextTick, onMounted, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { TyMessage } from 'toyar-design'
import useMenuStore from '@/store/modules/menu'
import generateRoutes from '@/router/generateRoutes'
const menuStore = useMenuStore()
const userStore = useUserStore()

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
        const { data: res } = await http.get('/api/menu/list')
   
        generateRoutes(res.data)
        // // const menu =res.data.map(item=>{
        // //   item.path='/'+item.path
        // //   return item
        // // })
        menuStore.setMenu(res.data)
        router.push('/dashboard/analysis')
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
