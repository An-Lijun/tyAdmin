<template>
  <component :is="type" :value="value" :color="color">
  </component>
</template>

<script>
import byDom from "./byDom.vue";
import byCanvas from "./byCanvas.vue";

export default {
components: {
  byDom,
  byCanvas
},
props: {
  type: {
    type: String,
    default: "byDom",
  },
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
mounted() { },
destroyed() { },
methods: {},
};
</script>