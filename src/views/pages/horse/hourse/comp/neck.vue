<template>
  <div class="neck">
    <div class="front"></div>
    <div class="base"></div>
    <div class="top"></div>
    <div class="shoulder"></div>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
@-webkit-keyframes neck {

  0%,
  100% {
    transform: scaleX(1) rotate(40deg) translatex(0%) translatey(-10%);
  }

  /* 	8.3% { 	transform: scaleX(1) rotate(40deg) translatex(2%) translatey(-10%); } */
  16.6% {
    transform: scaleX(1) rotate(40deg) translatex(6%) translatey(-10%);
  }

  /* 	24.9% { transform: scaleX(0.9) rotate(40deg) translatex(5%) translatey(-5%); } */
  33.3% {
    transform: scaleX(0.9) rotate(45deg) translatex(3%) translatey(5%);
  }

  /* 	41.6% { transform: scaleX(0.9) rotate(50deg) translatex(3%) translatey(5%); } */
  49.9% {
    transform: scaleX(0.85) rotate(45deg) translatex(3%) translatey(-5%);
  }

  /* 	58.3% { transform: scaleX(0.85) rotate(45deg) translatex(3%) translatey(-10%); } */
  66.6% {
    transform: scaleX(0.85) rotate(40deg) translatex(0%) translatey(-15%);
  }

  /* 	74.9% { transform: scaleX(0.9) rotate(34deg) translatex(0%) translatey(-15%); } */
  83.3% {
    transform: scaleX(1) rotate(35deg) translatex(0%) translatey(-15%);
  }

  /* 	91.6% { transform: scaleX(1) rotate(35deg) translatex(0%) translatey(-10%); } */
}

@keyframes neck {

  0%,
  100% {
    transform: scaleX(1) rotate(40deg) translatex(0%) translatey(-10%);
  }

  /* 	8.3% { 	transform: scaleX(1) rotate(40deg) translatex(2%) translatey(-10%); } */
  16.6% {
    transform: scaleX(1) rotate(40deg) translatex(6%) translatey(-10%);
  }

  /* 	24.9% { transform: scaleX(0.9) rotate(40deg) translatex(5%) translatey(-5%); } */
  33.3% {
    transform: scaleX(0.9) rotate(45deg) translatex(3%) translatey(5%);
  }

  /* 	41.6% { transform: scaleX(0.9) rotate(50deg) translatex(3%) translatey(5%); } */
  49.9% {
    transform: scaleX(0.85) rotate(45deg) translatex(3%) translatey(-5%);
  }

  /* 	58.3% { transform: scaleX(0.85) rotate(45deg) translatex(3%) translatey(-10%); } */
  66.6% {
    transform: scaleX(0.85) rotate(40deg) translatex(0%) translatey(-15%);
  }

  /* 	74.9% { transform: scaleX(0.9) rotate(34deg) translatex(0%) translatey(-15%); } */
  83.3% {
    transform: scaleX(1) rotate(35deg) translatex(0%) translatey(-15%);
  }

  /* 	91.6% { transform: scaleX(1) rotate(35deg) translatex(0%) translatey(-10%); } */
}


.neck {
  animation: neck var(--speed) linear infinite;
  --part-width: 30%;
  --part-height: 25%;
  --part-x: 5%;
  --part-y: 35%;
  --part-origin: 90% 50%;
  --part-rotate: 45deg;
  border: none;

  & .front {
    --shape-width: 75%;
    --shape-height: 55%;
    --shape-radius: 50%;
    --shape-y: 28%;
    --shape-x: 7%;
    --shape-rotate: 20deg;
  }

  & .top {
    --shape-x: 10%;
    --shape-y: 5%;
    --shape-width: 50%;
    --shape-height: 25%;
    --shape-radius: 50% / 20%;
    --shape-rotate: 0deg;
  }

  & .top:after {
    content: '';
    --shape-x: 50%;
    --shape-y: -10%;
    --shape-width: 70%;
    --shape-height: 50%;
    --shape-radius: 0%;
    --shape-rotate: -5deg;
  }

  & .base {
    --shape-width: 50%;
    --shape-height: 30%;
    --shape-x: 20%;
    --shape-y: 10%;
    --shape-radius: 30%;
    --shape-rotate: -10deg;
  }

  & .shoulder {
    --shape-width: 50%;
    --shape-height: 30%;
    --shape-x: 48%;
    --shape-y: -2%;
    --shape-rotate: -20deg;
    --shape-radius: 50%;
  }
}
</style>
