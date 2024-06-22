<template>
  <div>
    <TyCard :border="false">
      <div class="header-card">
        <div class="header-title">
          图表
        </div>
        <div class="header-info">
          toyar-admin 集成Echars图标库 使用tChart组件进行使用 以下是使用实例
        </div>
      </div>
    </TyCard>
    <div class="tyAdmin__container">
    <ty-row :gutter="8" style="margin: 0 -4px;">
      <ty-col :span="8" v-for="item in chars">
        <TyCard>
          <template #header>
            {{ item.title }}
          </template>
          <tChart height="300px" :option="item.option"></tChart>
        </TyCard>
      </ty-col>
    </ty-row>
  </div>
  </div>

</template>
<script setup>
import tChart from '@/components/tChart.vue'
import chars from './data'
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
