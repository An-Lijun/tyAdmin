// 定义闲置信息的接口
export interface IIdleInfo {
  isIdle: boolean;
  idleFor: number;
  timeLeft: number;
  timeLeftPer: number;
}

// 定义状态常量
const STATUS = {
  ACTIVE: 'active',
  IDLE: 'idle',
  HIDDEN: 'hidden'
} as const;

// 冻结状态对象，防止意外修改
Object.freeze(STATUS);
// 定义 IfVisible 类
export default class IfVisible {
  // 当前状态，初始为活跃状态
  private status: (typeof STATUS)[keyof typeof STATUS] = STATUS.ACTIVE;
  // 定时器引用
  private timer: NodeJS.Timeout | null = null;
  // 用户闲置的时间阈值，单位为毫秒
  private idleTime: number;
  // 记录用户开始闲置的时间
  private idleStartedTime: number = Date.now();
  // 是否开启兼容模式
  private isLegacyModeOn = false;
  // 页面可见性变化事件名称
  private VISIBILITY_CHANGE_EVENT: string;
  // 窗口对象
  private root: Window;
  // 文档对象
  private doc: Document;
  // 配置选项
  private options: { statusChanged?: (status: (typeof STATUS)[keyof typeof STATUS]) => void };

  constructor(duration: number, options: { statusChanged?: (status: (typeof STATUS)[keyof typeof STATUS]) => void } = {}) {
      this.root = window;
      this.doc = document;
      this.VISIBILITY_CHANGE_EVENT = 'visibilitychange';
      // 设置闲置时间阈值
      this.idleTime = duration * 1000;
      this.options = options;

      // 检查浏览器是否支持页面可见性 API
      if ('hidden' in this.doc) {
          const trackChange = () => {
              if (this.doc.hidden) {
                  this.blur();
              } else {
                  this.focus();
              }
          };
          // 初始化页面状态
          trackChange();
          // 监听页面可见性变化事件
          this.doc.addEventListener(this.VISIBILITY_CHANGE_EVENT, trackChange);
      } else {
          // 若不支持，开启兼容模式
          this.legacyMode();
      }

      // 定义需要监听的用户交互事件
      const events = ['mousemove', 'mousedown', 'keyup', 'touchstart', 'scroll'];
      events.forEach(event => {
          this.doc.addEventListener(event, this.startIdleTimer.bind(this));
      });

      // 监听页面获得焦点事件
      this.root.addEventListener('focus', this.startIdleTimer.bind(this));

      // 启动闲置定时器
      this.startIdleTimer();
  }

  // 开启兼容模式
  private legacyMode() {
      if (this.isLegacyModeOn) {
          return;
      }
      // 监听窗口失去焦点和获得焦点事件
      this.root.addEventListener('blur', this.blur.bind(this));
      this.root.addEventListener('focus', this.focus.bind(this));
      this.isLegacyModeOn = true;
  }

  // 启动闲置定时器
  private startIdleTimer() {
      if (this.status === STATUS.IDLE) {
          this.wakeup();
      }
      if (this.timer) {
          clearTimeout(this.timer);
      }
      this.idleStartedTime = Date.now();
      this.timer = setTimeout(() => {
          if ([STATUS.ACTIVE, STATUS.HIDDEN].includes(this.status)) {
              this.idle();
          }
      }, this.idleTime);
  }

  // 获取闲置时间阈值
  getIdleDuration(): number {
      return this.idleTime;
  }

  // 获取当前闲置信息
  getIdleInfo(): IIdleInfo {
      const now = Date.now();
      if (this.status === STATUS.IDLE) {
          return {
              isIdle: true,
              idleFor: now - this.idleStartedTime,
              timeLeft: 0,
              timeLeftPer: 100
          };
      }
      const timeLeft = Math.max(0, (this.idleStartedTime + this.idleTime) - now);
      return {
          isIdle: false,
          idleFor: now - this.idleStartedTime,
          timeLeft,
          timeLeftPer: parseFloat((100 - (timeLeft * 100 / this.idleTime)).toFixed(2))
      };
  }

  // 唤醒页面，将状态设置为活跃
  private wakeup() {
      if (this.status !== STATUS.ACTIVE) {
          this.status = STATUS.ACTIVE;
          this.notifyStatusChanged();
      }
  }

  // 将状态设置为闲置
  private idle() {
      this.status = STATUS.IDLE;
      this.notifyStatusChanged();
  }

  // 页面失去焦点，将状态设置为隐藏
  private blur() {
      this.startIdleTimer();
      this.status = STATUS.HIDDEN;
      this.notifyStatusChanged();
  }

  // 页面获得焦点，将状态设置为活跃
  private focus() {
      this.startIdleTimer();
      this.status = STATUS.ACTIVE;
      this.notifyStatusChanged();
  }

  // 通知状态变化
  private notifyStatusChanged() {
      this.options.statusChanged?.(this.status);
  }

  // 销毁方法，用于清除事件监听器和定时器
  destroy() {
      if (this.timer) {
          clearTimeout(this.timer);
      }
      const events = ['mousemove', 'mousedown', 'keyup', 'touchstart', 'scroll'];
      events.forEach(event => {
          this.doc.removeEventListener(event, this.startIdleTimer.bind(this));
      });
      this.root.removeEventListener('focus', this.startIdleTimer.bind(this));
      if ('hidden' in this.doc) {
          const trackChange = () => {
              if (this.doc.hidden) {
                  this.blur();
              } else {
                  this.focus();
              }
          };
          this.doc.removeEventListener(this.VISIBILITY_CHANGE_EVENT, trackChange);
      } else {
          this.root.removeEventListener('blur', this.blur.bind(this));
          this.root.removeEventListener('focus', this.focus.bind(this));
      }
  }
}    

