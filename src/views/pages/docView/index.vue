<template>
  <div>
    <tHeader title="doc预览" info="toyar-admin doc预览" />
    <TyTabs v-model="activeName" trigger="click">
      <TyTabItem title="others" name="others">
      </TyTabItem>
      <TyTabItem title="vueOffice" name="vueOffice">
        <VueOfficeDocx :src="getAssetURL('/assets/pdfs/test.docx')" style="height: 500px;"  />
      </TyTabItem>

    </TyTabs>
  </div>
   
</template>
<script setup>
import { getAssetURL } from '@/common';
import ExcelViewer from '@/components/excelViewer.vue';
import THeader from '@/components/tHeader.vue';
import { ref } from 'vue'

const activeName = ref('vueOffice')
import VueOfficeDocx from '@vue-office/docx'
//引入相关样式
import '@vue-office/docx/lib/index.css'

</script>
<style lang="scss" scoped>
</style>
