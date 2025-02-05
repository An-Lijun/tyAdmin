vues
<template>
  <div>
    <tHeader title="RenderTree" info="toyar-admin 封装随机树" />
    <div class="tyAdmin__container">
      <div>
        <TyButton @click="render()">随机</TyButton>
      </div>
      <div class="container" ref="containerRef">
        <div class="card" v-for="(item,index) in 500" :key="index" ref="cardRef">
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import tHeader from '@/components/tHeader.vue'
import { onMounted,ref } from 'vue';
import list from './data'
let index = 0
const containerRef =ref(null)
const cardRef = ref(null) 
const change = () => {
  if(Array.isArray(cardRef.value)){
    cardRef.value.forEach((dom, domIndex) => {
      let item = list[index][domIndex]
      if(item){
        dom.style = `clip-path:polygon(${item.polygon});    background-color:${item.color}`
      }
    })
  }
}

let render = () => {
  index++
  if (index == list.length) {
    index = 0
  }
  change()
}
onMounted(() => {
  change()
})
</script>
<style lang="scss" scoped>
.tyAdmin__container {
  height: 100%;
  .container {
  height: 500px;
  width: 500px;
  position: relative;
  margin: 0 auto;
}

.card {
  height: 500px;
  width: 500px;
  position: absolute;
  transition: all 2s ease;
}
}

</style>