/*
 * @description: 类型定义文件
 * @author: huxianghe
 * @Date: 2019-07-14 14:31:00
 * @lastEditors: huxianghe
 * @LastEditTime: 2019-12-06 14:46:58
 * @@copyright: Copyright © 2019 Shanghai Yejia Digital Technology Co., Ltd. All rights reserved.
 */
import mobxGlobal  from '../src/store'

declare namespace JSX {
  interface IntrinsicElements {
      'import': React.DetailedHTMLProps<React.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>
  }
}

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt';
    [key: string]: any;
  }
}

declare interface KeyValue {
  [key: string]: any
}

declare interface BaseProps {
  mobxGlobal: MobxGlobal
}
