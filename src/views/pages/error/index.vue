<template>
  <div class="divRoot">
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
import {openWindow} from '@/common'

const openPage =(value)=>{
  
  openWindow(`http://localhost/#/${value}`,{
       target:'_blank'
  })
}
</script>
<style lang="scss" scoped></style>
