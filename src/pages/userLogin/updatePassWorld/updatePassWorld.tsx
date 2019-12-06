/*
 * @description: 修改密码
 * @author: qiuyang
 * @github: git@code.aliyun.com:QUANYIZAOCANG/Bolzano.git
 * @lastEditors: qiuyang
 * @Date: 2019-08-19 16:02:26
 * @LastEditTime: 2019-09-16 16:51:56
 * @Copyright: Copyright ? 2019 Shanghai Shangjia Logistics Co., Ltd. All rights reserved.
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { Toast, Request } from '@/utils'
import { EnumUserLogin } from '@/service';
import { BaseProps } from 'typings/global'
import { AtInput, AtButton } from 'taro-ui'
import logo from '@assets/images/userLogin/updatePassWorld-logo.png'
import Code from '@assets/images/userLogin/login-code.png'
import mobile from '@assets/images/userLogin/login-mobile.png'
import clear from '@assets/images/userLogin/login-clear.png'
import passworld from '@assets/images/userLogin/login-passWorld.png'
import './updatePassWorld.styl'
import JSEncrypt from '@utils/jsencrypt'
interface BaseState {
  phone: string
  passWorld: string
  code: string
  isClcik: boolean
  time: number
  publicKey: any
}
export default class UpdatePassWorld extends Component<BaseProps, BaseState> {
  config: any = {
    navigationBarTitleText: '忘记密码',
    navigationBarBackgroundColor: '#16B2E9',
    navigationBarTextStyle: 'white'
  }
  constructor (props: BaseProps) {
    super(props)
    this.state = {
      phone: '',
      passWorld: '',
      code: '',
      isClcik: true,
      time: 60,
      publicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPS8eaxMEKLTNL+oYwliannp44+tKS65nR4ODYFsmGaQGkoe7LhznkLyl+NARtrxwU7Hp7jW49Gc0evCK+fLPmotdpGKGHnbQQXLAJKHKG1A8rRxKxByOJCAgQdZ4G0oh7vTEGUve8Dmp5Bearbno5fIFnrHymNKajy3AT0JXWuQIDAQAB'
    }
  }
  // 输入手机号
  handleChangePhone = (phone: any) => {
    this.setState({
      phone
    })

  }
  // 输入手机验证码
  handleChangeCode = (code: any) => {
    this.setState({
      code
    })
  }
  // 输入新密码
  handleChangePassWorld = (passWorld: any) => {
    let newPass = passWorld.replace(/[^a-zA-Z\d]/, '')
    this.setState({
      passWorld: newPass
    })
    return newPass
  }
  //  获取验证码
  handleGetCode = (e) => {
    if (this.state.phone == '' || !(/^1[3456789]\d{9}$/.test(this.state.phone))) {
      Toast.toast('请输入正确手机号')
    } else {
      let timer
      Request.post(EnumUserLogin.SendCode, { miniType: 'zc_sh', userPhone: this.state.phone }, '', true, 'stallone').then((res: any) => {
        if (res.success) {
          timer = setInterval(() => {
            this.setState((state) => ({
              time: state.time - 1,
              isClcik: false
            }), () => {
              if (this.state.time <= 0) {
                clearInterval(timer)
                this.setState({
                  isClcik: true,
                  time: 60
                })
              }
            })
          }, 1000)
        } else {
          Toast.toast(res.message[0])
        }
      })
    }
  }
  // 修改密码
  handleUpdatePassWorld = () => {
    const { passWorld } = this.state
    let str = /^[0-9A-Za-z]{6,16}$/
    if (this.state.phone == '' || !(/^1[3456789]\d{9}$/.test(this.state.phone))) {
      Toast.toast('请输入正确手机号')
      return
    }
    if (this.state.code == '' || this.state.code.length < 5) {
      Toast.toast('请输入正确验证码')
      return
    }
    if (this.state.passWorld.length < 6) {
      Toast.toast('密码至少为6位字符')
      return
    }
    // if (str.test(passWorld)) {
    //   Toast.toast('密码要求6-16位数字和字母')
    //   return
    // }
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(this.state.publicKey)
    const rsaPassWord = encrypt.encrypt(this.state.passWorld)
    const param = {
      authCode: this.state.code,
      newPass: rsaPassWord,
      userPhone: this.state.phone
    }
    Request.post(EnumUserLogin.updatePassWorld, param, '', true, 'stallone').then((res: any) => {
      if (res.success) {
        Toast.toast('新密码设置成功')
        setTimeout(() => {
          Taro.redirectTo({
            url: '/pages/userLogin/login/login'
          })
        }, 3000)
      } else {
        Toast.toast(res.message[0])
      }
    })
  }
  render () {
    const { passWorld, isClcik, time, phone, code } = this.state
    return (
      <View className='updatePassWorld'>
        <View className='updatePassWorld-head'>
          <View className='logo'><Image src={logo} /></View>
        </View>
        <View className='updatePassWorld-middle'>
          <View className='updatePassWorld-middle-item'>
            <View className='updatePassWorld-middle-item-left'>
              <Image className='mobile-icon' src={mobile} />
            </View>
            <View className='updatePassWorld-middle-item-input'>
              <AtInput
                name='value'
                border={true}
                placeholder='请输入手机号'
                type='phone'
                value={phone}
                onChange={this.handleChangePhone}
              />
            </View>
            {phone != '' &&
              <View className='updatePassWorld-middle-item-right' onClick={() => this.handleChangePhone('')}>
                <Image className='clear-icon' src={clear} />
              </View>
            }
          </View>
          <View className='updatePassWorld-middle-item'>
            <View className='updatePassWorld-middle-item-left'>
              <Image className='mobile-icon' src={Code} />
            </View>
            <View className='updatePassWorld-middle-item-input'>
              <AtInput
                name='value'
                border={true}
                placeholder='请输入验证码'
                type='number'
                maxLength='6'
                value={code}
                onChange={this.handleChangeCode}
              />
            </View>
            <View className='updatePassWorld-middle-item-right'>
              <AtButton disabled={!isClcik} circle className={isClcik ? 'btn' : 'activeBtn'} type='secondary' onClick={this.handleGetCode}>{isClcik ? '获取验证码' : `${time}s后重发`}</AtButton>
            </View>
          </View>
          <View className='updatePassWorld-middle-item'>
            <View className='updatePassWorld-middle-item-left'>
              <Image className='mobile-icon' src={passworld} />
            </View>
            <View className='updatePassWorld-middle-item-input'>
              <AtInput
                name='value'
                border={true}
                placeholder='请输入新密码'
                maxLength='16'
                type='password'
                value={passWorld}
                onChange={this.handleChangePassWorld}
              />
            </View>
            {/* <View className='updatePassWorld-middle-item-right'>
                          <Image className='clear-icon' src={clear}/>
                      </View> */}
          </View>
        </View>
        <View className='updatePassWorld-footer'>
          <AtButton className='updatePassWorld-footer-btn' type='primary' onClick={this.handleUpdatePassWorld}>完成</AtButton>

        </View>
      </View>
    )
  }
}