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
          <TyBadge class="message" :dot="true" :max="5" :text="10">
            <TyPoppover trigger="click" placement="bottom">
              <TyIcon icon="ty-notification-2-line" size="20"></TyIcon>

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
                          <TyButton type="secondary" size="mini" :state="item.state">
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

        <div class="contruller">
          <TyIcon icon="ty-translate-2" size="20"></TyIcon>
        </div>
        <div class="contruller sys">
          <TyPoppover trigger="hover" placement="bottom">
            <div style="display: flex; align-items: center">
              <TyImage :size="30" fit="contain" :src="getAssetsFile('../../../../assets/system/header.png')"
                class="bd ml-10" shape="circle" />
              <span style="margin-left: 5px"> Ty Admin </span>
            </div>
            <template #content>
              <div @click="toLock">
                <TyIcon icon="ty-lock-line"></TyIcon>
                <span>
                  锁定屏幕
                </span>
              </div>
              <div @click="sureToExit">
                <TyIcon icon="ty-shut-down-line"></TyIcon>
                <span>
                  退出登录
                </span>
              </div>
            </template>
          </TyPoppover>
        </div>
        <div class="contruller" @click="openCont">
          <TyIcon icon="ty-settings-4-line" size="20"></TyIcon>
        </div>
      </div>
    </div>

    <TyDrawer v-model="model">
      <template #header> 系统设置 </template>

      <div>
        <div style="height: 30px">
          <ty-divider style="--font-body-3: 16px">
            <ty-icon icon="ty-layout-line" class="mw-10"></ty-icon>
            排版样式
          </ty-divider>
        </div>
        <div class="tyadmin-layout">
          <TyRow :gutter="16">
            <TyCol :span="12">
              <div class="layout-1 active layout">
                <div class="left"></div>
                <div class="right">
                  <div class="top"></div>
                  <div class="bottom"></div>
                </div>
              </div>
            </TyCol>
            <TyCol :span="12">
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
        <div style="height: 30px">
          <ty-divider style="--font-body-3: 16px">
            <ty-icon icon="ty-t-shirt-line" class="mw-10"></ty-icon>
            全局主题
          </ty-divider>
        </div>
        <div class="flex-between">
          <label> 主题颜色</label>
          <input type="color" v-model="appStore.pColor" />
        </div>
        <div class="flex-between">
          <label> 灰色模式</label>
          <TySwitch v-model="appStore.isBlackModel" />
        </div>
        <div class="flex-between">
          <label> 色弱模式</label>
          <TySwitch v-model="appStore.isTritanopeModel" />
        </div>
        <div style="height: 30px">
          <ty-divider style="--font-body-3: 16px">
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
import { ref, watch } from 'vue'
import { router } from '@/router'
let dataArr = {
  inform: [
    {
      id: '000000001',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      description: '',
      datetime: '2017-08-09',
      type: '1'
    },
    {
      id: '000000002',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '你推荐的 曲妮妮 已通过第三轮面试',
      description: '',
      datetime: '2017-08-08',
      type: '1'
    },
    {
      id: '000000003',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      title: '这种模板可以区分多种通知类型',
      description: '',
      datetime: '2017-08-07',
      // read: true,
      type: '1'
    },
    {
      id: '000000004',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: '左侧图标用于区分不同的类型',
      description: '',
      datetime: '2017-08-07',
      type: '1'
    },
    {
      id: '000000005',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title:
        '标题可以设置自动显示省略号，本例中标题行数已设为1行，如果内容超过1行将自动截断并支持tooltip显示完整标题。',
      description: '',
      datetime: '2017-08-07',
      type: '1'
    },
    {
      id: '000000006',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: '左侧图标用于区分不同的类型',
      description: '',
      datetime: '2017-08-07',
      type: '1'
    },
    {
      id: '000000007',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: '左侧图标用于区分不同的类型',
      description: '',
      datetime: '2017-08-07',
      type: '1'
    },
    {
      id: '000000008',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: '左侧图标用于区分不同的类型',
      description: '',
      datetime: '2017-08-07',
      type: '1'
    },
    {
      id: '000000009',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: '左侧图标用于区分不同的类型',
      description: '',
      datetime: '2017-08-07',
      type: '1'
    },
    {
      id: '000000010',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: '左侧图标用于区分不同的类型',
      description: '',
      datetime: '2017-08-07',
      type: '1'
    }
  ],
  message: [
    {
      id: '000000006',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '曲丽丽 评论了你',
      description: '描述信息描述信息描述信息',
      datetime: '2017-08-07',
      type: '2',
      clickClose: true
    },
    {
      id: '000000007',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '朱偏右 回复了你',
      description: '这种模板用于提醒谁与你发生了互动',
      datetime: '2017-08-07',
      type: '2',
      clickClose: true
    },
    {
      id: '000000008',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '标题',
      description:
        '请将鼠标移动到此处，以便测试超长的消息在此处将如何处理。本例中设置的描述最大行数为2，超过2行的描述内容将被省略并且可以通过tooltip查看完整内容',
      datetime: '2017-08-07',
      type: '2',
      clickClose: true
    }
  ],
  waitDone: [
    {
      id: '000000009',
      avatar: '',
      title: '任务名称',
      description: '任务需要在 2017-01-12 20:00 前启动',
      datetime: '',
      extra: '未开始',
      color: '',
      type: '3',
      state: 'primary'
    },
    {
      id: '000000010',
      avatar: '',
      title: '第三方紧急代码变更',
      description: '冠霖 需在 2017-01-07 前完成代码变更任务',
      datetime: '',
      extra: '马上到期',
      color: 'red',
      type: '3',
      state: 'warning'
    },
    {
      id: '000000011',
      avatar: '',
      title: '信息安全考试',
      description: '指派竹尔于 2017-01-09 前完成更新并发布',
      datetime: '',
      extra: '已耗时 8 天',
      color: 'gold',
      type: '3',
      state: 'success'
    },
    {
      id: '000000012',
      avatar: '',
      title: 'ABCD 版本发布',
      description: '指派竹尔于 2017-01-09 前完成更新并发布',
      datetime: '',
      extra: '进行中',
      color: 'blue',
      type: '3',
      state: 'danger'
    }
  ]
}

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
let body = document.querySelector('body')

