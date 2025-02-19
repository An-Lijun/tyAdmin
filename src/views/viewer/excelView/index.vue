<template>
  <div>
    <tHeader title="excel预览" info="toyar-admin excel预览" />
    <TyTabs v-model="activeName" trigger="click">
      <TyTabItem title="xlsx" name="xlsx">
        <ExcelViewer :url="getAssetURL('/assets/pdfs/test.xlsx')"></ExcelViewer>

      </TyTabItem>
      <TyTabItem title="vueOffice" name="vueOffice">
        <VueOfficeExcel :src="getAssetURL('/assets/pdfs/test.xlsx')" style="height: 500px;" :options="options" />
      </TyTabItem>

    </TyTabs>
  </div>
   
</template>
<script setup>
import { getAssetURL } from '@/common';
import ExcelViewer from '@/components/excelViewer.vue';
import THeader from '@/components/tHeader.vue';
import { ref } from 'vue'

const activeName = ref('xlsx')
import VueOfficeExcel from '@vue-office/excel'
const options = {
  xls: false,       //预览xlsx文件设为false；预览xls文件设为true
  minColLength: 0,  // excel最少渲染多少列，如果想实现xlsx文件内容有几列，就渲染几列，可以将此值设置为0.
  minRowLength: 0,  // excel最少渲染多少行，如果想实现根据xlsx实际函数渲染，可以将此值设置为0.
  widthOffset: 10,  //如果渲染出来的结果感觉单元格宽度不够，可以在默认渲染的列表宽度上再加 Npx宽
  heightOffset: 10, //在默认渲染的列表高度上再加 Npx高
  beforeTransformData: (workbookData) => { return workbookData }, //底层通过exceljs获取excel文件内容，通过该钩子函数，可以对获取的excel文件内容进行修改，比如某个单元格的数据显示不正确，可以在此自行修改每个单元格的value值。
}
</script>
<style lang="scss" scoped>
</style>
