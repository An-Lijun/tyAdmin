<template>
  <div class="divRoot">
    <TyButton @click="open">打开</TyButton>
  </div>
</template>
<script setup>
const windowFeatures = "left=100,top=100,width=320,height=320";
import {openWindow} from '@/common'
// const open =()=>{
//   window.open('https://an-lijun.github.io/toyarDesign/index.html', "mozillaWindow",windowFeatures)
// }
let url = 'https://an-lijun.github.io/toyarDesign/index.html'
const open =()=>{
  openWindow(url,{
    target:'mozillaWindow',
    left:100,top:100,width:320,height:320
  })
}
</script>
<style lang="less" scoped>
</style>
