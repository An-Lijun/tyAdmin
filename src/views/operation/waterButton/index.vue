<template>
  <div class="divRoot">
    <tHeader title="水波纹按钮" info="toyar-admin 自己封装水波纹按钮" />
    <div class="tyAdmin__container">
      <TyCard>
        <div style="margin-bottom: 20px;">
          <TySpace>
            <tWaterBtn state="primary" size="mini">点我</tWaterBtn>
            <tWaterBtn state="success" size="mini">点我</tWaterBtn>
            <tWaterBtn state="warning" size="mini">点我</tWaterBtn>
            <tWaterBtn state="danger" size="mini">点我</tWaterBtn>
          </TySpace>
        </div>

        <div style="margin-bottom: 20px;">
          <TySpace>
            <tWaterBtn state="primary" size="small">点我</tWaterBtn>
            <tWaterBtn state="success" size="small">点我</tWaterBtn>
            <tWaterBtn state="warning" size="small">点我</tWaterBtn>
            <tWaterBtn state="danger" size="small">点我</tWaterBtn>
          </TySpace>

        </div>

        <div style="margin-bottom: 20px;">
          <TySpace>
            <tWaterBtn state="primary" size="medium">点我</tWaterBtn>
            <tWaterBtn state="success" size="medium">点我</tWaterBtn>
            <tWaterBtn state="warning" size="medium">点我</tWaterBtn>
            <tWaterBtn state="danger" size="medium">点我</tWaterBtn>
          </TySpace>

        </div>
        <TySpace>
          <tWaterBtn state="primary" size="large">点我</tWaterBtn>
          <tWaterBtn state="success" size="large">点我</tWaterBtn>
          <tWaterBtn state="warning" size="large">点我</tWaterBtn>
          <tWaterBtn state="danger" size="large">点我</tWaterBtn>
        </TySpace>
      </TyCard>
    </div>
  </div>
</template>
<script setup>
import tWaterBtn from '@/components/tWaterBtn.vue'
import tHeader from '@/components/tHeader.vue'

</script>
<style lang="less" scoped></style>
