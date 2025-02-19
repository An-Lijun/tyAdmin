<template>
  <div>
    <tHeader title="加密" info="toyar-admin内部封装基于worker和crypto-js的加密" />
    <div class="tyAdmin__container">
      <TyRow>
        <template v-for="item in LS">

          <TyCol span="12">
            <TyCard style="margin-top: 20px;">
              <template #header>
                {{ item.title }}加密 {{ item.desc }}
              </template>
              <div>
                <TyInput v-model="item.model" :placeholder="`请输入${item.title}`" />
                <br>
                <div style=" display:  flex; justify-content: space-between;">
                  <TySpace>
                    <TyButton @click="encryptFn(item)">编码</TyButton>
                     <TyButton v-if="item.needDecode" @click="decryptFn(item)" state="danger">解码</TyButton>
                 
                  </TySpace> 
                  <div>
                    {{ item.enStr }}
                  </div>
                </div>

              </div>
            </TyCard>
          </TyCol>
        </template>

      </TyRow>

    </div>
  </div>
</template>
<script setup>
import tHeader from '@/components/tHeader.vue'
import { ref } from 'vue'
import { encrypt } from '@/common/encrypt'
import CryptoJS from 'crypto-js'
var sha256 = CryptoJS.algo.SHA256.create();

sha256.update("Message Part 1");
sha256.update("Message Part 2");
sha256.update("Message Part 3");

var hash = sha256.finalize();
// console.log(CryptoJS.SHA256('Message Part 1Message Part 2Message Part 3'));

// console.log(hash);
// console.log(CryptoJS.PBKDF2("Secret Passphrase",
//  '12345', { keySize: 512/32, iterations: 1000 })

// );
// console.log(CryptoJS.HmacMD5("Message", "Secret Passphrase"));
// let hash1 = CryptoJS.AES.encrypt("Message", "Secret Passphrase")
// console.log(hash1.toString(CryptoJS.enc.Hex));
var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase").toString();

var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");

// 
console.log(decrypted.toString(CryptoJS.enc.Utf8));

console.log( CryptoJS.AES.decrypt('U2FsdGVkX1+yfrNIYLZxM3jaULoR9JwK50GM4gHstT0=','SecretSalt').toString(CryptoJS.enc.Utf8));


const LS = ref([
  {
    title: 'MD5',
    model: '',
    enStr: '',
    options:{
      format:'Hex'
    },
    desc:'format Hex'
  },
  {
    title: 'MD5',
    model: '',
    enStr: '',
    options:{
      format:'Base64'
    },
    desc:'format Base64'
  },
  {
    title: 'MD5',
    model: '',
    enStr: '',
    options:{
      format:'Latin1'
    },
    desc:'format Latin1'
  },
  {
    title: 'SHA1',
    model: '',
    enStr: ''
  },
  {
    title: 'SHA224',
    model: '',
    enStr: ''
  },
  {
    title: 'SHA256',
    model: '',
    enStr: ''
  },
  {
    title: 'SHA3',
    model: '',
    enStr: ''
  },
  {
    title: 'SHA512',
    model: '',
    enStr: ''
  },
  {
    title: 'SHA3',
    model: '',
    enStr: '',
    options: {
      params: {
        outputLength: 512
      }
    },
    desc:'512位'
  },
  {
    title: 'HmacMD5',
    model: '',
    enStr: '',
    options: {
      params: 'Secret Passphrasemiyao'
    },
  },
  {
    title: 'HmacSHA1',
    model: '',
    enStr: '',
    options: {
      params: 'Secret Passphrasemiyao'
    },
  },
  {
    title: 'HmacSHA256',
    model: '',
    enStr: '',
    options: {
      params: 'Secret Passphrasemiyao'
    },
  },
  {
    title: 'HmacSHA512',
    model: '',
    enStr: '',
    options: {
      params: 'Secret Passphrasemiyao'
    },
  },

  {
    title: 'PBKDF2',
    model: '',
    enStr: '',
    options: {
      params: ['SecretSalt',{keySize: 128/32}]
    },
    desc:'keySize: 128/32'
  },
  {
    title: 'PBKDF2',
    model: '',
    enStr: '',
    options: {
      params: ['SecretSalt',{keySize: 256/32}]
    },
    desc:'keySize: 256/32'
  },
  {
    title: 'PBKDF2',
    model: '',
    enStr: '',
    options: {
      params: ['SecretSalt',{keySize: 512/32}]
    },
    desc:'keySize: 512/32'
  },
  {
    title: 'PBKDF2',
    model: '',
    enStr: '',
    options: {
      params: ['SecretSalt',{keySize: 512/32,iterations:1000}]
    },
    desc:'keySize: 512/32 iterations 1000'
  },

  {
    title: 'AES',
    model: '',
    enStr: '',
    needDecode:true,
    options: {
      params:'SecretSalt'
    },
  },
])
const encryptFn = async (item) => {

  let res = await encrypt([
    item.model,
    item.title,
    item.options
  ])
  item.enStr = res
}


const decryptFn = async(item)=>{
  let res = await encrypt([
    item.enStr,
    item.title,
    {
      ...item.options,
      decrypt:true
    }
  ])
  item.enStr = res
}
</script>
<style lang="scss" scoped></style>
