<template>
  <div class="divRoot">
    <tHeader title="markdownEditor" info="直接使用mavonEditor" />
    <div class="tyAdmin__container">
      <TyCard>
        <mavon-editor  v-model="handbook"/>
        <div>
          {{ handbook }}
        </div>
      </TyCard>
    </div>
  </div>
</template>
<script setup>
import tHeader from '@/components/tHeader.vue'
import {ref} from 'vue'
 const markdownOption={
        bold: true, // 粗体
        // ... // 更多配置
      }
 const handbook = ref('# 你好 helloworld123123 \n12313 3123')
/**
 * 文档
 * https://blog.csdn.net/zhongyiyiren/article/details/134863857#:~:text=%EE%80%80%E5%9C%A8Vue3%E4%B8%AD%E4%BD%BF%E7%94%A8mavon-editor%E5%AF%8C%E6%96%87%E6%9C%AC%E7%BC%96%E8%BE%91%E5%99%A8.%EE%80%81
 * 
 * https://gitcode.com/gh_mirrors/ma/mavonEditor/overview?utm_source=csdn_github_accelerator&isLogin=1
*/
</script>
<style lang="scss" scoped>
::v-deep .v-note-wrapper.v-note-wrapper.v-note-wrapper {
  z-index: unset ;
}
</style>
