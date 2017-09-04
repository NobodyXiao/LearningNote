## Vue-cli脚手架工具##

1. vue-cli是快速构建项目的脚手架工具，安装vue-cli需要你在安装npm之后，使用`npm install vue-cli -g`进行安装。安装之后输入vue -V进行检测是否成功安装。

2. 初始化项目

   我们使用vue init 来初始化项目，具体看一下这条命令的使用方法

   `$ vue init <template-name> <project-name>`

   <project-name>：标识项目名称，这个你可以根据自己的项目来起名字。

   其中<template-name>：表示模板名称，vue-cli官方为我们提供了5种模板

   > webpack-一个全面的webpack+vue-loader的模板，功能包括热加载，linting,检测和CSS扩展。
   >
   > webpack-simple-一个简单webpack+vue-loader的模板，不包含其他功能，让你快速的搭建vue的开发环境。
   >
   > browserify-一个全面的Browserify+vueify 的模板，功能包括热加载，linting,单元检测。
   >
   > browserify-simple-一个简单Browserify+vueify的模板，不包含其他功能，让你快速的搭建vue的开发环境。
   >
   > simple-一个最简单的单页应用模板。

   ![WechatIMG26](/Users/xiao/Desktop/LearningNote/LearningNote/s_024Vue.js/s_09vue-cli/WechatIMG26.jpeg)

   命令行如果出现如上文字，表示我们已经初始化了第一步，那么可以按照命令行提示做以下三件事：

   1、cd vuecliTest  进入我们的vue项目目录。

   2、npm install  安装我们的项目依赖包，也就是安装package.json里的包，如果你网速不好，你也可以使用cnpm来安装。

   3、npm run dev 开发模式下运行我们的程序。给我们自动构建了开发用的服务器环境和在浏览器中打开，并实时监视我们的代码更改，即时呈现给我们。

