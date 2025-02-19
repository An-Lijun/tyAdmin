<template>
  <div class="front-leg left">
    <div class="shoulder">
      <div class="upper">
        <div class="knee">
          <div class="lower">
            <div class="ankle">
              <div class="foot">
                <div class="hoof"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="front-leg right">
    <div class="shoulder">
      <div class="upper">
        <div class="knee">
          <div class="lower">
            <div class="ankle">
              <div class="foot">
                <div class="hoof"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.front-leg {
  --part-width: 15%;
  --part-height: 60%;
  --part-x: 20%;
  --part-y: 40%;
  --part-origin: 100% 50%;
  border: none;

  &.right {
    --color-horse: var(--color-horse-back);
    --delay: calc(0s - var(--speed) / var(--delay-gap));
  }

  .shoulder {
    --shape-x: 20%;
    --shape-width: 80%;
    --shape-height: 35%;
    --shape-origin: 100% 50%;
    --shape-radius: 30% 30% 30% 50%;
    --shape-rotate: -0deg;
    animation: front-shoulder var(--speed) linear infinite;

  }


  .upper {
    animation: front-upper var(--speed) linear infinite;

    --shape-x: 40%;
    --shape-y: 60%;
    --shape-width: 40%;
    --shape-height: 80%;
    --shape-origin: 40% 10%;
    --shape-radius: 30% 30% 50% 50%;
    --shape-rotate: 0deg;
  }

  .upper:before {
    content: '';
    --shape-x: 5%;
    --shape-radius: 20%;
    --shape-rotate: 0deg;
  }

  .upper:after {
    content: '';
    --shape-x: 40%;
    --shape-y: 60%;
    --shape-height: 78%;
    --shape-radius: 40%;
    --shape-rotate: 5deg;
  }

  .knee {
    animation: front-knee var(--speed) linear infinite;

    --shape-x: 0%;
    --shape-y: 120%;
    --shape-width: 57%;
    --shape-height: 55%;
    --shape-radius: 45%;
    --shape-origin: 40% 20%;
    --shape-rotate: -0deg;
  }

  .knee:before {
    content: '';
    --shape-x: 0%;
    --shape-y: 60%;
    --shape-width: 30%;
    --shape-height: 40%;
    --shape-radius: 30%;
    --shape-rotate: 0deg;
  }

  .lower {
    --shape-x: 0%;
    --shape-y: 80%;
    --shape-width: 54%;
    --shape-height: 120%;
    --shape-radius: 5%;
    --shape-rotate: 12deg;
    animation: front-lower var(--speed) linear infinite;

  }



  .ankle {
    --shape-x: -20%;
    --shape-y: 80%;
    --shape-width: 170%;
    --shape-height: 45%;
    --shape-radius: 50%;
    --shape-rotate: 20deg;
    animation: front-ankle var(--speed) linear infinite;

  }

  .foot {
    animation: front-foot var(--speed) linear infinite;

    --shape-x: -35%;
    --shape-y: 65%;
    --shape-width: 120%;
    --shape-height: 200%;
    --shape-radius: 0%;
    --shape-rotate: 30deg;
    -webkit-clip-path: polygon(0% 0%,
        80% 0%,
        65% 20%,
        63% 30%,
        70% 45%,
        75% 55%,
        46% 90%,
        35% 95%,
        10% 70%,
        5% 50%,
        10% 25%);
    clip-path: polygon(0% 0%,
        80% 0%,
        65% 20%,
        63% 30%,
        70% 45%,
        75% 55%,
        46% 90%,
        35% 95%,
        10% 70%,
        5% 50%,
        10% 25%);
  }

  .hoof {
    --shape-x: 40%;
    --shape-y: 52%;
    --shape-width: 100%;
    --shape-height: 50%;
    --shape-radius: 0%;
    --shape-rotate: 55deg;
    background-color: var(--color-hoof);
  }
}








@keyframes front-shoulder {

  0%,
  100% {
    transform: rotate(20deg) translatex(0%) translatey(6%);
  }

  8.3% {
    transform: rotate(8deg) translatex(-10%) translatey(0%);
  }

  16.6% {
    transform: rotate(0deg) translatex(-12%) translatey(-3%);
  }

  24.9% {
    transform: rotate(0deg) translatex(10%) translatey(0%);
  }

  33.3% {
    transform: rotate(-30deg) translatex(7%) translatey(-12%);
  }

  41.6% {
    transform: rotate(-30deg) translatex(11%) translatey(-10%);
  }

  49.9% {
    transform: rotate(-20deg) translatex(10%) translatey(0%);
  }

  58.3% {
    transform: rotate(-10deg) translatex(30%) translatey(-5%);
  }

  66.6% {
    transform: rotate(15deg) translatex(25%) translatey(5%);
  }

  74.9% {
    transform: rotate(0deg) translatex(0%) translatey(0%);
  }

  83.3% {
    transform: rotate(0deg) translatex(0%) translatey(0%);
  }

  91.6% {
    transform: rotate(20deg) translatex(0%) translatey(0%);
  }
}




