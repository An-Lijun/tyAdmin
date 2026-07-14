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
  mounted() {
    window.addEventListener('resize', this.init)

    this.init()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.init)
  }
}
</script>
<style lang="scss" scoped>
@keyframes route {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-container {
  height: 80vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--fill-2) 0%, var(--toyar-gray-1) 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);

  .nav__inner {
    width: 137vw;
    height: 137vw;
    position: absolute;
    border-radius: 50%;
    box-sizing: border-box;
    left: -30%;
    top: 60%;
    animation: fadeInUp 0.8s ease-out;

    &::before {
      content: "";
      position: absolute;
      width: 137vw;
      height: 137vw;
      z-index: 1;
      border-radius: inherit;
      background: linear-gradient(
        45deg,
        var(--primary-3),
        var(--primary-4),
        var(--toyar-blue-4),
        var(--toyar-cyan-4),
        var(--toyar-xblue-4),
        var(--primary-4),
        var(--primary-3)
      );
      background-size: 400% 400%;
      animation: route 20s linear infinite;
      opacity: 0.6;
      filter: blur(2px);
    }

    &::after {
      content: "";
      position: absolute;
      width: calc(137vw - 40px);
      height: calc(137vw - 40px);
      top: 20px;
      left: 20px;
      z-index: 2;
      border-radius: inherit;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(10px);
      background-image: url('@/assets/analysis/nav.png');
      background-size: 45%;
      background-position: center -10%;
      background-repeat: no-repeat;
      box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.03);
    }
  }
}
</style>
