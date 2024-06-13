<template>
  <div>
    <TyCard :border="false">
      <div class="header-card">
        <TyImage
          :src="getAssetURL('/assets/system/header.png')"
          fit="cover"
          shape="circle"
        />
        <div class="main">
          <div class="ty-message">
            <div class="h-title">早安, Toyar Admin, 开始您一天的工作吧！</div>
            <div class="s-title">今日晴，20℃ - 32℃！</div>
          </div>
          <div class="info">
            <div v-for="item in infoData" :key="item.title" class="info-box">
              <div class="info-title">
                {{ item.title }}
              </div>
              <div class="info-stitle">
                {{ item.data }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TyCard>
    <div class="tyAdmin__container">
      <div class="left_container">
        <TyCard :border="false">
          <template #header>
            <div style="display: flex; justify-content: space-between">
              <span> 项目 </span>
              <TyButton type="text"> 更多 </TyButton>
            </div>
          </template>
          <div style="display: flex; flex-wrap: wrap">
            <div class="card-item" v-for="item in listData" :key="item.title">
              <TyCard :border="false" shadow="hover" :isLoading="isLoading">
                <div class="line1">
                  <svgIcon
                    :icon="item.icon"
                    :style="{ color: item.color, fontSize: '35px' }"
                  ></svgIcon>
                  {{ item.title }}
                </div>
                <div class="line2">
                  {{ item.message }}
                </div>
                <div class="line3">
                  <span>
                    {{ item.group }}
                  </span>
                  <span>
                    {{ item.time }}
                  </span>
                </div>
              </TyCard>
            </div>
          </div>
        </TyCard>

        <TyCard :border="false" style="margin-top: 14px" :isLoading="isLoading">
          <template #header>
            <div style="display: flex; justify-content: space-between">
              <span> 最新动态 </span>
              <TyButton type="text"> 更多 </TyButton>
            </div>
          </template>
          <div class="zxdt-row" v-for="item in userList" :key="item">
            <TyImage
              :src="getAssetURL(item.icon)"
              fit="cover"
              shape="circle"
              size="40"
            />
            <div>
              <div class="line-1">{{ item.message }}</div>
              <div class="line-2">{{ item.time }}</div>
            </div>
          </div>
        </TyCard>
      </div>
      <div class="right_container">
        <TyCard :border="false">
          <template #header>
            <span> 快捷导航 </span>
          </template>
          <div style="display: flex; flex-wrap: wrap">
            <div class="card-item" v-for="item in rightData" :key="item.title">
              <TyCard :border="false" shadow="hover" :isLoading="isLoading">
                <div>
                  <!-- <img :src="getAssetURL(item.icon)" alt="" /> -->
                  <svgIcon
                    :icon="item.icon"
                    :style="{ color: item.color }"
                  ></svgIcon>
                </div>
                <div>
                  {{ item.title }}
                </div>
              </TyCard>
            </div>
          </div>
        </TyCard>
        <TyCard :border="false" style="margin-top: 14px" :isLoading="isLoading">
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <img
              src="@/assets/system/userB.svg"
              alt=""
              style="width: 80%; height: 300px"
            />
          </div>
        </TyCard>
        <TyCard :border="false" style="margin-top: 14px" :isLoading="isLoading">
          <template #header> 销售统计 </template>
          <tChart height="300px" :option="option" />
        </TyCard>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getAssetURL } from '@/common'
