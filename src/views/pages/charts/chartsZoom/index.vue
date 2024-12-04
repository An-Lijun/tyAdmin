<template>
  <div class="divRoot">
    <tChart height="300px" :option="option"></tChart>

    <tChart height="300px" :option="option2"></tChart>
    <tChart height="300px" :option="option3" @brushselected="brushselected" @brushEnd="brushEnd"></tChart>
    
  </div>
</template>
<script setup>
import tChart from '@/components/tChart.vue'

let option = {
  dataZoom: [
    {
      id: "dataZoomX",
      type: "slider",
      xAxisIndex: [0],
    },
    {
      id: "dataZoomY",
      type: "slider",
      yAxisIndex: [0],
    },
  ],

  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}
let option2 = {
  toolbox: {
      feature: {
        saveAsImage: {}, // 导出图片
        dataView: { readOnly: false }, // 数据视图
        magicType: { type: ["line", "bar"] }, // 动态类型切换
        dataZoom: {}, // 数据区域缩放
        restore: {}, // 重置
      },
    },

  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}

const data = Array.from({ length: 100 }, (_, index) => {
  return [
    new Date(Date.UTC(2024, 2, 6, 0, 0, 0) + index * 60 * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),
    Math.floor(Math.random() * (40 - 20 + 1)) + 20,
  ];
});


let option3 = {
  tooltip: {
    trigger: "axis",
  },
  toolbox: {
    feature: {
      dataZoom: {},
      restore: {},
    },
  },
  brush: {
    throttleType: "debounce",
    throttleDelay: 500,
    xAxisIndex: "all",
    toolbox: ["rect", "clear"],
  },
  xAxis: {
    type: "time",
  },
  yAxis: {
    type: "value",
    name: "温度(°C)",
    min: 0,
    max: 50,
  },
  dataZoom: [
    { type: "slider", xAxisIndex: [0], start: 0, end: 100 },
    { type: "slider", yAxisIndex: [0], start: 0, end: 100 },
  ],
  series: {
    name: "温度(°C)",
    type: "line",
    smooth: true,
    //  随机生成数据
    data: data,
  },
}
const brushselected =(params,myChart)=>{
  
}
const brushEnd =(params,myChart)=>{
  console.log(params);
  
  const xAxisRange = params.areas[0].range[0];
  const yAxisRange = params.areas[0].range[1];
  const xstartValue = xAxisRange[0]; //x 轴 startValue
  const xendValue = xAxisRange[1]; //x 轴 endValue
  const ystartValue = yAxisRange[0]; //y轴 startValue
  const yendValue = yAxisRange[1]; //y轴 endValue
  // 图表行为，根据startValue和endValue进行放大图表区域
  myChart.setOption({
    dataZoom: [
      {
        xAxisIndex: [0], // 控制x轴
        startValue: xstartValue, // x轴起始数值
        endValue: xendValue, // x轴结束数值
      },
      {
        yAxisIndex: [0], // 控制y轴
        startValue: ystartValue, // y轴起始数值
        endValue: yendValue, // y轴结束数值
      },
    ],
  });
}
</script>
<style lang="scss" scoped></style>
