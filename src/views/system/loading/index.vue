<template>
  <transition name="loading">
    <div class="load-container" v-show="loading">
      <div class="boxLoading">
      </div>
      <span class="loadingText">Toyar Admin</span>
    </div>
  </transition>
  <slot />
</template>
<script setup>

const props = defineProps({
  loading: {
    default: false
  }
})
</script>
<style lang="scss" scoped>
@import url('/static/loading.css');

/* 定义过渡类名 */
.loading-enter-active,
.loading-leave-active {
  transition: opacity 1.5s;
}

.loading-enter,
.loading-leave-to {
  opacity: 0;
}
</style>
