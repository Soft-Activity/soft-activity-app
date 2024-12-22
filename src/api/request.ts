import { useUserStore } from '@/stores/user';

import { BASE_URL, BASE_URL_COMMON } from "../constants";
export const request = <T> (url: string, options: any): Promise<T> => new Promise((resolve, reject) => {
    let baseUrl = BASE_URL
    console.log(url,options)
    //请求头为/common时切换服务器目录
    if(url.includes('/common')){
        baseUrl = BASE_URL_COMMON
    }
    
    uni.request({
      ...options,
      data: options.data ?? options.params,
      url: `${baseUrl}${url}`,
      timeout: 10000,
      withCredentials: true,
      // #ifdef MP-WEIXIN
      header: {
        'token': uni.getStorageSync('token'),
      },
      // #endif
      success: (res: any) => {
        // console.log('success',res)
        if (res.statusCode === 200) {
          resolve(res.data.data);
        } else if (res.statusCode === 401) {
          useUserStore().showLoginModal()
          reject(res?.data?.message || res);
        } else {
          reject(res?.data?.message || res);
        }
      },
      fail: (res: any) => {
        // console.log('fail',res)
        reject(res);
        console.log('fail' + JSON.stringify(res));
      },
    });
  });