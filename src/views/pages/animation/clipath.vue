<template>
  <div class="divRoot">
    <tHeader title="动画" info="toyar-admin 一些无框架动画" />
    <div class="tyAdmin__container">

      <TyCard>

        <div class="ht">
          <header @mouseenter="enter($event)" @mousemove="move($event)" @mouseleave="leave()">
            <div class="layer">
              <img :style="`transform: translate(${0 + (nowX - x) / 15}em, -15em)`" src="./src/shan.png" class="bjShan"
                alt="">
            </div>
            <div class="layer">
              <img :style="`transform:  translate(${800 + (nowX - x) / 10}em, 0em)`" src="./src/cao.png" class="bjCaoHe"
                alt="">
            </div>
            <div class="layer">
              <img :style="`transform: translate(${875 + (nowX - x) / 7}em, 0em);`" src="./src/shanAND.png"
                class="bjShanAndShu" alt="">
            </div>
            <div class="layer">
              <img :style="`transform:  translate(${-700 + (nowX - x) / 5}em, 0em);`" src="./src/qiao.png"
                class="bjQiao" alt="">
            </div>
            <div class="layer">
              <img :style="`transform:  
      translate(${797.5 + (nowX - x) / 5}em, 45em) scale(0.4);`" src="./src/chuan.png" class="zhChuan" alt="">
            </div>
            <div class="layer">
              <img :style="`transform: translate(${100 + (nowX - x) / 7}em, 15em) scale(0.6)`" src="./src/caoAndShu.png"
                class="caoAndShu" alt="">
            </div>
            <div class="layer">
              <img :style="`transform: translate(${-320 + (nowX - x) / 5}em, 49em) scale(0.6)`"
                src="./src/caoAndFengzheng.png" class="caoAndFengzheng" alt="">
            </div>

            <div class="layer">
              <img :style="`transform: translate(${-60 + (nowX - x) / 5}em, 29em) scale(0.5)`"
                src="./src/yinghuashu.png" class="yinghuashu" alt="">
            </div>

            <div class="layer">
              <img :style="`transform: translate(${-60 + (nowX - x) / 1.5}em, 2em)`" src="./src/caoAndYinghuashu.png"
                class="caoAndYinghuashu" alt="">
            </div>
            <div class="layer">
              <img :style="`transform: translate(${10 + (nowX - x) / 1.5}em, 20em) scale(0.6)`" src="./src/jucan.png"
                class="jucan" alt="">
            </div>
            <div class="layer">
              <img :style="`transform: translate(${-800 + (nowX - x) / 2}em, 0em) `" src="./src/dayinghuashu.png"
                class="dayinghuashu" alt="">
            </div>
            <div class="layer">
              <img :style="`transform: translate(${1400 + (nowX - x) / 2}em, 0em) `" src="./src/yangliu.png"
                class="yangliu" alt="">
            </div>
          </header>
        </div>

        <div class="out">
          <div class="dh-img-1">
          </div>

        </div>
        <div class="out2">
          <div class="dh-img-2"></div>
        </div>
        <div class="out3">
          <div class="dh-img-3"></div>
        </div>
        <div class="out4">
          <div class="dh-img-4"></div>
        </div>
        <div class="out5">
          <div class="dh-img-5"></div>
        </div>

      </TyCard>
    </div>

  </div>
</template>
<script setup>
import { ref } from 'vue'
import tHeader from '@/components/tHeader.vue'

let x = ref(0)
let nowX = ref(0)

const enter = (event) => {
  x.value = event.pageX
}
const move = (event) => {
  nowX.value = event.pageX
}
const leave = (event) => {
  x.value = 0
  nowX.value = 0
}
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}

.ht {
  font-size: 1px;

  header {
    height: 150em;

    position: relative;
    overflow: hidden;
    min-height: 150em;
    max-height: 150em;
  }

  .layer {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
  }

  .layer>img {
    max-height: 100%;
  }

}

.out {
  width: 100px;
  height: 100px;
  background-color: var(--primary-3);
}

.dh-img-1 {
  width: 100%;
  height: 100%;
  display: inline-block;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  transition: all 0.5s;
  background-image: url('./src/v2-fe0d84a490434570cba84717149f9197_720w.webp');
  background-size: contain;
}

.dh-img-1:hover {
  clip-path: polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%);
}

.out2 {
  width: 500px;
  height: 280px;
  display: inline-block;
  background-image: url('./src/v2-fe0d84a490434570cba84717149f9197_720w.webp');
  background-size: contain;
}

.dh-img-2 {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-image: url('./src/v2-1444521330b8baf1c69b15c5f48ad411_720w.webp');
  clip-path: polygon(-30% 0, -30% 0, 0% 50%, -30% 100%, -30% 100%);
  transition: all 0.5s;
}

.out2:hover .dh-img-2 {
  clip-path: polygon(-30% 0, 100% 0, 110% 50%, 100% 100%, -30% 100%) !important;
}

.out3 {
  display: inline-block;
  width: 150px;
  height: 150px;
  background-color: var(--primary-3);

}

.dh-img-3 {
  width: 100%;
  height: 100%;
  background-image: url('./src/v2-fe0d84a490434570cba84717149f9197_720w.webp');
  background-size: contain;
  clip-path: circle(0 at 50% 50%);
  transition: all .5s;
}

.out3:hover .dh-img-3 {
  clip-path: circle(100% at 50% 50%);
  transition: all .5s;
}

.out4 {
  display: inline-block;
  width: 150px;
  height: 150px;
  background-color: var(--primary-3);
}

.dh-img-4 {
  width: 100%;
  height: 100%;
  background-image: url('./src/v2-fe0d84a490434570cba84717149f9197_720w.webp');
  background-size: contain;
  clip-path: inset(100% 0 0 0);
  transition: all .5s;
}

.out4:hover .dh-img-4 {
  clip-path: inset(0% 0 0 0);
  ;
  transition: all .5s;
}

.out5 {
  display: inline-block;
  width: 150px;
  height: 150px;
  background-color: var(--primary-3);
}

.dh-img-5 {
  width: 100%;
  height: 100%;
  background-image: url('./src/v2-fe0d84a490434570cba84717149f9197_720w.webp');
  background-size: contain;
  clip-path: inset(0 50% 0 50%);
  transition: all .5s;
}

.out5:hover .dh-img-5 {
  clip-path: inset(0% 0 0 0);
  ;
  transition: all .5s;
}
</style>
