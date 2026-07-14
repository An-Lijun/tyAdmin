<template>
  <div class="ty-lock" @keydown.enter="unLock" tabindex="0">
    <header class="ty-header-lock" @click="unLock">
      <TyiLockLine :size="16" />
      <div>点击解锁</div>
    </header>
    <div class="ty-inner">
      <div class="left">
        <div class="top">{{ period }}</div>
        <div class="card1 card-item">{{ hourNew }}</div>
        <div class="card2 card-item">{{ hourNew }}</div>
        <div class="card3 card-item">{{ hourOld }}</div>
        <div class="card4 card-item">{{ hourOld }}</div>
      </div>
      <div class="right" :class="{ flip: isFlip }" ref="min">
        <div class="card1 card-item">{{ minuteNew }}</div>
        <div class="card2 card-item">{{ minuteNew }}</div>
        <div class="card3 card-item">{{ minuteOld }}</div>
        <div class="card4 card-item">{{ minuteOld }}</div>
      </div>
    </div>

    <footer class="ty-footer-lock">
      {{ formattedDate }}
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { router } from '@/router'

const hourNew = ref('00')
const hourOld = ref('00')
const minuteNew = ref('00')
const minuteOld = ref('00')
const min = ref(null)
const isFlip = ref(false)
const period = ref('AM')
const formattedDate = ref('')

let timerId = null

const formatTwoDigits = (num) => {
  return num.toString().padStart(2, '0')
}

const formatFullDate = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const weekDay = weekDays[date.getDay()]
  return `${year}/${month}/${day} ${weekDay}`
}

const updateTime = () => {
  isFlip.value = false
  nextTick(() => {
    const date = new Date()
    hourOld.value = hourNew.value
    hourNew.value = formatTwoDigits(date.getHours())
    period.value = date.getHours() >= 12 ? 'PM' : 'AM'
    minuteOld.value = minuteNew.value
    minuteNew.value = formatTwoDigits(date.getMinutes())
    formattedDate.value = formatFullDate(date)
    min.value?.clientHeight
    isFlip.value = true
  })
}

const unLock = () => {
  router.push({ name: 'System' })
}

onMounted(() => {
  updateTime()
  timerId = setInterval(updateTime, 1000 * 60)
})

onUnmounted(() => {
  if (timerId) {
    clearInterval(timerId)
  }
})
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

  .ty-inner {
    height: 100%;
    --un-text-opacity: 1;
    color: rgb(255 255 255 / var(--un-text-opacity));
    display: flex;
    align-items: center;
    justify-content: space-around;

    .left,
    .right {
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

      .top {
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
      height: 50%;
      left: 0;
      top: 0;
      overflow: hidden;
      text-align: center;
      color: rgb(186, 186, 186);
      background-color: #141313;
    }

    .card1 {
      line-height: 70vh;
    }

    .card2 {
      top: 50%;
      line-height: 0;
      transform-origin: center top;
      transform: rotateX(180deg);
      backface-visibility: hidden;
      z-index: 2;
    }

    .card3 {
      line-height: 70vh;
      transform-origin: center bottom;
      backface-visibility: hidden;
      z-index: 2;
    }

    .card4 {
      top: 50%;
      line-height: 0;
    }

    .flip .card2 {
      transform: rotateX(0deg);
      transition: transform 0.5s;
    }

    .flip .card3 {
      transform: rotateX(-180deg);
      transition: transform 0.5s;
    }
  }

  .ty-footer-lock {
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