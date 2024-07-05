<template>
  <TyCard :border="false">
    <div class="header-card">
      <div class="header-title">
        {{ title }}
      </div>
      <div class="header-info">
        {{ info }}
      </div>
    </div>
  </TyCard>
</template>
<script setup>
const props = defineProps({
  title:{
    type:String,
    required:true
  },
  info:{
    type:String
  }
})
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
