<template>
  <div>
    <tHeader title="编码" info="toyar-admin内部封装的编解码api" />
    <div class="tyAdmin__container">
      <TyCard>
        <template #header>
          base64
        </template>
        <div>
          <TyInput v-model="base64" placeholder="请输入base64" />
          <br>
          <TySpace>
            <TyButton @click="encodeT()">编码</TyButton>
            <TyButton state="danger" @click="decodeT()">解码</TyButton>
          </TySpace>
          <br>
          <br>
          <div>
            {{ str }}
          </div>
        </div>
      </TyCard>

      <br>
      <TyCard>
        <template #header>
          encodeURI 如:my test.asp?name=ståle&car=saab
        </template>
        <div>
          <TyInput v-model="uriCode" placeholder="请输入encodeURI" />
          <br>
          <TySpace>
            <TyButton @click="encodeT1()">编码</TyButton>
            <TyButton state="danger" @click="decodeT1()">解码</TyButton>
          </TySpace>
          <br>
          <br>
          <div>
            {{ str1 }}
          </div>
        </div>
      </TyCard>


      <br>
      <TyCard>
        <template #header>
          encodeURI 如: https://w3school.com.cn/my test.asp?name=ståle&car=saab
        </template>
        <div>
          <TyInput v-model="uriCompCode" placeholder="请输入encodeURI" />
          <br>
          <TySpace>
            <TyButton @click="encodeT2()">编码</TyButton>
            <TyButton state="danger" @click="decodeT2()">解码</TyButton>
          </TySpace>
          <br>
          <br>
          <div>
            {{ str2 }}
          </div>
        </div>
      </TyCard>
    </div>
  </div>
</template>
<script setup>
import tHeader from '@/components/tHeader.vue'
import { ref } from 'vue'
import {
  base64Encode, base64Decode, uriEncode, uriDecode,
  uriCompDecode,
  uriCompEncode

} from '@/common/codeing/index'
const base64 = ref('')
const str = ref("")
const encodeT = () => {
  str.value = base64Encode(base64.value)
}
const decodeT = () => {
  str.value = base64Decode(str.value)
}


const uriCode = ref('')
const str1 = ref("")
const encodeT1 = () => {
  str1.value = uriEncode(uriCode.value)
}
const decodeT1 = () => {
  str1.value = uriDecode(str1.value)
}



const uriCompCode = ref('')
const str2 = ref("")
const encodeT2 = () => {
  console.log(uriCompEncode('1123'));
  
  str2.value = uriCompEncode(uriCompCode.value)
}
const decodeT2 = () => {
  str2.value = uriCompDecode(str2.value)
}

</script>
<style lang="scss" scoped></style>
