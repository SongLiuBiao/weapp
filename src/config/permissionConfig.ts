/*
 * @Author: songliubiao
 * @Date: 2019-12-05 19:27:23
 * @LastEditTime: 2019-12-06 11:36:29
 * @LastEditors: Please set LastEditors
 * @Description: 小程序全局授权配置文件
 * @FilePath: \Verona\src\config\permissionConfig.ts
 */
import { Permission } from '@tarojs/taro'
const permission: Permission = {
    "scope.userLocation": {
        "desc": "描述"
      }
}

export default permission
