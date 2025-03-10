<template>
  <TyHeader
    height="80"
    class="tyAdmin-header"
    style="min-height: 80px; background-color: var(--color-bg-2)"
  >
    <div class="tyAdmin-header__content">
      <div class="tyAdmin-header__left">
        <span class="foldBtn">
          <TyIcon
            style="color: var(--toyar-gray-10)"
            :icon="
              appStore.isFold ? 'ty-indent-increase' : 'ty-indent-decrease'
            "
            size="18"
            @click="toFold"
          />
        </span>
        <TyBreadcrumb>
          <TyBreadcrumbItem to="home">首页</TyBreadcrumbItem>
          <TyBreadcrumbItem>活动</TyBreadcrumbItem>
          <TyBreadcrumbItem> 管理</TyBreadcrumbItem>
          <TyBreadcrumbItem>活动列表</TyBreadcrumbItem>
        </TyBreadcrumb>
      </div>
      <div class="tyAdmin-header__right">
        <TyIcon
          class="contruller"
          icon="ty-search-line"
          size="18"
          style="color: var(--toyar-gray-10)"
        ></TyIcon>
        <div class="contruller">
          <TyBadge class="message" :dot="true" :max="5" :text="10">
            <TyPoppover trigger="click" placement="bottom">
              <TyIcon
                icon="ty-notification-2-line"
                size="18"
                style="color: var(--toyar-gray-10)"
              ></TyIcon>
              <template #content>
                <TyTabs v-model="tabKey">
                  <TyTabItem title="通知(5)" name="inform">
                    <div class="infomLs" v-for="item in dataArr.inform">
                      <div class="img">
                        <img :src="item.avatar" alt="" />
                      </div>
                      <div class="info">
                        <div class="title">
                          {{ item.title }}
                        </div>
                        <div class="time">
                          {{ item.datetime }}
                        </div>
                      </div>
                    </div>
                  </TyTabItem>
                  <TyTabItem title="消息(0)" name="message">
                    <div class="messageLs" v-for="item in dataArr.message">
                      <div class="img">
                        <img :src="item.avatar" alt="" />
                      </div>
                      <div class="info">
                        <div class="title">
                          {{ item.title }}
                        </div>
                        <div class="description">
                          {{ item.description }}
                        </div>
                        <div class="time">
                          {{ item.datetime }}
                        </div>
                      </div>
                    </div>
                  </TyTabItem>
                  <TyTabItem title="待办(0)" name="waitDone">
                    <div class="waitDoneLs" v-for="item in dataArr.waitDone">
                      <div class="info">
                        <div class="title">
                          <span>{{ item.title }}</span>
                          <TyButton
                            type="secondary"
                            size="mini"
                            :state="item.state"
                          >
                            {{ item.extra }}
                          </TyButton>
                        </div>
                        <div class="description">
                          {{ item.description }}
                        </div>
                      </div>
                    </div>
                  </TyTabItem>
                </TyTabs>
              </template>
            </TyPoppover>
          </TyBadge>
        </div>
        <TyPoppover class="contruller lang" trigger="click" placement="bottom">
          <TyIcon
            class="contruller"
            icon="ty-translate-2"
            size="18"
            style="color: var(--toyar-gray-10)"
          ></TyIcon>
          <template #content>
            <div @click="changeLang(item)" class="download-box" v-for="item in localeList">
              <span> {{item.text}} </span>
            </div>
            <!-- <div @click="sureToExit" class="download-box">
              <TyIcon icon="ty-shut-down-line"></TyIcon>
              <span> 退出登录 </span>
            </div> -->
          </template>
        </TyPoppover>

        <TyPoppover class="contruller sys" trigger="hover" placement="bottom">
          <div style="display: flex; align-items: center">
            <TyImage
              :size="25"
              fit="contain"
              :src="getAssetURL('/assets/system/header.png')"
              class="bd ml-10"
              shape="circle"
            />
            <span style="margin-left: 5px;font-size:13px"> Ty Admin </span>
          </div>
          <template #content>
            <div @click="toLock" class="download-box">
              <TyIcon icon="ty-lock-line"></TyIcon>
              <span> 锁定屏幕 </span>
            </div>
            <div @click="sureToExit" class="download-box">
              <TyIcon icon="ty-shut-down-line"></TyIcon>
              <span> 退出登录 </span>
            </div>
          </template>
        </TyPoppover>
        <TyIcon
          class="contruller"
          @click="openCont"
          icon="ty-settings-4-line"
          size="18"
          style="color: var(--toyar-gray-10)"
        ></TyIcon>
      </div>
    </div>
    <div class="tyAdmin-header__visitingList">
      <span
        class="tyAdmin-header_visitingMenu"
        style="margin-right: 5px"
        v-for="menu in menuStore.visitingMenu"
        :class="{
          active: getMkey(menu.path) === menuStore.activeMenu
        }"
        @click="changeMenu(menu)"
        @contextmenu.prevent="closeMenu(menu)"
      >
        {{ menu.label }}
      </span>
    </div>
    <SConfig v-model="model" />
  </TyHeader>
