## Webpack总结##

1. #### webpack介绍####

   webpack是一个现代的JavaScript应用**模块打包器**（module bundler），它能把各种资源，例如JS（含JSX）、coffee、样式（less/sass）、图片等都作为模块来处理和使用。它有着难以置信的配置和神奇的效果，大大提高了我们程序员的工作效率。举个例子：我们可以直接使用require（xxx）的形式来引入各模块，即使他们可能需要经过编译（比如JSX和sass），但我们无须再上面花费太多心思，webpack有着各种健全的加载器（loader）在默默处理这些事情。它可以部分代替Grunt和gulp的功能。

2. #### webpack的安装####

     >2.1全局安装
     >
     >$npm install webpack -g
     >
     >2.2安装到项目的依赖里边，也就是写到package.json
     >
     >```
     >npm init
     >npm install webpack --save-dev
     >```

3. #### 配置文件webpack.config.js####

   按照常规来说，每个项目下都应该配置有webpack.config.js文件，它的作用就如果gulp的gulpfile.js 和Grunt的Gruntfile.js一样，就是一个配置项，告诉webpack它需要作的所有事情和如何去做。所以说webpack.config.js的编写也是我们学习重点。

   **重点:什么是入口文件？**模块打包的起点称之为入口起点（entry point）。入口起点告诉webpack从哪里开始，并遵循着依赖关系进行打包。可以将您的应用入口起点认为是根上下文（contextual root）或app第一个启动文件。

4. #### live-server####

   live-server是一款简单的开发用的Http服务器。特点就是在你静态文件进行修改后，有自动加载的功能。

   使用它主要有两个原因：

     >1、对Ajax的操作必须要有服务器的支持，比如用javascript去获取内容。
     >
     >2、浏览器的自动更新，可以加快开发。你不需要安装任何浏览器插件或手动添加代码片段到您的网页代码里。

5. #### webpack配置多入口文件####

   当我们需要时webpack 是允许我们有多个输出文件的。也就是说，我们可以在html文件中引入2个js文件或者其他的文件。

   只要在webpack.config.js配置文件中这样写即可

   ```
   module.exports = {
       entry: {
           bundle1: './main1.js',
           bundle2: './main2.js'
       },
       output: {
           filename: '[name].js'
       }
   };
   ```

6. #### 使用webpack CSS loader加载器####

   > 6.1webpack本身只能处理js模块，吐过要处理其它的文件，就需要使用loader进行转换。
   >
   > Loader可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过require来加载人和类型的模块或文件。
   >
   > loader可以在require()引用模块的时候添加，也可以在webpack全局配置中进行绑定，还可以通过命令行的方式使用。
   >
   > 6.2需要在js文件中进行引入css文件
   >
   > ```
   > require('./app.css');
   > ```
   >
   > 之后在安装loader，css的加载器有两种 style-loader ，css-loader
   >
   > ```
   > npm install style-loader --save -dev
   > npm install css-loader --save -dev
   > ```
   >
   > 最后在webpack的配置文件中webpack.config.js，声明一下加载器类型
   >
   > ```
   > module:{
   >         loaders:[
   >             {test:/\.css$/,loader:'style-loader!css-loader'},
   >         ]
   > }
   > ```

7. #### 使用webpack Image loader 加载图片####

   其实跟css加载器是类似的，就是将图片资源整合成js形式，这里需要说明的一点就是 在图片加载器中` { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },`limit的作用就是，如果图片的大小是小雨8192b的，那么图片会议data url的形式引入，如果是大于，那么图片要使用图片地址的形式。

   注意：安装图片加载器的时候，同样需要安装文件加载器 file-loader

8. #### 使用uglify-js 压缩打包JS代码####

   ugligy-js是一个用npm安装的JavaScript代码压工具，我们在grunt和gulp中经常使用。

   安装：用npm命令进行安装`npm install uglify-js g`

   最常用的方法：`uglifyjs [input files] [options]`，其中括号中亮相分别是要压缩的文件和输出的文件

9. #### 使用webpack构建本地服务器####

   我们之前一直都在用live-server充当本地服务器，其实它和webpack是不搭的，我们可以利用webpack自带的webpack-dev-server来构建一个本地服务器。它让你的浏览器检测你的代码修改，并自动刷新修改后的结果，它是基于node.js构建。webpack-dev-server是一个单独的组件，在webpack中进行配置之前需要单独安装它作为项目依赖。

   构建步骤：

     >1.安装webpack-dev-server
     >
     >本地依赖安装
     >
     >`npm install --save-dev webpack-dev-server`
     >
     >全局安装
     >
     >`npm install -g webpack-dev-server`
     >
     >2.在webpack.config.js中配置devderver选项：
     >
     >- **contentBase :** 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录。
     >
     >- **port ：**设置默认监听端口，如果省略，默认为”8080″
     >
     >- **inline :** 设置为true，当源文件改变时会自动刷新页面
     >
     >- **colors ：** 设置为true，使终端输出的文件为彩色的
     >
     >- **historyApiFallback ：**在开发单页时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
     >
     >- **host ：** 主机地址，如果是开发本机搭建，需要使用本机IP地址，否则会报错。
     >
     >  配置文件如下：
     >
     >  ```
     >  module.exports = {
     >      entry: __dirname + '/main.js',
     >      output: {
     >          path: __dirname + '/',
     >          filename: 'bundle.js'
     >      },
     >      devServer: {
     >          contentBase: './', //本地服务器所加载的页面所在的目录
     >          host: '192.168.1.158', //本地IP地址
     >          colors: true, //终端输出结果为彩色
     >          historyApiFallback: true, //不跳转
     >          inline: true, //实时刷新
     >          port: '3333' //端口号
     >   
     >      }
     >  }
     >  ```
     >
     >3.在终端中输入命令，开启运行本地服务器。它不仅提供了服务器，还会监视我们文件自动变化，以致更新效果，但是它不是真正的打包，它类似于在内存中进行了打包，所以本地文件并没有变化
     >
     >4.使用`webpack dev server`运行服务器

