<template>
  <div
    class="ty-adnin-tChart"
    ref="myChartsRef"
    :style="{ height: height, width: width }"
  ></div>
</template>
<script setup lang="ts">
import { ECharts, EChartsOption, init } from 'echarts'
import { ref, onUnmounted, onMounted,watch, defineEmits } from 'vue'
// 定义props
interface Props {
  width?: string
  height?: string
  option: EChartsOption,
  deepDraw:boolean
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
  option: () => ({}),
  deepDraw:false
})

const myChartsRef = ref<HTMLDivElement>()
let myChart: ECharts
let timer:null|Timeout 

let emit = defineEmits(['click'])

let eventMap:{[key: string]:any}={
  click:(params:Object)=>{
    emit('click',params)
  }
}
const addEvent=()=>{
  //绑定事件
  for (const key in eventMap) {
      if (Object.prototype.hasOwnProperty.call(eventMap, key)) {
        myChart.on(key,eventMap[key])
      }
  }
}
const removeEvent=()=>{
  //解绑事件
  for (const key in eventMap) {
      if (Object.prototype.hasOwnProperty.call(eventMap, key)) {
        myChart.off(key,eventMap[key])
      }
    }
}
// 初始化渲染echars
const initChart = () => {
  if(myChart){
    removeEvent()
  }
  // 拿到option配置项，渲染echarts
  myChart = init(myChartsRef.value as HTMLDivElement)
  myChart?.setOption(props.option, true)
  addEvent()

}

// 重新渲染echarts
const resizeChart = (): void => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    if (myChart) {
      myChart.resize()
    }
  }, 500)
}


if(props.deepDraw){
  watch(()=>props.option,()=>{
    initChart()
  },{
    deep:true
  })
}

onMounted(() => {
  if (props.option) {
    setTimeout(()=>{
      initChart()
    })
    window.addEventListener('resize', resizeChart)
  }
})
onUnmounted(() => {
  /**
   * clear 方法是清空缓存的图形，但不会释放实例占用的其他资源，比如容器DOM及绑定的事件等。
   * dispose 方法则是彻底释放ECharts实例占用的所有资源，包括DOM、事件、定时器等。
   * 通常情况下，使用dispose方法会更彻底、更安全，建议在组件销毁时使用dispose方法释放ECharts实例。
   *
   */
  removeEvent()
  myChart.dispose()
  clearTimeout(timer)
  window.removeEventListener('resize', resizeChart)
})


</script>
<style lang="scss" scoped>
</style>
