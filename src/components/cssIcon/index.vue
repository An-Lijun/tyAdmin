<template>
  <div class="ty-cssIcon" :class="icon"></div>
</template>
<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});

import(`./css/${props.icon}.css`);
</script>
<style lang="scss" scoped>
.ty-cssIcon {
  display: inline-block;
  height: 1em;
  width: 1em;
  font-size: 20px;
  box-sizing: border-box;
  text-indent: -9999px;
  vertical-align: middle;
  position: relative;

  &::before,
  &::after {
    content: "";
    box-sizing: inherit;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>