<template>
  <TyCard :border="true" shadow="shadow" >
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
:deep(.ty-card.is-border){
  border-right: unset ;
  border-top: unset;
  border-left: unset;

  border-radius: unset;
}
.header-card {
  height: 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 16px;
  .header-title {
    font-size: 24px;
    font-weight: bold;
  }

  .header-info {
    color: var(--text-2);
  }
}
</style>
