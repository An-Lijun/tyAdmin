<template>
  <div class="divRoot">
    <tHeader   title="页面离开提醒" info="toyar-admin 使用hooks实现页面离开提醒" />
  </div>
</template>
<script setup>
import {leaveAlert} from '@/hooks'

import tHeader from '@/components/tHeader.vue'

leaveAlert()
</script>
<style lang="scss" scoped>
</style>