3. Vue-cli项目目录讲解

   ```
   |-- build                            // 项目构建(webpack)相关代码
   |   |-- build.js                     // 生产环境构建代码
   |   |-- check-version.js             // 检查node、npm等版本
   |   |-- dev-client.js                // 热重载相关
   |   |-- dev-server.js                // 构建本地服务器
   |   |-- utils.js                     // 构建工具相关
   |   |-- webpack.base.conf.js         // webpack基础配置
   |   |-- webpack.dev.conf.js          // webpack开发环境配置
   |   |-- webpack.prod.conf.js         // webpack生产环境配置
   |-- config                           // 项目开发环境配置
   |   |-- dev.env.js                   // 开发环境变量
   |   |-- index.js                     // 项目一些配置变量
   |   |-- prod.env.js                  // 生产环境变量
   |   |-- test.env.js                  // 测试环境变量
   |-- src                              // 源码目录
   |   |-- components                     // vue公共组件
   |   |-- store                          // vuex的状态管理
   |   |-- App.vue                        // 页面入口文件
   |   |-- main.js                        // 程序入口文件，加载各种公共组件
   |-- static                           // 静态文件，比如一些图片，json数据等
   |   |-- data                           // 群聊分析得到的数据用于数据可视化
   |-- .babelrc                         // ES6语法编译配置
   |-- .editorconfig                    // 定义代码格式
   |-- .gitignore                       // git上传需要忽略的文件格式
   |-- README.md                        // 项目说明
   |-- favicon.ico 
   |-- index.html                       // 入口页面
   |-- package.json                     // 项目基本信息
   ```

   重要理解以下目录中的配置：

   **3.1 package.json**

   package.json文件是项目根目录下的一个文件，定义该项目开发所需要的各种模块以及一些项目配置信息（如项目名称、版本、描述、作者等）。

     >**scripts字段**:
     >
     >这个字段定义了你可以用npm运行的命令。在开发环境下，在命令行工具中运行npm run dev 就相当于执行 node build/dev-server.js  .也就是开启了一个node写的开发行建议服务器。由此可以看出script字段是用来指定npm相关命令的缩写。
     >
     >**dependencies字段和devDependencies字段**:
     >
     >在命令行中运行npm install命令，会自动安装dependencies和devDempendencies字段中的模块。
     >
     >- dependencies字段指项目运行时所依赖的模块；
     >- devDependencies字段指定了项目开发时所依赖的模块；

   **3.2 webpack配置相关**

   ```
   // 检查 Node 和 npm 版本
   require('./check-versions')()
    
   // 获取 config/index.js 的默认配置
   var config = require('../config')
    
   // 如果 Node 的环境无法判断当前是 dev / product 环境
   // 使用 config.dev.env.NODE_ENV 作为当前的环境
    
   if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
    
   // 使用 NodeJS 自带的文件路径工具
   var path = require('path')
    
   // 使用 express
   var express = require('express')
    
   // 使用 webpack
   var webpack = require('webpack')
    
   // 一个可以强制打开浏览器并跳转到指定 url 的插件
   var opn = require('opn')
    
   // 使用 proxyTable
   var proxyMiddleware = require('http-proxy-middleware')
    
   // 使用 dev 环境的 webpack 配置
   var webpackConfig = require('./webpack.dev.conf')
    
   // default port where dev server listens for incoming traffic
    
   // 如果没有指定运行端口，使用 config.dev.port 作为运行端口
   var port = process.env.PORT || config.dev.port
    
   // Define HTTP proxies to your custom API backend
   // https://github.com/chimurai/http-proxy-middleware
    
   // 使用 config.dev.proxyTable 的配置作为 proxyTable 的代理配置
   var proxyTable = config.dev.proxyTable
    
   // 使用 express 启动一个服务
   var app = express()
    
   // 启动 webpack 进行编译
   var compiler = webpack(webpackConfig)
    
   // 启动 webpack-dev-middleware，将 编译后的文件暂存到内存中
   var devMiddleware = require('webpack-dev-middleware')(compiler, {
     publicPath: webpackConfig.output.publicPath,
     stats: {
       colors: true,
       chunks: false
     }
   })
    
   // 启动 webpack-hot-middleware，也就是我们常说的 Hot-reload
   var hotMiddleware = require('webpack-hot-middleware')(compiler)
   // force page reload when html-webpack-plugin template changes
   compiler.plugin('compilation', function (compilation) {
     compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
       hotMiddleware.publish({ action: 'reload' })
       cb()
     })
   })
    
   // proxy api requests
   // 将 proxyTable 中的请求配置挂在到启动的 express 服务上
   Object.keys(proxyTable).forEach(function (context) {
     var options = proxyTable[context]
     if (typeof options === 'string') {
       options = { target: options }
     }
     app.use(proxyMiddleware(context, options))
   })
    
   // handle fallback for HTML5 history API
   // 使用 connect-history-api-fallback 匹配资源，如果不匹配就可以重定向到指定地址
   app.use(require('connect-history-api-fallback')())
    
   // serve webpack bundle output
   // 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
   app.use(devMiddleware)
    
   // enable hot-reload and state-preserving
   // compilation error display
   // 将 Hot-reload 挂在到 express 服务上
   app.use(hotMiddleware)
    
   // serve pure static assets
   // 拼接 static 文件夹的静态资源路径
   var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
   // 为静态资源提供响应服务
   app.use(staticPath, express.static('./static'))
    
   // 让我们这个 express 服务监听 port 的请求，并且将此服务作为 dev-server.js 的接口暴露
   module.exports = app.listen(port, function (err) {
     if (err) {
       console.log(err)
       return
     }
     var uri = 'http://localhost:' + port
     console.log('Listening at ' + uri + '\n')
    
     // when env is testing, don't need open it
     // 如果不是测试环境，自动打开浏览器并跳到我们的开发地址
     if (process.env.NODE_ENV !== 'testing') {
       opn(uri)
     }
   })
   ```

   **webpack.base.config.js :**webpack的基础配置文件

   ```
   module.export = {
       // 编译入口文件
       entry: {},
       // 编译输出路径
       output: {},
       // 一些解决方案配置
       resolve: {},
       resolveLoader: {},
       module: {
           // 各种不同类型文件加载器配置
           loaders: {
           ...
           ...
           // js文件用babel转码
           {
               test: /\.js$/,
               loader: 'babel',
               include: projectRoot,
               // 哪些文件不需要转码
               exclude: /node_modules/
           },
           ...
           ...
           }
       },
       // vue文件一些相关配置
       vue: {}
   }
   ```

   **3.3 .babelrc:**Babel解释器的配置文件，存放在根目录下。Babel是一个转码器，项目里需要用它将ES6代码转为ES5代码。

   ```
   {
     //设定转码规则
     "presets": [
       ["env", { "modules": false }],
       "stage-2"
     ],
     //转码用的插件
     "plugins": ["transform-runtime"],
     "comments": false,
     //对BABEL_ENV或者NODE_ENV指定的不同的环境变量，进行不同的编译操作
     "env": {
       "test": {
         "presets": ["env", "stage-2"],
         "plugins": [ "istanbul" ]
       }
     }
   }
   ```

   **3.4 .editorconfig:**

   该文件定义项目的编码规范，编译器的行为会与.editorconfig文件中定义的一致，并且其优先级比编译器自身的设置要高，这在多人合作开发项目时十分有用而且必要。

   ```
   root = true 
   [*]    // 对所有文件应用下面的规则
   charset = utf-8                    // 编码规则用utf-8
   indent_style = space               // 缩进用空格
   indent_size = 2                    // 缩进数量为2个空格
   end_of_line = lf                   // 换行符格式
   insert_final_newline = true        // 是否在文件的最后插入一个空行
   trim_trailing_whitespace = true    // 是否删除行尾的空格
   ```

