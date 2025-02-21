<template>
  <div class="tyAdmin-form">
    <div class="tyAdmin-form__content animationBox" >
      <header class="tyAdmin-form__header entry">
        {{ components[formType].header }}
      </header>

      <div style="display: flex;">
        <!-- <Transition name="fade"> -->
          <component :is="components[formType].form" @changeType="changeType" />
        <!-- </Transition> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import TyPassword from './TyPassword.vue'
import TyRegistry from './TyRegistry.vue'

import { ref } from 'vue'

const formType = ref('password')
// 注册组件
const components = {
  password: {
    header: '登录',
    form: TyPassword
  },
  registry: {
    header: '注册',
    form: TyRegistry
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


/* 定义左右移动动画的 CSS 类 */
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s ease;
}
.fade-enter-from {
  transform: translateX(100%);
}
.fade-enter-to {
  transform: translateX(0);
  opacity: 0;
}
.fade-leave-from {
  transform: translateX(0);
  opacity: 0;
}
.fade-leave-to {
  transform: translateX(-100%);
}
</style>
