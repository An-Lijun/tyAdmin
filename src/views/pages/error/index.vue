<template>
  <div class="divRoot">
    <tHeader title="错误页面" info="实现403无权限 404 notfind 错误页面" />
    <div class="tyAdmin__container">
      <TyCard>
        <TySpace>
          <TyButton @click="openPage(403)">403</TyButton>
          <TyButton @click="openPage(404)">404</TyButton>
        </TySpace>
      </TyCard>
    </div>
  </div>
</template>
<script setup>
import { openWindow } from '@/common'
import tHeader from '@/components/tHeader.vue'

const openPage = (value) => {
  openWindow(`http://localhost/#/${value}`, {
    target: '_blank'
  })
}

</script>
<style lang="scss" scoped></style>
