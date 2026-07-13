<template>
  <div>
    <tHeader title="签字版" info="toyar-admin支持签字版" />
    <div class="tyAdmin__container">
      <tSigningBoard width="100%" :height="800" />
    </div>
  </div>
</template>
<script setup>
import tSigningBoard from '../../../components/tSigningBoard.vue';
import tHeader from '@/components/tHeader.vue'

</script>
<style lang="scss" scoped>

</style>
