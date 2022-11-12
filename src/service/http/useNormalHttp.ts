/*
 * @Description:   网络请求类
 * @Author: Gavin
 * @Date: 2022-08-24 10:49:59
 * @LastEditors: Gavin
 * @LastEditTime: 2022-09-20 11:13:27
 */

import { ref } from 'vue';
import { networkUtils } from '@gz/network';
import type {
  AxiosRequestConfig,
  CreateAxiosOptions,
  IAxiosTransform,
  RequestOptions,
  AxiosResponse,
  Result,
  AxiosError
} from '@gz/network';
import { defaultsDeep } from 'lodash-es';
import { getToken } from '@/utils';
// import { useRGApiHelper } from '../utils/useRGApiHelper';

/** 参数格式整理 授权header处理 */
const currentTransform: IAxiosTransform = defaultsDeep({}, networkUtils.transform);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
currentTransform.requestInterceptors = (config: AxiosRequestConfig, options: CreateAxiosOptions) => {
  config.headers['Content-Type'] = 'application/json';
  config.headers.Authorization = `Bearer ${getToken()}`;
  // config.data = qs.stringify(options.params);
  // console.log('request headers', config.headers);
  return config;
};
currentTransform.requestInterceptorsCatch = (error: Error) => {
  console.log('request catch', error);
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
currentTransform.responseInterceptorsCatch = (axiosInstance: AxiosResponse, error: AxiosError) => {
  console.error('response Interceptors Catch:', error);
  throw error;
};
const opt = defaultsDeep({}, networkUtils.normalOpt);
opt.timeout = 60 * 1000 * 2;
opt.transform = currentTransform;
opt.requestOptions.urlPrefix = '';
const requestIdRef = ref(0);
const BIHttp = networkUtils.createAxios(opt as any);
export function useNormalHttpUtils() {
  function doBaseApiRequest<T>(uriPath: string, params: any, options?: RequestOptions) {
    return new Promise<T>(
      (resolve, reject: (error?: { message: string; code?: number; retMsg?: string; retCode?: number }) => void) => {
        const tpReqOptions: RequestOptions = options || {
          isReturnNativeResponse: false, // 关闭使用axiosresponse返回
          ignoreCancelToken: true,
          withToken: false
        };
        const requestNumber = requestIdRef.value + 1;
        requestIdRef.value = requestNumber;
        tpReqOptions.requestId = requestNumber;
        BIHttp.post<Result<T>>(
          {
            baseURL: 'http://localhost:5555',
            url: `${uriPath}`,
            params
          },
          tpReqOptions
        )
          .then((resp: Result<T>) => {
            console.log('requestId:', tpReqOptions.requestId, resp);
            if (resp.retCode === 0) {
              resolve(resp.data);
            } else {
              const error = new Error('data parse error');
              (error as any).otherdata = resp;
              // eslint-disable-next-line prefer-promise-reject-errors
              reject(error as any);
            }
          })
          .catch((err: AxiosError) => {
            console.log('requestId:', tpReqOptions.requestId, err);
            const error: Record<any, any> = {};
            error.message = err.message;
            error.code = err.response?.status;
            error.retCode = (err.response?.data as any)?.retCode || -999;
            error.retMsg = (err.response?.data as any)?.retMsg || 'unknow msg';
            // error.
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(error as any);
          });
      }
    );
  }
  return {
    doBaseApiRequest,
    BIHttp
  };
}
