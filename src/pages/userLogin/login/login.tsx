/*
 * @description: 登录页面
 * @author: qiuyang
 * @github: git@code.aliyun.com:QUANYIZAOCANG/Bolzano.git
 * @lastEditors: qiuyang
 * @Date: 2019-08-19 15:59:52
 * @LastEditTime: 2019-12-06 14:23:48
 * @Copyright: Copyright ? 2019 Shanghai Shangjia Logistics Co., Ltd. All rights reserved.
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { inject,observer } from '@tarojs/mobx'
import { Request ,Toast} from '@/utils';
import { BaseProps } from 'typings/global'
import { AtInput ,AtButton} from 'taro-ui'
import logo from '@assets/images/userLogin/login-logo.png'
import clear from '@assets/images/userLogin/login-clear.png'
import show from '@assets/images/userLogin/login-show.png'
import hide from '@assets/images/userLogin/login-hide.png'
import passworld from '@assets/images/userLogin/login-passWorld.png'
import mobile from '@assets/images/userLogin/login-mobile.png'
import  JSEncrypt  from '@utils/jsencrypt'

import './login.styl'
interface BaseState {
  phone:string
  passWorld:string
  isPassWorld: boolean
  publicKey:any
}
@inject('mobxGlobal')
@observer
export default class Login extends Component<BaseProps, BaseState> {
  config:any = {
    navigationBarTitleText: '登录',
	navigationBarBackgroundColor: '#16B2E9',
	navigationBarTextStyle: 'white'
  }
  constructor(props:BaseProps){
    super(props)
    this.state={
      phone:'',
      passWorld:'',
      // phone:'18621904819',
      // passWorld:'123456',
      isPassWorld: false,
      publicKey:'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPS8eaxMEKLTNL+oYwliannp44+tKS65nR4ODYFsmGaQGkoe7LhznkLyl+NARtrxwU7Hp7jW49Gc0evCK+fLPmotdpGKGHnbQQXLAJKHKG1A8rRxKxByOJCAgQdZ4G0oh7vTEGUve8Dmp5Bearbno5fIFnrHymNKajy3AT0JXWuQIDAQAB'
    }
  }
  componentDidMount = () => {
    
  }
  // 输入手机号
  handleChangePhone = (phone:any) => {
    this.setState({ phone })
  }
 
  // 输入密码
  handleChangePassWorld = (passWorld:any) => {
    let newPass = passWorld.replace(/[^a-zA-Z\d]/,'')
    this.setState({ passWorld: newPass })
    return newPass
  }
  // 是否显示密码
  handleIsPassWorld = () => {
    this.setState((state:any) => ({
      isPassWorld: !state.isPassWorld
    }))
  }
  // 登录
  handleLogin = (result:any) => {

    Taro.login().then((data:any)=>{
      if(data.errMsg === 'login:ok'){
          if (this.state.phone === '' || this.state.phone.length < 11){
            Toast.toast('请输入正确的账号')
            return
          }
          if (this.state.passWorld === ''){
            Toast.toast('请输入正确的密码')
            return
          }
          if (this.state.passWorld.length < 6) {
            Toast.toast('密码至少为6位字符')
            return
          }
          const encrypt = new JSEncrypt()
          encrypt.setPublicKey(this.state.publicKey)
          const rsaPassWord = encrypt.encrypt(this.state.passWorld)
          let userInfo =  result.detail
          const prams ={
            avatarUrl: userInfo.userInfo.avatarUrl,
            city: userInfo.userInfo.city,
            code: data.code,
            country: userInfo.userInfo.country,
            county:'',
            gender: userInfo.userInfo.gender === 0 && '未知' || userInfo.userInfo.gender === 1 && '男' || userInfo.userInfo.gender === 2 && '女',
            language: userInfo.userInfo.language,
            miniType:'zc_sh',
            nickName: userInfo.userInfo.nickName,
            province: userInfo.userInfo.province,
            userPhone:this.state.phone,
            userPassword:rsaPassWord,   
            encryptedData:userInfo.encryptedData,
            iv:userInfo.iv
          }
          Request.post(EnumUserLogin.authPublicUserInfoZcb,prams,'',true,'stallone').then((res:any)=>{
            if(res.success){
              userInfo.userPhone = res.data.userPhone
              const { mobxGlobal: { setUserInfo } } =this.props
              setUserInfo(userInfo)
              Taro.setStorageSync('userInfo', userInfo)
              Taro.switchTab({ url: '/pages/workbench/index'})
            }else{
              Toast.toast(res.message[0])
            }
          })
    
       
      }
    })
  }
  //  修改密码
  handleUpdatePassWorld = () => {
    Taro.navigateTo({
      url:'/pages/userLogin/updatePassWorld/updatePassWorld'
    })
  }
  // 隐私协议
  handlePrivacy = () => {
    Taro.navigateTo({
      url:'/pages/userLogin/privacy/privacy'
    })
  }
render(){
  const { phone, passWorld, isPassWorld } = this.state
     return(
        <View className='login'>
            <View className='login-head'>
                <Image src={logo}/>
            </View>
           <View className='login-middle'>
                <View className='login-middle-item'>
                    <View className='login-middle-item-left'>
                        <Image className='mobile-icon' src={mobile}/>
                    </View>
                    <View className='login-middle-item-input'>
                      <AtInput
                        name='value'
                        border={true}
                        placeholder='请输入账号'
                        type='phone'
                        value={phone}
                        onChange={this.handleChangePhone}
                      />
                    </View>
                        { phone != '' && 
                          <View className='login-middle-item-right' onClick={()=>this.handleChangePhone('')}>
                              <Image  className='clear-icon'  src={clear} />
                          </View>
                        }
                </View>
                <View className='login-middle-item'>
                    <View className='login-middle-item-left'>
                        <Image className='mobile-icon' src={passworld}/>
                    </View>
                    <View className='login-middle-item-input'>
                      { isPassWorld && 
                        <AtInput
                        name='value'
                        border={true}
                        placeholder='请输入密码'
                        type='text'
                        value={passWorld}
                        onChange={this.handleChangePassWorld}
                        maxLength='16'
                        />
                      }
                      { !isPassWorld && 
                        <AtInput
                        name='value'
                        border={true}
                        placeholder='请输入密码'
                        type='password'
                        value={passWorld}
                        onChange={this.handleChangePassWorld}
                        />
                      }
                    </View>
                    <View className='login-middle-item-right'>
                        <Image className='clear-icon' src={isPassWorld?show:hide} onClick={this.handleIsPassWorld}/>
                    </View>
                </View>
           </View>
           <View className='login-hint'>温馨提示：登录前请阅读<Text onClick={this.handlePrivacy}>《隐私政策》</Text></View>
           <View className='login-footer'>
                <AtButton className='login-footer-btn' type='primary' lang='zh_CN'  openType="getUserInfo"  onGetUserInfo={this.handleLogin}>登录</AtButton>
                <View className='login-footer-updatePassWorld' onClick={this.handleUpdatePassWorld}>忘记密码</View>
           </View>
        </View>
    )
}
}