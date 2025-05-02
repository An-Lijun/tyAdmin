<template>
  <TySelect ref="selectRef" v-model="model" icon="ty-draggable" width="300px">
    <div class="iconSelectOption">
        <div v-for="item in icons" class="iconBox" @click="handleItemClick(item)">
          <!-- <TyIcon :icon="item.icon"/> -->
           
          <component :is="getIcon(item)" :size="16"/>
        </div>
        <div style="display: flex;justify-content: flex-end; width: 100%;">
          <TyPagination ref="paginationRef" style="margin-top: 10px;" :current="current" :total="total" :pageSize="5"  @currentChange="currentChange"/>
        </div>
    </div>
  </TySelect>
</template>
<script setup>
import { all } from 'axios';
import {ref,onMounted} from 'vue'
import {maxPage } from 'toyaricon/dist/iconList.js'
const model = defineModel()
const current = ref(1)
const total =ref(Math.ceil(maxPage/50 ))
const paginationRef = ref()
const selectRef = ref()


function toPascalCase(str) {
  const words = str.split('-');
  return words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}
const getIcon = (icon) => {
  return defineAsyncComponent(() => import('toyaricon').then((module) => {
    return module[icon]
    
  }));
}

const icons =ref([])

function init(){
  import('toyaricon/dist/iconList').then(module=>{
    icons.value=[]
    for(let i=current.value;i<current.value*10 +1;i++){
      icons.value.push(...module[`iconList${i}`]) 
    }
  })
}
init()
const handleItemClick =(value)=>{
  setTimeout(()=>{
    selectRef.value.selectVal(value.icon)
    setTimeout(()=>{
      selectRef.value.selectVal(value.icon)
    })
  })
}
const currentChange = (page) => {
  current.value = page
  init()
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
    font-size: 22px;
    margin: 5px 0;
    &:hover{
      color: #409eff;
      cursor: pointer;
    }
  }
}

</style>
