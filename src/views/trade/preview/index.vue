<template>
  <div>
    <tHeader title="图片预览" info="toyar-admin 支持图片预览" />
    <div class="tyAdmin__container">
      <TyCard :border="false">
        <TyRow :gutter="16">
          <TyCol span="6" v-for="(img,index) in previewImgList">
            <img :src="img" style="width: 100%; height: 200px; border-radius: 4px;" @click="open(index)"/>
          </TyCol>
        </TyRow>
        <tPreviewImg v-model="pre" :previewImgList="previewImgList" :index="index"></tPreviewImg>
      </TyCard>
    </div>
  </div>
</template>
<script setup>
import tPreviewImg from '../../../components/tPreviewImg.vue';
import { ref } from 'vue'
import tHeader from '@/components/tHeader.vue'

let previewImgList = [
  'https://tse4-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?rs=1&pid=ImgDetMain',
  'https://ts1.cn.mm.bing.net/th/id/R-C.66d7b796377883a92aad65b283ef1f84?rik=sQ%2fKoYAcr%2bOwsw&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140305%2f1-140305131415.jpg&ehk=Hxl%2fQ9pbEiuuybrGWTEPJOhvrFK9C3vyCcWicooXfNE%3d&risl=&pid=ImgRaw&r=0',
  'https://ts1.cn.mm.bing.net/th/id/R-C.9e45a633e95179a37c907fa2797999ad?rik=aMuPS4TunAh5ZA&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140303%2f1-140303214Q2.jpg&ehk=P%2firfYpARc1fHht%2bWpapYR4W15p6SLABE8CBexoeon4%3d&risl=&pid=ImgRaw&r=0'
]
const pre = ref(false)
const index = ref(0)

const open = (val) => {
  index.value=val
  pre.value = true
}
</script>
<style lang="scss" scoped>
.header-card {
  padding: 16px;

  .header-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 14px;
  }

  .header-info {
    color: var(--text-2);
  }
}
</style>
