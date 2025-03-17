<template>
  <div class="codeViewer">
    <header>
      <div class="tyAdminIcon">
        <span style="margin-left: 80px;">
          {{ lang }}
        </span>
      </div>
    </header>
    <pre style="margin: unset; padding: unset; display: grid;">
          <code ref="codeRef" :class="`language-${lang}`" v-if="isShowCode"><slot/>{{ code }}</code>
      </pre>
  </div>
</template>
<script setup>
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
// import 'highlight.js/lib/common.js'
import { onMounted, ref, watch } from 'vue';
import json from 'highlight.js/lib/languages/json';
const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  lang: {
    type: String,
    default: 'javascript'
  }
})
const codeRef = ref()
const isShowCode = ref(true)
watch(() => props.code, () => {
  // if (codeRef.value.dataset.highlighted === 'yes') {
  //   delete codeRef.value.dataset.highlighted;
  // }
  isShowCode.value=false
  setTimeout(() => {
  isShowCode.value=true
    setTimeout(()=>{
    hljs.highlightElement(codeRef.value)

    })
  }, 0)
})
onMounted(() => {
  // hljs.highlightAll()
  hljs.highlightElement(codeRef.value);
})
</script>
<style lang="scss" scoped>
.codeViewer {
  header {
    height: 40px;
    line-height: 40px;
    background-color: #282c34;
    color: #ADB1B980;

    .tyAdminIcon {
      &:before {
        content: "";
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin: 14px 0 0 20px;
        background-color: var(--toyar-red-6);
        box-shadow: 20px 0 0 var(--toyar-orange-6), 40px 0 0 var(--toyar-green-6), 60px 0 0 var(--toyar-yellow-6);
      }
    }
  }
}
</style>
