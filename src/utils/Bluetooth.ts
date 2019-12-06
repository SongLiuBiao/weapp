/*
 * @Author: songliubiao
 * @Date: 2019-12-05 19:27:23
 * @LastEditTime: 2019-12-06 11:44:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Verona\src\utils\Bluetooth.ts
 */

import Taro from '@tarojs/taro'

export default class Bluetooth {
  static deviceName = '' // 已获取到的蓝牙设备名称
  static deviceId = '' // 根据蓝牙设备名称获取到的蓝牙设备 deviceId
  static connectedDeviceId  = '' // 已连接到的蓝牙设备 deviceId
  static services: any[]  = [] // 已连接到的蓝牙设备的所有服务列表
  static notifyCharacteristicsId  = '' // 已连接到的蓝牙设备的特征值

  /* 初始化蓝牙 */
  static openBluetoothAdapter () {
    /* 本机的蓝牙是否打开或者支持连接 */
    setTimeout(() => {
      Taro.openBluetoothAdapter().then(() => {
        Bluetooth.getBluetoothAdapterState()
      })
    }, 1000)
  }

  /* 检测本机蓝牙是否可用 */
  static getBluetoothAdapterState () {
    Taro.getBluetoothAdapterState().then(() => {
      Bluetooth.startBluetoothDevicesDiscovery()
    })
  }

  /* 开始搜索附近的蓝牙外围设备 */
  static startBluetoothDevicesDiscovery () {
    setTimeout(() => {
      Taro.startBluetoothDevicesDiscovery({
        services: [],
        allowDuplicatesKey: false,
        interval: 0
      }).then(() => {
        Bluetooth.getBluetoothDevices()
      })
    }, 1000)
  }

  /* 已经搜索到的蓝牙设备列表 */
  static getBluetoothDevices () {
    setTimeout(() => {
      Taro.getBluetoothDevices().then(({ devices }) => {
        if (devices.length) {
          if (!Bluetooth.deviceName) {
            Bluetooth.deviceName = devices[0].name
            return
          }
          devices.some(item => {
            if (Bluetooth.deviceName === item.name) {
              /* 根据指定的蓝牙设备名称匹配到 deviceId */
              Bluetooth.deviceId = item.deviceId
            }
          })
        }
      })
    }, 1000)
  }

  /* 连接到指定的蓝牙，并且断开蓝牙搜索功能 */
  static connectBlueAndStopDiscovery (deviceId: string) {
    Taro.createBLEConnection({ deviceId }).then(() => {
      Bluetooth.connectedDeviceId = deviceId
      Bluetooth.getBLEDeviceServices()
      /* 停止蓝牙搜索服务 */
      Taro.stopBluetoothDevicesDiscovery()
    })
  }

  /* 获取蓝牙设置支持的服务 */
  static getBLEDeviceServices () {
    setTimeout(() => {
      Taro.getBLEDeviceServices({ deviceId: Bluetooth.connectedDeviceId }).then(({ services }) => {
        Bluetooth.services = services
      })
    }, 1000)
  }

  /* 获取该蓝牙设备的特征值 */
  static getBLEDeviceCharacteristics () {
    const params = {
      deviceId: Bluetooth.connectedDeviceId,
      serviceId: Bluetooth.services[0].uuid
    }
    setTimeout(() => {
      Taro.getBLEDeviceCharacteristics(params).then(({ characteristics }) => {
        characteristics.some(({ uuid, properties }) => {
          const { notify, indicate, read, write } = properties
          if ((notify || indicate) && (read || write)) {
            /* 获取蓝牙特征值 */
            Bluetooth.notifyCharacteristicsId = uuid
            Bluetooth.notifyBLECharacteristicValueChange()
            return true
          }
        })
      })
    }, 1000)
  }

  /* 启用低功耗蓝牙设备特征值变化时的 notify 功能 */
  static notifyBLECharacteristicValueChange () {
    const params = {
      state: true,
      deviceId: Bluetooth.connectedDeviceId,
      serviceId: Bluetooth.services[0].uuid,
      characteristicId: Bluetooth.notifyCharacteristicsId
    }
    Taro.notifyBLECharacteristicValueChange(params).then(() => {
      Bluetooth.onBLECharacteristicValueChange()
    })
  }

  /* 监听低功耗蓝牙设备的特征值变化事件 */
  static onBLECharacteristicValueChange () {
    Taro.onBLECharacteristicValueChange(({ value }) => {
      //
    })
  }

  /* 向低功耗蓝牙设备特征值中写入二进制数据 */
  static writeBLECharacteristicValue (dataBuffer: any) {
    Taro.writeBLECharacteristicValue({
      deviceId: Bluetooth.connectedDeviceId,
      serviceId: Bluetooth.services[0].uuid,
      characteristicId: Bluetooth.notifyCharacteristicsId,
      value: dataBuffer
    })
  }

  /* 断开蓝牙连接 */
  static closeBLEConnection () {
    if (Bluetooth.connectedDeviceId) {
      Taro.closeBLEConnection({ deviceId: Bluetooth.connectedDeviceId }).then(() => {
        Bluetooth.closeBluetoothAdapter()
      })
      return
    }
    Bluetooth.closeBluetoothAdapter()
  }

  // 关闭蓝牙模块
  static closeBluetoothAdapter () {
    Taro.closeBluetoothAdapter()
  }

  /* 先蓝牙设备发送数据 */
  static sendDataToDevice (str: any) {
    const dataBuffer = new ArrayBuffer(str.length)
    const dataView = new DataView(dataBuffer)
    for (var i = 0; i < str.length; i++) {
        dataView.setUint8(i, str.charAt(i).charCodeAt())
    }
    const dataHex = Bluetooth.ab2Hex(dataBuffer)
    const writeDatas = Bluetooth.hexCharCodeToString(dataHex)
    Bluetooth.writeBLECharacteristicValue(writeDatas)
  }

  /* 将 ArrayBuffer 转为 string */
  static ab2String (buffer: any) {
    const arr = Array.prototype.map.call(new Uint8Array(buffer), x => x)
    return arr.map(char => String.fromCharCode(char)).join('')
  }

  /* 将 ArrayBuffer 转为 二进制  */
  static ab2Hex (buffer: any) {
    const hexArr = Array.prototype.map.call(new Uint8Array(buffer), bit => ('00' + bit.toString(16)).slice(-2))
    return hexArr.join('')
  }

  /* 将 二进制 转为 string */
  static hexCharCodeToString (hexCharCodeStr: any) {
    const trimedStr = hexCharCodeStr.trim()
    const rawStr = trimedStr.substr(0, 2).toLowerCase() === '0x' ? trimedStr.substr(2) : trimedStr
    const len = rawStr.length
    const resultStr: string[] = []
    for (let i = 0; i < len; i = i + 2) {
      let curCharCode: any
      curCharCode = parseInt(rawStr.substr(i, 2), 16)
      resultStr.push(String.fromCharCode(curCharCode))
    }
    return resultStr.join('')
  }
}
