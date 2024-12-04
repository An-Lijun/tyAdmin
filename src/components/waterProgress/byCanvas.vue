<template>
  <div style="width: 100%; height: 100%" ref="outConainerRef">
      <canvas ref="canvasRef" class="canvasContainer"> </canvas>
  </div>
</template>

<script>
export default {
  props: {
      value: {
          type: [Number, String],
      },
      color: {
          type: String,
          default: "skyblue",
      },
      options: {
          type: Object,
          default: () => ({
          }),
      },
  },
  data() {
      return {
          selfOptions: {
              speed: 38, //波浪横向流动速度
              fpsInterval: 1000 / 10, //帧率
          },
          offsetX: 0, //波浪横向偏移量
          offsetY: 0, //波浪垂直方向位移
          canvasW: 0, 
          canvasH: 0,
          ctx: null, 
          last: null
      };
  },
  created() {
      this.selfOptions = {
         ...this.selfOptions,
         ...this.options,
      };
  },
  mounted() {
      this.init();
  },
  methods: {
      init() {
          const canvas = this.$refs.canvasRef;
          this.ctx = canvas.getContext("2d");
          this.canvasW = canvas.width;
          this.canvasH = canvas.height;

          this.draw();
      },
      draw() {
          let now = new Date().getTime()
          let elapsed = now - this.last;

          if (elapsed > this.selfOptions.fpsInterval) {
              this.last = now - (elapsed % this.selfOptions.fpsInterval)
              const ctx = this.ctx;
              ctx.clearRect(0, 0, this.canvasW, this.canvasW);
              this.offsetX += this.selfOptions.speed;
              this.drawWave(
                  ctx,
                  this.offsetX + 2,
                  1 - 0.2,
                  0.04,
                  8,
                  this.color
              );
          }
          requestAnimationFrame(this.draw.bind(this));
      },
      drawWave(ctx, offsetX, offsetY, waveW, waveH, color) {
          const canvasW = this.canvasW,
              startX = 0; //波浪线初始x轴坐标

          this.ctx.beginPath();

          const startPos = [startX];
          let bool = true;
          for (let x = startX; x < canvasW; x += 20 / canvasW) {
              //正弦曲线公式：y=Asin(ωx+φ)+k
              let unit = this.canvasH / 100
              // const y = this.canvasH - (this.value / 100) +
              //     waveH * Math.sin((startX + x) * waveW + offsetX) - this.value ;
              // const y =10

              const y = this.canvasH - (this.value * unit) 
              + waveH * Math.sin((startX + x) * waveW + offsetX)

                   
              if (startPos.length == 1) {
                  startPos.push(y);
              }

              this.ctx.lineTo(x, y);
          }

          //画出完整的波浪形状
          this.ctx.lineTo(canvasW, canvasW);
          this.ctx.lineTo(startX, canvasW);
          this.ctx.lineTo(startPos[0], startPos[1]);
          this.ctx.fillStyle = color;

          this.ctx.fill();
      }
  },
  destroyed() { },
};
</script>

<style lang="scss" scoped>
.canvasContainer {
  width: 100%;
  height: 100%;
}
</style>