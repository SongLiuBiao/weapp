/*
 * @description: 店铺管理页面
 * @author: yanzihao
 * @github: git@code.aliyun.com:WOHAOYUN/thematrix.git
 * @lastEditors: yanzihao
 * @Date: 2019-07-30 22:55:44
 * @LastEditTime: 2019-12-06 14:26:09
 * @Copyright: Copyright  ?  2019  Shanghai  Shangjia  Logistics  Co.,  Ltd.  All  rights  reserved.
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Image, Picker } from '@tarojs/components'
import { AtDivider, AtToast, AtInput,AtButton } from 'taro-ui'
import { inject,observer } from '@tarojs/mobx'
import { BaseProps } from 'typings/global'
import './index.styl'
import { Request, Toast } from '@utils/index'

interface shopList{

}
@inject('mobxGlobal')
@observer
export default class Shop extends Component<BaseProps,shopList> {
  config = {
    navigationBarTitleText: '店铺'
  }
  constructor(props:BaseProps){
    super(props)
    this.state = {
   
    }
  }


  

  render() {
    const { mobxGlobal: { userInfo }} = this.props
    return (
      <View className='shop'>
        我的
      </View>
     )
  }
}
