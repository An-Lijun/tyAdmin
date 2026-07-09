<!-- 分析页 -->
<template>
  <div class="tyAdmin__container animationRightToLeft" style="--border-radius-4:var( --border-radius-12)">
    <TyRow :gutter="16" style="margin: 0 -8px -16px" class="tyAdmin__cardList">
      <TyCol :span="{
        xxl: 6,
        xl: 6,
        lg: 12,
        md: 12,
        sm: 24
      }" v-for="item in analysisList">
        <TyCard :isLoading="isLoading">
          <div class="analysisBody">
            <div class="analysisHead">
              <b> {{ item.title }} </b>
              <TyButton type="secondary" size="mini" :state="item.state">
                月
              </TyButton>
            </div>
            <div class="line1">
              <countTo :value="item.money" :second="2">
                <template #default="{ value }">
                  <span class="money">
                    ${{ value }}
                  </span>
                </template>
              </countTo>

              <img :src="getAssetURL(item.img)" alt="" />
            </div>
            <div class="line2">
              <span>总访问数 </span>
              <span> 120,000 </span>
            </div>
          </div>
        </TyCard>
        <!-- <div class="colBox"></div> -->
      </TyCol>
    </TyRow>
    <TyCard :isLoading="isLoading" style="margin: 16px 0px; padding: unset" :border="false">
      <TyRow :gutter="16" style="margin: 16px 0px;">
        <TyCol>
          <TyTabs v-model="tabs" style="border: unset;">
            <TyTabItem title="流量趋势" name="trend">
              <tChart :deepRender="true" height="270px" :option="option" v-if="tabs === 'trend'" />
            </TyTabItem>
            <TyTabItem title="访问量" name="visit">
              <tChart :deepRender="true" height="270px" :option="option2" v-if="tabs === 'visit'" />
            </TyTabItem>
          </TyTabs>
        </TyCol>
      </TyRow>
    </TyCard>
    <TyRow :gutter="16" style="margin: 0 -8px ">
      <TyCol :span="8">
        <TyCard :isLoading="isLoading" :border="false">
          <template #header> 转化率 </template>
          <tChart height="230px" :option="option3" />
        </TyCard>
      </TyCol>
      <TyCol :span="8">
        <TyCard :isLoading="isLoading" :border="false">
          <template #header> 访问来源 </template>
          <tChart height="230px" :option="option4" />
        </TyCard>
      </TyCol>
      <TyCol :span="8">
        <TyCard :isLoading="isLoading" :border="false">
          <template #header> 成交占比 </template>
          <tChart height="230px" :option="option5" />
        </TyCard>
      </TyCol>
    </TyRow>
  </div>
</template>
<script setup>
import { getAssetURL } from '@/common'
import tChart from '@/components/tChart.vue'
import countTo from '@/components/countTo.vue'
import { ref } from 'vue'

let isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1200)
let tabs = ref('trend')
let analysisList = [
  {
    title: '访问数',
    subTitle: '月',
    money: '2000',
    img: 'assets/analysis/visit-count.svg',
    zTitle: '总访问数',
    num: '120,000',
    state: 'danger'
  },
  {
    title: '访问数',
    subTitle: '月',
    money: '2000',
    img: '/assets/analysis/total-sales.svg',
    zTitle: '总成交额',
    num: '20,000',
    state: 'success'

  },
  {
    title: '访问数',
    subTitle: '月',
    money: '2000',
    img: '/assets/analysis/download-count.svg',
    zTitle: '总下载数',
    num: '20,000',
    state: 'warning'
  },
  {
    title: '访问数',
    subTitle: '月',
    money: '2000',
    img: '/assets/analysis/transaction.svg',
    zTitle: '总成交数',
    num: '20,000',
    state: 'primary'
  }
]
let option = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    padding: [8, 12],
    textStyle: {
      color: '#333',
      fontSize: 12
    },
    axisPointer: {
      type: 'cross',
      lineStyle: {
        width: 1,
        type: 'dashed',
        color: '#ccc'
      },
      crossStyle: {
        color: '#ccc'
      }
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [...new Array(12)].map((_item, index) => `${index + 1}月`),
    axisLine: {
      show: false
    },
    axisLabel: {
      fontSize: 11,
      color: '#999'
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    max: 80,
    splitNumber: 8,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      fontSize: 11,
      color: '#999'
    },
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'solid',
        opacity: 0.15
      }
    }
  },
  grid: { left: '3%', right: '3%', top: '8%', bottom: '10%', containLabel: true },
  series: [
    {
      smooth: true,
      symbol: 'none',
      lineStyle: {
        width: 3
      },
      emphasis: {
        focus: 'series',
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.2)'
        }
      },
      data: [
        50, 30, 40, 25, 70, 60, 55, 35, 45, 50, 42, 45
      ],
      type: 'line',
      areaStyle: {
        opacity: 0.15
      },
      itemStyle: {
      }
    }
  ]
}

