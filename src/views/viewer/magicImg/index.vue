<template>
  <div class="divRoot" >
    <div style="">
      <MagicImg  />

      <MagicImg direction="leftToRight"/>
      <MagicImg  direction="center"/>
      <MagicImg  direction="leftTopToRightBottom"/>
      <MagicImg  direction="around"/>
      <MagicImg  direction="center" type="suipian"/>
      <MagicImg  type="suiji"/>

    </div>
  </div>
</template>
<script setup>
import MagicImg from './comp/index.vue'
</script>
<style lang="less" scoped>
</style>
