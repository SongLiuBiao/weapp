/*
 * @Author: songliubiao
 * @Date: 2019-12-05 19:27:23
 * @LastEditTime: 2019-12-06 11:49:03
 * @LastEditors: Please set LastEditors
 * @Description: Toast 提升
 * @FilePath: \Verona\src\utils\Toast.ts
 */

import Taro from '@tarojs/taro'

export default class Toast {
  static isLoading: boolean = false

  static toast (title: string) {
    return Taro.showToast({
      title,
      icon:'none',
      mask: true,
      duration: 3000
    })
  }

  /* 成功提示框 */
  static success (title: string, duration = 500) {
    return Taro.showToast({
      duration,
      title,
      icon: 'success',
      mask: true
    })
  }

  /**
   * TODO - 警告图片样式
   * 警告提示框
   */
  static warn (title: string) {
    return Taro.showToast({
      title,
      // image: "../images/alert.png",
      mask: true,
      duration: 1000
    })
  }

  /**
   * TODO - 错误图片样式
   * 错误提示框
   */
  static error (title: string) {
    return Taro.showToast({
      title,
      // image: "../images/error.png",
      mask: true,
      duration: 1000
    })
  }

  /**
   * TODO - 弹出确认窗口
   */
  static confirm (title: string = '提示', content: string) {
    return Taro.showModal({
      title,
      content,
      showCancel: true
    })
  }

  /**
   * 加载提示框
   */
  static loading (title = '加载中') {
    if (Toast.isLoading) return
    Toast.isLoading = true
    return Taro.showLoading({
      title,
      mask: true
    })
  }

  /**
   * 隐藏加载
   */
  static loaded () {
    if (Toast.isLoading) {
      Toast.isLoading = false
      return Taro.hideLoading()
    }
  }
}