@keyframes front-upper {

  0%,
  100% {
    transform: rotate(50deg) translatex(30%) translatey(8%);
  }

  8.3% {
    transform: rotate(45deg) translatex(40%) translatey(10%);
  }

  16.6% {
    transform: rotate(33deg) translatex(25%) translatey(10%);
  }

  24.9% {
    transform: rotate(0deg) translatex(0%) translatey(0%);
  }

  33.3% {
    transform: rotate(18deg) translatex(7%) translatey(10%);
  }

  41.6% {
    transform: rotate(-8deg) translatex(-30%) translatey(15%);
  }

  49.9% {
    transform: rotate(-4deg) translatex(-20%) translatey(10%);
  }

  58.3% {
    transform: rotate(20deg) translatex(17%) translatey(10%);
  }

  66.6% {
    transform: rotate(30deg) translatex(20%) translatey(-10%);
  }

  74.9% {
    transform: rotate(75deg) translatex(40%) translatey(-15%);
  }

  83.3% {
    transform: rotate(85deg) translatex(15%) translatey(-10%);
  }

  91.6% {
    transform: rotate(55deg) translatex(25%) translatey(-5%);
  }
}


@keyframes front-knee {

  0%,
  100% {
    transform: rotate(-15deg) translatex(0%) translatey(0%);
  }

  8.3% {
    transform: rotate(-10deg) translatex(0%) translatey(0%);
  }

  16.6% {
    transform: rotate(-12deg) translatex(0%) translatey(0%);
  }

  24.9% {
    transform: rotate(-20deg) translatex(0%) translatey(0%);
  }

  33.3% {
    transform: rotate(-55deg) translatex(-25%) translatey(10%);
  }

  41.6% {
    transform: rotate(-35deg) translatex(0%) translatey(-10%);
  }

  49.9% {
    transform: rotate(-28deg) translatex(0%) translatey(0%);
  }

  58.3% {
    transform: rotate(-90deg) translatex(-22%) translatey(0%);
  }

  66.6% {
    transform: rotate(-95deg) translatex(-30%) translatey(0%);
  }

  74.9% {
    transform: rotate(-98deg) translatex(-10%) translatey(0%);
  }

  83.3% {
    transform: rotate(-80deg) translatex(-20%) translatey(8%);
  }

  91.6% {
    transform: rotate(-50deg) translatex(-30%) translatey(10%);
  }
}





@keyframes front-lower {

  0%,
  100% {
    transform: rotate(-25deg) translatex(20%) translatey(0%);
  }

  8.3% {
    transform: rotate(10deg) translatex(0%) translatey(-10%);
  }

  16.6% {
    transform: rotate(10deg) translatex(0%) translatey(0%);
  }

  24.9% {
    transform: rotate(12deg) translatex(0%) translatey(0%);
  }

  33.3% {
    transform: rotate(-12deg) translatex(7%) translatey(-12%);
  }

  41.6% {
    transform: rotate(0deg) translatex(0%) translatey(-10%);
  }

  49.9% {
    transform: rotate(-23deg) translatex(20%) translatey(-20%);
  }

  58.3% {
    transform: rotate(0deg) translatex(0%) translatey(-30%);
  }

  66.6% {
    transform: rotate(-15deg) translatex(30%) translatey(-20%);
  }

  74.9% {
    transform: rotate(-15deg) translatex(0%) translatey(0%);
  }

  83.3% {
    transform: rotate(-15deg) translatex(15%) translatey(0%);
  }

  91.6% {
    transform: rotate(-10deg) translatex(20%) translatey(-30%);
  }
}


@keyframes front-ankle {

  0%,
  100% {
    transform: rotate(20deg) translatex(0%) translatey(0%);
  }

  8.3% {
    transform: rotate(20deg) translatex(0%) translatey(0%);
  }

  16.6% {
    transform: rotate(20deg) translatex(0%) translatey(0%);
  }

  24.9% {
    transform: rotate(20deg) translatex(0%) translatey(0%);
  }

  33.3% {
    transform: rotate(15deg) translatex(10%) translatey(0%);
  }

  41.6% {
    transform: rotate(20deg) translatex(0%) translatey(0%);
  }

  49.9% {
    transform: rotate(0deg) translatex(0%) translatey(0%);
  }

  58.3% {
    transform: rotate(0deg) translatex(0%) translatey(-20%);
  }

  66.6% {
    transform: rotate(-30deg) translatex(0%) translatey(0%);
  }

  74.9% {
    transform: rotate(-30deg) translatex(0%) translatey(0%);
  }

  83.3% {
    transform: rotate(-10deg) translatex(0%) translatey(-20%);
  }

  91.6% {
    transform: rotate(20deg) translatex(0%) translatey(0%);
  }
}



@keyframes front-foot {

  0%,
  100% {
    transform: rotate(-28deg) translatex(40%) translatey(0%);
  }

  8.3% {
    transform: rotate(-15deg) translatex(50%) translatey(0%);
  }

  16.6% {
    transform: rotate(-11deg) translatex(35%) translatey(0%);
  }

  24.9% {
    transform: rotate(50deg) translatex(0%) translatey(0%);
  }

  33.3% {
    transform: rotate(-10deg) translatex(50%) translatey(0%);
  }

  41.6% {
    transform: rotate(-36deg) translatex(50%) translatey(0%);
  }

  49.9% {
    transform: rotate(-30deg) translatex(32%) translatey(0%);
  }

  58.3% {
    transform: rotate(-30deg) translatex(45%) translatey(0%);
  }

  66.6% {
    transform: rotate(-30deg) translatex(50%) translatey(0%);
  }

  74.9% {
    transform: rotate(-30deg) translatex(50%) translatey(0%);
  }

  83.3% {
    transform: rotate(-30deg) translatex(50%) translatey(0%);
  }

  91.6% {
    transform: rotate(-50deg) translatex(50%) translatey(10%);
  }
}
</style>
