<template>
  <div class="divRoot">
    <!-- <img src="/logo.png" alt=""> -->
    <TyButton @click="open" style="margin-right: 20px;">打开外部页面</TyButton>

    <!-- <a href="" target="_blank"></a> -->
    <TyButton @click="openOut">打开内部静态页面(iframe + router)</TyButton>

  </div>
</template>
<script setup>
import {getAsset} from '@/common'
const open =()=>{
  window.open('https://an-lijun.github.io/toyarDesign/index.html')
}
const openOut =()=>{
  window.open('http://localhost/#/outByIframe',{
    target:'_blank'
  })
}
</script>
<style lang="less" scoped>
</style>
