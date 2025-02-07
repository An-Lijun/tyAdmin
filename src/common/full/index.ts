/*
浏览器是否支持全屏模式：document.fullscreenEnabled
使元素进入全屏模式：Element.requestFullscreen()
退出全屏：document.exitFullscreen()
检查当前是否有节点处于全屏状态：document.fullscreenElement
进入全屏/离开全屏，触发事件：document.fullscreenchange
无法进入全屏时触发: document.fullscreenerror
 
*/
export default class FullScreen {
    hasFullScreenApi: boolean;
    constructor(enter: Function, quit: Function, enterErrorFn: Function) {
        this.hasFullScreenApi = true; // 浏览器是否支持全屏
        if (this.hasFullScreenApi) {
            /**
             * @description: 监听进入/离开全屏
             * @param {Function} enter 进入全屏的回调
             *  @param {Function} quit 离开全屏的回调
             */
            document.onfullscreenchange = e => {
                if (this.isElementFullScreen()) {
                    enter && enter(e); // 进入全屏回调
                } else {
                    quit && quit(e); // 离开全屏的回调
                }
            };
            /**
                * @description: 浏览器无法进入全屏时触发,可能是技术原因，也可能是用户拒绝：比如全屏请求不是在事件处理函数中调用,会在这里拦截到错误
                * @param {Function} enterErrorFn 回调
                */
            document.onfullscreenerror = e => {
                enterErrorFn && enterErrorFn(e);
            };
        }

    }
    /**
    * @description: 是否支持全屏+判断浏览器前缀
    * @return {Boolean}
    */
    isFullScreenApi() {
        // 判断浏览器前缀
        if (!document.fullscreenEnabled) {
            this.hasFullScreenApi = false
        }
    }
    /**
     * @description: 将传进来的元素全屏
     * @param {String} domName 要全屏的dom名称
     */
    Fullscreen(element: HTMLElement) {
        element.requestFullscreen();
    }
    // 退出全屏
    exitFullscreen() {
        document.exitFullscreen();
    }
    /**
     * @description: 检测有没有元素处于全屏状态
     * @return 布尔值
     */
    isElementFullScreen() {
        const fullscreenElement = document.fullscreenElement;
        if (fullscreenElement === null) {
            return false; // 当前没有元素在全屏状态
        } else {
            return true; // 有元素在全屏状态
        }
    }
}



