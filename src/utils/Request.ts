/*
 * @Author: 请求方法
 * @Date: 2019-12-05 19:27:23
 * @LastEditTime: 2019-12-06 14:48:12
 * @LastEditors: Please set LastEditors
 * @Description: 请求方法
 * @FilePath: \Verona\src\utils\Request.ts
 */
import Taro from '@tarojs/taro'
import mobxGlobal from '../store/mobxGlobal'

import Toast from './Toast'

interface Response {
  code: number
  data: any
  msg: (string|number)[]
  [key: string]: any
}

export default class Request {
  static token: any = Taro.getStorageSync('token')

  /* 设置请求头 */
  static setRequestHeaser (type:string) {
    const { systemInfo: { system } } = mobxGlobal
    const Authorization = Request.token
    const header = {
      device: type === 'stallone' ? 'wxapp' : system && system.toLowerCase().indexOf('ios') > - 1 ? 1 : 2,
      platform: 'wxb',
      Authorization,
      'X-Ca-Stage': STAGE
    }
    if (!STAGE ) delete header['X-Ca-Stage']
    if (Authorization) return header
    delete header.Authorization
    return header
  }

  /**
   * 基础请求
   * @param url 请求短径
   * @param param 请求参数方式
   * @param method 请求方法
   * @param tipsText 提示文案
   * @param isShowLoading 是否要展示 loading
   * @param type 接口类型  基本资料服务接口不用传， 支付服务接口要传' /erice '
   */
  static request (url: string, param: any, method: 'GET'|'POST' = 'GET', tipsText?: string, isShowLoading?: boolean, type?:string): Promise<Response> {
    return new Promise((resolve, reject) => {
      isShowLoading && Toast.loading(tipsText)
      const requestTask = Taro.request({
        /* global API */
        url: API + url,
        data: param,
        method: method,
        header: Request.setRequestHeaser(type||''),
        success (res) {
          if (res.statusCode === 200) {
            // 登录信息失效哦
            // if(res.data.code === 1001){
            //   Toast.toast('您的账号已在其他设备上登录,请重新登录')
            //   setTimeout(()=>{
            //     Taro.redirectTo({
            //       url:'/pages/userLogin/login/login'
            //     })
            //   },3000)
             
            // }
            resolve(res.data)
          } else {
       
            reject(res.data)
          }
        },
        fail (e) {
          console.error('api fail', '请求接口出现问题', e)
          reject(e)
        },
        complete () {
            requestTask.then(({ header }) => {
              const token = header.Authorization
              if (token) {
                Taro.setStorageSync('token', token)
                Request.token = token
              }
            })
          isShowLoading && Toast.loaded()
        }
      })
    })
  }

  /* get 请求 */
  static get (url: string, param: any, tipsText?: string, isShowLoading = true, type?: string) {
    return Request.request(url, param, 'GET', tipsText, isShowLoading, type)
  }

  /* post 请求 */
  static post (url: string, param: any, tipsText?: string, isShowLoading = true, type?: string) {
    return Request.request(url, param, 'POST', tipsText, isShowLoading, type)
  }

  /* 支付接口 */
  static getPaySign (orderId: string) {
    const url = '/pay/v1/wxPay/wxPayUnifiedOrder/zc'
    const params = { orderId }
    return new Promise((resolve, reject) => {
      Request.post(url, params, '', false, '/erice').then((res) => {
        const { code, data, message } = res
        let { timeStamp, nonceStr, signType, paySign, packageStr } = data
        timeStamp += ''
        if (code === 200) {
          Taro.requestPayment({
            timeStamp,
            nonceStr,
            package: packageStr,
            signType,
            paySign,
            success (d) {
              resolve(d)
            },
            fail (e) {
              reject(e)
            }
          })
          return
        }
        Taro.showToast({
          title: message,
          icon: 'none',
          duration: 2000
        })
      })
    })
  }
}
