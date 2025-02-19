<template>
  <div class="tyAdmin__container">
    <TyCard >
      <div class="nav-container">
        <div
          class="nav__inner"
          ref="container"
          :style="{
            height: height + 'px'
          }"
        >
          <navItem
            left="27%"
            :radius="radius"
            :routes="routes"
            title="押品管理"
          />
          <navItem
            left="42%"
            :radius="radius"
            :routes="routes1"
            title="动库管理"
          />
          <navItem
            left="58%"
            :radius="radius"
            :routes="routes2"
            title="处置管理"
          />

          <navItem
            left="70%"
            :radius="radius"
            :routes="routes3"
            title="分类管理"
          />


        </div>
      </div>
    </TyCard>
  </div>
</template>
<script>
import navItem from './compment/navItem.vue'

export default {
  name: 'app',
  components: {
    navItem
  },
  data () {
    return {
      radius: 100,
      height: 100,
      routes3: [
        {
          path: '/trades/20000-2',
          name: '分类层级新增'
        }
      ],
      routes2: [
        {
          path: '/trades/21028',
          name: '处置申请'
        }
      ],
      routes: [
        {
          path: '/trades/21000',
          name: '押品登记'
        },
        {
          path: '/trades/21003',
          name: '评估申请'
        }
      ],
      routes1: [
        {
          path: '/trades/21008',
          name: '入库申请'
        },
        {
          path: '/trades/21014',
          name: '转移申请'
        },
        {
          path: '/trades/21020',
          name: '权证入库申请'
        },
        {
          path: '/trades/21025',
          name: '权证出库登记'
        }
      ]
    }
  },
  methods: {
    init () {
      const { width } = this.$refs.container.getBoundingClientRect()
      this.height = width
      console.log(this.height)
      this.radius = width / 2
    }
  },
  created () {
    window.addEventListener('resize', this.init)
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.init)
  }
}
</script>
<style lang="scss" scoped>
.nav-container {
  height: 80vh;
  width: 100%;
  background-image: url('@/assets/analysis/nav.png');
  background-size: 100% 100%;
  background-position: 0 50px;
  position: relative;
  overflow: hidden;

  // &::before {
  //   content: '';
  //   width: 2%;
  //   height: 50%;
  //   position: absolute;
  //   bottom: 0;
  //   background-color: var(--color-bg-2) ;
  //   z-index: 5;
  // }
  // &::after {
  //   content: '';
  //   width: 2%;
  //   height: 50%;
  //   position: absolute;
  //   bottom: 0;
  //   background-color: var(--color-bg-2);
  //   z-index: 5;
  //   right: 0;
  // }
  .nav__inner {
    border: 2px solid var(--primary-6);
    width: 160%;
    position: absolute;
    border-radius: 50%;
    box-sizing: border-box;
    left: -30%;
    transform: scale(1.1);

    top: 47%;
  }
}


// /deep/.ant-card-body {
//   height: 100%;
//   padding: unset;
// }
</style>
