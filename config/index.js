/*
 * @Author: songliubiao
 * @Date: 2019-12-05 19:27:23
 * @LastEditTime: 2019-12-06 14:39:38
 * @LastEditors: Please set LastEditors
 * @Description: webpack 公共配置文件
 * @FilePath: \Verona\config\index.js
 */
const path = require('path')
const resolvePath = dir => path.join(__dirname, '..', dir)
const mode = process.env.mode
let api, stage
if (mode === 'pre') {
    api = 'https://zct-api.sj56.com.cn/' // 预发环境
    stage = 'PRE'
} else if (mode === 'prod') api = '' // 生产环境
else {
    api = 'https://zct-api.sj56.com.cn/' // 开发/测试环境
        // stage = 'TEST'
}

const config = {
    projectName: 'bolzano',
    date: '2019-7-14',
    designWidth: 750,
    deviceRatio: {
        '640': 2.34 / 2,
        '750': 1,
        '828': 1.81 / 2
    },
    defineConstants: {
        API: api,
        STAGE: stage
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: {
        babel: {
            sourceMap: true,
            presets: [
                ['env', {
                    modules: false
                }]
            ],
            plugins: [
                'transform-decorators-legacy',
                'transform-class-properties',
                'transform-object-rest-spread'
            ]
        }
    },
    copy: {
        patterns: [],
        options: {}
    },
    weapp: {
        module: {
            postcss: {
                autoprefixer: {
                    enable: true,
                    config: {
                        browsers: [
                            'last 3 versions',
                            'Android >= 4.1',
                            'ios >= 8'
                        ]
                    }
                },
                pxtransform: {
                    enable: true,
                    config: {}
                },
                url: {
                    enable: true,
                    config: {
                        limit: 10240 // 设定转换尺寸上限
                    }
                },
                cssModules: {
                    enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                    config: {
                        namingPattern: 'module', // 转换模式，取值为 global/module
                        generateScopedName: '[name]__[local]___[hash:base64:5]'
                    }
                }
            }
        }
    },
    h5: {
        publicPath: '/',
        staticDirectory: 'static',
        esnextModules: ['taro-ui'],
        module: {
            postcss: {
                autoprefixer: {
                    enable: true,
                    config: {
                        browsers: [
                            'last 3 versions',
                            'Android >= 4.1',
                            'ios >= 8'
                        ]
                    }
                },
                cssModules: {
                    enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                    config: {
                        namingPattern: 'module', // 转换模式，取值为 global/module
                        generateScopedName: '[name]__[local]___[hash:base64:5]'
                    }
                }
            }
        }
    },
    alias: {
        '@': resolvePath('src'),
        '@assets': resolvePath('src/assets'),
        '@components': resolvePath('src/components'),
        '@config': resolvePath('src/config'),
        '@pages': resolvePath('src/pages'),
        '@service': resolvePath('src/service'),
        '@store': resolvePath('src/store'),
        '@utils': resolvePath('src/utils')
    }
}

module.exports = function(merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'))
    }
    return merge({}, config, require('./prod'))
}