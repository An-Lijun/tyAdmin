<template>
  <div class="divRoot" ref="divRoot" >

  </div>
</template>
<script setup>
import * as xlsx from "xlsx";
import canvasDatagrid from "canvas-datagrid";
import { getAssetURL } from "@/common";
import { ref, onMounted } from "vue";
const divRoot = ref(null);
const props = defineProps({
  url:{
    type:String,
    required:true
  }
})
// const url = getAssetURL('/assets/pdfs/test.xlsx')

onMounted(() => {
  fetch(props.url)
    .then((res) => res.arrayBuffer()) // 获取二进制数据
    .then((buffer) => {
      const workbook = xlsx.read(buffer) || {};
      const sheet = workbook.Sheets[workbook.SheetNames[0]]; // 这里取第 0 个 sheet
      const json = xlsx.utils.sheet_to_json(sheet); // 得到的 json 是解析之后的数据
      const grid = canvasDatagrid();
      grid.data = json
      grid.editable =false
      divRoot.value.appendChild(grid);
      grid.style.width = "100%"; // 宽度为视口宽度
      grid.style.height = "500px"; // 视口高度减去顶部的 sheet 切换按钮区高度
    })


})

</script>
<style lang="less" scoped></style>
