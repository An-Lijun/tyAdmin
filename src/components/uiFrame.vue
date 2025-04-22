<template>
  <!-- v-loading="loading1" -->
  <div style="width: 100%; height: 100%; overflow: hidden;">
    <iframe  ref="iframe" @load="handleLoad":src="frameSrc" frameborder="0" style="width: 100%; height: 100%; overflow: hidden;"></iframe>
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
const emit = defineEmits(['load'])
const iframe = ref(null)
const handleLoad =()=>{
  emit('load',iframe)
}
// let loading1 = ref(false)
  // setTimeout(() => {
  //   loading1.value = true    
  // }, 500);
</script>
<style lang="scss" scoped>
</style>
