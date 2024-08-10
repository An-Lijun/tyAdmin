// import type { AxiosInstance, AxiosResponse } from 'axios';
// import axios from 'axios'
// import { ref, watch } from 'vue'

// const MAX_REQNUM = 2
// let count = ref(0)
// const stackArr = data => {
//   return new Promise((resolve, reject) => {
//     if (count.value < MAX_REQNUM) {
//       resolve(data)
//       count.value++
//     } else {
//       watch(count, (newV) => {
//         console.log(newV,newV <= MAX_REQNUM && newV <=0);
//         if (newV <= MAX_REQNUM && newV <=0 ) {
//           console.log('!!!!!!!!!');
//           resolve(data)
//           count.value++
//         }
//       })
//     }
//   })
// }

// // process.env.VUE_APP_URL
// const http = axios.create({
//   baseURL: '127.0.0.1:3661',
//   method: 'get', // 默认值
//   timeout: 60 * 1000,
//   withCredentials: false, //表示跨域请求时是否需要使用凭证
//   // headers: { 'Content-Type': 'application/json' },
//   onUploadProgress: function (progressEvent) {
//     // 处理原生进度事件
//   },
//   onDownloadProgress: function (progressEvent) {
//     // onDownloadProgress` 允许为下载处理进度事件 处理原生进度事件
//   },
//   responseType: 'json', // 默认值
//   responseEncoding: 'utf8', // 默认值
//   // 自定义请求头
//   headers: {},

//   // `transformRequest` 允许在向服务器发送前，修改请求数据
//   // 它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
//   // 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
//   // 你可以修改请求头。
//   transformRequest: [
//     function (data, headers) {
//       // 对发送的 data 进行任意转换处理
//       return data
//     }
//   ],

//   // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
//   transformResponse: [
//     function (data) {
//       // 对接收的 data 进行任意转换处理
//       return data
//     }
//   ]
// })



// export function httpGet (
//   url: string,
//   params: any,
//   success?: (arg: any) => void,
//   error?: (arg: any) => void,
//   conf?: any
// ) {
//   const resp = http.get(url, { params, ...conf })

//   if (success || error) {
//     resp.then((res: any) => success?.(res)).catch((err: any) => error?.(err))
//     return
//   }

//   return resp
// }

// export function httpPost<T> (
//   url: string,
//   params?: any,
//   success?: (arg: any) => void,
//   error?: (arg: any) => void,
//   conf?: any
// ): Promise<T> {
//   const resp = http.post(url, params, { ...conf })

//   if (success || error) {
//     resp.then((res: any) => success?.(res)).catch((err: any) => error?.(err))
//     // @ts-ignore
//     return
//   }

//   return resp as Promise<T>
// }

// export default http
