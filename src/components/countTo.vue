<template>
  <span >
    <slot :value="value">
      {{ value }}
    </slot>
  </span>
</template>
<script setup>
import{computed,ref} from 'vue'
const props =defineProps({
  value:{
    type:String,
  },
  second:{
    type:Number
  }
})
let value = ref(0)

function  numberAnimation(number) {
  let handle, //句柄
    content = 0; //内容
    let time = number / (props.second * 60); //秒数
  //requestAnimationFrame 每秒大约60帧 就是每秒的执行次数 所以这里  *60
  // number / (s * 60) 每一次执行 需要相加的大小
  let fn = () => {
    if (number - time <= content) {
      //number - time  因为精度问题 最后一次执行 不一定满足 === number
      cancelAnimationFrame(handle);
      content = number;
    } else {
      content += time;
      handle = requestAnimationFrame(fn);
    }
    value.value =  parseInt(content)
    // variable.value=
    // dom.innerText = parseInt(content);
    //取整 
  };
  requestAnimationFrame(fn);
}
numberAnimation(props.value)
</script>
<style lang="scss" scoped>
</style>
