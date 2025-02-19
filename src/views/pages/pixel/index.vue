<template>
  <div class="pixel">
    <canvas ref=canvasRef></canvas>

    <div id="pixel-art-options">
      <button class="generate-css">
        <span class="generate-css-span">生成CSS</span>
      </button>
      <button class="reset">
        <span><i class="fal fa-sync"></i></span>
      </button>
      <div class="eraser-container">
        <div class="eraser"><i class="fal fa-eraser"></i> 橡皮</div>
      </div>
      <div class="import-container">
        <input type="file" class="select-file" />
      </div>
    </div>
    <div id="pixel-art-colors">
      <div class="colors">
        <div class="color current" style="background: white" data-color="white"></div>
        <div class="color" style="background: #ffc231" data-color="#ffc231"></div>
        <div class="color" style="background: #ff6c31" data-color="#ff6c31"></div>
        <div class="color" style="background: #ff1c1c" data-color="#ff1c1c"></div>
        <div class="color" style="background: #35c161" data-color="#35c161"></div>
        <div class="color" style="background: #3552c1" data-color="#3552c1"></div>
        <div class="color" style="background: #7935c1" data-color="#7935c1"></div>
        <div class="select-color">
          <h3>Select Color:</h3>
          <input type="color" value="" class="color-picker" />
        </div>
      </div>
    </div>

    <div id="pixel-art-area"></div>

  </div>
</template>

<script setup>
let config = {
  width: 40,
  height: 40,
  color: 'white',
  drawing: true,
  eraser: false
}




</script>
<style lang="scss" scoped></style>
