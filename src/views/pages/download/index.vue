<template>
  <div class="ty-feat-icon">
    <TyCard :border="false">
      <h2>下载示例</h2>
    </TyCard>
    <div class="tyAdmin__container">
      <TyCard :border="false">
        <TyButton @click="downByUrl" style="margin-right: 15px;"> url下载</TyButton>
        <TyButton @click="downByBlob" style="margin-right: 15px;"> blob流下载</TyButton>
        <TyButton @click="downByBase64" style="margin-right: 15px;"> base64流下载</TyButton>
      </TyCard>
    </div>
  </div>
</template>
<script setup>
import { downloadByUrl, downloadByBlob, downloadByBase64 } from 'robinson'
import { base64 } from './data';
const downByUrl = () => {
  downloadByUrl('http://localhost:80/logo.png')
}
const downByBlob = () => {
  downloadByBlob('aaa','a.txt','text/plain')
}
const downByBase64 = () => {
  downloadByBase64(base64,'logo.png','image/png')
}
</script>
<style lang="scss" scoped></style>
