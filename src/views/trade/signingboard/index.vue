<template>
  <div>
    <TyCard :border="false">
      <div class="header-card">
        <div class="header-title">
          签字版
        </div>
        <div class="header-info">
          toyar-admin 支持签字版
        </div>
      </div>
    </TyCard>
    <div class="tyAdmin__container">
        <tSigningBoard width="100%" :height="800"/>
    </div>
  </div>
</template>
<script setup>
import tSigningBoard from '../../../components/tSigningBoard.vue';


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
