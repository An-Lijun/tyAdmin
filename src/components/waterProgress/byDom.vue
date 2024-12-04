<template>
  <div
    class="wave_content"
  
  >
    <div class="wave_progress">
      <div class="wave">
        <div id="number_contnet">
          {{ value }}
        </div>
      </div>
      <div
        :id="'wave_mask' + index"
        class="wave_mask"
        :style="{
          top: value === 0 ? 90000 + '%' : 200 + value + '%',
          background: color,
        }"
      >
      </div>
    </div>
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
    
  },
  data() {
    return {};
  },
  mounted() {},
  destroyed() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@keyframes spin {
  50% {
    transform: translate(-50%, -101%) rotate(500deg);
  }

  100% {
    transform: translate(-50%, -101%) rotate(1000deg);
  }
}

.wave_content {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.wave_progress {
  width: 100%;
  height: 100%;
  background: transparent;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;

  .wave {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .wave_mask {
    position: absolute;
    width: 200%;
    height: 200%;
    top: 0;
    left: 50%;
    border-radius: 40%;
    transform: translate(-50%, -101%) rotate(0);
    animation-name: spin;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-duration: 16s;
    animation-iteration-count: infinite;
    z-index: 20;
  }
}

#number_contnet {
  position: absolute;
  color: #000;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  z-index: 100;
}
</style>