4. **npm run build命令**

   ​	我们在命令行中输入npm run build命令后，vue-cli会自动进行项目发布打包。你在package.json文件的scripts字段中可以看出，你执行的npm run build命令就相对执行的 node build/build.js 。

   ​	在执行完npm run build命令后，在你的项目根目录生成了dist文件夹，这个文件夹里边就是我们要传到服务器上的文件。

   dist文件夹下目录包括：

   - index.html 主页文件:因为我们开发的是单页web应用，所以说一般只有一个html文件。
   - static 静态资源文件夹：里边js、CSS和一些图片。

5. **Main.js文件解读**

   ```
   import Vue from 'vue'      
   import App from './App'
   import router from './router'
    
   Vue.config.productionTip = false   //生产环境提示，这里设置成了false
    
   /* eslint-disable no-new */
   new Vue({
     el: '#app',
     router,
     template: '<App/>',
     components: { App }
   })
   ```

   通过代码可以看出这里引进了APP的组件和<App/>的模板，它是通过 import App from ‘./App’这句代码引入的（实则指向App.vue文件）。 

6. **APP.vue文件**

   ```
   <template>
     <div id="app">
       <img src="./assets/logo.png">
       <router-view></router-view>
     </div>
   </template>
    
   <script>
   export default {
     name: 'app'
   }
   </script>
    
   <style>
   #app {
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
     margin-top: 60px;
   }
   </style>
   ```

   app.vue文件我们可以分成三部分解读，

   - <template></template>标签包裹的内容：这是模板的HTMLDom结构，里边引入了一张图片和<router-view></router-view>标签，<router-view>标签说明使用了路由机制。
   - <script></script>标签包括的js内容：你可以在这里写一些页面的动态效果和Vue的逻辑代码。
   - <style></style>标签包裹的css内容：这里就是你平时写的CSS样式，对页面样子进行装饰用的，需要特别说明的是你可以用<style scoped></style>来声明这些css样式只在本模板中起作用。

7. **router/index.js路由文件**

   ```
   import Vue from 'vue'
   import Router from 'vue-router'
   import Hello from '@/components/Hello'
    
   Vue.use(Router)
    
   export default new Router({
     routes: [
       {
         path: '/',
         name: 'Hello',
         component: Hello
       }
     ]
   })
   ```

   我们可以看到 import Hello from ‘@/components/Hello’这句话， 文件引入了/components/Hello.vue文件。这个文件里就配置了一个路由，就是当我们访问网站时给我们显示Hello.vue的内容。



