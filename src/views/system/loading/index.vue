<template>
  <div class="load-container"  v-show="loading">
    <div class="boxLoading">
    </div>
    <span class="loadingText">Toyar Admin</span>
  </div>
   <slot/>
</template>
<script setup>

const props = defineProps({
  loading:{
    default:false
  }
})
</script>
<style lang="scss" scoped>
@import url('/static/loading.css');
</style>
