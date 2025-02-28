<template>
  <div class="tyAdmin-form">
    <div class="tyAdmin-form__content animationBox" >
      <header class="tyAdmin-form__header entry">
        {{ components[formType].header }}
      </header>
       <div>
          <component :is="components[formType].form"  />
          <component :is="components[formType].footer" @changeType="changeType"/>
        </div>
    </div>
  </div>
</template>
<script setup>
import TyPassword from './TyPassword.vue'
import TyRegistry from './TyRegistry.vue'
import PasswordFooter from './passwordFooter.vue'
import RegistryFooter from './registryFooter.vue'

import { ref } from 'vue'

const formType = ref('password')
// 注册组件
const components = {
  password: {
    header: '登录',
    form: TyPassword,
    footer: PasswordFooter
  },
  registry: {
    header: '注册',
    form: TyRegistry,
    footer: RegistryFooter

  }
}

const changeType = val => {
  formType.value = val
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
  align-items: center;
  .tyAdmin-form__content {

    width: 500px;
    overflow: hidden;
    .tyAdmin-form__header {
      margin: 120px 0 40px 0;
      height: 30px;
      line-height: 30px;
      font-size: 30px;
      letter-spacing: 10px;
      color: var(--text-1);
    }
  }
}
</style>
