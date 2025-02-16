
import axios from 'axios'
import { ref, watch } from 'vue'
import { addReqInterceptor, addResInterceptor } from './interceptor'

const count = ref(0)

export default class AxiosPro {
  private instance
  private MAX_STACKLen = 5
  constructor(options) {
    this.instance = this.createAxios(options)
  }
  createAxios(options) {
    // addReqInterceptor,addResInterceptor 
    let instance = axios.create(options)
    addReqInterceptor(instance)
    addResInterceptor(instance)

    return instance
  }
  waitStack() {
    return new Promise((resolve, reject) => {
      if (count.value <= this.MAX_STACKLen) {
        count.value++
        resolve('success')
      } else {
        const watchBk = watch(count, newV => {
          if (newV < this.MAX_STACKLen) {
            watchBk()
            count.value++
            resolve('success')
          }
        })
      }
    })
  }
  request(config){
    return new Promise(async (resolve, reject) => {
      try {
        await this.waitStack();
       resolve(this.instance.request(config))
      } catch (error) {
        reject(error);
      } finally {
        count.value--;
      }
    });
  }

  put(url, data) {
    return this.request({
      method: 'put',
      url,
      data
    });
  }

  delete(url, config) {
    return this.request({
      method: 'delete',
      url,
      ...config
    });
  }
  post(url, data, config) {
    return this.request({
      method: 'post',
      url,
      data,
      ...config
    });
  }

  get(url, config) {
    return this.request({
      method: 'get',
      url,
      ...config
    });
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
