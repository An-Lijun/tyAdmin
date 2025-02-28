<template>
    <div class="selfButtonList entry">
      <TyButton type="secondary"> 手机登录 </TyButton>
      <TyButton type="secondary"> 二维码登录 </TyButton>
      <TyButton type="secondary" @click="toRegistry"> 注册 </TyButton>
    </div>
</template>
<script setup>
const emit = defineEmits('changeType')

const toRegistry = () => {
  emit('changeType', 'registry')
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
