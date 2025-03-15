<template>
  <TySelect ref="selectRef" v-model="model" icon="ty-draggable" width="300px">
    <div class="iconSelectOption">
        <div v-for="item in icons[current-1]" class="iconBox" @click="handleItemClick(item)" :key="item">
          <svgIcon :icon="item" style="font-size: 20px;"></svgIcon>
        </div>
        <div style="display: flex;justify-content: flex-end; width: 100%;">
          <TyPagination :pageSize="5" ref="paginationRef" style="margin-top: 10px;" :current="current" :total="total"    @currentChange="currentChange"/>
        </div>
    </div>
  </TySelect>
</template>
<script setup>
import { all } from 'axios';
import {ref,onMounted} from 'vue'
import svgIcon from './svgIcon.vue'
const model = defineModel()

const paginationRef = ref()
const selectRef = ref()

const componentModules = import.meta.glob('../assets/svgIcon/*.svg');
const allIcons = ref([])
for (const key in componentModules) {
  allIcons.value.push(
    key.split('/').at(-1).split('.')[0]
  )
}
const handleItemClick =(value)=>{
  setTimeout(()=>{
    selectRef.value.selectVal(value)
    setTimeout(()=>{
      selectRef.value.selectVal(value)
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
const icons =splitArrayIntoChunks(allIcons.value, 10)

const current = ref(1)
const total =ref(icons.length)
const currentChange = (page) => {
  current.value = page
}
onMounted(() => {
  paginationRef.value.$el.addEventListener('click', (e) => {
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
    margin: 5px 0;
    &:hover{
      color: #409eff;
      cursor: pointer;
    }
    :deep(.ty-svgIcon){
      width: 100%;
      svg{
        width: 100%;
        height: 40px;
      }
    }
  }
}

</style>
