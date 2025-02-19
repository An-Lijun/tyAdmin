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

@-webkit-keyframes breathe {
    0% {
        border: 4px solid var(--primary-2);
    }
   
    100% {
        opacity: 1;
        border: 4px solid var(--primary-6);
    }
}
.nav__item {
  position: relative;
  top: 0;
  transform: translate(-10px, -10px);
  position: absolute;
  z-index: 20;
  .nav__text{
    position: absolute;
    top: -50px;
    transform: translateX(-40%);
    font-size: 25px;
    color: var(--primary-6);
    text-shadow: 1px 0 var(--primary-2),
    -1px 0 var(--primary-2),
    0 1px var(--primary-2),
    0 -1px var(--primary-2);
    width: 150px;
    text-align: center;
  }
  &::before { 
    content: '';
    display: inline-block;

    background: var(--primary-6);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    box-shadow: var(--color-bg-2) 0px 0px 0px 5px;
    animation: breathe 1500ms ease-in-out alternate infinite;

  }



  .nav__box{
    transform: translateX(-55px);
    .nav__item-route{
      box-sizing: border-box;
      padding: 10px 20px;
      width: 130px;
      text-align: center;
      background-color: var(--color-bg-2);
      border-radius: 5px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      margin-top: 15px;
      position: relative;
      &:first-child{
        &::before{
          content: '';
          display: inline-block;
          height: 15px;
          border-right: 3px solid  var(--primary-6);
          position: absolute;
          left: calc(50% - 1.5px);
          top: -15px;
        }
        &::after{
          content: '';
          display: inline-block;
          height: 15px;
          border-right: 3px solid  var(--primary-6);
          position: absolute;
          left: 35px;
          top: -15px;
          display: none ;
        }
      }
      &::before{
        content: '';
        display: inline-block;
        height: 15px;
        border-right: 3px solid  var(--primary-6);
        position: absolute;
        left: 35px;
        top: -15px;
      }
      &::after{
        content: '';
        display: inline-block;
        height: 15px;
        border-right: 3px solid var(--primary-6);
        position: absolute;
        right: 35px;
        top: -15px;
      }
      &:hover{
        background-color: var(--primary-4);
        color: #fff;
        cursor: pointer;
      }
    }
    
  }


}
</style>
