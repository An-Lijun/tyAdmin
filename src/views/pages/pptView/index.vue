<template>
  <div>
    <tHeader title="pdf预览" info="toyar-admin pdf预览" />
    <TyTabs v-model="activeName" trigger="click">
      <TyTabItem title="pdfjs" name="pdfjs">
        <PdfViewer style="height: 800px;" :file="getAssetURL('/assets/pdfs/test.pdf')" />

      </TyTabItem>
      <TyTabItem title="vueOffice" name="vueOffice">
        <VueOfficePdf :src="getAssetURL('/assets/pdfs/test.pdf')" style="height: 500px;"  />
      </TyTabItem>

    </TyTabs>
  </div>
</template>
<script setup>
import PdfViewer from '@/components/pdfViewer.vue';
import { getAssetURL } from '@/common'
import { ref } from 'vue'
import THeader from '@/components/tHeader.vue';
import VueOfficePdf  from '@vue-office/pdf'

const activeName = ref('pdfjs')

</script>
<style lang="scss" scoped></style>
