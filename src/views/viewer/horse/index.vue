<template>
  <div>
     <horse/>

     <horse color="blue" backColor="green" :speed="1.6"/>
     <horse color="skyblue" backColor="yellow" :speed="1.6"/>

  </div>
</template>
<script>
import horse from './hourse/index.vue'
export default {
  name: 'app',
  components:{
    horse
  },
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
  },
}
</script>
<style lang="less" scoped>

</style>
