/*
 * @description: 授权页面
 * @author: qiuyang
 * @github: git@code.aliyun.com:QUANYIZAOCANG/Bolzano.git
 * @lastEditors: qiuyang
 * @Date: 2019-08-19 15:21:22
 * @LastEditTime: 2019-09-19 13:48:26
 * @Copyright: Copyright ? 2019 Shanghai Shangjia Logistics Co., Ltd. All rights reserved.
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image,Text } from '@tarojs/components'
import Toast from '@/utils/Toast'
import { BaseProps } from 'typings/global'
import { AtButton } from 'taro-ui'
import authorizationBg from '@assets/images/userLogin/authorization-bg.png'
import authorizationBtn from '@assets/images/userLogin/authorization-btn.png'
import './authorization.styl'
interface BaseState {

}
export default class Authorization extends Component<BaseProps, BaseState> {
  config:any = {
    navigationBarTitleText: '用户授权',
	navigationBarBackgroundColor: '#16B2E9',
	navigationBarTextStyle: 'white'
  }
componentDidMount () {
  Taro.getSetting().then((res: any)=>{
    if (res.authSetting['scope.userInfo']){
      Taro.navigateTo({
        url:'/pages/userLogin/login/login'
      })
    }
  })
}
handleGetUserInfo = (res)=>{
  console.log(res)
   if(res.detail.errMsg === 'getUserInfo:ok'){
    Taro.setStorageSync('userInfo', res.detail)
    Taro.navigateTo({
      url:'/pages/userLogin/login/login'
    })
   }
   else Toast.toast('进入小程序需要授权')
}
render(){
    return(
        <View className='authorization'>
            <Image className='authorization-bg' src={authorizationBg}/>
            <AtButton circle type='secondary' lang='zh_CN'  className='authorization-btn' openType="getUserInfo"  onGetUserInfo={this.handleGetUserInfo}>
                <Image src={authorizationBtn}/>
            </AtButton>
        </View>
    )
}
}