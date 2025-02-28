<template>
    <div class="selfButtonList entry">
      <TyButton type="secondary"> 手机登录 </TyButton>
      <TyButton type="secondary"> 二维码登录 </TyButton>
      <TyButton type="secondary" @click="toLogin"> 登录 </TyButton>
    </div>
</template>
<script setup>
const emit = defineEmits('changeType')
const toLogin=()=>{
   emit('changeType','password')
}
</script>
<style lang="scss" scoped>
.selfButtonList {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  :deep(.ty-button) {
    padding: 0 45px;
  }
}
</style>
