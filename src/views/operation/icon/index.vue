<template>
  <div class="ty-feat-icon">

  <TyCard :border="false" >
    <h2>Icon组件示例</h2>
  </TyCard>
  <div class="tyAdmin__container">
    <TyCard :border="false" >
      <template #header>
          Toyar-Design Icon使用
      </template>
        <div style="display: flex; justify-content: space-around;">
          <span v-for=" item in tyIconLs" >
            <TyIcon  :icon="item" size="50"></TyIcon>
          </span>
        </div>
    </TyCard>

    <TyCard :border="false" style="margin-top: 14px;">
      <template #header>
          tyAdmin  svgIcon使用
      </template>
        <div style="display: flex; justify-content: space-around;">
          <span v-for=" item in tySvgIconLs" >
            <svgIcon  :icon="item" style="width: 50px;"></svgIcon>
          </span>
        </div>
    </TyCard>
    <TyCard :border="false" style="margin-top: 14px;">
      <template #header>
          Icon选择器使用
      </template>
      <TyIcon :icon="icon" style="font-size: 40px;"></TyIcon>
      <iconSelect v-model="icon"/>
    </TyCard>

    <TyCard :border="false" style="margin-top: 14px;">
      <template #header>
          svgIcon选择器使用
      </template>
      <div style="width: 40px;height: 40px;margin-bottom: 10px;">
        <svgIcon :icon="iconName" style="width: 40px;height: 40px;margin-bottom: 10px;"></svgIcon>
      </div>
      <svgIconSelect v-model="iconName"/>
    </TyCard>
  </div>
  </div>
</template>
<script setup>
import svgIcon from '@/components/svgIcon.vue'
import iconSelect from '@/components/iconSelect.vue'
import svgIconSelect from '@/components/svgIconSelect.vue'

import {ref} from 'vue'
const iconName =ref('')
const icon = ref('')
let tyIconLs=[
  'ty-arrow-up-circle-fill',
  'ty-arrow-down-circle-fill',
  'ty-arrow-right-circle-fill',
  'ty-arrow-left-circle-fill'
]
let tySvgIconLs =[
  'dynamic-avatar-1',
  'dynamic-avatar-2',
  'dynamic-avatar-3',
  'dynamic-avatar-4',
]

</script>
<style lang="scss" scoped>
</style>
