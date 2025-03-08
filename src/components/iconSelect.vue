<template>
  <TySelect ref="selectRef" v-model="model">
    <div class="iconSelectOption">
        <div v-for="item in icons[current-1]" class="iconBox" @click="handleItemClick(item)">
          <TyIcon :icon="item.icon"/>
        </div>
        <div style="display: flex;justify-content: flex-end; width: 100%;">
          <TyPagination ref="paginationRef" style="margin-top: 10px;" :current="current" :total="total"  @currentChange="currentChange"/>
        </div>
    </div>
  </TySelect>
</template>
<script setup>
import { all } from 'axios';
import allIcons from './iconList.js'
import {ref,onMounted} from 'vue'

const model = defineModel()

const paginationRef = ref()
const selectRef = ref()

const handleItemClick =(value)=>{
  setTimeout(()=>{
    selectRef.value.selectVal(value.icon)
    setTimeout(()=>{
      selectRef.value.selectVal(value.icon)
    })
  })
}
function splitArrayIntoChunks(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
}
const icons =splitArrayIntoChunks(allIcons, 50)
const current = ref(1)
const total =ref(icons.length)
const currentChange = (page) => {
  current.value = page
}
onMounted(() => {
  paginationRef.value.$el.addEventListener('click', (e) => {
    // current.value = page
    e.preventDefault();
    e.stopPropagation();
  })
})
</script>
<style lang="scss" scoped>
.iconSelectOption{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .iconBox{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    font-size: 22px;
    margin: 5px 0;
    &:hover{
      color: #409eff;
      cursor: pointer;
    }
  }
}

</style>
