<template>
  <div class="tyAdmin-form">
    <div class="tyAdmin-form__content">
      <header class="tyAdmin-form__header">登录</header>
      <TyForm size="large" :formData="formData">
        <TyFormItem>
          <template #label> 账户 </template>
          <TyInput v-model="formData.account"></TyInput>
        </TyFormItem>
        <TyFormItem>
          <template #label> 密码 </template>
          <TyInputPassword size="large"
             v-model="formData.password">
          </TyInputPassword>
        </TyFormItem>
        <TyButton @click="login" block size="large" style="margin-top: 20px">登录</TyButton>
      </TyForm>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { router } from '@/router';
const userStore = useUserStore()
const formData = ref({
  account: '',
  password: ''
})

const login=()=>{
  userStore.token="1111111111"
  router.push({
    name:'Trade'
  })
}

</script>
<style lang="scss" scoped>
.tyAdmin-form {
  width: 50%;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  .tyAdmin-form__content {
    height: 50%;
    width: 500px;
    .tyAdmin-form__header {
      margin: 120px 0 40px 0;
      height: 30px;
      line-height: 30px;
      font-size: 30px;
      letter-spacing: 10px;
    }
  }
  ::v-deep .ty-form-item__label {
    text-align: left;
  }
}
</style>
