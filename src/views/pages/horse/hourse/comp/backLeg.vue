<template>
  <div class="back-leg right">
    <div class="top">
      <div class="thigh">
        <div class="lower-leg">
          <div class="foot">
            <div class="hoof"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="back-leg left">
    <div class="top">
      <div class="thigh">
        <div class="lower-leg">
          <div class="foot">
            <div class="hoof"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.back-leg {
  --part-width: 20%;
  --part-height: 70%;
  --part-x: 60%;
  --part-y: 32%;
  --part-origin: 100% 50%;
  border: none;

  &.right {
    --color-horse: var(--color-horse-back);
    --delay: calc(0s - var(--speed) / var(--delay-gap));
  }

  .top {
    animation: back-top var(--speed) linear infinite;

    --shape-height: 20%;
    --shape-width: 75%;
    --shape-radius: 45%;
    --shape-rotate: 25deg;
    --shape-x: -8%;
    background-color: transparent;
  }

  .top:after {
    content: '';
    --shape-height: 140%;
    --shape-width: 40%;
    --shape-radius: 50% / 30%;
    --shape-rotate: -19deg;
    --shape-x: 55%;
    --shape-y: 20%;
    --shape-origin: 50% 10%;
  }

  .top:before {
    content: '';
    --shape-height: 150%;
    --shape-width: 80%;
    --shape-radius: 50% / 60%;
    --shape-rotate: -60deg;
    --shape-x: 24%;
    --shape-y: 58%;
  }


  .thigh {
    animation: back-thigh var(--speed) linear infinite;

    --shape-height: 140%;
    --shape-width: 22%;
    --shape-radius: 45% / 20%;
    --shape-rotate: -95deg;
    --shape-x: 75%;
    --shape-y: 172%;
    --shape-origin: 50% 0%;
  }

  .thigh:before {
    content: '';
    --shape-height: 80%;
    --shape-width: 50%;
    --shape-radius: 50%;
    --shape-rotate: -15deg;
    --shape-x: -66%;
    --shape-y: -10%;
    --shape-origin: 50% 0%;
  }

  .thigh:after {
    content: '';
    --shape-height: 40%;
    --shape-width: 50%;
    --shape-radius: 50%;
    --shape-rotate: 20deg;
    --shape-x: 110%;
    --shape-y: 23%;
    --shape-origin: 50% 50%;
    background-color: transparent;
    box-shadow: -1.2% 0.5% 0 0 var(--color-horse);
  }


  .lower-leg {
    --shape-height: 100%;
    --shape-width: 60%;
    --shape-radius: 50% / 10%;
    --shape-rotate: 47deg;
    --shape-x: 80%;
    --shape-y: 88%;
    --shape-origin: 50% 0%;
    animation: back-lower-leg var(--speed) linear infinite;

  }

  .lower-leg:after {
    --shape-height: 60%;
    --shape-width: 130%;
    --shape-radius: 50%;
    --shape-rotate: -25deg;
    --shape-x: -155%;
    --shape-y: 8%;
    --shape-origin: 50% 50%;
    background-color: transparent;
    box-shadow: 15px 1px 0px 0px var(--color-horse);
  }

  .foot {
    animation: back-foot var(--speed) linear infinite;

    --shape-x: -120%;
    --shape-y: 100%;
    --shape-width: 180%;
    --shape-height: 60%;
    --shape-radius: 0%;
    --shape-rotate: -70deg;
    -webkit-clip-path: polygon(90% 0%,
        95% 10%,
        100% 20%,
        100% 30%,
        60% 45%,
        60% 55%,
        70% 62%,
        80% 65%,
        80% 70%,
        15% 95%,
        10% 50%,
        15% 25%,
        30% 10%,
        70% 0%);
    clip-path: polygon(90% 0%,
        95% 10%,
        100% 20%,
        100% 30%,
        60% 45%,
        60% 55%,
        70% 62%,
        80% 65%,
        80% 70%,
        15% 95%,
        10% 50%,
        15% 25%,
        30% 10%,
        70% 0%);
  }

  .hoof {
    --shape-x: -10%;
    --shape-y: 65%;
    --shape-width: 100%;
    --shape-height: 100%;
    --shape-radius: 0%;
    --shape-rotate: -5deg;
    background-color: var(--color-hoof);
  }
}





/* ================

ANIMATIONS

================ */





