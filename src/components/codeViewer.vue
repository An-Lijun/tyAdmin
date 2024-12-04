<template>
  <div class="codeViewer">
    <div>
      javascript
    </div>
    <pre style="margin: unset; padding: unset;">
      <code class="language-javascript">
        <slot/>
      </code>
  </pre>
  </div>
</template>
<script setup>
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { onMounted } from 'vue';
console.log(hljs);
onMounted(() => {
  hljs.highlightAll()

})
</script>
<style lang="less" scoped></style>
