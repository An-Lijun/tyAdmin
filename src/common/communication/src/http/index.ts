import AxiosPro from './src/axiosPro'

const http=new AxiosPro({
  method: 'get', // 默认值
  timeout: 60 * 1000,
  baseURL: import.meta.env.VITE_HTTP_BASIC_URL,
  withCredentials: false, //表示跨域请求时是否需要使用凭证
  // headers: { 'Content-Type': 'application/json' },
  onUploadProgress: function (progressEvent) {
    // 处理原生进度事件
  },
  onDownloadProgress: function (progressEvent) {
    // onDownloadProgress` 允许为下载处理进度事件 处理原生进度事件
  },
  responseType: 'json', // 默认值
  responseEncoding: 'utf8', // 默认值
  // 自定义请求头
  headers: {},

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
  // 你可以修改请求头。
  // transformRequest: [
  //   function (data, headers) {
  //     // 对发送的 data 进行任意转换处理
  //     console.log(data);
      
  //     return JSON.stringify(data)
  //   }
  // ],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function (data) {
      // 对接收的 data 进行任意转换处理
      return data
    }
  ]
})


export default http
