<template>
  <!-- 这里应该先注入内个ConfigProvide 但是组件未完成 -->
  <TyWaterMark :options="{
    width: 500,
    height: 300,
    antiTamper: true
  }" :markInfo="['TyAdmin', formatDate(new Date())]">
    <RouterView />
  </TyWaterMark>
</template>

<script setup lang="ts">
import { formatDate } from 'robinson'
</script>
<style>
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
}
</style>
