/*
 * @Author: songliubiao
 * @Date: 2019-12-05 19:27:23
 * @LastEditTime: 2019-12-06 11:44:13
 * @LastEditors: Please set LastEditors
 * @Description: 全局状态管理In User Settings Edit
 * @FilePath: \Verona\src\store\mobxGlobal.ts
 */
import { observable, action, flow } from 'mobx'
import Taro from '@tarojs/taro'

export class MobxGlobal {
  @observable
  userInfo: any = Taro.getStorageSync('userInfo') || {}

  @observable
  shopId: number = 1001
  
  @observable
  systemInfo: {[key: string]: any} = {}


  @action
  setUserInfo = (data: any) => {
    // 伪代码
      this.userInfo = data
  }
  // 获取设备信息
  getSystemInfo = flow(function *() {
    this.systemInfo = yield Taro.getSystemInfo()
  })
}

const mobxGlobal = new MobxGlobal()

export default mobxGlobal
