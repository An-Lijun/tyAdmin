<template>
  <div>
    <tHeader title="excel" info="toyar-admin excel下载" />
    <div class="tyAdmin__container">

      <TyTabs v-model="activeName" trigger="click">
        <TyTabItem title="data下载" name="data">
          <TyButton @click="downloadByData()" >data下载 </TyButton>
        </TyTabItem>
        <TyTabItem title="table下载" name="table">
          <TyButton @click="downloadByTable()" style="margin-bottom: 20px;">table下载 </TyButton>
          <TyTable :columns="columns" :data="data" ref="tableRef" />
        </TyTabItem>

      </TyTabs>
    </div>
  </div>

</template>
<script setup>
import { getAssetURL } from '@/common';
import THeader from '@/components/tHeader.vue';
import { handleExcel, handleExcelTable } from '@/common/excel/index'
import { ref } from 'vue'
const activeName = ref('data')
const tableRef = ref()
const downloadByData = () => {
  handleExcel({
    type: "array",
    fileNm: "SheetJSVueAoO111.xlsx",
    data: [
      ['主要信息', null, null, '其它信息'],
      ['姓名', '性别', '年龄', '注册时间'],
      ['张三', '男', 18, new Date()],
      ['李四', '女', 22, new Date()],
    ],
    handler: (ws) => {
      ws['A1'].s = {
        fill: {
          patternType: "solid", //这个不写也能填充颜色
          fgColor: { rgb: "42b983ff" },
          bgColor: {
            rgb: '42b983ff'
          }  // 这个属性没什么用
        }
      }
    }
  })

}
const downloadByTable = () => {

  handleExcelTable(
    tableRef.value.$el,
    {
      fileNm: "SheetJSVueAoO111.xlsx",
    }
  )
}
const columns = [
  {
    title: '姓名',
    key: 'name',
    width: 100,
  },
  {
    title: '性别',
    key: 'sex',
    width: 100,
  },
  {
    title: '年龄',
    key: 'age',
    width: 100,
  },
  {
    title: '注册时间',
    key: 'time',
    width: 100,
  },
]
const data = [
  {
    name: '张三',
    sex: '男',
    age: 18,
    time: new Date()
  },
  {
    name: '李四',
    sex: '女',
    age: 22,
    time: new Date()

  },
  {
    name: '王五',
    sex: '男',
    age: 22,
    time: new Date()

  }
]

</script>
<style lang="scss" scoped></style>
