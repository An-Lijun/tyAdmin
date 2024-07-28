<template>
    <uiFrame frameSrc="/static/htmls/i.html"/>
</template>
<script setup>
import uiFrame from '@/components/uiFrame.vue';
// 打开的本地 htmls 页面 用于路由打开和结合html 模板

let messageMap={}
window.addEventListener('message', e => {
    const {type,data,origin} = e
    if(origin !== "http://localhost" && !messageMap[type]){
        return
    }
    messageMap[type](data,e)
}, false);

messageMap.message=(data,e)=>{
    alert(data)
}
</script>
<style lang="less" scoped>
</style>
