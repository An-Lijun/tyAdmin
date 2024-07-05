<template>
  <div class="divRoot">
    <tHeader title="二维码" info="toyar-admin 集成qrcode库 使用tQrCode组件进行使用 以下是使用实例" />
    <div class="tyAdmin__container">
      <ty-row :gutter="8" style="margin: 0 -4px;">
        <ty-col :span="6" v-for="item in qrList">
          <TyCard>
            <template #header>
              {{ item.title }}
            </template>
            <div style="overflow: hidden; display: flex;justify-content: center;align-items: center;">
              <tQrCode ref="downLodRef"  @click="downLod($event)" :logo="item.logo" :options="item.options" :tag="item.tag" :value="item.value" :width="300"
                :size="300" />
            </div>
          </TyCard>
        </ty-col>
      </ty-row>
    </div>
  </div>
</template>
<script setup>
import tQrCode from '@/components/tQrCode/index.vue';
import { getAssetURL } from '@/common'
import {ref} from 'vue'
import tHeader from '@/components/tHeader.vue'

const qrList = [
  {
    title: '网址',
    value: 'https://an-lijun.github.io/toyarDesign/index.html'
  },
  {
    title: '文字',
    value: '你好Toyar'
  },
  {
    title: '图片',
    value: 'https://img3.redocn.com/tupian/20160316/qingxinpugongyingqingxinbeijing_6012341.jpg'
  },
  {
    title: '渲染成图片展示',
    value: '你好Toyar',
    tag: 'img'
  },
  {
    title: '配置样式',
    value: '你好Toyar',
    options: {
      color: { dark: '#55D187' },
    }
  },
  {
    title: '渲染logo',
    value: '你好Toyar',
    logo: getAssetURL('/assets/system/logo.png')
  },
  {
    title: '配置logo',
    value: '你好Toyar',
    logo: {
      src: getAssetURL('/assets/system/logo.png'),
      logoSize: 0.2,
      borderSize: 0.05,
      borderRadius: 50,
      bgColor: 'skyblue',
    }
  },
  {
    title: '单击下载',
    value: '你好Toyar',
    cls:'downLodRef'
  },
]
const downLodRef =ref()
const downLod =(e)=>{
  console.log(downLodRef.value[7].download());
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
    color: #333;
  }
}
</style>
