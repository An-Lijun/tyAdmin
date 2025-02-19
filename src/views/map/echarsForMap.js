import * as echarts from 'echarts'
import china from './china.js'

export default class ChinaMap {
  constructor(dom, option) {
    this.myChart = echarts.init(dom)
    echarts.registerMap('china', { geoJSON: china })
    const {
      borderLineColor,
      areaHoverColor,
      areaColor,
      isShowProvince,
      isShowProvinceNm,
      tooltipFn,
      isShowDataList
    } = option
    this.isShowProvinceNm = isShowProvinceNm // 是否需要展示省份名称
    this.isShowProvince = isShowProvince // 是否显示每个省的省会点
    this.isShowDataList = isShowDataList // 是否显示业务散点图
    this.tooltipFn = tooltipFn // 鼠标悬浮在map上的方法
    this.mapNm = 'china'
    this.areaColor = areaColor || '#031525' // 地图背景颜色
    this.borderLineColor = borderLineColor || 'rgb(55, 75, 113)'// 地图边线颜色
    this.areaHoverColor = areaHoverColor || '#2B91B7' // 地图区域鼠标悬浮颜色
    this.dataList = []
    // 全部echarsOption上下文
    this.contentOption = {
      tooltip: {
          trigger: 'item',
          formatter: function(item) {
            const { value, name } = item
            return `
              <div>
                <h1>网点名称: ${name}</h1>
                <div> 设备数${value[2]}</div>
              </div>
            `
          }
      },
      legend: {
        orient: 'vertical',
        y: 'bottom',
        x: 'right',
        data: ['credit_pm2.5'],
        textStyle: {
          color: '#fff'
        }
      }
    }
  }
  setDataList(ls) {
    this.dataList = ls
  }
  /* 重置 */
  resize() {
    this.myChart?.resize()
  }
  /* 画地图 */
  geo() {
    this.contentOption.geo = {
      show: true,
      map: this.mapNm,
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: this.areaColor,
          borderColor: this.borderLineColor
        },
        emphasis: {
          areaColor: this.areaHoverColor
        }
      }
    }
  }

  tooltip() {
    // if (this.tooltipFn) {

    // }

    // this.contentOption.tooltip = {
    //   trigger: 'item',
    //   formatter: (item) => {
    //     console.log(item, '-----------')
    //     // this.tooltipFn(item)
    //   }
    // }
  }
  /* 散点 */
  series() {
    let series = []
    const { features } = china

    const mapFeaturesData = (fn) => {
      features.forEach((v) => {
        fn(v)
      })
    }
    let allMapBaseList = []

    // 是否需要展示省份经纬度
    if (this.isShowProvince) {
      const geoCoordMap = {}

      mapFeaturesData((v) => {
        // 地区名称
        var name = v.properties.name
        // 地区经纬度
        geoCoordMap[name] = v.properties.center

        // 随机加入颜色
        allMapBaseList.push({
          name: name,
          value: Math.round(Math.random() * 100 - 10)
        })
      })

      const convertData = (data) => {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        return res
      }

      series.push({
        name: '省份经纬点',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(allMapBaseList),
        symbolSize: function (val) {
          // 点的大小
          return 5
        },
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: false
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: 'rgba(255,255,0,1)'
          }
        }
      })
    }

    // 是否需要展示省份名称
    if (this.isShowProvinceNm) {
      series.push(
        {
          type: 'map',
          map: this.mapNm,
          geoIndex: 0,
          aspectScale: 0.75, // 长宽比
          roam: true,
          animation: true,
          data: allMapBaseList
        }
      )
    }

    if (this.isShowDataList) {
      const convertData = () => {
        return this.dataList.map(item => ({
          name: item.name,
          value: item.place.concat(Number(item.value))
        }))
      }
      console.log(convertData())
      series.push(
        {
          name: '散点列表',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(),
          symbolSize: 10,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              borderColor: '#fff',
              borderWidth: 1
            },
            label: {
              normal: {
                formatter: '111',
                position: 'right',
                show: true
              }
            },
            normal: {
              color: (e) => {
                if (e.data.name === '东营市') {
                  return 'red'
                }
                return 'yellow'
              },
              shadowBlur: 10,
              shadowColor: '#333'
            }
          }
        })
    }

    // series.push(series)
    this.contentOption.series = series
  }
  /* 初始化 */
  init() {
    // // 打开loading
    this.myChart.showLoading()
    this.geo()
    this.series()
    // this.tooltip()

    this.myChart.setOption(this.contentOption)
    // 关闭loading
    this.myChart.hideLoading()
    window.addEventListener('resize', this.resize)
  }
  // 销毁
  destroy() {
    window.removeEventListener('resize', this.resize)
  }
}
