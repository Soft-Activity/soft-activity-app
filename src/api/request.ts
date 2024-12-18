import { useUserStore } from '@/stores/user';

import { BASE_URL } from "../constants";
export const request = <T> (url: string, options: any): Promise<T> => new Promise((resolve, reject) => {
    console.log(url,options)
    uni.request({
      ...options,
      data: options.data ?? options.params,
      url: `${BASE_URL}${url}`,
      timeout: 10000,
      withCredentials: true,
      // #ifdef MP-WEIXIN
      header: {
        'token': uni.getStorageSync('token'),
      },
      // #endif
      success: (res: any) => {
        console.log(res)
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
        reject(res);
        console.log('fail' + JSON.stringify(res));
      },
    });
  });