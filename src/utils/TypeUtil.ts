/*
 * @Author: songliubiao
 * @Date: 2019-12-05 19:27:23
 * @LastEditTime: 2019-12-06 13:52:45
 * @LastEditors: Please set LastEditors
 * @Description: 类型判断工具
 * @FilePath: \Verona\src\utils\TypeUtil.ts
 */
export default class JudgeUtil {
  /* 获取原始类型 */
  static toRawType (v: any) {
    return Object.prototype.toString.call(v).slice(8, -1).toLowerCase()
  }

  /* 判断是否是数字 */
  static isNumber (n: any) {
    return typeof n === 'number' && isFinite(n)
  }

  /* 判读是否是数组 */
  static isArray (v: any) {
    return JudgeUtil.toRawType(v) === 'array'
  }

  /* 判断是否为纯对象 */
  static isPlainObj (obj: any) {
    return JudgeUtil.toRawType(obj) === 'object'
  }

  /* 判断是否为空 */
  static isEmpty (v: any) {
    return (typeof v === 'undefined' || v === null || v === '')
  }
}
