<template>
  <div class="head">
    <div class="skull"></div>
    <div class="nose"></div>
    <div class="face"></div>
    <div class="lip"></div>
    <div class="jaw"></div>
    <div class="chin"></div>
    <div class="ear"></div>
    <div class="eye"></div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
    }
  },
  methods: {
  },
  created() {
  },
  mounted() {
  },
}
</script>
<style lang="scss" scoped>
@-webkit-keyframes head {

  0%,
  100% {
    transform: rotate(-45deg) translatex(-5%) translatey(10%);
  }

  /* 	8.3% { 	transform: rotate(-45deg) translatex(-5%) translatey(12%); } */
  16.6% {
    transform: rotate(-45deg) translatex(0%) translatey(15%);
  }

  /* 	24.9% { transform: rotate(-43deg) translatex(0%) translatey(20%); } */
  33.3% {
    transform: rotate(-40deg) translatex(5%) translatey(23%);
  }

  /* 	41.6% { transform: rotate(-40deg) translatex(10%) translatey(23%); } */
  49.9% {
    transform: rotate(-36deg) translatex(15%) translatey(35%);
  }

  /* 	58.3% { transform: rotate(-38deg) translatex(18%) translatey(45%); } */
  66.6% {
    transform: rotate(-42deg) translatex(5%) translatey(35%);
  }

  /* 	74.9% { transform: rotate(-45deg) translatex(-5%) translatey(22%); } */
  83.3% {
    transform: rotate(-45deg) translatex(-15%) translatey(10%);
  }

  /* 	91.6% { transform: rotate(-50deg) translatex(-15%) translatey(0%); } */
}

@keyframes head {

  0%,
  100% {
    transform: rotate(-45deg) translatex(-5%) translatey(10%);
  }

  /* 	8.3% { 	transform: rotate(-45deg) translatex(-5%) translatey(12%); } */
  16.6% {
    transform: rotate(-45deg) translatex(0%) translatey(15%);
  }

  /* 	24.9% { transform: rotate(-43deg) translatex(0%) translatey(20%); } */
  33.3% {
    transform: rotate(-40deg) translatex(5%) translatey(23%);
  }

  /* 	41.6% { transform: rotate(-40deg) translatex(10%) translatey(23%); } */
  49.9% {
    transform: rotate(-36deg) translatex(15%) translatey(35%);
  }

  /* 	58.3% { transform: rotate(-38deg) translatex(18%) translatey(45%); } */
  66.6% {
    transform: rotate(-42deg) translatex(5%) translatey(35%);
  }

  /* 	74.9% { transform: rotate(-45deg) translatex(-5%) translatey(22%); } */
  83.3% {
    transform: rotate(-45deg) translatex(-15%) translatey(10%);
  }

  /* 	91.6% { transform: rotate(-50deg) translatex(-15%) translatey(0%); } */
}


/* ================

    HEAD

    ================ */
.head {
  --part-width: 20%;
  --part-height: 15%;
  --part-x: -1%;
  --part-y: 3%;
  --part-origin: 100% 50%;
  --part-rotate: -40deg;
  border: none;
  animation: head var(--speed) linear infinite;

  .skull {
    --shape-width: 55%;
    --shape-height: 80%;
    --shape-radius: 50%;
    --shape-x: 43%;
    --shape-y: 10%;
    --shape-rotate: 40deg;
  }

  .eye {
    background-color: var(--color-horse-back);
    --shape-width: 6%;
    --shape-height: 10%;
    --shape-radius: 30% 100%;
    --shape-x: 45%;
    --shape-y: 20%;
    --shape-rotate: 0deg;
  }

  .face {
    --shape-width: 47%;
    --shape-height: 50%;
    --shape-y: 8%;
    --shape-x: 14%;
    --shape-rotate: -5deg;
  }

  .nose {
    --shape-x: 0%;
    --shape-y: 11.7%;
    --shape-width: 24%;
    --shape-height: 35%;
    --shape-radius: 50%;
    --shape-rotate: -12deg;
  }

  .jaw {
    --shape-width: 25%;
    --shape-height: 60%;
    --shape-x: 40%;
    --shape-y: 37%;
    --shape-radius: 45%;
    transform: skew(0deg) rotate(40deg);
  }

  .lip {
    --shape-rotate: 40deg;
    --shape-x: -3%;
    --shape-y: 28%;
    --shape-radius: 30%;
    --shape-width: 12%;
    --shape-height: 25%;
  }

  .chin {
    --shape-width: 15%;
    --shape-height: 40%;
    --shape-y: 31%;
    --shape-x: 2%;
    --shape-radius: 30%;
    --shape-rotate: 40deg;
  }

  .chin:after {
    content: '';
    --shape-width: 130%;
    --shape-height: 180%;
    --shape-radius: 0;
    --shape-x: 123%;
    --shape-y: -95%;
    --shape-rotate: 70deg;
  }

  .ear {
    --shape-width: 20%;
    --shape-height: 15%;
    --shape-y: 17%;
    --shape-x: 78%;
    --shape-radius: 50%;
    --shape-rotate: 10deg;
    --shape-origin: 0% 50%;
    animation: ear var(--speed) linear infinite;
  }

  .ear:after {
    content: '';
    --shape-width: 70%;
    --shape-height: 40%;
    --shape-y: 10%;
    --shape-x: 65%;
    --shape-radius: 40%;
    --shape-rotate: -30deg;
  }

  .ear:before {
    content: '';
    --shape-width: 70%;
    --shape-height: 30%;
    --shape-y: -20%;
    --shape-x: 50%;
    --shape-radius: 0%;
    --shape-rotate: -5deg;
  }
}


@-webkit-keyframes ear {
  0%,
  100% {
    transform: rotate(25deg);
  }

  /* 	8.3% { 	transform: rotate(28deg); } */
  16.6% {
    transform: rotate(28deg);
  }

  /* 	24.9% { transform: rotate(20deg); } */
  33.3% {
    transform: rotate(24deg);
  }

  /* 	41.6% { transform: rotate(30deg); } */
  49.9% {
    transform: rotate(30deg);
  }

  /* 	58.3% { transform: rotate(30deg); } */
  66.6% {
    transform: rotate(35deg);
  }

  /* 	74.9% { transform: rotate(35deg); } */
  83.3% {
    transform: rotate(35deg);
  }

  /* 	91.6% { transform: rotate(20deg); } */
}

@keyframes ear {
  0%,
  100% {
    transform: rotate(25deg);
  }

  /* 	8.3% { 	transform: rotate(28deg); } */
  16.6% {
    transform: rotate(28deg);
  }

  /* 	24.9% { transform: rotate(20deg); } */
  33.3% {
    transform: rotate(24deg);
  }

  /* 	41.6% { transform: rotate(30deg); } */
  49.9% {
    transform: rotate(30deg);
  }

  /* 	58.3% { transform: rotate(30deg); } */
  66.6% {
    transform: rotate(35deg);
  }

  /* 	74.9% { transform: rotate(35deg); } */
  83.3% {
    transform: rotate(35deg);
  }

  /* 	91.6% { transform: rotate(20deg); } */
}


</style>
