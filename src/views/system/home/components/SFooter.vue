<template>
  <TyFooter height="50" class="ty-layout-footer">
    <span></span>
    <div class="footer-center">
      <span class="copyright"
        >© 2024 Toyar. 拓源软件系统股份有限公司 版权所有</span
      >
      <span class="separator">|</span>
      <span class="icp">京ICP备12008816号</span>
    </div>
    <span></span>

  </TyFooter>
</template>
<style lang="scss" scoped>
.ty-layout-footer {
  background-color: var(--color-bg-2);
  color: var(--text-2);
  text-align: center;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
      position: relative;
  box-shadow: 0 -1px 16px rgba(0, 0, 0, 0.06);
   .footer-center {
    display: flex;
    align-items: center;
    gap: 16px;
    color: var(--text-3);
    font-size: 12px;

    .copyright {
      letter-spacing: 0.3px;
    }

    .separator {
      opacity: 0.4;
    }

    .icp {
      opacity: 0.7;
    }
  }

}
</style>
