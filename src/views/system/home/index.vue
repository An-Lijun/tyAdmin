<template>
  <TyContainer>
    <TyAside :width="appStore.isFold ? '50' : '210'" style="transition: width 0.5s;overflow: hidden;">
      <Menu />
    </TyAside>
    <TyContainer column>
      <SHeader />
      <TyMain>
        <div style="width: 100%; overflow-y: auto;max-height: calc(100vh - 100px)">
          <RouterView />
        </div>
      </TyMain>
      <SFooter />
    </TyContainer>
  </TyContainer>
</template>
<script setup lang="ts">
import { router } from '@/router'
import useUserStore from '@/store/modules/user'
import { ref } from 'vue'
import Menu from './components/Menu.vue'
import SHeader from './components/SHeader.vue'
import SFooter from './components/SFooter.vue'


import useAppStore from '@/store/modules/app'
const appStore = useAppStore()


// const fn = () => {
//   const userStore = useUserStore()
//   console.log(userStore.token)
//   router.push({
//     name: 'Login'
//   })
// }



</script>
<style lang="scss" scoped></style>
