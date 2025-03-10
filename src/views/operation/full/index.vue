<template>
  <div>
    <tHeader title="full" info="toyar-admin 全屏" />
    <div class="tyAdmin__container">
      <ty-caution title="ToyarDesign全屏Hooks" style="margin-bottom: 16px;">
        Toyar-Design 封装了全屏函数支持部分页面全屏。
      </ty-caution>

      <TyCard style="margin-bottom: 20px;">
        <template #header>
          <div>
            <span>全屏</span>
          </div>
        </template>
        <TySpace>
          <TyButton @click="handleFull">页面进入全屏</TyButton>
          <TyButton @click="handleFullTg" state="success">页面全屏切换</TyButton>
          <TyButton @click="handleFullExit" state="danger">页面退出全屏</TyButton>
          <TyButton @click="handleFull2" >部分页面进入全屏</TyButton>

          <span>
            是否全屏 {{ isFull }}
          </span>
        </TySpace>
      </TyCard>

      <TyCard>
        <template #header>
          <div>
            <span>部分全屏</span>
          </div>
        </template>

        <div ref="tableRef" style="display: flex; justify-content: center; align-items: center;">
          <TyTable :columns="columns" :data="data" />
        </div>
      </TyCard>

    </div>
  </div>
</template>
<script setup>
import { getAssetURL } from "@/common";
import THeader from "@/components/tHeader.vue";
import { ref ,computed } from "vue";
import FullScreen from "@/common/full";
const tableRef = ref();
const isFull = ref(false)
const fs = new FullScreen(
  () => {
    console.log("进入全屏");
      isFull.value =true
  },
  () => {
    console.log("退出全屏");
    isFull.value =false
    
  },
  () => {
    console.log("全屏失败");
  }
);

const handleFull = () => {
  fs.Fullscreen(document.documentElement);
};

const handleFullExit = () => {
  fs.exitFullscreen();
}

const handleFullTg = () => {
  fs.isElementFullScreen() ? fs.exitFullscreen() : fs.Fullscreen(document.documentElement);
}


const handleFull2 = () => {
  fs.Fullscreen(tableRef.value);
};
const columns = [
  {
    title: "姓名",
    key: "name",
    width: 100,
  },
  {
    title: "性别",
    key: "sex",
    width: 100,
  },
  {
    title: "年龄",
    key: "age",
    width: 100,
  },
  {
    title: "注册时间",
    key: "time",
    width: 100,
  },
];
const data = [
  {
    name: "张三",
    sex: "男",
    age: 18,
    time: new Date(),
  },
  {
    name: "李四",
    sex: "女",
    age: 22,
    time: new Date(),
  },
  {
    name: "王五",
    sex: "男",
    age: 22,
    time: new Date(),
  },
];
</script>
<style lang="scss" scoped></style>