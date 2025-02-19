<template>
  <div class="tyAdmin-logo">
  <SvgIcon icon="logo"/>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@/components/svgIcon.vue';

</script>
<style lang="scss" scoped>
.tyAdmin-logo {
  position: absolute;
  right: 150px;
  top: 50px;  

  img {
    width: 250px;
  }
}
</style>
