/*
 * @Author: songliubiao
 * @Date: 2019-12-05 19:27:23
 * @LastEditTime: 2019-12-06 11:47:47
 * @LastEditors: Please set LastEditors
 * @Description: 上传文件到 OSS
 * @FilePath: \Verona\src\utils\OSSUtil.ts
 */
import Taro from '@tarojs/taro'
import Api from '@service/SubService/shop'
import { Request } from '@utils/index'
import { resolve } from 'path'


export default class OSSUtil {
  /**
   * 上传图片或者文件
   * @param filePath 文件路径
   */
  static async  upload (filePath: string) {
    const { data }  = await Request.get(Api.publicGetSt, { moudle:'shop' })
      const { accessId, dir, host, policy, signature }:any = data
      const fileName = OSSUtil.createFileName(filePath)
      const parms:any  = {
        filePath,
        url: host,
        name:'file',
        formData:{
          name: fileName,
          key: dir + fileName,
          success_action_status: "200",
          OSSAccessKeyId: accessId,
          policy: policy,
          signature: signature 
        }
      }
      return new Promise ((resolve: any, reject: any)=>{
        Taro.uploadFile(parms).then((res: any) => {
          const  { statusCode } = res
         if (statusCode === 200) resolve({ url: dir + fileName }) 
          else reject({}) 
    
        }) 
      })
  }

  /* 获取 STS */
  static async getSTS () {
     const { data } = await Request.get(Api.publicGetSt, { moudle:'shop' })
     return data
  }

  /* 统一生成文件名 */
  static createFileName (filePath: string) {
    const suffer = filePath.substring(filePath.lastIndexOf('.'))
    const timestamp = new Date().getTime()
    return `zc__${timestamp}${suffer}`
  }
}
