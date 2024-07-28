<!-- 分析页 -->
<template>
  <div class="tyAdmin__container">
    <TyRow :gutter="8" style="margin: 0 -4px -8px">
      <TyCol
        :span="{
          xxl: 6,
          xl: 6,
          lg: 12,
          md: 12,
          sm: 24
        }"
        v-for="item in analysisList"
      >
        <TyCard :isLoading="isLoading" :border="false">
          <template #header>
            <div class="analysisHead">
              <b> {{ item.title }} </b>
              <TyButton type="secondary" size="mini" :state="item.state">
                月
              </TyButton>
            </div>
          </template>
          <div class="analysisBody">
            <div class="line1">
              <countTo :value="item.money" :second="2">
                <template #default="{value}">
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
      <TyRow :gutter="8">
        <TyCol>
          <TyTabs v-model="tabs" style="border: unset;">
            <TyTabItem title="流量趋势" name="a">
              <tChart :deepRender="true" height="270px" :option="option" v-if="tabs === 'a'" />
            </TyTabItem>
            <TyTabItem title="访问量" name="b">
              <tChart :deepRender="true" height="270px" :option="option2" v-if="tabs === 'b'" />
            </TyTabItem>
          </TyTabs>
        </TyCol>
      </TyRow>
    </TyCard>
    <TyRow :gutter="8" style="margin: 14px 0 0">
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
// import { numberAnimation } from '@/common';
import tChart from '@/components/tChart.vue'
import countTo from '@/components/countTo.vue'
let isLoading = ref(true)
setTimeout(() => {
  isLoading.value = false
}, 1500)
import { ref } from 'vue'
let tabs = ref('a')
let analysisList = [
  {
    title: '访问数',
    subTitle: '月',
    money: '2000',
    img: 'assets/analysis/visit-count.svg',
    zTitle: '总访问数',
    num: '120,000',
    state:'danger'
  },
  {
    title: '访问数',
    subTitle: '月',
    money: '2000',
    img: '/assets/analysis/total-sales.svg',
    zTitle: '总成交额',
    num: '20,000',
    state:'success'

  },
  {
    title: '访问数',
    subTitle: '月',
    money: '2000',
    img: '/assets/analysis/download-count.svg',
    zTitle: '总下载数',
    num: '20,000',
    state:'warning'
  },
  {
    title: '访问数',
    subTitle: '月',
    money: '2000',
    img: '/assets/analysis/transaction.svg',
    zTitle: '总成交数',
    num: '20,000',
    state:'primary'
  }
]
let option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        width: 1
      }
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [...new Array(18)].map((_item, index) => `${index + 6}:00`),
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'solid'
      }
    },
    axisTick: {
      show: false
    }
  },
  yAxis: [
    {
      type: 'value',
      max: 80000,
      splitNumber: 4,
      axisTick: {
        show: false
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)']
        }
      }
    }
  ],
  grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
  series: [
    {
      smooth: true,
      data: [
        111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000, 66666,
        44444, 22222, 11111, 4000, 2000, 500, 333, 222, 111
      ],
      type: 'line',
      areaStyle: {},
      itemStyle: {
      }
    },
    {
      smooth: true,
      data: [
        33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000,
        2221, 1201, 390, 198, 60, 30, 22, 11
      ],
      type: 'line',
      areaStyle: {},
      itemStyle: {
      }
    }
  ]
}

let option2 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        width: 1
      }
    }
  },
  grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
  xAxis: {
    type: 'category',
    data: [...new Array(12)].map((_item, index) => `${index + 1}月`)
  },
  yAxis: {
    type: 'value',
    max: 8000,
    splitNumber: 4
  },
  series: [
    {
      data: [
        3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200,
        4800
      ],
      type: 'bar',
      barMaxWidth: 80
    }
  ]
}
let option3 = {
  legend: {
    bottom: 0,
    data: ['访问', '购买']
  },
  tooltip: {},
  radar: {
    radius: '60%',
    splitNumber: 8,
    indicator: [
      {
        name: '电脑'
      },
      {
        name: '充电器'
      },
      {
        name: '耳机'
      },
      {
        name: '手机'
      },
      {
        name: 'Ipad'
      },
      {
        name: '耳机'
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
    trigger: 'item'
  },
  legend: {
    bottom: '1%',
    left: 'center'
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '12',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
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
    trigger: 'item'
  },

  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '80%',
      center: ['50%', '50%'],
      data: [
        { value: 500, name: '电子产品' },
        { value: 310, name: '服装' },
        { value: 274, name: '化妆品' },
        { value: 400, name: '家居' }
      ].sort(function (a, b) {
        return a.value - b.value
      }),
      roseType: 'radius',
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
  background-color: var(--primary-6);
  height: 30px;
  margin: 5px 0;
}
</style>
