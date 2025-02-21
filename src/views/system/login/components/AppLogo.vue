<template>
  <div class="tyAdmin-logo animationBox" >
    <h3 class="tyAdmin__logo entry-left">
      <SvgIcon icon="logov3" />
      <span>
        ToyarAdmin
      </span>
    </h3>
    <div class="tyAdmin__stripe entry-left"></div>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@/components/svgIcon.vue';

</script>
<style lang="scss" scoped>
.tyAdmin-logo {
  position: absolute;
  left: 250px;
  top: 100px;

  .tyAdmin__logo {
    display: flex;
    color: #fff;
    align-items: center;

    span {
      font-size: 28px;
      margin-left: 15px;
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
