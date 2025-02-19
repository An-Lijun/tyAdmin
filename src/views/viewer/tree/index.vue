vues
<template>
  <div>
    <tHeader title="RenderTree" info="toyar-admin 封装随机树" />
    <div class="tyAdmin__container">
      <div>
      <TyButton @click="render()">随机</TyButton>

      </div>
      <canvas width="1200" height="600" border>
      </canvas>
    </div>
  </div>

</template>
<script setup>
import tHeader from '@/components/tHeader.vue'
import { onMounted } from 'vue';
let canvas, ctx
let arr = ['#ffb3e6', '#ffc0ea', '#ffcdee', '#ffd9f3', '#ffe6f7', '#fff3fb', 'fff']

function getRandom(min, max, point = 0) {
  let res = `${Math.random() * (max - min + 1) + min}`;
  let [integer, float] = res.split('.');
  if (integer === `${max}`) {
    integer += '.';
    for (let i = 0; i < point; i++) {
      integer += '0';
    }
  } else {
    integer += '.';
    integer += float.slice(0, point);
  }
  return Number(integer);
}

function drawFlow(v0, size, color) {
  ctx.beginPath();
  ctx.arc(...v0, size, 0, 2 * Math.PI);
  ctx.fillStyle = color
  ctx.fill()
}

// 起点坐标 长度 粗细 角度
function drawBranch(v0, len, thick, angle) {
  if (thick < 2) {
    if (Math.random() > 0.6) {
      let color = arr[getRandom(0, 6)]
      drawFlow([v0[0], v0[1]], 10, color)


      // drawFlow([v0[0]+10,v0[1]-10],7.5,color)
      // drawFlow([v0[0]+10,v0[1]+10],7,color)
      // drawFlow([v0[0]+10,v0[1]+10],7.5,color)


    }
    return
  }
  ctx.beginPath()

  const v1 = [
    v0[0] + len * Math.cos(((angle - 25) * Math.PI) / 100),
    v0[1] + len * Math.sin(((angle - 25) * Math.PI) / 100)
  ]
  ctx.moveTo(...v0)
  ctx.lineTo(...v1)
  ctx.strokeStyle = '#333'
  ctx.lineWidth = thick
  ctx.lineCap = 'round'
  ctx.stroke()
  if (Math.random() > 0.1) {
    drawBranch(v1, len * 0.8, thick * 0.7, angle + Math.random() * 30)
  }
  if (Math.random() > 0.1) {
    drawBranch(v1, len * 0.8, thick * 0.7, angle - Math.random() * 30)
  }
}
onMounted(() => {
  canvas = document.querySelector('canvas')
  ctx = canvas.getContext('2d')
  ctx.translate(canvas.width / 2, canvas.height)
  ctx.scale(1, -1)

  drawBranch([300, 0], 120, 15, 90)
})
function render() {
  ctx.clearRect(-500, 0, canvas.width, canvas.height)
  drawBranch([300, 0], 120, 15, 90)
}
</script>
<style lang="scss" scoped>
.tyAdmin__container {
  height: 100%;
}
</style>