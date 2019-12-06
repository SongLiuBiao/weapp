/*
 * @Author: songliubiao
 * @Date: 2019-12-05 19:27:23
 * @LastEditTime: 2019-12-06 11:37:28
 * @LastEditors: Please set LastEditors
 * @Description: 小程序底部 tabBar 配置文件
 * @FilePath: \Verona\src\config\tabbarConfig.ts
 */
import { TabBar } from '@tarojs/taro'

const tabBar: TabBar = {
  color: '#999999',
  selectedColor: '#43B9BF',
  list: [
    {
      pagePath: 'pages/1',
      text: '1'
    },
    {
      pagePath: 'pages/2',
      text: '2'
    },
    {
      pagePath: 'pages/3',
      text: '3'
    },
    {
      pagePath: 'pages/4',
      text: '4'
    }
  ]
}

export default tabBar