let option2 = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    padding: [8, 12],
    textStyle: {
      color: '#333',
      fontSize: 12
    },
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: 'rgba(0,0,0,0.03)'
      }
    }
  },
  grid: { left: '3%', right: '3%', top: '10%', bottom: '10%', containLabel: true },
  xAxis: {
    type: 'category',
    data: [...new Array(9)].map((_item, index) => `${index + 1}月`),
    axisLine: {
      show: false
    },
    axisLabel: {
      fontSize: 11,
      color: '#999'
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    max: 210,
    splitNumber: 7,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      fontSize: 11,
      color: '#999'
    },
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'solid',
        opacity: 0.15
      }
    }
  },
  series: [
    {
      itemStyle: {
        borderRadius: [4, 4, 0, 0]
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.2)'
        }
      },
      data: [
        160, 100, 130, 80, 200, 110, 170, 70, 160
      ],
      type: 'bar',
      barMaxWidth: 40
    }
  ]
}
let option3 = {
  legend: {
    bottom: '5%',
    left: 'center',
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 20,
    textStyle: {
      fontSize: 12,
      color: '#666'
    }
  },
  tooltip: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    padding: [10, 14],
    textStyle: {
      color: '#333',
      fontSize: 12
    }
  },
  radar: {
    radius: '65%',
    splitNumber: 5,
    shape: 'polygon',
    axisName: {
      color: '#666',
      fontSize: 11,
      fontWeight: 'bold'
    },
    splitLine: {
      lineStyle: {
        opacity: 0.3
      }
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ['rgba(255,255,255,0.8)', 'rgba(245,245,245,0.8)']
      }
    },
    axisLine: {
      lineStyle: {
        opacity: 0.3
      }
    },
    indicator: [
      {
        name: '电脑',
        max: 100
      },
      {
        name: '充电器',
        max: 100
      },
      {
        name: '耳机',
        max: 100
      },
      {
        name: '手机',
        max: 100
      },
      {
        name: 'Ipad',
        max: 100
      },
      {
        name: '耳机',
        max: 100
      }
    ]
  },
  series: [
    {
      type: 'radar',
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: {
        width: 2
      },
      emphasis: {
        scale: true,
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.2)'
        }
      },
      areaStyle: {
        opacity: 0.4
      },
      data: [
        {
          value: [90, 50, 86, 40, 50, 20],
          name: '访问',
          itemStyle: {
          }
        },
        {
          value: [70, 75, 70, 76, 20, 85],
          name: '购买',
          itemStyle: {
          }
        }
      ]
    }
  ]
}

let option4 = {
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    padding: [10, 14],
    textStyle: {
      color: '#333',
      fontSize: 12
    },
    formatter: '{b}: {c} ({d}%)'
  },
  legend: {
    bottom: '5%',
    left: 'center',
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 15,
    textStyle: {
      fontSize: 11,
      color: '#666'
    }
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['45%', '75%'],
      center: ['50%', '42%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'outside',
        fontSize: 10,
        color: '#666',
        formatter: '{b}\n{d}%',
        alignTo: 'edge',
        edgeDistance: 10
      },
      labelLine: {
        show: true,
        length: 10,
        length2: 5,
        smooth: true
      },
      emphasis: {
        scale: true,
        scaleSize: 8,
        itemStyle: {
          shadowBlur: 15,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      },
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' }
      ],
      animationType: 'scale',
      animationEasing: 'exponentialInOut',
      animationDelay: function () {
        return Math.random() * 100
      }
    }
  ]
}
let option5 = {
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    padding: [10, 14],
    textStyle: {
      color: '#333',
      fontSize: 12
    },
    formatter: '{b}: {c} ({d}%)'
  },
  legend: {
    bottom: '5%',
    left: 'center',
    icon: 'circle',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 15,
    textStyle: {
      fontSize: 11,
      color: '#666'
    }
  },
  series: [
    {
      name: '成交占比',
      type: 'pie',
      radius: ['30%', '75%'],
      center: ['50%', '42%'],
      data: [
        { value: 500, name: '电子产品' },
        { value: 310, name: '服装' },
        { value: 274, name: '化妆品' },
        { value: 400, name: '家居' }
      ].sort(function (a, b) {
        return a.value - b.value
      }),
      roseType: 'radius',
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        fontSize: 10,
        color: '#666',
        formatter: '{b}\n{d}%'
      },
      labelLine: {
        show: true,
        length: 8,
        length2: 5,
        smooth: true
      },
      emphasis: {
        scale: true,
        scaleSize: 8,
        itemStyle: {
          shadowBlur: 15,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      },
      animationType: 'scale',
      animationEasing: 'exponentialInOut',
      animationDelay: function () {
        return Math.random() * 400
      }
    }
  ]
}
</script>
<style lang="scss" scoped>
.analysisHead {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.analysisBody {
  padding: 15px;

  .line1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0 20px;

    span {
      font-size: 25px;
      color: var(--text-1);
      font-weight: normal;
    }

    img {
      width: 40px;
      height: 40px;
    }
  }

  .line2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--text-2);
  }
}

.colBox {
  background-color: var(--primary-4);
  height: 30px;
  margin: 5px 0;
}

// .tyAdmin__cardList{
//   :deep(.ty-col):nth-child(1){
//     .ty-card{
//       // background-color: red;
//       background: linear-gradient(to right, var(--toyar-xblue-4),var(--toyar-purple-4));
//       color: #fff;
//     }
//   }
//   :deep(.ty-col):nth-child(2){
//     .ty-card{
//       // background-color: red;
//       background: linear-gradient(to right, var(--toyar-pinkpurple-4),var(--toyar-magenta-4));
//       color: #fff;
//     }
//   }
//   :deep(.ty-col):nth-child(3){
//     .ty-card{
//       // background-color: red;
//       background: linear-gradient(to right, var(--toyar-cyan-4),var(--toyar-green-4));
//       color: #fff;
//     }
//   }
//   :deep(.ty-col):nth-child(4){
//     .ty-card{
//       // background-color: red;
//       background: linear-gradient(to right, var(--toyar-red-4),var(--toyar-orangered-4));
//       color: #fff;
//     }
//   }

// }
</style>
