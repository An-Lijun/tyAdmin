const charts=[
  {
    title:'折线图',
    option:{
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
  },
  {
    title:'平滑线图',
    option:{
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }
      ]
    }
  },
  {
    title:'柱状图',
    option:{
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    }
  },
  {
    title:'饼状图',
    option:{
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  },
  {
    title:'散点图',
    option:{
      xAxis: {},
      yAxis: {},
      series: [
        {
          symbolSize: 20,
          data: [
            [10.0, 8.04],
            [8.07, 6.95],
            [13.0, 7.58],
            [9.05, 8.81],
            [11.0, 8.33],
            [14.0, 7.66],
            [13.4, 6.81],
            [10.0, 6.33],
            [14.0, 8.96],
            [12.5, 6.82],
            [9.15, 7.2],
            [11.5, 7.2],
            [3.03, 4.23],
            [12.2, 7.83],
            [2.02, 4.47],
            [1.05, 3.33],
            [4.05, 4.96],
            [6.03, 7.24],
            [12.0, 6.26],
            [12.0, 8.84],
            [7.08, 5.82],
            [5.02, 5.68]
          ],
          type: 'scatter'
        }
      ]
    }
  },
  {
    title:'旭日图',
    option:{
      silent: true,
      series: [
        {
          radius: ['15%', '80%'],
          type: 'sunburst',
          sort: undefined,
          emphasis: {
            focus: 'ancestor'
          },
          data: [
            {
              value: 8,
              children: [
                {
                  value: 4,
                  children: [
                    {
                      value: 2
                    },
                    {
                      value: 1
                    },
                    {
                      value: 1
                    },
                    {
                      value: 0.5
                    }
                  ]
                },
                {
                  value: 2
                }
              ]
            },
            {
              value: 4,
              children: [
                {
                  children: [
                    {
                      value: 2
                    }
                  ]
                }
              ]
            },
            {
              value: 4,
              children: [
                {
                  children: [
                    {
                      value: 2
                    }
                  ]
                }
              ]
            },
            {
              value: 3,
              children: [
                {
                  children: [
                    {
                      value: 1
                    }
                  ]
                }
              ]
            }
          ],
          label: {
            color: '#000',
            textBorderColor: '#fff',
            textBorderWidth: 2,
            formatter: function (param) {
              var depth = param.treePathInfo.length;
              if (depth === 2) {
                return 'radial';
              } else if (depth === 3) {
                return 'tangential';
              } else if (depth === 4) {
                return '0';
              }
              return '';
            }
          },
          levels: [
            {},
            {
              itemStyle: {
                color: '#CD4949'
              },
              label: {
                rotate: 'radial'
              }
            },
            {
              itemStyle: {
                color: '#F47251'
              },
              label: {
                rotate: 'tangential'
              }
            },
            {
              itemStyle: {
                color: '#FFC75F'
              },
              label: {
                rotate: 0
              }
            }
          ]
        }
      ]
    }
  },
    {
    title:'漏斗图',
    option:{
      title: {
        text: 'Funnel'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%'
      },
      toolbox: {
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      legend: {
        data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
      },
      series: [
        {
          name: 'Funnel',
          type: 'funnel',
          left: '10%',
          top: 60,
          bottom: 60,
          width: '80%',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside'
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          emphasis: {
            label: {
              fontSize: 20
            }
          },
          data: [
            { value: 60, name: 'Visit' },
            { value: 40, name: 'Inquiry' },
            { value: 20, name: 'Order' },
            { value: 80, name: 'Click' },
            { value: 100, name: 'Show' }
          ]
        }
      ]
    }
  },
  {
    title:'仪表图',
    option:{
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '75%'],
          radius: '90%',
          min: 0,
          max: 1,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.25, '#FF6E76'],
                [0.5, '#FDDD60'],
                [0.75, '#58D9F9'],
                [1, '#7CFFB2']
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: 'auto',
              width: 2
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'auto',
              width: 5
            }
          },
          axisLabel: {
            color: '#464646',
            fontSize: 20,
            distance: -60,
            rotate: 'tangential',
            formatter: function (value) {
              if (value === 0.875) {
                return 'Grade A';
              } else if (value === 0.625) {
                return 'Grade B';
              } else if (value === 0.375) {
                return 'Grade C';
              } else if (value === 0.125) {
                return 'Grade D';
              }
              return '';
            }
          },
          title: {
            offsetCenter: [0, '-10%'],
            fontSize: 20
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, '-35%'],
            valueAnimation: true,
            formatter: function (value) {
              return Math.round(value * 100) + '';
            },
            color: 'inherit'
          },
          data: [
            {
              value: 0.7,
              name: 'Grade Rating'
            }
          ]
        }
      ]
    }
  },
  {
    title:'象形河流图',
    option:{
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(0,0,0,0.2)',
            width: 1,
            type: 'solid'
          }
        }
      },
      legend: {
        data: ['DQ', 'TY', 'SS', 'QG', 'SY', 'DD']
      },
      singleAxis: {
        top: 50,
        bottom: 50,
        axisTick: {},
        axisLabel: {},
        type: 'time',
        axisPointer: {
          animation: true,
          label: {
            show: true
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            opacity: 0.2
          }
        }
      },
      series: [
        {
          type: 'themeRiver',
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0, 0, 0, 0.8)'
            }
          },
          data: [
            ['2015/11/08', 10, 'DQ'],
            ['2015/11/09', 15, 'DQ'],
            ['2015/11/10', 35, 'DQ'],
            ['2015/11/11', 38, 'DQ'],
            ['2015/11/12', 22, 'DQ'],
            ['2015/11/13', 16, 'DQ'],
            ['2015/11/14', 7, 'DQ'],
            ['2015/11/15', 2, 'DQ'],
            ['2015/11/16', 17, 'DQ'],
            ['2015/11/17', 33, 'DQ'],
            ['2015/11/18', 40, 'DQ'],
            ['2015/11/19', 32, 'DQ'],
            ['2015/11/20', 26, 'DQ'],
            ['2015/11/21', 35, 'DQ'],
            ['2015/11/22', 40, 'DQ'],
            ['2015/11/23', 32, 'DQ'],
            ['2015/11/24', 26, 'DQ'],
            ['2015/11/25', 22, 'DQ'],
            ['2015/11/26', 16, 'DQ'],
            ['2015/11/27', 22, 'DQ'],
            ['2015/11/28', 10, 'DQ'],
            ['2015/11/08', 35, 'TY'],
            ['2015/11/09', 36, 'TY'],
            ['2015/11/10', 37, 'TY'],
            ['2015/11/11', 22, 'TY'],
            ['2015/11/12', 24, 'TY'],
            ['2015/11/13', 26, 'TY'],
            ['2015/11/14', 34, 'TY'],
            ['2015/11/15', 21, 'TY'],
            ['2015/11/16', 18, 'TY'],
            ['2015/11/17', 45, 'TY'],
            ['2015/11/18', 32, 'TY'],
            ['2015/11/19', 35, 'TY'],
            ['2015/11/20', 30, 'TY'],
            ['2015/11/21', 28, 'TY'],
            ['2015/11/22', 27, 'TY'],
            ['2015/11/23', 26, 'TY'],
            ['2015/11/24', 15, 'TY'],
            ['2015/11/25', 30, 'TY'],
            ['2015/11/26', 35, 'TY'],
            ['2015/11/27', 42, 'TY'],
            ['2015/11/28', 42, 'TY'],
            ['2015/11/08', 21, 'SS'],
            ['2015/11/09', 25, 'SS'],
            ['2015/11/10', 27, 'SS'],
            ['2015/11/11', 23, 'SS'],
            ['2015/11/12', 24, 'SS'],
            ['2015/11/13', 21, 'SS'],
            ['2015/11/14', 35, 'SS'],
            ['2015/11/15', 39, 'SS'],
            ['2015/11/16', 40, 'SS'],
            ['2015/11/17', 36, 'SS'],
            ['2015/11/18', 33, 'SS'],
            ['2015/11/19', 43, 'SS'],
            ['2015/11/20', 40, 'SS'],
            ['2015/11/21', 34, 'SS'],
            ['2015/11/22', 28, 'SS'],
            ['2015/11/23', 26, 'SS'],
            ['2015/11/24', 37, 'SS'],
            ['2015/11/25', 41, 'SS'],
            ['2015/11/26', 46, 'SS'],
            ['2015/11/27', 47, 'SS'],
            ['2015/11/28', 41, 'SS'],
            ['2015/11/08', 10, 'QG'],
            ['2015/11/09', 15, 'QG'],
            ['2015/11/10', 35, 'QG'],
            ['2015/11/11', 38, 'QG'],
            ['2015/11/12', 22, 'QG'],
            ['2015/11/13', 16, 'QG'],
            ['2015/11/14', 7, 'QG'],
            ['2015/11/15', 2, 'QG'],
            ['2015/11/16', 17, 'QG'],
            ['2015/11/17', 33, 'QG'],
            ['2015/11/18', 40, 'QG'],
            ['2015/11/19', 32, 'QG'],
            ['2015/11/20', 26, 'QG'],
            ['2015/11/21', 35, 'QG'],
            ['2015/11/22', 40, 'QG'],
            ['2015/11/23', 32, 'QG'],
            ['2015/11/24', 26, 'QG'],
            ['2015/11/25', 22, 'QG'],
            ['2015/11/26', 16, 'QG'],
            ['2015/11/27', 22, 'QG'],
            ['2015/11/28', 10, 'QG'],
            ['2015/11/08', 10, 'SY'],
            ['2015/11/09', 15, 'SY'],
            ['2015/11/10', 35, 'SY'],
            ['2015/11/11', 38, 'SY'],
            ['2015/11/12', 22, 'SY'],
            ['2015/11/13', 16, 'SY'],
            ['2015/11/14', 7, 'SY'],
            ['2015/11/15', 2, 'SY'],
            ['2015/11/16', 17, 'SY'],
            ['2015/11/17', 33, 'SY'],
            ['2015/11/18', 40, 'SY'],
            ['2015/11/19', 32, 'SY'],
            ['2015/11/20', 26, 'SY'],
            ['2015/11/21', 35, 'SY'],
            ['2015/11/22', 4, 'SY'],
            ['2015/11/23', 32, 'SY'],
            ['2015/11/24', 26, 'SY'],
            ['2015/11/25', 22, 'SY'],
            ['2015/11/26', 16, 'SY'],
            ['2015/11/27', 22, 'SY'],
            ['2015/11/28', 10, 'SY'],
            ['2015/11/08', 10, 'DD'],
            ['2015/11/09', 15, 'DD'],
            ['2015/11/10', 35, 'DD'],
            ['2015/11/11', 38, 'DD'],
            ['2015/11/12', 22, 'DD'],
            ['2015/11/13', 16, 'DD'],
            ['2015/11/14', 7, 'DD'],
            ['2015/11/15', 2, 'DD'],
            ['2015/11/16', 17, 'DD'],
            ['2015/11/17', 33, 'DD'],
            ['2015/11/18', 4, 'DD'],
            ['2015/11/19', 32, 'DD'],
            ['2015/11/20', 26, 'DD'],
            ['2015/11/21', 35, 'DD'],
            ['2015/11/22', 40, 'DD'],
            ['2015/11/23', 32, 'DD'],
            ['2015/11/24', 26, 'DD'],
            ['2015/11/25', 22, 'DD'],
            ['2015/11/26', 16, 'DD'],
            ['2015/11/27', 22, 'DD'],
            ['2015/11/28', 10, 'DD']
          ]
        }
      ]
    }
  },
]
export default charts