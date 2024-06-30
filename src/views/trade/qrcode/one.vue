<template>
  <div class="divRoot">
    <TyCard :border="false">
      <div class="header-card">
        <div class="header-title">
          一维码(条形码)
        </div>
        <div class="header-info">
          toyar-admin 集成jsbarcode库 使用tBarCode组件进行使用 以下是使用实例
        </div>
      </div>
    </TyCard>
    <div class="tyAdmin__container">
      <ty-row :gutter="8" style="margin: 0 -4px;">
        <ty-col :span="6" v-for="item in qrList">
          <TyCard>
            <template #header>
              {{ item.title }}
            </template>
            <div style="overflow: hidden; display: flex;justify-content: center;align-items: center;">
              <tBarCode style="min-height: 150px;" :value="item.value" :options="item.options" />
            </div>
          </TyCard>
        </ty-col>
      </ty-row>
    </div>
  </div>
</template>
<script setup>
import tBarCode from '@/components/tBarCode/index.vue';
import { getAssetURL } from '@/common'
import { ref } from 'vue'
const qrList = [
  {
    title: '普通用法',
    value: 'HELLOToyar',
    options: {

      height: 100,//高度
    }
  },
  {
    title: '不显示文字用法',
    value: 'HELLOToyar',
    options: {


      height: 100,//高度
      displayValue: false //是否在条形码下方显示文字
    }
  },
  {
    title: '设置条码距离',
    value: 'HELLOToyar',
    options: {


      height: 100,//高度
      width: 3,
      displayValue: false //是否在条形码下方显示文字
    }
  },
  {
    title: '覆盖显示的文本',
    value: 'HELLOToyar',
    options: {


      height: 100,//高度
      width: 3,
      text: "Toyar",//覆盖显示的文本
      displayValue: true,//是否在条形码下方显示文字
    }
  },
  {
    title: '覆盖显示的文本(斜体)',
    value: 'HELLOToyar',
    options: {


      height: 100,//高度
      width: 3,
      text: "Toyar",//覆盖显示的文本
      displayValue: true,//是否在条形码下方显示文字
      fontOptions: "italic",//使文字加粗体或变斜体
    }
  },
  {
    title: '覆盖显示的文本(加粗)',
    value: 'HELLOToyar',
    options: {


      height: 100,//高度
      width: 3,
      text: "Toyar",//覆盖显示的文本
      displayValue: true,//是否在条形码下方显示文字
      fontOptions: "bold",//使文字加粗体或变斜体
    }
  },
  {
    title: '覆盖显示的文本(加粗斜体)',
    value: 'HELLOToyar',
    options: {


      height: 100,//高度
      width: 3,
      text: "Toyar",//覆盖显示的文本
      displayValue: true,//是否在条形码下方显示文字
      fontOptions: "bold italic",//使文字加粗体或变斜体
      // font:"fantasy",//设置文本的字体
      // textAlign:"right",//设置文本的水平对齐方式
      // textPosition:"top",//设置文本的垂直位置
      // textMargin:5,//设置条形码和文本之间的间距
      // fontSize:15,//设置文本的大小
      // background:"#eee",//设置条形码的背景
      // lineColor:"#FF7F50",//设置条和文本的颜色。
      // margin:15//设置条形码周围的空白边距
    }
  },
  {
    title: '覆盖显示的文本(修改字体)',
    value: 'HELLOToyar',
    options: {
      height: 100,//高度
      width: 3,
      text: "Toyar",//覆盖显示的文本
      displayValue: true,//是否在条形码下方显示文字
      // fontOptions:"bold italic",//使文字加粗体或变斜体
      font: "fantasy",//设置文本的字体
    }
  },
  {
    title: '覆盖显示的文本(对齐方式1)',
    value: 'HELLOToyar',
    options: {
      height: 100,//高度
      width: 3,
      text: "Toyar",//覆盖显示的文本
      displayValue: true,//是否在条形码下方显示文字
      // fontOptions:"bold italic",//使文字加粗体或变斜体
      font: "fantasy",//设置文本的字体
      textAlign: "right",//设置文本的水平对齐方式
    }
  },
  {
    title: '覆盖显示的文本(对齐方式2)',
    value: 'HELLOToyar',
    options: {
      height: 100,//高度
      width: 3,
      text: "Toyar",//覆盖显示的文本
      displayValue: true,//是否在条形码下方显示文字
      // fontOptions:"bold italic",//使文字加粗体或变斜体
      font: "fantasy",//设置文本的字体
      textAlign: "right",//设置文本的水平对齐方式
      textPosition: "top",//设置文本的垂直位置
    }
  },
  {
    title: '设置条形码和文本之间的间距',
    value: 'HELLOToyar',
    options: {
      height: 100,//高度
      width: 3,
      text: "Toyar",//覆盖显示的文本
      displayValue: true,//是否在条形码下方显示文字
      // fontOptions:"bold italic",//使文字加粗体或变斜体
      font: "fantasy",//设置文本的字体
      textAlign: "right",//设置文本的水平对齐方式
      textPosition: "top",//设置文本的垂直位置
      textMargin: 5,//设置条形码和文本之间的间距
    }
  },
  {
    title: '设置文本的大小',
    value: 'HELLOToyar',
    options: {
      height: 100,//高度
      width: 3,
      text: "Toyar",//覆盖显示的文本
      displayValue: true,//是否在条形码下方显示文字
      // fontOptions:"bold italic",//使文字加粗体或变斜体
      font: "fantasy",//设置文本的字体
      textAlign: "right",//设置文本的水平对齐方式
      textPosition: "top",//设置文本的垂直位置
      textMargin: 5,//设置条形码和文本之间的间距
      fontSize: 15,//设置文本的大小
    }
  },
  {
    title: '设置条形码的背景',
    value: 'HELLOToyar',
    options: {
      height: 100,//高度
      width: 3,
      text: "Toyar",//覆盖显示的文本
      displayValue: true,//是否在条形码下方显示文字
      // fontOptions:"bold italic",//使文字加粗体或变斜体
      font: "fantasy",//设置文本的字体
      textAlign: "right",//设置文本的水平对齐方式
      textPosition: "top",//设置文本的垂直位置
      textMargin: 5,//设置条形码和文本之间的间距
      fontSize: 15,//设置文本的大小
      background: "#eee",//设置条形码的背景
    }
  },
  {
    title: '设置条和文本的颜色',
    value: 'HELLOToyar',
    options: {
      height: 100,//高度
      width: 3,
      text: "Toyar",//覆盖显示的文本
      displayValue: true,//是否在条形码下方显示文字
      // fontOptions:"bold italic",//使文字加粗体或变斜体
      font: "fantasy",//设置文本的字体
      textAlign: "right",//设置文本的水平对齐方式
      textPosition: "top",//设置文本的垂直位置
      textMargin: 5,//设置条形码和文本之间的间距
      fontSize: 15,//设置文本的大小
      background: "#eee",//设置条形码的背景
      lineColor: "skyblue",//设置条和文本的颜色。
    }
  },
  {
    title: '设置条形码周围的空白边距',
    value: 'HELLOToyar',
    options: {
      height: 100,//高度
      width: 3,
      text: "Toyar",//覆盖显示的文本
      displayValue: true,//是否在条形码下方显示文字
      // fontOptions:"bold italic",//使文字加粗体或变斜体
      font: "fantasy",//设置文本的字体
      textAlign: "right",//设置文本的水平对齐方式
      textPosition: "top",//设置文本的垂直位置
      textMargin: 5,//设置条形码和文本之间的间距
      fontSize: 15,//设置文本的大小
      background: "#eee",//设置条形码的背景
      lineColor: "skyblue",//设置条和文本的颜色。
      margin: 15//设置条形码周围的空白边距
    }
  }
]

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
