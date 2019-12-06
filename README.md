#  全逸早餐小程序

## 一、简介
```
一个统一的模板
```

***

## 二、环境规范

#### 开发环境：
> Taro  小程序框架

#### 开发工具：
> Visual studio code 编程
> 微信开发者工具 查看

## 三、构建方法

#### 克隆项目
> git clone git@code.aliyun.com:QY_W/Verona.git -b 分支名称
#### 进入项目
> cd Verona
#### 安装依赖项
> npm install
#### 以开发者方式运行
> npm run dev 运行之后 使用微信开发者工具打开进行查看
#### 打安装包
> npm run build

## 四、项目结构
```
*
├--src                                      主文件
|  ├--assets                                  #资源文件
|  ├--components                              #公共组件
|  ├--pages                                   #主界面
|  ├--service                                 #服务api
|  ├--store                                   #mobx
|  ├--utils                                   #工具类文件夹
|  ├--app.tsx                                 #主入口
|  └--index.html                              #html 模板文件
├--.editorconfig                              #eslint 设置
├--.eslintignore                              #eslint 忽略文件设置
├--.eslintrc.js                               #eslint 代码检查配置
├--.gitignore                                 #git 不提交的界面
├--package-lock.json
├--package.json                               #webpack 配置文件
├--project.config.json                        #小程序的 配置文件
├--README.md                                  #文档规范
└--wepy.config                                #wepy 文件配置

```

## 五、命名规则

1. renderer 同级目录文件名小写
2. pages放置page文件的文件夹名称及界面名称都以驼峰式命名
3. 结尾单词以Page 为主界面，修改增加为（Detail、Edit、List、Info、Report）
4. 组件以 Base 开头, 以 Item 结尾, 以驼峰式的命名
5. js/ ts 文件或是tsx jsx 文件中 方法名称和变量名用小驼峰式命名（current、defaultConfig）
     私有的变量名：小驼峰式但需要用_开头（_current、_defaultConfig）
6. 代码格式: "=" 、"()"  前后需要空格,在"{" 之前也需要空格
7. 避免多余的空格和逗号等，方法或是语句结尾不能以";" (分号结尾)
8. 使用 "==="  "!==" 来对进行比较
9. 图片名称：命名应用小写英文、数字、_组合
10. 更多开发规范参考小程序开发注意事项 https://taro-docs.jd.com/taro/docs/spec-for-taro.html


## 六、注释规范

>JAVASCRIPT、CSS文件注释需要标明作者、文件版本、创建/修改时间、重大版本修改记录、
	函数描述、文件版本、创建或者修改时间、功能、作者等信息。
