<template>
  <div class="divRoot">
    <div class="out">
      <div class="dh-img-1">
      </div>

    </div>
    <div class="out2">
        <div class="dh-img-2"></div>
      </div>
    <div class="out3">
      <div class="dh-img-3"></div>
    </div>
    <div class="out4">
      <div class="dh-img-4"></div>
    </div>
    <div class="out5">
      <div class="dh-img-5"></div>
    </div>

  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.out {
  width: 100px;
  height: 100px;
  background-color: var(--primary-3);
}

.dh-img-1 {
  width: 100%;
  height: 100%;
  display: inline-block;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  transition: all 0.5s;
  background-image: url('./src/v2-fe0d84a490434570cba84717149f9197_720w.webp');
  background-size: contain;
}

.dh-img-1:hover {
  clip-path: polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%);
}

.out2 {
  width: 500px;
  height: 280px;
  display: inline-block;
  background-image: url('./src/v2-fe0d84a490434570cba84717149f9197_720w.webp');
  background-size: contain;
}

.dh-img-2 {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-image: url('./src/v2-1444521330b8baf1c69b15c5f48ad411_720w.webp');
  clip-path: polygon(-30% 0, -30% 0, 0% 50%, -30% 100%, -30% 100%);
  transition: all 0.5s;
}

.out2:hover .dh-img-2 {
  clip-path: polygon(-30% 0, 100% 0, 110% 50%, 100% 100%, -30% 100%) !important;
}

.out3 {
  display: inline-block;
  width: 150px;
  height: 150px;
  background-color: var(--primary-3);

}

.dh-img-3 {
  width: 100%;
  height: 100%;
  background-image: url('./src/v2-fe0d84a490434570cba84717149f9197_720w.webp');
  background-size: contain;
  clip-path: circle(0 at 50% 50%);
  transition: all .5s;
}

.out3:hover .dh-img-3 {
  clip-path: circle(100% at 50% 50%);
  transition: all .5s;
}

.out4 {
  display: inline-block;
  width: 150px;
  height: 150px;
  background-color: var(--primary-3);
}

.dh-img-4 {
  width: 100%;
  height: 100%;
  background-image: url('./src/v2-fe0d84a490434570cba84717149f9197_720w.webp');
  background-size: contain;
  clip-path: inset(100% 0 0 0);
  transition: all .5s;
}

.out4:hover .dh-img-4 {
  clip-path: inset(0% 0 0 0);
  ;
  transition: all .5s;
}

.out5 {
  display: inline-block;
  width: 150px;
  height: 150px;
  background-color: var(--primary-3);
}

.dh-img-5 {
  width: 100%;
  height: 100%;
  background-image: url('./src/v2-fe0d84a490434570cba84717149f9197_720w.webp');
  background-size: contain;
  clip-path: inset(0 50% 0 50%);
  transition: all .5s;
}

.out5:hover .dh-img-5 {
  clip-path: inset(0% 0 0 0);
  ;
  transition: all .5s;
}
</style>
