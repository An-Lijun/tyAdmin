<template>
  <TyConfigProvider style=" height: 100vh;" :options="{ resetPrimary: appStore.pColor }">
    <TyWaterMark :options="{
      width: 500,
      height: 300,
      antiTamper: true
    }" :markInfo="['TyAdmin', formatDate(new Date())]">
      <SLoading :loading="appStore.loading">
        <RouterView />
      </SLoading>
    </TyWaterMark>
    
  </TyConfigProvider>
  <suspensionBoll/>
</template>

<script setup lang="ts">
import { formatDate } from 'robinson'
import useAppStore from '@/store/modules/app'
import SLoading from'@/views/system/loading/index.vue'
import suspensionBoll from '@/components/suspensionBoll.vue'
const appStore = useAppStore()

</script>
<style>
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
}
</style>