const openMessage = () => { }

let tabKey = ref('inform')

const sureToExit = () => {
  router.push({
    name: 'Login'
  })
}
const toLock =()=>{
  router.push({
    name:'Lock'
  })
}
watch(
  () => appStore.isBlackModel,
  newV => {
    if (newV) {
      body.style.filter = 'grayscale(1)'
      appStore.isTritanopeModel = false
    } else if (body.style.filter === 'grayscale(1)') {
      body.style.filter = ''
    }
  },
  {
    immediate: true
  }
)

watch(
  () => appStore.isTritanopeModel,
  newV => {
    if (newV) {
      body.style.filter = 'invert(80%)'
      appStore.isBlackModel = false
    } else if (body.style.filter === 'invert(80%)') {
      body.style.filter = ''
    }
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
.sys {
  ::v-deep .ty-poppover__content {
    width: 60px;
    padding: unset;
    --border-color-3: transparent;
    top: 44px !important;
    left: 50%;
    transform: translate(-50%) !important;
    height: 60px;
    padding: 10px 0;

    div {
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
  }
}

.message {
  ::v-deep .ty-poppover__content {
    width: 310px;
    padding: unset;
    --border-color-3: transparent;
    top: 44px !important;
    left: 50%;
    transform: translate(-50%) !important;
  }

  ::v-deep .ty-tabs>main {
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

    .img>img {
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

    .img>img {
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

.flex-between {
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-items: center;
  margin-bottom: 16px;
}

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
      height: 35px;
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

  .layout {
    &:hover {
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
