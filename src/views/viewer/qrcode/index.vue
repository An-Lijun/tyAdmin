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

        <ty-col :span="6" v-for="item in qrList2">
          <TyCard>
            <template #header>
              {{ item.title }}
            </template>
            <div style="overflow: hidden; display: flex;justify-content: center;align-items: center;">
              <!-- <tQrCode ref="downLodRef"  @click="downLod($event)" :logo="item.logo" :options="item.options" :tag="item.tag" :value="item.value" :width="300"
                :size="300" /> -->
              <sQrCode :options="item" :width="300" :value="111111111111" />
            </div>
          </TyCard>
        </ty-col>
      </ty-row>
    </div>
  </div>
</template>
<script setup>
import tQrCode from '@/components/tQrCode/index.vue';
import sQrCode from '@/components/sQrCode/index.vue';

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


const qrList2  = [
  {
    "type": "fusion",
    "level": "M",
    "backgroundImage": getAssetURL("./assets/image/bg/girl.jpeg"),
    "backgroundColor": "#ffcc60"
  },
  {
    "id": "show",
    "type": "fusion",
    "backgroundImage":  getAssetURL("./assets/image/bg/monkey.jpeg"),
    "backgroundColor": "#ece8dd",
    "foregroundColor": "#000000",
    "text": "",
    "text-color": "#2c2b2e",
    "text-stroke": "#ece8dd"
  },
  {
    "type": "diamond",
    "logo": getAssetURL( "./assets/image/logo/snail.png"),
    "foregroundImage":getAssetURL( "./assets/image/skin/grass.png"),
    "backgroundColor": "#fff2dc",
    "inner-color": "#094304"
  },
  {
    "type": "water",
    "logo":  getAssetURL("./assets/image/logo/earth.png"),
    "foregroundColor": "#6d327c,#485DA6,#00a1ba,#00BF98,#36C486",
    "backgroundColor": "#f1f8ff",
    "inner-color": "#845EC2"
  },
  {
    "type": "heart",
    "logo":  getAssetURL("./assets/image/logo/octopus.png"),
    "foregroundColor": "#ff9999",
    "backgroundColor": "#fff7f7",
    "inner-color": "#ce5050"
  },
  {
    "type": "hexagon",
    "foregroundColor": "#17252a,#2b7a78,#3aafa9",
    "backgroundColor": "#def2f1",
    "inner-color": "#17252a"
  },
  {
    "type": "bar",
    "foregroundColor": "#3b8686,#79bd9a,#f8ca00,#008c9e",
    "backgroundColor": "#f0f5f9",
    "inner-color": "#3B4E32"
  },
  {
    "type": "glitter",
    "foregroundColor": "#fe4365,#fc9d9a,#6d9d88,#490a3d",
    "backgroundColor": "#f9f1f1",
    "inner-color": "#881600",
    "outer-color": "#343838"
  },
  {
    "type": "rect",
    "foregroundColor": "#4abdac,#fc4a1a,#f7b733",
    "backgroundColor": "#f9f6f3",
    "inner-color": "#d66c44",
    "outer-color": "#037584"
  },
  {
    "type": "star",
    "level": "L",
    "foregroundColor": "#fc9000,#ffa935,#ffb756",
    "backgroundColor": "#034690"
  },
  {
    "type": "stroke",
    "foregroundColor": "#150f3f,#fb3242,#018bf8",
    "backgroundColor": "#edfaff"
  }
]
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
