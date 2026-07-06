<template>
  <div class="tyAdmin-logo animationBox">
    <SvgIcon icon="loginLogo" />
    <div class="title">
      开箱即用的大型中后台管理系统
    </div>
    <div class="subTitle">
      工程化、高性能、跨组件库的前端模版
    </div>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@/components/svgIcon.vue';

</script>
<style lang="scss" scoped>
.tyAdmin-logo {


  .tyAdmin__logo {
    display: flex;
    color: #fff;
    align-items: center;

    span {
      font-size: 28px;
      margin-left: 15px;
    }
  }

  .title {
    font-size: 24px;
    color: var(--text-1);
    text-align: center;
  }

  .subTitle {
    color: var(--text-2);
    text-align: center;
    margin-top: 5px;
  }

  @keyframes float {

    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-20px);
    }

    100% {
      transform: translateY(0);
    }
  }

  ::v-deep .ty-svgIcon {
    animation: 5s linear infinite float;

    svg {
      width: 300px;
      height: 300px;
    }
  }

  .tyAdmin__stripe {
    margin-top: 30px;
    display: inline-block;
    background: url(@/assets/system/stripe.svg);
    background-repeat: no-repeat;
    background-size: 150% 150%;
    background-position: center;
    width: 500px;
    height: 500px;
  }

  img {
    width: 250px;
  }
}
</style>
