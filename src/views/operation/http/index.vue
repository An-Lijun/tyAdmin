<template>
  <div>
    <tHeader title="http" info="toyar-admin内部封装基于axois的http" />
    <div class="tyAdmin__container">
      <TyButton @click="toPost">
        发起
      </TyButton>
    </div>
  </div>
</template>
<script setup>
import tHeader from '@/components/tHeader.vue'
import { ref, watch } from 'vue'
import http from '@/common/communication/src/http/index'
const toPost = async () => {
  let res = await http.get('/pr11')
}

// setTimeout(()=>{
//   for (let index = 0; index < 11; index++) {
//     toPost()
//   }
// }
// ,3000)
</script>
<style lang="scss" scoped></style>
