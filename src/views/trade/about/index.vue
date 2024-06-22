<template>
  <div>
    <TyCard :border="false">
      <div class="header-card">
        <div class="header-title">
          关于
        </div>
        <div class="header-info">
          toyar-admin 是一个基于Vue3.0、Vite、 toyar-design、TypeScript 的后台解决方案，目标是为中大型项目开发,提供现成的开箱解决方案及丰富的示例,原则上不会限制任何代码用于商用。
        </div>
      </div>
    </TyCard>
    <div class="tyAdmin__container">
    </div>
  </div>
</template>
<script setup>
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
    color: #333;
  }
}
</style>
