<template>
  <ty-button @click="goBack">返回</ty-button>
  <tChart
    ref="tchart"
    @click="handleClick"
    height="700px"
    :option="mapOption"
    :deepDraw="true"
  ></tChart>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { ref } from 'vue'
import tChart from '@/components/tChart.vue'
import { TyMessage } from 'toyar-design/dist/index.js'
const mapOption = ref() //echars的opeiton
const mapList = ref<string[]>([]) // 记录上次地图
const registerMap = echarts.registerMap
const tchart = ref()
const writeJson = (url, mapName, jsonData) => {
  let el = document.createElement('a')
  el.download = mapName + '.json'
  let data = JSON.stringify(jsonData, undefined, 4)
  let BLOB = new Blob([data], { type: 'text/json' })
  el.href = URL.createObjectURL(BLOB)
  el.click()
}

// 获取地图数据
const getMapJson = async (mapName: string) => {
  try {
    // 首先通过本地获取
    let res = (await import(`./maps/${mapName}.json`)) || {}
    if (res.default) {
      return res.default
    }
  } catch (error) {
    // 否则通过cdn获取
    const url = `https://geo.datav.aliyun.com/areas_v3/bound/${mapName}.json`
    //并且copy到本地
    const mapJson = await fetch(url).then(res => res.json())
    // if (!import.meta.glob('./maps/*.json')[`./maps/${mapName}.json`]) {
    //   writeJson(url, mapName, mapJson)
    // }
    writeJson(url, mapName, mapJson)
    return mapJson
  }
}

// 绘制地图
const setOptions = (mapName, mapData: any, formatter) => {
  return {
    tooltip: {
      show: true,
      formatter
    },
    visualMap: {
      show: true,
      min: 0,
      max: 100,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true,
      seriesIndex: [0],
      inRange: {
        color: ['#00467F', '#A5CC82'] // 蓝绿 data数值越低越蓝色 否则越绿
      }
    },
    geo: {
      map: mapName, //geo数据
      roam: true, //是否可以放大
      select: false,
      zoom: 1, //初始的地图放大倍数
      layoutCenter: ['45%', '60%'], //图形中心点
      layoutSize: 750, //初始大小
      // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
      selectedMode: 'single',
      label: {
        show: true //是否显示地图的背景名称
      },
      emphasis: {
        itemStyle: {
          areaColor: '#389BB7', //鼠标悬浮颜色
          borderColor: '#389BB7', //鼠标悬浮边框颜色
          borderWidth: 1 //鼠标悬浮边框粗细
        },
        label: {
          fontSize: 14 // 鼠标悬浮后的文字大小
        }
      }
    },
    series: [
      // 数据
      {
        type: 'map',
        map: mapName,
        roam: true,
        geoIndex: 0,
        select: false,
        data: mapData
      },
      {
        name: '圆点',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: mapData,
        itemStyle: {
          color: '#05C3F9' //散点颜色
        }
      },
      {
        name: '气泡点',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin', //气泡 circle reect roundRect triangle diamond pin arrow none
        symbolSize: function (val: any) {
          if (val) {
            return val[2] / 4 + 20
          }
        },
        label: {
          show: true,
          formatter: function (params: any) {
            return params.data.data || 0
          },
          color: '#fff',
          fontSize: 7
        },
        itemStyle: {
          color: '#F62157' //标志颜色
        },
        zlevel: 6,
        data: mapData
      },
      {
        //大于某个值的采用黄色显示
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: mapData.map((item: { data: number }) => {
          if (item.data > 60) return item
        }),
        symbolSize: 15,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: true
        },
        itemStyle: {
          color: 'yellow',
          shadowBlur: 10,
          shadowColor: 'yellow'
        },
        zlevel: 1
      }
    ]
  }
}

// 渲染地图
const renderMapEcharts = async (mapName: string) => {
  const mapJson = await getMapJson(mapName)
  // 注册地图数据
  registerMap(mapName, mapJson)

  // 生成数据
  const mapdata = mapJson.features.map((item: { properties: any }) => {
    const { name, adcode, level, parent } = item.properties
    const pAdcode = parent?.adcode //这是上一级的地图编码;

    //这里的数据是模拟的 也可以根据这个adcode|name 去请求
    const data = (Math.random() * 80 + 20).toFixed(0) // 20-80随机数

    const tempValue = item.properties.center
      ? [...item.properties.center, data]
      : item.properties.center
    return {
      name, //获取每一个名称
      value: tempValue, // 中心点经纬度
      adcode, // 区域编码 表示点击后的下一个层级
      level, // 层级
      data // 模拟数据
    }
  })

  const formatter = (params: any) => {
    // 根据需要进行数据处理或格式化操作
    if (params && params.data) {
      const { adcode, name, data } = params.data
      // 返回自定义的tooltip内容
      return `adcode: ${adcode}<br>name: ${name}<br>data: ${data}`
    }
  }
  // 修改 echarsMap 数据
  mapOption.value = setOptions(mapName, mapdata, formatter)
}
const handleClick = param => {
  // 只有点击地图才触发
  if (param.seriesType !== 'map') return
  const { adcode, level } = param.data
  const mapName = level === 'district' ? adcode : adcode + '_full'
  // 防止最后一个层级被重复点击，返回上一级出错
  if (mapList.value[mapList.value.length - 1] === mapName) {
    return TyMessage.error('您已经在最底层了')
  }

  tchart.value.getMyChart().showLoading()

  mapList.value.push(mapName)
  setTimeout(() => {
    renderMapEcharts(mapName)

    tchart.value.getMyChart().hideLoading()
  }, 1500)
}

// 点击返回上一级地图
const goBack = () => {
  const mapName = mapList.value[mapList.value.length - 2] || '100000_full'
  mapList.value.pop()
  renderMapEcharts(mapName)
}

// 初始生成全部地图
renderMapEcharts('100000_full')
</script>
<style lang="less" scoped></style>
