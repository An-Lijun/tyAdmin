import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios'
import axios from 'axios'
import { ref, watch } from 'vue'
import { addReqInterceptor, addResInterceptor } from './interceptor'

const count = ref(1)

class AxiosPro {
  private axiosInstance: AxiosInstance
  private readonly options
  private MAX_STACKLen = 5
  private con = 0
  constructor(options) {
    this.options = options
    this.axiosInstance = this.createAxios(options)
  }
  createAxios(options) {
    // addReqInterceptor,addResInterceptor 
    let instance = axios.create({
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
      transformRequest: [
        function (data, headers) {
          // 对发送的 data 进行任意转换处理
          return data
        }
      ],

      // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
      transformResponse: [
        function (data) {
          // 对接收的 data 进行任意转换处理
          return data
        }
      ]
    })
    addReqInterceptor(instance)
    addResInterceptor(instance)

    return instance
  }
  waitStack(num) {
    return new Promise((resolve, reject) => {
      if (num <= this.MAX_STACKLen) {
        resolve('success')
      } else {
        const watchBk = watch(count, newV => {
          if (num - newV < this.MAX_STACKLen) {
            resolve('success')
            watchBk()
          }
        })
      }
    })
  }
  get(url) {
    return new Promise(async (reslove, reject) => {
      this.con++
      try {
        await this.waitStack(this.con)
        let res = await this.axiosInstance.get(url)
        reslove(res)
      } catch (error) {
        reject(error)
      } finally {
        count.value++
      }
    })
  }

  post(url, data) {
    return new Promise(async (reslove, reject) => {
      this.con++
      try {
        await this.waitStack(this.con)
        let res = await this.axiosInstance.post(url, data)
        reslove(res)
      } catch (error) {
        reject(error)
      } finally {
        count.value++
      }
    })
  }
  cbGet(
    url: string,
    params: any,
    success?: (arg: any) => void,
    error?: (arg: any) => void,
    conf?: any
  ) {

    const resp = this.get(url, { params, ...conf })

    if (success || error) {
      resp.then((res: any) => success?.(res)).catch((err: any) => error?.(err))
      return
    }

    return resp
  }
  cbPost(
    url: string,
    params: any,
    success?: (arg: any) => void,
    error?: (arg: any) => void,
    conf?: any
  ) {

    const resp = this.post(url, params, { ...conf })

    if (success || error) {
      resp.then((res: any) => success?.(res)).catch((err: any) => error?.(err))
      // @ts-ignore
      return
    }

    return resp as Promise<T>
  }
}
export default new AxiosPro()
