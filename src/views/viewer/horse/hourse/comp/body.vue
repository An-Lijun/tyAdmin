<template>
  <div class="body">
    <div class="section">
      <div class="section">
        <div class="section">
          <div class="section">
            <div class="section last"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="back-side"></div>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
@keyframes body {

  0%,
  100% {
    transform: rotate(8deg) translatex(2%) translatey(-5%);
  }

  9% {
    transform: rotate(4deg) translatex(2%) translatey(0%);
  }

  18.1% {
    transform: rotate(1deg) translatex(0%) translatey(5%);
  }

  27.2% {
    transform: rotate(1deg) translatex(2%) translatey(0%) scaleX(0.92);
  }

  36.3% {
    transform: rotate(0deg) translatex(2%) translatey(-2%) scaleX(0.9);
  }

  45.4% {
    transform: rotate(2deg) translatex(2%) translatey(-3%) scaleX(0.9);
  }

  54.5% {
    transform: rotate(3deg) translatex(2%) translatey(-5%) scaleX(0.9);
  }

  63.6% {
    transform: rotate(4deg) translatex(0%) translatey(-4%) scaleX(0.9);
  }

  72.7% {
    transform: rotate(4.5deg) translatex(0%) translatey(-3%) scaleX(0.95);
  }

  81.8% {
    transform: rotate(6.5deg) translatex(0%) translatey(-5%) scaleX(0.95);
  }

  90.9% {
    transform: rotate(10deg) translatex(0%) translatey(-14%) scaleX(1);
  }
}

.body {
  animation: body var(--speed) linear infinite;
  z-index: 2;
  --part-width: 55%;
  --part-height: 33%;
  --part-x: 20%;
  --part-y: 30%;
  --part-origin: 10% 50%;
  border: none;

  .section {
    --shape-width: 94%;
    --shape-height: 90%;
    --shape-x: 40%;
    --shape-y: 5%;
    --shape-origin: 10% 30%;
    --shape-radius: 50% 0 20% 20%;
    --shape-rotate: -9deg;
  }

  .section.last {
    --shape-radius: 45%;
  }

  .section.last:after {
    content: none;
  }

  &>.section {
    --shape-x: 4%;
    --shape-y: 4%;
    --shape-width: 32%;
    --shape-height: 92%;
    --shape-rotate: 10deg;
    --shape-origin: 50% 50%;
    --shape-radius: 45%;
  }

  &>.section:after {
    content: '';
    --shape-height: 70%;
    --shape-width: 202%;
    --shape-x: 40%;
    --shape-y: 48%;
    --shape-rotate: -23deg;
    --shape-origin: 0% 100%;
    --shape-radius: 50%;
  }

  .back-side {
    --shape-x: 60%;
    --shape-y: -10%;
    --shape-width: 38%;
    --shape-height: 70%;
    --shape-origin: 0 0;
    --shape-rotate: 8deg;
    --shape-radius: 40% 50% 50%;
  }
}
</style>
