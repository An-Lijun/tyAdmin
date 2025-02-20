# tyAdmin

## 入口文件

入口文件是vue3 项目的入口文件, 主要是集成了一些基础功能, 如国际化, 路由, store, common, 组件, 窗口化, 国际化等相关功能,但是都在一个文件一直vue.use下去页面会越来越长

这里将入口文件改为一个一个立即执行函数(主要是为了语义化调用, 方便阅读)
立即执行函数中分步调用各个注册功能函数, 如:

> 创建App   
注册权限    主要是注入 全局v-auth权限指令 向外暴露isDev isProd 方法  
创建国际化  包含国际化入口语言包以及自定义的语言脚本  
配置store   主要是注入全局store 以及持久化  
注册路由    主要是注入全局路由 路由采用约定式+声明式  
注册组件    集成一些全局组件插件等  
注册系统    集成尾拖 nodebugger 生命周期等  
这几个大模块


## 插件系统

插件系统扩展vite功能  
这里入口是vite.config.ts 中plugins  使用createVitePlugins函数 进行插件的集成  
主要集成了:  
1 vite-plugin-html  (html模板)  
> HTML 压缩能力,EJS 模版能力,多页应用支持,支持自定义entry,支持自定义html template

2 vite-plugin-pages (约定式路由)  
3 vite-plugin-mock  (mock)

## mock系统
使用自定义vite-mock-server
自动记录请求和响应，并根据配置生成mock数据。
如果文件已经存在则需要删除文件再进行记录



## 环境变量与使用

环境变量基于vite的env 配置文件

在项目中主要分为三个文件
1. .env.development 开发环境变量
2. .env.production 生产环境变量
3. .env 公共环境变量

注意: vite的环境变量取名规范 必须以VITE_开头 如: VITE_APP_TITLE

使用
1. 在配置文件中使用
在 vite.config.js 或 vite.config.ts 中，可以使用 loadEnv 函数加载环境变量：
```javascript
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return defineConfig({
        define: {
            'process.env': env
        },
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_API_URL,
                    changeOrigin: true
                }
            }
        }
    });
};
```
在上述代码中，通过 loadEnv 函数加载当前模式下的环境变量，然后可以在配置中使用这些变量，如配置代理时使用 VITE_API_URL。

2. 在项目代码中使用环境变量
在项目的 JavaScript 或 TypeScript 代码中，可以通过 import.meta.env 访问环境变量：
```javascript
// 在组件中使用环境变量
const apiUrl = import.meta.env.VITE_API_URL;
const appTitle = import.meta.env.VITE_APP_TITLE;

console.log('API URL:', apiUrl);
console.log('App Title:', appTitle);
```
环境变量的访问规则
只有以 VITE_ 开头的环境变量才能通过 import.meta.env 访问，这是为了防止意外暴露敏感信息。
在开发环境中，可以直接使用 import.meta.env 访问环境变量；在生产环境中，Vite 会将环境变量静态替换为实际的值。



3. 在 HTML 文件中使用环境变量
在 HTML 文件中，可以通过 JavaScript 代码访问环境变量。例如：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><script>document.write(import.meta.env.VITE_APP_TITLE)</script></title>

</head>
<body>
    <!-- 页面内容 -->
</body>
</html>

```
4. 使用HTML模板
在 vite.config.js 中，可以使用 vite-plugin-html 插件来配置 HTML 模板：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= VITE_GLOB_APP_TITLE %></title>
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>
```
通过以上方法，可以在 Vite 项目的不同场景中灵活使用环境变量。


## 功能

### 组件

1. 通用组件 自己开发的 toyar-design
2. 封装svgIcon

   好处:
   1 解决了普通svg 使用image 导入无法修改颜色的问题
   
   2 解决了普通svg 使用use 时候全量导入的问题, 这里打包后会作为单独的svg进行渲染
   
   3 虽然使用innerHTML,但是由于这里使用的是import svg 基本可以避免xls
   
   使用方法:
   svgicon 需要将所需要的svg 导入到@/assets/system目录下,以为svg文件名作为icon参数传入,注意不能重名,
   使用color fill 或则stroke 修改svg颜色,这个具体取决了svg本身的代码
   使用fontSize 修改svg大小

```html
   <svgIcon :icon="item.icon" >
   </svgIcon>
```

后面可以考虑以为system下文件夹+文件名作为唯一icon标识,也考虑放入一个新的svgIcon文件保存

ps 本来打算使用?raw 读出字符串渲染到根html中然后使用svguse 进行使用但是没有这个方式简单

3. 封装 countTo  数字动画组件

```html
   <countTo :value="item.money" :second="2">
      <template #default="{value}">
        <span class="money">
          ${{ value }}
        </span>
      </template>
    </countTo>
  -----或者----
   <countTo :value="item.money" :second="2"></countTo>

参数 value 实际要有动画的数字 
参数 second 动画时间
```

4. 封装echars
   使用tChart组件 传入 width height option 则可以直接绘图 不用考虑浏览器窗口变化, 里面封装好了
   deepDraw 当开启 deepDraw 时当option 发生改变则会触发echars重新绘制
   deepRender 当开启 deepRender 时当绘制tChart组件发生宽高改变时候重新绘制
   click 事件触发echars的click事件 相当于myChat.on(click,()=>{自定义事件})

```html
  <tChart option={} :deepDraw="true" :deepRender="true" @click="()=>{}">

```

### 国际化 i18n

  关于国际化入口文件集成注入和配置文件, lang目录暴露当前语言的配置变了constant 自动读取模块并且导出的exportLang, 使用方法在lang下创建任意名称的一级文件夹目录, 在这个文件夹下新增index.ts其中默认导出语言对象如:

```JavaScript
  locales/lang/system/index.ts
    export default {
      userNm:{
        zh:'拓源',
        en:'toyar'
      }
    }
```

### 路由 vue-router

使用 vite-plugin-pages 自动生成admin 约定式路由


### store pinia

### common

获取资源使用getAsset 获取src下的任意资源 如 getAssetURL('assets/xxx.png') 返回形式如 http://xxx:xxx/src/assets/xxx.png


http

[起步 | Axios中文文档 | Axios中文网 (axios-http.cn)](https://www.axios-http.cn/docs/intro)


### 窗口化

在实际功能中存在在交易区块打开, 新窗口打开,模态窗口打开三种方式
而实际上打开的页面又分为 项目内的静态html 和项目外的网站两种网站
使用postMessage 进行iframe通信

使用common 的 openWindow方法打开窗口 使用uiFrame组件进行路由结合

```JavaScript
  参数1 url 实际要打开网站的地址
  参数2 object  target 原iframetarget 扩展 mozillaWindow 当为这个值时 结合宽高 形成模态窗口
  剩下与iframe 原来的值功能一样
    popup = true,
    top,
    left,
    width,
    height,
    noreferrer,
    noopener
```

## 环境变量

依赖于vite
base 采用env 的环境变量

