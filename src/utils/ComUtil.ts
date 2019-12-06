/*
 * @Author: songliubiao
 * @Date: 2019-12-05 19:27:23
 * @LastEditTime: 2019-12-06 11:45:06
 * @LastEditors: Please set LastEditors
 * @Description: 通用类型工具
 * @FilePath: \Verona\src\utils\ComUtil.ts
 */
export class ComUtil {
  /**
   * 判断目标元素是否存在指定数组中
   * @param ele 目标元素
   * @param array 目标数组
   */
  static inArray (ele: string | number, array: (string|number)[]) {
    const i = array.indexOf(ele)
    return {
      include: i !== -1,
      index: i
    }
  }
}

/* 格式化 input 表单框数据 */
export class FormatInputValue {
  static intLen: number = 8
  static decimalsLen: number = 2

  /* 只允许输入整数 */
  static parsetInt (v: string, intLen = FormatInputValue.intLen) {
    return v.substr(0, intLen).replace(/[^\d]/g, '')
  }

  /* 只允许输入整数且支持可以保留负号 */
  static parsetIntAndKeepMinus (v: string, intLen = FormatInputValue.intLen) {
    v = v
      .replace(/[^\d-]/g, '')
      .replace(/-{1,}/g, '-')
      .replace(/^-/, '$#$')
      .replace(/-/g, '')
      .replace('$#$', '-')
    if (v.indexOf('-') > -1) intLen += 1
    return v.substr(0, intLen)
  }

  /**
   * 保留小数点，默认保留两位
   * @param v 待处理字符串
   * @param decimalsLen 小数点位数
   * @param intLen 整数位数
   */
  static toFixed (v: string, decimalsLen = FormatInputValue.decimalsLen, intLen = FormatInputValue.intLen) {
    v = v
      .substr(0, intLen + decimalsLen + 1)
      .replace(/[^\d.]/g, '')
      .replace(/^\./, '')
      .replace(/\.{2,}/g, '.')
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.')
      .replace(new RegExp(`^(\\d+)\\.(\\d{0,${decimalsLen}}).*$`), '$1.$2')
      .replace(/^\d+/, (match: string) => {
        return (parseFloat(match) + '').substr(0, intLen)
      })
    return v
  }

  /* 保留小数点和负号，小数点默认保留两位 */
  static toFixedAndKeepMinus (v: string, decimalsLen = FormatInputValue.decimalsLen, intLen = FormatInputValue.intLen) {
    v = v
      .replace(/[^\d.-]/g, '')
      .replace(/^\./, '')
      .replace(/\.{2,}/g, '.')
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.')
      .replace(/-{1,}/g, '-')
      .replace(/^-/, '$#$')
      .replace(/-/g, '')
      .replace('$#$', '-')
      .replace(new RegExp(`^(\\d+)\\.(\\d{0,${decimalsLen}}).*$`), '$1.$2')
    if (v.indexOf('-') > -1) intLen += 1
    v = v
      .replace(/^-?\d+/, (match: string) => {
        return (parseFloat(match) + '').substr(0, intLen)
      })
    return v.substr(0, intLen + decimalsLen + 1)
  }

  /**
   * 转换限制
   * @param reg 表达式
   * @param val 转换值
   * @param len 长度
   */
  static conversionOf (reg:any, val:string, len?:number):string {
    val = val.replace(reg, '')
    if (len) {
      val = val.length > len ? val.substr(0, len) : val
    }
    return val
  }

  /* 去除空格 */
  static removeEmpty = (val: string) => val.replace(/(^\s*)|(\s*$)/g, '')
}
