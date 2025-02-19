<template>
  <div>

    <tHeader title="图表" info="toyar-admin 集成Echars图标库 使用tChart组件进行使用 以下是使用实例" />

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
import tHeader from '@/components/tHeader.vue'

</script>
<style lang="scss" scoped>

</style>
