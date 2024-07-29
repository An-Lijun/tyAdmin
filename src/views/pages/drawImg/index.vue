<template>
  <div>
    <tHeader title="绘制图形" info="toyar-admin支持绘制图形" />
    <div class="tyAdmin__container">
      <TyCard class="zhqp">
        <template #header>
          三角形
        </template>

        <triangleByDom :height="100"/>
        <triangleByDom :height="100" type="equilateral"/>
        <triangleByDom :height="100" type="right"/>
      </TyCard>

      <TyCard class="zhqp">
        <template #header>
          组合背景气泡
        </template>

        <div class="sjx triangle-rotate">
        </div>
        <div class="sjx triangle-rotate2">
        </div>
        <div class="sjx triangle-rotate jianbian">
        </div>
        <div class="sjx triangle-rotate2 jianbian">
        </div>
      </TyCard>

      <TyCard class="jb" style="margin-bottom: 16px;">
        <template #header>
          渐变三角
        </template>
        <div class="sjx-jianbian"></div>
        <div class="sjx-jianbian jianbian-1"></div>
      </TyCard>
      <clpath />
    </div>
  </div>
</template>
<script setup>
import tSigningBoard from '../../../components/tSigningBoard.vue';
import tHeader from '@/components/tHeader.vue'
import triangleByDom from './component/triangleByDom.vue'
import clpath from './view/clipath.vue'
</script>
<style lang="scss" scoped>

.zhqp {
  .sjx{
    display: inline-block;
    margin-bottom: 20px;
    margin-left: 20px;
  }
  .triangle-rotate {
    position: relative;
    width: 200px;
    height: 100px;
    background-color: #000;
    border-radius: 8px;
    margin-left: 50px;
  }

  .triangle-rotate::before {
    position: absolute;
    left: 0;
    top: 0;
    content: "";
    width: 50px;
    height: 50px;
    background-color: #000;
    transform: translate(-50%, 50%) rotate(45deg);
    border-radius: 8px;
  }

  .triangle-rotate2 {
    position: relative;
    width: 200px;
    height: 100px;
    background-color: #000;
    border-radius: 8px;
    margin-left: 50px;
  }

  .triangle-rotate2::before {
    position: absolute;
    left: 0;
    top: 0;
    content: "";
    width: 50px;
    height: 50px;
    background-color: #000;
    transform: translate(-50%, 50%) rotate(45deg);
    border-radius: 0 0 0 8px;
  }

  .jianbian {
    background: linear-gradient(90deg, #770813, #A1151E, #CB272D, #F53F3F, #F76560, #F98A82, #FBB0A4, #FDD5C6, #FFF9E8);
  }


  .jianbian::before {
    background: linear-gradient(45deg, #4D000A, #A1151E);
  }

  .sjx-jianbian {
    display: inline-block;
    position: relative;
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, #000 50%, transparent 50%);
  }
}
.jb{
  margin-top: 16px;
  .sjx-jianbian {
    display: inline-block;
    position: relative;
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, #000 50%, transparent 50%);
}

.jianbian-1 {
  background: 
            linear-gradient(45deg, transparent 50%, #fff 50%),
            linear-gradient(#FFECE8 25%, #FDCDC5 25%, #FBACA3 50%, #F98981 50%, #F76560 75%, #F53F3F 75%) !important;                              
}
}
</style>
