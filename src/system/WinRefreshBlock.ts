export default class WinRefreshBlock {
  private reloadListener: ((e:BeforeUnloadEvent) => void) | null = null;
  private closeListener: ((e:PageTransitionEvent) => void) | null = null;

  constructor(config: { reload?: boolean; close?: boolean } = { reload: true, close: true }) {
    if (config.reload) {
      this.addReloadListener();
    }
    if (config.close) {
      this.addCloseListener();
    }
  }

  // 添加 beforeunload 事件监听器
  private addReloadListener() {
    try {
      this.reloadListener = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        // Chrome 需要设置 returnValue 才能触发提示框
        e.returnValue = '';
      };
      window.addEventListener('beforeunload', this.reloadListener);
    } catch (error) {
      console.error('Failed to add beforeunload event listener:', error);
    }
  }

  // 添加 pagehide 事件监听器
  private addCloseListener() {
    try {
      this.closeListener = (e: PageTransitionEvent) => {
        console.log('页面即将被隐藏，可能是关闭窗口操作');
      };
      window.addEventListener('pagehide', this.closeListener);
    } catch (error) {
      console.error('Failed to add pagehide event listener:', error);
    }
  }

  // 移除所有事件监听器
  public destroy() {
    if (this.reloadListener) {
      window.removeEventListener('beforeunload', this.reloadListener);
      this.reloadListener = null;
    }
    if (this.closeListener) {
      window.removeEventListener('pagehide', this.closeListener);
      this.closeListener = null;
    }
  }
}

