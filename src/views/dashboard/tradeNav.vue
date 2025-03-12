<template>
  <div class="tyAdmin__container">
    <TyCard>
      <div class="nav-container">
        <div class="nav__inner" ref="container">
          <navItem left="27%" :radius="radius" :routes="routes" title="押品管理" />
          <navItem left="42%" :radius="radius" :routes="routes1" title="动库管理" />
          <navItem left="58%" :radius="radius" :routes="routes2" title="处置管理" />

          <navItem left="70%" :radius="radius" :routes="routes3" title="分类管理" />

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
  data() {
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
    init() {
      this.$refs.container.style.transform = `scale(1.0)`
      const { width } = this.$refs.container.getBoundingClientRect()
      this.radius = width / 2;
      this.$refs.container.style.transform = `scale(1.1)`
    }
  },
  created() {
    window.addEventListener('resize', this.init)
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.init)
  }
}
</script>
<style lang="scss" scoped>
@keyframes route{
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
}
}

.nav-container {
  height: 80vh;
  width: 100%;

  position: relative;
  overflow: hidden;

  .nav__inner {
    width: 137vw;
    height: 137vw;
    position: absolute;
    border-radius: 50%;
    box-sizing: border-box;
    left: -30%;
    // transform: scale(1.1);
    top: 60%;

    &::before {
      content: "";
      position: absolute;
      width: 137vw;
      height: 137vw;
 
      z-index: 1;
      border-radius: inherit;
      background: linear-gradient(to right,       var(--toyar-red-6), 
      var(--toyar-orangered-6),
      var(--toyar-green-6), 
      var(--toyar-orange-6), 
      var(--toyar-cyan-6), 
      var(--toyar-yellow-6), 
      var(--toyar-magenta-6), 
      var(--toyar-blue-6), 
      var(--toyar-xblue-6), 
      var(--toyar-pinkpurple-6));
      animation: route 10s linear infinite;
    }
    &::after {
      content: "";
      position: absolute;
      width: 137vw;
      height: 137vw;
      top: 3px;
      z-index: 2;
      border-radius: inherit;
      background: #fff;
      background-image: url('@/assets/analysis/nav.png');
      background-size: 50%;
      background-position: center -12%;
      background-repeat: no-repeat;
      
    }
  }
}


// /deep/.ant-card-body {
//   height: 100%;
//   padding: unset;
// }</style>
