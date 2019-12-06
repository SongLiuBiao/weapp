/*
 * @description:  工作台
 * @author: songliubiao
 * @github: git@code.aliyun.com:QUANYIZAOCANG/Bolzano.git
 * @lastEditors: zhousong
 * @Date: 2019-08-01 10:33:53
 * @LastEditTime: 2019-12-06 14:29:06
 * @Copyright: Copyright ? 2019 Shanghai Shangjia Logistics Co., Ltd. All rights reserved.
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image,Text } from '@tarojs/components'
import { inject,observer } from '@tarojs/mobx'
import { AtButton, AtModal} from 'taro-ui'
import { BaseProps } from 'typings/global'
// import { EnumWorkbench } from '@service/index'
import { Request } from '@/utils/index'
import './index.styl'
interface BaseState {

}
@inject('mobxGlobal')
@observer
export default class WorkBench extends Component<BaseProps, BaseState> {
  config:any = {
    navigationBarTitleText: '工作台',
	navigationBarBackgroundColor: '#16B2E9',
	navigationBarTextStyle: 'white'
  }
  constructor(props:BaseProps){
        super(props)
        this.state={
         
        }
  }
 
  render () {
    return (
      <View className='workbench'>
          首页
      </View>
    )
  }
}