@keyframes back-top {

  0%,
  100% {
    transform: rotate(0deg) translatex(-5%) translatey(50%);
  }

  8.3% {
    transform: rotate(-5deg) translatex(-7%) translatey(38%);
  }

  16.6% {
    transform: rotate(-10deg) translatex(-14%) translatey(30%);
  }

  24.9% {
    transform: rotate(25deg) translatex(0%) translatey(10%);
  }

  33.3% {
    transform: rotate(32deg) translatex(-18%) translatey(25%);
  }

  41.6% {
    transform: rotate(45deg) translatex(-5%) translatey(20%);
  }

  49.9% {
    transform: rotate(65deg) translatex(10%) translatey(35%);
  }

  58.3% {
    transform: rotate(65deg) translatex(10%) translatey(40%);
  }

  66.6% {
    transform: rotate(75deg) translatex(20%) translatey(40%);
  }

  74.9% {
    transform: rotate(70deg) translatex(20%) translatey(45%);
  }

  83.3% {
    transform: rotate(60deg) translatex(25%) translatey(40%);
  }

  91.6% {
    transform: rotate(30deg) translatex(10%) translatey(40%);
  }
}



@keyframes back-thigh {

  0%,
  100% {
    transform: rotate(-45deg) translatex(-30%) translatey(-10%);
  }

  8.3% {
    transform: rotate(-45deg) translatex(-30%) translatey(-8%);
  }

  16.6% {
    transform: rotate(-43deg) translatex(-35%) translatey(-10%);
  }

  24.9% {
    transform: rotate(-95deg) translatex(0%) translatey(0%);
  }

  33.3% {
    transform: rotate(-115deg) translatex(0%) translatey(10%);
  }

  41.6% {
    transform: rotate(-130deg) translatex(20%) translatey(-5%);
  }

  49.9% {
    transform: rotate(-130deg) translatex(10%) translatey(0%);
  }

  58.3% {
    transform: rotate(-90deg) translatex(80%) translatey(-20%);
  }

  66.6% {
    transform: rotate(-85deg) translatex(0%) translatey(-20%);
  }

  74.9% {
    transform: rotate(-65deg) translatex(5%) translatey(-10%);
  }

  83.3% {
    transform: rotate(-65deg) translatex(10%) translatey(-10%);
  }

  91.6% {
    transform: rotate(-75deg) translatex(-20%) translatey(-15%);
  }
}

@keyframes back-lower-leg {

  0%,
  100% {
    transform: rotate(40deg) translatex(0%) translatey(0%);
  }

  8.3% {
    transform: rotate(30deg) translatex(-30%) translatey(0%);
  }

  16.6% {
    transform: rotate(28deg) translatex(-40%) translatey(0%);
  }

  24.9% {
    transform: rotate(47deg) translatex(0%) translatey(0%);
  }

  33.3% {
    transform: rotate(78deg) translatex(0%) translatey(5%);
  }

  41.6% {
    transform: rotate(110deg) translatex(40%) translatey(10%);
  }

  49.9% {
    transform: rotate(115deg) translatex(50%) translatey(5%);
  }

  58.3% {
    transform: rotate(90deg) translatex(30%) translatey(5%);
  }

  66.6% {
    transform: rotate(76deg) translatex(0%) translatey(0%);
  }

  74.9% {
    transform: rotate(50deg) translatex(-40%) translatey(-4%);
  }

  83.3% {
    transform: rotate(40deg) translatex(-20%) translatey(-5%);
  }

  91.6% {
    transform: rotate(70deg) translatex(0%) translatey(0%);
  }
}


@keyframes back-foot {

  0%,
  100% {
    transform: rotate(40deg) translatex(0%) translatey(-20%);
  }

  8.3% {
    transform: rotate(20deg) translatex(10%) translatey(-20%);
  }

  16.6% {
    transform: rotate(-65deg) translatex(0%) translatey(0%);
  }

  24.9% {
    transform: rotate(-70deg) translatex(0%) translatey(0%);
  }

  33.3% {
    transform: rotate(-60deg) translatex(20%) translatey(-10%);
  }

  41.6% {
    transform: rotate(-80deg) translatex(0%) translatey(0%);
  }

  49.9% {
    transform: rotate(-70deg) translatex(0%) translatey(0%);
  }

  58.3% {
    transform: rotate(-60deg) translatex(10%) translatey(-10%);
  }

  66.6% {
    transform: rotate(-43deg) translatex(20%) translatey(-10%);
  }

  74.9% {
    transform: rotate(-13deg) translatex(5%) translatey(-10%);
  }

  83.3% {
    transform: rotate(8deg) translatex(5%) translatey(-15%);
  }

  91.6% {
    transform: rotate(20deg) translatex(15%) translatey(-20%);
  }
}
</style>
