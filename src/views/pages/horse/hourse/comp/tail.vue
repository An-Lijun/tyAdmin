<template>
  <div class="tail">
    <div class="nub">
      <div class="section">
        <div class="section">
          <div class="section">
            <div class="section">
              <div class="section">
                <div class="section last"></div>
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
@keyframes tail {

  0%,
  100% {
    transform: rotate(-10deg) translatex(-5%) translatey(38%);
  }

  /* 	8.3% { 	transform: rotate(-3deg) translatex(-5%) translatey(38%); } */
  16.6% {
    transform: rotate(-10deg) translatex(-5%) translatey(28%);
  }

  /* 	24.9% { transform: rotate(20deg) translatex(-5%) translatey(10%); } */
  33.3% {
    transform: rotate(-10deg) translatex(-10%) translatey(10%);
  }

  /* 	41.6% { transform: rotate(20deg) translatex(-10%) translatey(10%); } */
  49.9% {
    transform: rotate(-10deg) translatex(-10%) translatey(10%);
  }

  /* 	58.3% { transform: rotate(20deg) translatex(-13%) translatey(14%); } */
  66.6% {
    transform: rotate(-10deg) translatex(-10%) translatey(18%);
  }

  /* 	74.9% { transform: rotate(15deg) translatex(-13%) translatey(18%); } */
  83.3% {
    transform: rotate(-10deg) translatex(-10%) translatey(25%);
  }

  /* 	91.6% { transform: rotate(0deg) translatex(-5%) translatey(38%); } */
}

@keyframes tail-section-1 {

  0%,
  100% {
    transform: rotate(15deg);
  }

  /* 	8.3% { 	transform: rotate(15deg); } */
  16.6% {
    transform: rotate(15deg);
  }

  /* 	24.9% { transform: rotate(10deg); } */
  33.3% {
    transform: rotate(12deg);
  }

  /* 	41.6% { transform: rotate(0deg); } */
  49.9% {
    transform: rotate(5deg);
  }

  /* 	58.3% { transform: rotate(0deg); } */
  66.6% {
    transform: rotate(0deg);
  }

  /* 	74.9% { transform: rotate(0deg); } */
  83.3% {
    transform: rotate(5deg);
  }

  /* 	91.6% { transform: rotate(5deg); } */
}

@keyframes tail-section-2 {

  0%,
  100% {
    transform: rotate(0deg);
  }

  /* 	8.3% { 	transform: rotate(-2deg); } */
  16.6% {
    transform: rotate(4deg);
  }

  /* 	24.9% { transform: rotate(-6deg); } */
  33.3% {
    transform: rotate(15deg);
  }

  /* 	41.6% { transform: rotate(50deg); } */
  49.9% {
    transform: rotate(30deg);
  }

  /* 	58.3% { transform: rotate(20deg); } */
  66.6% {
    transform: rotate(10deg);
  }

  /* 	74.9% { transform: rotate(-10deg); } */
  83.3% {
    transform: rotate(-5deg);
  }

  /* 	91.6% { transform: rotate(-10deg); } */
}

@keyframes tail-section-3 {

  0%,
  100% {
    transform: rotate(-25deg);
  }

  /* 	8.3% { 	transform: rotate(-20deg); } */
  16.6% {
    transform: rotate(-20deg);
  }

  /* 	24.9% { transform: rotate(-30deg); } */
  33.3% {
    transform: rotate(-20deg);
  }

  /* 	41.6% { transform: rotate(-70deg); } */
  49.9% {
    transform: rotate(-40deg);
  }

  /* 	58.3% { transform: rotate(20deg); } */
  66.6% {
    transform: rotate(0deg);
  }

  /* 	74.9% { transform: rotate(40deg); } */
  83.3% {
    transform: rotate(10deg);
  }

  /* 	91.6% { transform: rotate(20deg); } */
}

.tail {
  animation: tail var(--speed) linear infinite;

  --part-width: 35%;
  --part-height: 18%;
  --part-x: 63%;
  --part-y: 29%;
  --part-rotate: 10deg;
  --part-origin: 0% 50%;
  border: none;

  .nub {
    --shape-width: 35%;
    --shape-height: 30%;
    --shape-rotate: 4deg;
    --shape-origin: 10% 50%;
    --shape-radius: 20% / 50%;
    background-color: var(--color-hair);
  }

  .section {
    animation: tail-section-1 var(--speed) linear infinite;

    --shape-width: 100%;
    --shape-height: 90%;
    --shape-rotate: 15deg;
    --shape-origin: 0% 50%;
    --shape-radius: 30% / 50%;
    --shape-y: -25%;
    --shape-x: 60%;
    background-color: var(--color-hair);
  }

  .section:after {
    content: '';
    --shape-width: 170%;
    --shape-height: 120%;
    --shape-rotate: 6deg;
    --shape-origin: 0% 50%;
    --shape-radius: 50%;
    --shape-y: -10%;
    --shape-x: 0%;
    background-color: transparent;
    box-shadow: -1.5vmin 0.5vmin 0 0 var(--color-hair);
  }

  .section:before {
    content: '';
    --shape-width: 130%;
    --shape-height: 100%;
    --shape-rotate: -20deg;
    --shape-origin: 0% 50%;
    --shape-radius: 50%;
    --shape-y: 0%;
    --shape-x: 50%;
    background-color: transparent;
    box-shadow: -1.5vmin 1vmin 0 0 var(--color-hair);
  }

  .nub>.section {
    --shape-width: 50%;
    --shape-height: 170%;
  }

  .section>*>* {
    --shape-rotate: 0deg;
    --shape-height: 80%;
    animation: tail-section-2 var(--speed) linear infinite;

  }

  .section>*>*>*>* {
    --shape-rotate: -25deg;
    --shape-height: 40%;
    animation: tail-section-3 var(--speed) linear infinite;

  }
}
</style>
