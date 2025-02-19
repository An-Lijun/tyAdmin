<template>
  <div>
    <tHeader title="soulBall" info="toyar-admin 封装仿照soul的旋转球" />
    <div class="tyAdmin__container">
      <div style="width: 300px; height: 450px;margin: 0 auto;">
        <soulBall ></soulBall>
      </div>
    </div>
  </div>

</template>
<script setup>
import tChart from '@/components/tChart.vue'
import tHeader from '@/components/tHeader.vue'
import soulBall from '@/components/soulBall/index.vue';



</script>
<style lang="scss" scoped>
.tyAdmin__container {
  background: #000 !important;
  height: 100%;
}
</style>