/*
 * @Author: songliubiao
 * @Date: 2019-12-05 19:27:23
 * @LastEditTime: 2019-12-06 14:48:02
 * @LastEditors: Please set LastEditors
 * @Description: 小程序启动页
 * @FilePath: \Verona\src\app.tsx
 */
import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/home/index'
import { configure } from 'mobx'
import { Provider } from '@tarojs/mobx'
import store from './store'

import '@assets/style/taro_ui.scss'
import './app.styl'

configure({ enforceActions: 'observed' })

class App extends Component {
  config: Config = {
    window: {
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black'
    },
    pages: [
      'pages/home/index',
      'pages/warning/index',
      'pages/monitor/index',
      'pages/my/index',
    ], 
    tabBar: {
      color: '#999999',
      selectedColor: '#333333',
      list: [
        {
          iconPath: '',
          selectedIconPath: '',
          pagePath: 'pages/home/index',
          text: '首页'
        },
        {
          iconPath: '',
          selectedIconPath: '',
          pagePath: 'pages/warning/index',
          text: '告警 '
        },
        {
          iconPath: '',
          selectedIconPath: '',
          pagePath: 'pages/monitor/index',
          text: '监控'
        },
        {
          iconPath: '',
          selectedIconPath: '',
          pagePath: 'pages/my/index',
          text: '我的'
        }
      ]
    },
    permission: {
      "scope.userLocation": {
        "desc": "推荐"
      }
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
