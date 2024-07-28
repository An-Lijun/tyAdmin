<template>
  <div id="map" style="height: 500px;">

  </div>
</template>
<script setup>
import ChinaMap from './echarsForMap'
import { onMounted } from 'vue';
  onMounted(() => {
    let mp = new ChinaMap(document.querySelector('#map'), { areaColor: 'rgb(150, 253, 200)', isShowDataList: true })
      mp.init()
  })
</script>
<style lang="less" scoped>
</style>
