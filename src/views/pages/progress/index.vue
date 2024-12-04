<template>
  <div>

    <tHeader title="进度条" info="toyar-admin 封装不同种类的进度条" />

    <div class="tyAdmin__container">
      <ty-row :gutter="8" style="margin: 0 -4px;">
        <ty-col :span="8">
          <TyCard>
            <template #header>
              水波纹进度条
            </template>
            <div class="waterBox">
              <waterProgress :value="50.15" />
            </div>
          </TyCard>
        </ty-col>

        <ty-col :span="8">
          <TyCard>
            <template #header>
              水波纹进度条2
            </template>
            <div class="waterBox br">
              <waterProgress :value="50.15" />
            </div>
          </TyCard>
        </ty-col>
        <ty-col :span="8">
          <TyCard>
            <template #header>
              水波纹进度条
            </template>
            <div class="waterBox">
              <waterProgress :value="0" type="byCanvas" />
            </div>
          </TyCard>
        </ty-col>
        <ty-col :span="8">
          <TyCard>
            <template #header>
              水波纹进度条
            </template>
            <div class="waterBox br">
              <waterProgress :value="50" type="byCanvas" />
            </div>
          </TyCard>
        </ty-col>
      </ty-row>
    </div>
  </div>

</template>
<script setup>
import tChart from '@/components/tChart.vue'
import tHeader from '@/components/tHeader.vue'
import waterProgress from '@/components/waterProgress/index.vue';

</script>
<style lang="scss" scoped>
.tyAdmin__container {
  ::v-deep .ty-card__main {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .waterBox {
    width: 300px;
    height: 300px;
    border: 1px solid #a8a8a8;
    overflow: hidden;

  }

  .br {
    border-radius: 50%;
  }
}
</style>