<template>
  <div>
    <excelViewer/>
    <tHeader title="关于"
      info="toyar-admin 是一个基于Vue3.0、Vite、 toyar-design、TypeScript 的后台解决方案，目标是为中大型项目开发,提供现成的开箱解决方案及丰富的示例,原则上不会限制任何代码用于商用。" />
      <div class="tyAdmin__container">
      <TyCard :border="false">
        <template #header>
          项目信息
        </template>
        <TyDescriptions layout="row" :data="projectData">

        </TyDescriptions>
      </TyCard>

      <TyCard :border="false" style="margin: 16px 0;">
        <template #header>
          生产依赖
        </template>
        <TyDescriptions layout="row" :data="dependencieLs">

        </TyDescriptions>
      </TyCard>


      <TyCard :border="false">
        <template #header>
          开发依赖
        </template>
        <TyDescriptions layout="row" :data="devDependencieLs">

        </TyDescriptions>
      </TyCard>
    </div>
  </div>
</template>
<script setup>
import { dependencies, devDependencies, name, version } from '/package.json'
import { TyDescriptions } from 'toyar-design'
import { formatDate } from 'robinson'
import tHeader from '@/components/tHeader.vue'
import excelViewer from '@/components/excelViewer.vue'
const projectData = [
  {
    label: '版本',
    value: version
  },
  {
    label: '最后编译时间',
    value: formatDate(new Date(), 'YYYY-MM-DD')
  },
  {
    label: '文档地址',
    value: '文档地址',
  },
  {
    label: '预览地址',
    value: '预览地址',
  },
  {
    label: 'Github',
    value: 'Github',
  }
]
let dependencieLs = []
for (const key in dependencies) {
  dependencieLs.push({
    label: key,
    value: dependencies[key],
  })
}
let devDependencieLs = []
for (const key in devDependencies) {
  devDependencieLs.push({
    label: key,
    value: devDependencies[key],
  })
}
</script>
<style lang="scss" scoped></style>
