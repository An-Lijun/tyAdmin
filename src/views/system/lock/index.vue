<template>
  <div class="ty-lock">
    <header class="ty-header-lock" @click="unLock">
         <TyiLockLine :size="16"/>
        <div>点击解锁</div>
    </header>
    <div class="ty-inner">
        <div class="left">
          <div class="top">
              {{ topValue }}
          </div>
          <div class="card1 card-item ">{{ hourNew }}</div>
          <div class="card2 card-item ">{{ hourNew }}</div>
          <div class="card3 card-item ">{{ hourOld }}</div>
          <div class="card4 card-item ">{{ hourOld }}</div>
        </div>
        <div class="right" :class="{
          flip:isFlip
        }" ref="min">
          <div class="card1 card-item ">{{ minuteNew }}</div>
          <div class="card2 card-item ">{{ minuteNew }}</div>
          <div class="card3 card-item ">{{ minuteOld }}</div>
          <div class="card4 card-item ">{{ minuteOld }}</div>
        </div>
    </div>

    <foote class="ty-footer-lock">
        {{ allTime }}
    </foote>
  </div>
</template>
<script setup>
import { nextTick, ref } from 'vue';
import { router } from '@/router'
  let hourNew =ref('00')
  let hourOld =ref('00')
  let minuteNew =ref('00')
  let minuteOld =ref('00')
  const min = ref()
  let isFlip =ref(false)

  let topValue = ref('AM')
  let allTime =ref('2024/6/4 星期二')

  const render =(date)=>{
    isFlip.value=false
    nextTick(()=>{
      hourOld.value = hourNew.value
      hourNew.value = date.getHours().toString().padStart(2, "0");
      topValue.value = hourNew.value >=12 ? 'PM':'AM'
      minuteOld.value = minuteNew.value
      minuteNew.value = date.getSeconds().toString().padStart(2, "0");
      min.value?.clientHeight
      isFlip.value=true
    })
  }

  render(new Date())
  setInterval(()=>{
      render(new Date())
  },1000)

const unLock =()=>{
  router.push({
    name:'System'
  })
}
</script>
<style lang="scss" scoped>
.ty-lock {
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  --un-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--un-bg-opacity));

  .ty-header-lock {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    --un-text-opacity: 1;
    color: rgb(255 255 255 / var(--un-text-opacity));
    div {
      margin-top: 5px;
    }
  }
  .ty-inner{
    height: 100%;
    --un-text-opacity: 1;
    color: rgb(255 255 255 / var(--un-text-opacity));
    display: flex;
    align-items: center;
    justify-content: space-around;
    .left,.right{
      height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36vw;
      color: rgb(186, 186, 186);
      font-size: 14vw;
      font-weight: bold;
      position: relative;
      border-radius: 30px;
      overflow: hidden;
      .top{
        position: absolute;
        z-index: 5;
        left: 3vw;
        font-size: 2vw;
        top: 3vw;
      }
    }
    .card-item {
      position: absolute;
      width: 100%;
      /* 因为每个卡片只有半个数字，所以高度只有百分之50 */
      height: 50%;
      left: 0;
      top: 0;
      overflow: hidden !important;
      text-align: center;
      color: rgb(186, 186, 186);
      background-color: #141313;

    }

    .card1 {
      line-height: 70vh;
    }
    .card2{
      top: 50%;
      line-height: 0px;
      transform-origin: center top;
       /* 向上折 180 度 */
      transform: rotateX(180deg);
      /* 通过这个属性让元素的背面隐藏 */
      backface-visibility: hidden !important;
      z-index: 2;
    }

    .card3{
      line-height: 70vh;
      transform-origin: center bottom;
      backface-visibility: hidden !important;
       z-index: 2;

    }
    .card4{
      top: 50%;
      line-height: 0;

    }
    .flip .card2{
      transform: rotateX(0deg);
      transition: transform .5s;
    }
    .flip .card3{
      transform: rotateX(-180deg);
      transition: transform .5s;
    }
  }
  .ty-footer-lock{
    position: absolute;
    z-index: 5;
    bottom: 0;
    --un-text-opacity: 1;
    color: rgb(255 255 255 / var(--un-text-opacity));
    text-align: center;
    width: 100%;
    height: 12vh;
    line-height: 12vh;
    font-size: 2vw;
  }
}
</style>