</template>
<script setup lang="ts">
import useAppStore from '@/store/modules/app'
import useMenuStore from '@/store/modules/menu'

import SConfig from './SConfig.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import dataArr from '../data/dataArr.js'
import { getAssetURL } from '@/common'
import {localeList} from '@/locales/lang/constant'

const router = useRouter()
const appStore = useAppStore()
const menuStore = useMenuStore()
const toFold = () => {
  appStore.isFold = !appStore.isFold
}

const changeLang =(val)=>{

}

const model = ref(false)
const openCont = () => {
  model.value = !model.value
}

let tabKey = ref('inform')

const sureToExit = () => {
  router.push({
    name: 'login'
  })
}
const toLock = () => {
  router.push({
    name: 'lock'
  })
}
const getMkey = path => '/' + path.replaceAll('/', '')
const changeMenu = menu => {
  router.push(menu.path)
  menuStore.activeMenu = getMkey(menu.path)
}

const closeMenu = (id, trades, ev) => {
  // let posX = 0, posY = 0;
  // let event = ev || window.event;
  // if (event.pageX || event.pageY) {
  //   posX = event.pageX;
  //   posY = event.pageY;
  // } else if (event.clientX || event.clientY) {
  //   posX = event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
  //   posY = event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
  // }
  //   this.$store.state.openDialog('closeMenuDialog', {
  //     id: id,
  //     trades: trades,
  //     x: posX,
  //     y: posY,
  //     tradesys: this,
  //   }, true);
}
</script>
<style lang="scss" scoped>
.sys {
  :deep(.ty-poppover__content) {
    width: 60px;
    padding: 10px 0;
    .download-box {
      height: 30px;
      display: flex;
      align-items: center;
      padding-left: 10px;

      span {
        margin-left: 5px;
      }

      &:hover {
        color: var(--primary-6);
      }
    }
    main {
      margin-bottom: unset;
    }
  }
}
.lang{
  :deep(.ty-poppover__content) {
    width: 100px;
    min-width: 100px;
    padding: 10px 0;
    .download-box {
      height: 30px;
      display: flex;
      align-items: center;
      padding-left: 10px;
      span {
        margin-left: 5px;
      }

      &:hover {
        color: var(--primary-6);
      }
    }
    main {
      margin-bottom: unset;
    }
  }
}

.message {
  :deep(.ty-poppover__content) {
    width: 310px;
    padding: unset;
    --border-color-3: transparent;
    main {
      margin-bottom: unset;
    }
    .ty-tabs.normal {
      border: unset;
    }
    .ty-poppover__arrow {
      top: -16px;
    }
  }
  // var(--bg-2);
  :deep(.ty-tabs) > main {
    height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .infomLs {
    height: 50px;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    align-items: center;

    .img > img {
      width: 30px;
      height: 30px;
    }

    .info {
      width: 230px;
      padding-left: 15px;

      .title {
        color: var(--text-1);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .time {
        font-size: 14px;
        color: var(--text-3);
        margin-top: 5px;
      }
    }
  }

  .messageLs {
    height: 70px;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    align-items: center;

    .img > img {
      width: 30px;
      height: 30px;
    }

    .info {
      width: 230px;
      padding-left: 15px;

      .title {
        color: var(--text-1);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .description {
        color: var(--text-2);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .time {
        font-size: 14px;
        color: var(--text-3);
        margin-top: 5px;
      }
    }
  }

  .waitDoneLs {
    height: 70px;
    padding: 5px;

    .info {
      width: 230px;
      padding-left: 15px;

      .title {
        color: var(--text-1);
        display: flex;
        justify-content: space-between;
      }

      .description {
        color: var(--text-2);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 5px;
      }
    }
  }
}

.tyAdmin-header {
  background-color: #fff;

  .tyAdmin-header__content {
    height: 48px;
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

  .tyAdmin-header__visitingList {
    overflow-x: hidden;
    padding: 0 5px;
    display: flex;
    height: 32px;
    max-height: 32px;
    align-items: end;
  }

  .tyAdmin-header_visitingMenu {
    border: 1px solid var(--border-color-1);
    background-color: var(--fill-2);
    font-size: 12px;
    color: var(--text-1);
    padding: 0 10px;
    border-radius: var(--border-radius-8) var(--border-radius-8) 0 0;
    height: 27px;
    line-height: 27px;

    &:hover {
      cursor: pointer;
      background-color: var(--primary-7);
      color: #fff;
    }

    &.active {
      background-color: var(--primary-6);
      color: #fff;
    }
  }
}
</style>
