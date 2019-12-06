/*
 * @Author: songliubiao
 * @Date: 2019-12-05 19:27:23
 * @LastEditTime: 2019-12-06 14:40:46
 * @LastEditors: Please set LastEditors
 * @Description: 生产环境配置
 * @FilePath: \Verona\config\prod.js
 */
module.exports = {
    env: {
        NODE_ENV: '"production"',
        MODE: JSON.stringify(process.env.mode)
    },
    weapp: {},
    h5: {
        /**
         * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
         * 参考代码如下：
         * webpackChain (chain) {
         *   chain.plugin('analyzer')
         *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
         * }
         */
    }
}