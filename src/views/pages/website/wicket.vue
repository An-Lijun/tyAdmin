<template>
  <div class="divRoot">
    <TyButton @click="open" style="margin-right: 20px;">打开外部网页模态</TyButton>

    <TyButton @click="open1" style="margin-right: 20px;">打开内部html模态</TyButton>

    <TyButton @click="send">向外部推送消息 </TyButton>

  </div>
</template>
<script setup>
const windowFeatures = "left=100,top=100,width=320,height=320";
import {openWindow} from '@/common'


let model1;
// 打开模态窗口  也可以打开内部的html 模板
let url = 'https://an-lijun.github.io/toyarDesign/index.html'
const open =()=>{
   openWindow(url,{
    target:'mozillaWindow',
    left:100,top:100,width:320,height:320
  })
}

const open1 =()=>{
  model1= openWindow('http://localhost/#/outByIframe',{
    target:'mozillaWindow',
    left:100,top:100,width:320,height:320
  })
}

const send=()=>{
  if(!model1){
    return
  }
  // console.log(model);
  /**
   * otherWindow.postMessage(message, targetOrigin, [transfer]);
   * 
   * otherWindow 目标窗口。比如 iframe 的 contentWindow 属性
   * message,将要发送到其他 窗口 的数据。
   * targetOrigin 目标窗口的域。其值可以是字符串"*"（表示无限制）或者一个 URI。
   * 不提供确切的 targetOrigin 将导致数据泄露到任何对数据感兴趣的恶意站点。
   */
  //  model1.window
  // console.log(model1.window);
  // console.log();
  model1.window.postMessage('你好','*')

}
</script>
<style lang="less" scoped>
</style>
