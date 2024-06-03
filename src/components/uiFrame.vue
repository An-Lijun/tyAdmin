<template>
  <!-- v-loading="loading1" -->
  <div style="width: 100%; height: 100%; overflow: hidden;">
    <iframe @load="handleLoad":src="frameSrc" frameborder="0" style="width: 100%; height: 100%; overflow: hidden;"></iframe>
  </div>
</template>
<script setup>
import {ref} from 'vue'
const props = defineProps({
  frameSrc:{
    type:String,
    required:true
  }
})
// let loading1 = ref(false)
  // setTimeout(() => {
  //   loading1.value = true    
  // }, 500);
</script>
<style lang="scss" scoped>
</style>
