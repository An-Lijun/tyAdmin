import AxiosRetry from './retry'
import checkStatus from './checkStatus'
import { TyAlert } from 'toyar-design'
const retryRequest = new AxiosRetry();
// 添加请求拦截器
export function addReqInterceptor(http) {
  http.interceptors.request.use(
    async function (config) {
      // 在发送请求之前做些什么
      // let config1= await stackArr(config)
      return config
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )
}

// 添加响应拦截器
export function addResInterceptor(http) {
  http.interceptors.response.use(
    function (response) {
      const data = JSON.parse(response.data)
      if(data.code !== 200){
        const  {distroy} = TyAlert(data.message, {
          type: 'error',
          sure: {
            code: () => {
              distroy()
            }
          },
          cancel: {
            code: () => {
              distroy()
            }
          },
        });
        return Promise.reject(response)
      }
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      response.data =JSON.parse(response.data)
      return response
    },
    function (error) {
      const { response, code, message, config } = error || {};
      const msg: string = response?.data?.error?.message ?? '';
      const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';

      // retryRequest.retry(http, error);
      // checkStatus(error?.response?.status, msg, errorMessageMode);

      const  {distroy} = TyAlert(msg, {
        type: 'warning',
        sure: {
          code: () => {
            distroy()
          }
        },
        cancel: {
          code: () => {
            distroy()
          }
        },
      });
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return Promise.reject(error)
    }
  )
}