10. #### 插件(Plugins)####

  插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。
  Loaders和Plugins常常被弄混，但是他们其实是完全不同的东西，可以这么来说，loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程起作用。

  Webpack有很多内置插件，同时也有很多第三方插件，可以让我们完成更加丰富的功能。

    >10.1使用插件的方法：
    >
    >要使用某个插件，首先我们需要通过npm安装它，然后要做的就是在webpack配置中的plugins关键字部分添加该插件的一个实例，具体如下：
    >
    >**UglifyJs**:用来解析／压缩／美化所有的js chunk
    >
    >  >``new webpack.optimize.UglifyJsPlugin([options])``
    >
    >**ExtractTextPlugin:**该插件用来提取entry chunk中所有的require('*.css')，分离出独立的css文件。
    >
    >  >```
    >  >new ExtractTextPlugin([id: string], filename: string, [options])
    >  >//id 插件实例的唯一标识，自动生成
    >  >//filename 输出的filename，可以通过 //[name]/[id]/[contenthash] 自定义filename
    >  >//options.allChunks 提取所有的chunk（默认只提取initial chunk）
    >  >//options.disable disable该插件
    >  >
    >  >以下的该方法将已经存在的loader转换成一个提取loader
    >  >ExtractTextPlugin.extract([notExtractLoader], loader, [options])
    >  >//notExtractLoader 不提取css时需要使用的loader
    >  >//loader 用来将资源文件转换为css输出模块的loader
    >  >//options.publicPath 覆盖loader的 publicPath 设置
    >  >```
    >
    >**DedupePlugin:**``new webpack.optimize.DedupePlugin()``
    >
    >有些JS库有自己的依赖树，并且这些库可能有交叉的依赖，DedupePlugin可以找出他们并删除重复的依赖。
    >
    >**NoErrorPlugin:** ``new webpack.NoErrorsPlugin()``
    >
    >跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
    >
    >**ProvidePlugin:** ``new webpack.ProvidePlugin(definitions)``
    >
    >`definitions` 定义标识符，当遇到指定标识符的时候，自动加载模块。
    >
    >**CommonsChunkPlugin:** ``new webpack.optimize.CommonsChunkPlugin(options)``
    >
    >提取代码中的公共模块，然后将公共模块打包到一个独立的文件中，以便在其他的入口和模块中使用。别忘了在html中单独引入抽离出来的公共模块。
    >
    >  >1.抽离多个entry的公共模块
    >  >
    >  >```
    >  >new CommonsChunkPlugin({
    >  > name: "commons",
    >  > // (the commons chunk name)
    >  >
    >  > filename: "commons.js",
    >  > // (the filename of the commons chunk)
    >  >
    >  > // minChunks: 3,
    >  > // (Modules must be shared between 3 entries)
    >  >
    >  > // chunks: ["pageA", "pageB"],
    >  > // (Only use these entries)
    >  >})
    >  >```
    >  >
    >  >2.抽离vendor模块
    >  >
    >  >```
    >  >entry: {
    >  >vendor: ["jquery", "other-lib"],
    >  >app: "./entry"
    >  >}
    >  >new CommonsChunkPlugin({
    >  >name: "vendor",
    >  >
    >  >// filename: "vendor.js"
    >  >// (Give the chunk a different name)
    >  >
    >  >minChunks: Infinity,
    >  >// (with more entries, this ensures that no other module
    >  >//  goes into the vendor chunk)
    >  >})
    >  >```
    >  >
    >  >3.抽离子模块中的公共模块到父模块中，会增加首屏加载的时间
    >  >
    >  >```
    >  >new CommonsChunkPlugin({
    >  > // names: ["app", "subPageA"]
    >  > // (choose the chunks, or omit for all chunks)
    >  >
    >  > children: true,
    >  > // (select all children of chosen chunks)
    >  >
    >  > // minChunks: 3,
    >  > // (3 children must share the module before it's moved)
    >  >})
    >  >```
    >  >
    >  >4.和3类似，不过不是抽离到父模块，而且额外抽离出一个异步的公共模块
    >  >
    >  >```
    >  > // names: ["app", "subPageA"]
    >  > // (choose the chunks, or omit for all chunks)
    >  >
    >  > children: true,
    >  > // (use all children of the chunk)
    >  >
    >  > async: true,
    >  > // (create an async commons chunk)
    >  >
    >  > // minChunks: 3,
    >  > // (3 children must share the module before it's separated)
    >  >})
    >  >```

  ​

  ​	

  ​




