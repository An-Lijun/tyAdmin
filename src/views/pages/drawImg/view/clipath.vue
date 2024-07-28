<template>

  <TyCard class="jb">
    <template #clip-path>
      渐变三角
    </template>
    <div class="inner">
      <div class="clip-round"></div>
    <div class="clip-round-1"></div>
    <div class="clip-round-2"></div>
    <div class="clip-inset"></div>
    <div class="tixing"></div>
    <div class="pxsbx"></div>
    <div class="lx"></div>
    <div class="wbx"></div>
    <div class="qbx"></div>
    <div class="bbx"></div>
    <div class="zx"></div>
    <div class="zzx"></div>
    <div class="left"></div>
    <div class="right"></div>
    <div class="l1"></div>
    <div class="l2"></div>
    <div class="r1"></div>
    <div class="r2"></div>
    <div class="star"></div>
    <div class="sz"></div>
    <div class="lk"></div>
    <div class="news"></div>
    <div class="exit"></div>
    </div>
  </TyCard>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.inner{
  div{
    margin: 10px;
  }
}
.clip-round {
  width: 100px;
  height: 100px;
  display: inline-block;
  clip-path: circle(50% at 50% 50%);
  background-color: var(--primary-3);
}

.clip-round-1 {
  width: 100px;
  height: 100px;
  display: inline-block;
  clip-path: circle(100% at 100% 100%);
  background-color: var(--primary-3);
}

.clip-round-2 {
  width: 100px;
  height: 100px;
  display: inline-block;
  clip-path: circle(100% at 100% 100%);
  background-color: var(--primary-3);
  background-size: contain;
  background-image: url('./src/v2-1444521330b8baf1c69b15c5f48ad411_720w.webp');
}

.clip-inset {
  width: 100px;
  height: 100px;
  display: inline-block;
  clip-path: inset(0 15% 0 15%);
  background-color: var(--primary-3);
  background-size: contain;
}

.tixing {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
}

.pxsbx {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
}

.lx {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.wbx {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
}

.lbx {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.qbx {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);
}

.bbx {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}

.zx {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
}

.zzx {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%);
}

.left {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);
}

.right {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
}

.l1 {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(25% 0%, 100% 1%, 100% 100%, 25% 100%, 0% 50%);
}

.r1 {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
}

.l2 {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%);
}

.r2 {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
}

.star {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

.sz {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(10% 25%, 35% 25%, 35% 0%, 65% 0%, 65% 25%, 90% 25%, 90% 50%, 65% 50%, 65% 100%, 35% 100%, 35% 50%, 10% 50%);
}

.news {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);
}

.exit {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
}

.lk {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: var(--primary-3);
  clip-path: polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%);
}
</style>
