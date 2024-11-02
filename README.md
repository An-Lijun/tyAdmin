# tyAdmin

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

## plugin

vite-plugin-html
HTML 压缩能力,EJS 模版能力,多页应用支持,支持自定义entry,支持自定义html template
