<template>
  <div class="ty-feat-icon">

  <TyCard :border="false" >
    <h2>Icon组件示例</h2>
  </TyCard>
  <div class="tyAdmin__container">
    <ty-caution title="推荐使用ToyarIcon组件" style="margin-bottom: 16px;">
      Icon组件基本包含所有的图标,在下面网址内你可以查询到你想要的任何图标。并且打包只会打包所用到的图标。
    </ty-caution>
    <TyCard :border="false" >
      <template #header>
          Toyar-Design Icon使用
      </template>
        <div style="display: flex; justify-content: space-around;">
          <span v-for=" item in tyIconLs" >
            <component :is="item"></component>
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
      <component :is="icon"></component>
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
import {TyiArrowUpCircleFill,TyiArrowDownCircleFill,TyiArrowRightCircleFill,TyiArrowLeftCircleFill} from 'toyaricon'
const iconName =ref('')
const icon = ref('')

const getIcons1=()=>{
  
}
let tyIconLs=[
  TyiArrowUpCircleFill,TyiArrowDownCircleFill,TyiArrowRightCircleFill,TyiArrowLeftCircleFill
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
