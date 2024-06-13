<template>
  <div class="divRoot">
    <TyButton @click="open" style="margin-right: 20px;">打开外部页面</TyButton>

    <TyButton @click="openOut" style="margin-right: 20px;">打开内部静态页面(iframe + router 半屏)</TyButton>

    <TyButton @click="openOut1">打开内部静态页面(iframe + router 全屏)</TyButton>
  </div>
</template>
<script setup>
//打开外部页面
import {getAssetURL} from '@/common'

// 打开外部网站
const open =()=>{
  window.open('https://an-lijun.github.io/toyarDesign/index.html')
}

// 打开半屏幕新窗口的iframe
const openOut =()=>{
  window.open('http://localhost/#/trade/outByIframe',{
    target:'_blank'
  })
}

//打开全屏的新窗口iframe
const openOut1 =()=>{
  window.open('http://localhost/#/outByIframe',{
    target:'_blank'
  })
}
</script>
<style lang="less" scoped>
</style>
