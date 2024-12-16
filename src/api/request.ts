// @ts-nocheck

import { BASE_URL } from "../constants";
export const request = <T> (url: string, options: any): Promise<T> => new Promise((resolve, reject) => {
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
      success: res => {
        if (res.statusCode === 200) {
         
          resolve(res.data.data);
        } else if (res.statusCode === 401) {
          // uniShowLoginModal();
          reject(res);
        } else {
          reject(res);
        }
      },
      fail: (res) => {
        reject(res);
        console.log('fail' + JSON.stringify(res));
      },
    });
  });