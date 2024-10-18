<template>
  <div class="flow-container">
    <flowItem :title="111" status="examined"/>
    <flowItem :title="111" status="examining" label="11112" value="value"/>

    <flowItem :title="111" status="unapproved"/>
    <flowItem :title="111" status="danger"/>


  </div>
</template>
<script setup>
import flowItem from './flow-item.vue';
</script>
<style lang="scss" scoped>
</style>
  