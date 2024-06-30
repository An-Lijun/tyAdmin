<template>
  <TyHeader height="70" class="tyAdmin-header">
    <div class="tyAdmin-header__content">
      <div class="tyAdmin-header__left">
        <span class="foldBtn">
          <TyIcon :icon="appStore.isFold ? 'ty-indent-increase' : 'ty-indent-decrease'
            " size="20" @click="toFold"></TyIcon>
        </span>
        <TyBreadcrumb>
          <TyBreadcrumbItem to="home">首页</TyBreadcrumbItem>
          <TyBreadcrumbItem>活动</TyBreadcrumbItem>
          <TyBreadcrumbItem> 管理</TyBreadcrumbItem>
          <TyBreadcrumbItem>活动列表</TyBreadcrumbItem>
        </TyBreadcrumb>
      </div>
      <div class="tyAdmin-header__right">
        <div class="contruller">
          <TyIcon icon="ty-search-line" size="20"></TyIcon>
        </div>
        <div class="contruller">
          <TyBadge class="mg" :dot="true" :max="5" :text="10">
            <TyIcon icon="ty-notification-2-line" size="20"></TyIcon>
          </TyBadge>
        </div>

        <div class="contruller">
          <TyIcon icon="ty-translate-2" size="20"></TyIcon>
        </div>
        <div class="contruller">
          <TyImage :size="30" fit="contain" :src="getAssetsFile('../../../../assets/system/header.png')"
            class="bd ml-10" shape="circle" />
          <span style="margin-left: 5px"> Ty Admin </span>
        </div>
        <div class="contruller" @click="openCont">
          <TyIcon icon="ty-settings-4-line" size="20"></TyIcon>
        </div>
      </div>
    </div>


    <TyDrawer v-model="model">
      <template #header>
        系统设置
      </template>

      <div>
        <div style="height: 30px;">
          <ty-divider style="--font-body-3:16px">
            <ty-icon icon="ty-layout-line" class="mw-10"></ty-icon>
            排版样式
          </ty-divider>
        </div>
        <div class="tyadmin-layout">
          <TyRow gutter="16">
            <TyCol span="12">
              <div class="layout-1 active layout">
                <div class="left"></div>
                <div class="right">
                  <div class="top"></div>
                  <div class="bottom"></div>
                </div>
              </div>
            </TyCol>
            <TyCol span="12">
              <div class="layout-2 layout">

                <div class="top"></div>
                <div class="bottom">
                  <div class="left"></div>
                  <div class="right"></div>
                </div>
              </div>
            </TyCol>
          </TyRow>

        </div>
        <div style="height: 30px;">
          <ty-divider style="--font-body-3:16px">
            <ty-icon icon="ty-t-shirt-line" class="mw-10"></ty-icon>
            全局主题
          </ty-divider>
        </div>
        <div style="height: 30px;">

          <ty-divider style="--font-body-3:16px">
            <ty-icon icon="ty-settings-4-line" class="mw-10"></ty-icon>
            界面设置
          </ty-divider>
        </div>

      </div>
    </TyDrawer>
  </TyHeader>
</template>
<script setup lang="ts">
import useAppStore from '@/store/modules/app'
import { ref } from 'vue'

const appStore = useAppStore()
const toFold = () => {
  appStore.isFold = !appStore.isFold
}
const getAssetsFile = (url: string) => {
  return new URL(`${url}`, import.meta.url).href
}

const model = ref(false)
const openCont = () => {
  model.value = !model.value
}
</script>
<style lang="scss" scoped>
.tyAdmin-header {
  background-color: #fff;

  .tyAdmin-header__content {
    height: 50px;
    padding: 0 10px;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color-1);

    .tyAdmin-header__left {
      height: 100%;
      display: flex;
      align-items: center;

      .foldBtn {
        margin-right: 10px;

        &:hover {
          cursor: pointer;
        }
      }
    }

    .tyAdmin-header__right {
      height: 100%;
      display: flex;
      align-items: center;

      .contruller {
        margin: 0 10px;
        display: flex;
        align-items: center;
        height: 100%;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}

.tyadmin-layout {
  .active {
    position: relative;
    border: var(--border-2) solid var(--primary-6);
    box-sizing: border-box;

    &:after {
      content: '';
      display: inline-block;
      width: 35px;
      height:35px;
      position: absolute;
      background-color: var(--primary-6);
      right: 0;
      color: #fff;
      bottom: 0;
      line-height: 30px;
      text-align: right;
      font-size: 10px;
      clip-path: polygon(100% 0, 0% 100%, 100% 100%);
      background-image: url('../../../../assets/analysis/right.png');
      background-position: right bottom;
      background-size: 60%;
      background-repeat: no-repeat;
    }
  }
  .layout{
    &:hover{
      cursor: pointer;
    }
  }
  .layout-1 {
    height: 70px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: var(--border-radius-8);
    padding: 5px 0;
    box-shadow: var(--box-shadow-3);

    .left {
      height: 100%;
      width: 25%;
      background-color: var(--primary-6);
      border-radius: var(--border-radius-4);
    }

    .right {
      height: 100%;
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .top {
        height: 25%;
        background-color: var(--primary-3);
        border-radius: var(--border-radius-2);
      }

      .bottom {
        height: 65%;
        background-color: var(--primary-2);
        border-radius: var(--border-radius-2);
        border: var(--border-1) dashed var(--primary-5);
      }
    }
  }

  .layout-2 {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border-radius: var(--border-radius-8);
    padding: 0 5px;
    box-shadow: var(--box-shadow-3);

    .top {
      height: 25%;
      width: 100%;
      background-color: var(--primary-6);
      border-radius: var(--border-radius-4);
    }

    .bottom {
      height: 55%;
      display: flex;
      justify-content: space-between;

      .left {
        background-color: var(--primary-3);
        border-radius: var(--border-radius-2);
        height: 100%;
        width: 15%;
      }

      .right {
        height: 100%;
        width: 80%;
        box-sizing: border-box;
        background-color: var(--primary-2);
        border-radius: var(--border-radius-2);
        border: var(--border-1) dashed var(--primary-5);
      }
    }
  }

  // <div class="layout-2">

  // <div class="top"></div>
  // <div class="bottom">
  //   <div class="left"></div>
  //   <div class="right"></div>
  // </div>
  // </div>

}

// .       <div class="layout-1">
//                 <div class="left"></div>
//                 <div class="right">
//                   <div class="top"></div>
//                   <div class="bottom"></div>
//                 </div>
//               </div></style>
