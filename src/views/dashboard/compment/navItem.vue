<template>
  <div class="nav__item" :style="{
    top: compHeight,
    left: left
  }">
  <div class="nav__text">
    {{ title }}
  </div>
    <div class="nav__box">
      <template v-for="(item, index) in routes" >
        <div class="nav__item-route" @click="goRoute(item)">
          {{ item.name }}
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  props: {
    radius: {
      type: Number,
      default: 100
    },
    left: {
      type: String
    },
    pHeight: {
      type: Number,
      default: 100
    },
    routes: {
      type: Array,
      default: () => ([])
    },
    title:{
      type: String
    }
  },
  data() {
    return {
    }
  },
  methods: {
    goRoute(route) {
      this.$router.push(route.path)
    }
  },
  computed: {
    compHeight() {
      let nowLeft = this.left.slice(0, -1)
      if (nowLeft >= 50) {
        nowLeft = nowLeft - 50
      } else {
        nowLeft = 50 - nowLeft
      }

      let numLeft = (this.radius * 2) * (nowLeft / 100)
      let res = (this.radius - Math.sqrt((this.radius ** 2) - (numLeft ** 2))) + 'px'
      return res

    }
  },

}
</script>
<style lang="scss" scoped>
@keyframes breathe {
  0% {
    box-shadow: 0 0 0 0 var(--primary-4);
    transform: scale(1);
  }
  100% {
    box-shadow: 0 0 0 8px transparent;
    transform: scale(1.1);
  }
}

@keyframes pulseRing {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.nav__item {
  position: absolute;
  z-index: 20;
  transform: translate(-10px, -10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translate(-10px, -15px);
  }

  .nav__text {
    position: absolute;
    top: -55px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-7);
    letter-spacing: 2px;
    white-space: nowrap;
    padding: 6px 16px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  &::before {
    content: '';
    display: inline-block;
    background: var(--primary-5);
    border-radius: 50%;
    width: 14px;
    height: 14px;
    box-shadow: 0 0 0 4px var(--primary-2);
    animation: breathe 2s ease-in-out infinite;
    transition: all 0.3s ease;
  }

  .nav__box {
    transform: translateX(-55px);
    margin-top: 8px;

    .nav__item-route {
      box-sizing: border-box;
      padding: 12px 24px;
      width: 140px;
      text-align: center;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(10px);
      border-radius: 10px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
      margin-top: 10px;
      position: relative;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(0, 0, 0, 0.04);
      font-size: 14px;
      color: var(--primary-7);

      &:first-child {
        margin-top: 0;

        &::before {
          content: '';
          display: inline-block;
          height: 12px;
          border-right: 2px dashed var(--primary-3);
          position: absolute;
          left: calc(50% - 1px);
          top: -12px;
        }
      }

      &:not(:first-child)::before {
        content: '';
        display: inline-block;
        height: 12px;
        border-right: 2px dashed var(--primary-3);
        position: absolute;
        left: calc(50% - 1px);
        top: -12px;
      }

      &:hover {
        background: linear-gradient(135deg, var(--primary-5), var(--primary-6));
        color: #fff;
        box-shadow: 0 8px 24px var(--primary-3);
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}
</style>
