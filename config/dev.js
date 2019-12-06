/*
 * @Author: songliubiao
 * @Date: 2019-12-05 19:27:23
 * @LastEditTime: 2019-12-06 14:40:20
 * @LastEditors: Please set LastEditors
 * @Description: 开发/测试环境配置
 * @FilePath: \Verona\config\dev.js
 */
module.exports = {
    env: {
        NODE_ENV: '"development"',
        MODE: JSON.stringify(process.env.mode)
    },
    weapp: {},
    h5: {}
}