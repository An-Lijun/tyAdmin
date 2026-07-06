<template>
  <div class="tyAdmin-login animationBox">
    <LoginBar />
    <div class="logo-container">
      <AppLogo />
      <div class="logoCard">
      </div>

    </div>

    <div class="loginCard">
      <AppForm />
    </div>
  </div>
</template>
<script setup lang="ts">
import LoginBar from './components/loginBar.vue'
import AppLogo from './components/AppLogo.vue'
import AppForm from './components/AppForm.vue'
</script>
<style lang="scss" scoped>
.tyAdmin-login {
  position: relative;
  height: 100%;
  background: var(--toyar-gray-1);

  .loginCard {
    position: absolute;
    right: 0;
    width: 700px;
    top: 0;
    // filter:blur(20px);
    height: 100%;
  }

  .logo-container {
    width: calc(100% - 700px);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .logoCard{
      position: absolute;
      left: 0;
      top: 0;
      width: calc(100% - 700px);
      height: 100%;
    }
  }

  // &::before {
  //   content: '';
  //   top: 0;
  //   left: 0;
  //   height: 100%;
  //   width: 100%;
  //   margin-left: -45%;
  //   position: absolute;
  //   background: url(@/assets/svg/login-bg.svg);
  //   background-size: auto 100%;
  //   background-position: right;
  // }
}

html[toyar-theme="dark"] {
  .tyAdmin-login {
    background-color: #070709;

    .loginCard {
      background: hsl(220deg 13.06% 9%);
    }

    .logoCard {
      background: linear-gradient(154deg, rgba(7, 7, 9, .082) 30%, hsl(212 100% 45% / 20%) 48%, rgba(7, 7, 9, .082) 64%);
      -webkit-filter: blur(100px);
      filter: blur(100px);
      height: 100%;
    }
  }
}

html[toyar-theme='light'] {
  .tyAdmin-login {
    background-color: hsl(216 20.11% 95.47%);

    .loginCard {
      background: var(--fill-white);
    }

    .logoCard {
      background: linear-gradient(154deg, rgba(7, 7, 9, .082) 30%, hsl(212 100% 45% / 30%) 48%, rgba(7, 7, 9, .082) 64%);
      -webkit-filter: blur(100px);
      filter: blur(100px);
      height: 100%;

    }
  }
}
</style>