import tChart from '@/components/tChart.vue'
import svgIcon from '@/components/svgIcon.vue'
import { ref } from 'vue'
let infoData = [
  {
    title: '待办',
    data: '2/10'
  },
  {
    title: '项目',
    data: '8'
  },
  {
    title: '团队',
    data: '300'
  }
]
let listData = [
  {
    title: 'Github',
    color: '#000',
    icon: 'github',
    message: '不要等待机会，而要创造机会。',
    group: '开源组',
    time: '2020-10-01'
  },
  {
    title: 'Vue',
    color: 'rgb(63, 178, 127)',
    icon: 'vue',
    message: '现在的你决定将来的你。',
    group: '算法组',
    time: '2021-04-01'
  },
  {
    title: 'Html5',
    color: 'rgb(225, 133, 37)',
    icon: 'html',
    message: '没有什么才能比努力更重要。',
    group: '上班摸鱼',
    time: '2021-04-01'
  },
  {
    title: 'Angular',
    color: 'rgb(191, 12, 44)',
    icon: 'angular',
    message: '热情和欲望可以突破一切难关。',
    group: 'UI',
    time: '2021-04-01'
  },
  {
    title: 'React',
    color: 'rgb(0, 216, 255)',
    icon: 'react',
    message: '健康的身体是实现目标的基石。',
    group: '技术牛',
    time: '2021-04-17'
  },
  {
    title: 'Js',
    color: 'rgb(235, 217, 78)',
    icon: 'js',
    message: '路是走出来的，而不是空想出来的。',
    group: '架构组',
    time: '2022-04-12'
  }
]
let rightData = [
  {
    color: 'rgb(31, 218, 202)',
    icon: 'home',
    title: '首页'
  },
  {
    color: 'rgb(191, 12, 44)',
    icon: 'dashboard',
    title: '仪表盘'
  },
  {
    color: 'rgb(225, 133, 37)',
    icon: 'component',
    title: '组件'
  },
  {
    color: ' rgb(63, 178, 127)',
    icon: 'system',
    title: '系统'
  },
  {
    color: 'rgba(77, 175, 27, 0.79)',
    icon: 'qx',
    title: '权限管理'
  },
  {
    color: 'rgb(0, 216, 255)',
    icon: 'chart',
    title: '图标'
  }
]
let userList = [
  {
    icon: '/assets/system/dynamic-avatar-1.svg',
    message: '威廉 在 开源组 创建了项目 Vue',
    time: '刚刚'
  },
  {
    icon: '/assets/system/dynamic-avatar-2.svg',
    message: '艾文 关注了 威廉',
    time: '一个小时前'
  },
  {
    icon: '/assets/system/dynamic-avatar-3.svg',
    message: 'Toyar 发表文章 如何编写一个Vite插件',
    time: '2天前'
  },
  {
    icon: '/assets/system/dynamic-avatar-4.svg',
    message: '皮特 回复了 杰克 的问题 如何进行项目优化？',
    time: '1周前'
  }
]
let option = {
  legend: {
    bottom: 0,
    data: ['Visits', 'Sales']
  },
  tooltip: {},
  radar: {
    radius: '60%',
    splitNumber: 8,
    indicator: [
      {
        name: '2017'
      },
      {
        name: '2017'
      },
      {
        name: '2018'
      },
      {
        name: '2019'
      },
      {
        name: '2020'
      },
      {
        name: '2021'
      }
    ]
  },
  series: [
    {
      type: 'radar',
      symbolSize: 0,
      areaStyle: {
        shadowBlur: 0,
        shadowColor: 'rgba(0,0,0,.2)',
        shadowOffsetX: 0,
        shadowOffsetY: 10,
        opacity: 1
      },
      data: [
        {
          value: [90, 50, 86, 40, 50, 20],
          name: 'Visits',
          itemStyle: {
            color: '#9f8ed7'
          }
        },
        {
          value: [70, 75, 70, 76, 20, 85],
          name: 'Sales',
          itemStyle: {
            color: '#1edec5'
          }
        }
      ]
    }
  ]
}

let isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 3500)
</script>
<style lang="scss" scoped>
.header-card {
  display: flex;
  .ty-message {
    margin-left: 30px;
    .h-title {
      height: 60px;
      line-height: 60px;
      font-size: 20px;
    }
    .s-title {
      color: #999;
    }
  }
}
.main {
  flex: 1;
  display: flex;
  justify-content: space-between;
  .info {
    height: 100%;
    .info-box {
      height: 100%;
      display: inline-flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      margin: 0 15px;
      .info-title {
        margin-bottom: 10px;
        color: #666;
        font-size: 14px;
      }
      .info-stitle {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
.tyAdmin__container {
  display: flex;
  .left_container {
    width: 70%;
    margin-right: 14px;
    .card-item {
      width: 33%;
      padding-bottom: 10px;
    }
    .line1 {
      margin: 10px 0;
      font-size: 20px;
      display: flex;
      align-items: center;
      .ty-svgIcon {
        margin-right: 15px;
      }
    }
    .line2 {
      color: #666;
      margin-bottom: 25px;
    }
    .line3 {
      display: flex;
      color: #666;
      justify-content: space-between;
    }
    .zxdt-row {
      display: flex;
      margin-bottom: 20px;
      padding: 20px 40px;
      align-items: center;
      border-bottom: 1px solid rgba(5, 5, 5, 0.06);
      .ty-image {
        margin-right: 15px;
      }
      .line-1 {
        margin-bottom: 10px;
        font-size: 20px;
      }
      .line-2 {
        font-size: 16px;
        color: #666;
      }
    }
  }
  .right_container {
    flex: 1;
  }
}
.right_container {
  img {
    width: 20px;
    height: 20px;
  }
  .card-item {
    width: 33.33%;
    div {
      display: flex;
      justify-content: center;
      &:first-child {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
