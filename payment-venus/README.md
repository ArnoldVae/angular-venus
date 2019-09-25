# sinosoft frontend framework based on Angular

* 中科软前端开发框架(基于Angular 1.2.6)

## 目录结构说明
* /index.html   应用程序主页
* /main.js  requireJS入口文件,用于配置第三方依赖库
* /app.js   Angular应用入口模块
* /route.js 应用框架级路由定义
* /config.js    配置文件
* /frame    公共基础模块,非业务模块
* /components   业务模块目录
* /components/business.mod.js   业务模块入口文件,应用对所有业务模块的定义统一定义在这里
* /components/...               各个业务模块以独立文件夹形式存在,每个模块必须有统一的入口模块文件
* /lib      存放第三方库
* /css      存放所有样式文件
* /images   存放所有的图片文件
* /mock     用于存放测试用数据

## Features
* IE>=8 support
* etc
-------------
Created by Jason
