
<template>
  <ul class="circle-container circle" :style="{
    width: `${width}px`,
    height: `${width}px`,
    '--duration': `${duration}s`,
  }">
    <div class="wrapper">
      <template v-for="(item, index) in value" :key="index">
        <li :class="`point point-${index}`" :style="{
          '--index': index,
        }">
          <div>
            <div class="ball" :style="{
              background: item.color
            }">
            </div>
            <div class="content">
              {{ item.name }}
            </div>
          </div>
        </li>
      </template>
    </div>
  </ul>
</template>

<script>
function randomRGBColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}
export default {
  components: {},
  props: {
    // 数据
    value: {
      type: Array,
      default: () => new Array(100).fill(1).map(item => {
        return {
          name: 'soulBall',
          color: randomRGBColor(),
        }
      }),
    },
    width: {
      type: Number,
      default: 400,
    },
    duration: {
      type: Number, //速度
      default: 55,
    },
  },
  methods: {

  }
};
</script>


<style lang="scss">
@keyframes rotate {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(360deg);
  }
}

.circle {
  transform-style: preserve-3d;
  list-style-type: none;
  position: relative;
  --tagcloud-animation-play-state: running;

  .wrapper {
    position: relative;
    transform-style: inherit;
    width: 400px;
    height: 400px;
    animation: rotate var(--duration) infinite linear var(--tagcloud-animation-play-state);

    .point {
      color: white;
      --radius: 195;
      --num-elements: 100;
      display: block;
      position: absolute;
      width: 10px;
      height: 10px;
      --_phi: acos(calc(-1 + (2 * var(--index)) / var(--num-elements)));
      --_theta: calc(sqrt(calc(var(--num-elements) * 3.141592653589793)) * var(--_phi));

      --_x: calc(cos(var(--_theta)) * sin(var(--_phi)));
      --_y: calc(sin(var(--_theta)) * sin(var(--_phi)));
      --_z: calc(cos(var(--_phi)));

      --_scaled-x: calc(var(--_x) * var(--radius));
      --_scaled-y: calc(var(--_y) * var(--radius));
      --_scaled-z: calc(var(--_z) * var(--radius));

      --_final-x: calc(var(--_scaled-x) + var(--radius));
      --_final-y: calc(var(--_scaled-y) + var(--radius));
      --_final-z: var(--_scaled-z);
      transition: opacity 0.3s;
      animation: rotate2 var(--duration) infinite linear var(--tagcloud-animation-play-state);

      &>div>.ball {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }

      &>div>.content {
        content: "content";
        color: white;
        font-size: 12px;
      }
    }

    &:has(.point > div:hover) {
      --tagcloud-animation-play-state: paused;
    }

    &:has(.point > div:hover) .point:not(:has(div:hover)) {
      opacity: 0.25;
    }
  }
}

@for $i from 1 through 100 {
  .point-#{$i} {

    &>div {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 2px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: opacity 0.3s;
    }

    // & > div:before {

    // }

    // & > div:after {
    //   content: "";
    //   width: 10px;
    //   height: 10px;
    //   border-radius: 50%;
    //   background: hsl($random-hue, $random-saturation, $random-lightness);
    // }
  }
}

@keyframes rotate2 {
  from {
    transform: translate3d(calc(var(--_final-x) * 1px),
        calc(var(--_final-y) * 1px),
        calc(var(--_final-z) * 1px)) rotateY(360deg);
  }

  to {
    transform: translate3d(calc(var(--_final-x) * 1px),
        calc(var(--_final-y) * 1px),
        calc(var(--_final-z) * 1px)) rotateY(0deg);
  }
}
</style>