<template>
  <div >
    <PdfViewer style="height: 800px;" :file ="getAssetURL('/assets/pdfs/test.pdf')" />
  </div>
</template>
<script setup>
import PdfViewer from '@/components/pdfViewer.vue';
import {getAssetURL} from '@/common'
</script>
<style lang="scss" scoped>
</style>
