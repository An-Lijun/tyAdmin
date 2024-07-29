<template>
  <div class="divRoot">
    <tHeader title="函数打开外链/路由" info="toyar-admin openWindow打开外链" />

    <div class="tyAdmin__container">
      <TyCard>
        <TySpace>
          <TyButton @click="open" style="margin-right: 20px;">打开外部页面</TyButton>
          <TyButton @click="openOut" style="margin-right: 20px;">打开内部静态页面(iframe + router 半屏)</TyButton>
          <TyButton @click="openOut1">打开内部静态页面(iframe + router 全屏)</TyButton>
        </TySpace>
      </TyCard>
    </div>
  </div>
</template>
<script setup>
//打开外部页面
import {getAssetURL} from '@/common'
import {openWindow} from '@/common'
import tHeader from '@/components/tHeader.vue'

// 打开外部网站
const open =()=>{
  openWindow('https://an-lijun.github.io/toyarDesign/index.html',{target:'_blank'})
}

// 打开半屏幕新窗口的iframe
const openOut =()=>{
  openWindow('http://localhost/#/page/openHarfoutByIframe',{
    target:'_blank'
  })
}

//打开全屏的新窗口iframe
const openOut1 =()=>{
  openWindow('http://localhost/#/outByIframe',{
    target:'_blank'
  })
}
</script>

