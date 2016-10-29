## Bootstrap总结##

1. **Bootstrap：简洁、直观、强悍的前端开发框架，让web开发更迅速、简单** 

   Bootstrap 是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目。所有开发者都能快速上手、所有设备都可以适配、所有项目都适用。

   Bootstrap 是完全开源的。它的代码托管、开发、维护都依赖 GitHub 平台。

2. **复习CSS3的媒体查询** 

   使用 @media 查询，你可以针对不同的媒体类型定义不同的样式。

   @media 可以针对不同的屏幕尺寸设置不同的样式，特别是如果你需要设置设计响应式的页面，@media 是非常有用的。

   当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

   当屏幕的宽度小于800px的时候媒体查询就会重新渲染页面，背景变成绿色，字体12px

   	<style>
   		html,body{
   			margin:0;
   			padding:0;
   		}
   		#wrap{
   			height:200px;
   			font-size:16px;
   			background:red;
   		}
   		@media (max-width:800px){
   			#wrap{
   					height:100px;
   					font-size:12px;
   					background:green;
   				}
   		}
   	</style>
   	</head>
   	<body>
   		<div id = "wrap">内容</div>
   	</body>
   	</html>

3. **Bootstrap包的内容主要有以下这些：**

   基本结构：Bootstrap提供了一个带有网格系统、链接样式、背景的基本结构。

   CSS：Bootstrap自带以下的特性:全局的CSS设置、定义基本的HTML元素样式、可扩展的class，以及一个先进的网格系统,就是一些CSS类名，之后引入文件的时候，可以被引用到HTML文档中，产生一定的效果

   组件：Bootstrap包含了十几个可重用的组件，用于创建图像、下拉菜单、导航、警告框、弹出框等等。

   JavaScript插件：Bootstrap包含了十几个自定义的jquery插件。可以直接包含多有的插件，也可以逐个包含这些插件

   定制：Bootstrap允许定制Bootstrap的组件、LESS变量和jquery插件来得到自己的版本。

4. **使用Bootstrap的基本HTML模板** 

   ```
   <!DOCTYPE html>
   <html>
      <head>
         <title>Bootstrap 模板</title>
         <meta charset = "utf-8">
         <meta http-equiv="X-UA-Compatible" content="IE=edge">
         <meta name="viewport" content="width=device-width, initial-scale=1.0" user-scalable = no>
         <!-- 上述的3个meta标签必须放在最前面，任何其他内容都必须跟随其后 -->

         <!-- 引入 Bootstrap -->
         <link href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">

         <!-- HTML5 Shim 和 Respond.js 用于让 IE8 支持 HTML5元素（识别）和媒体查询（让低版本的浏览器可以使用媒体查询） -->
         <!-- 注意： 如果通过 file://  引入 Respond.js 文件，则该文件无法起效果 -->
         <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
         <![endif]-->
      </head>
      <body>
         <h1>Hello, world!</h1>

         <!-- jQuery (Bootstrap 的 JavaScript 插件需要引入 jQuery) -->
         <script src="https://code.jquery.com/jquery.js"></script>
         <!-- 包括所有已编译的插件 -->
         <script src="js/bootstrap.min.js"></script>
      </body>
   </html>
   ```

   ​	**4-1**<meta charset = "utf-8">： 设置当前HTML文件的字符编码

   ​	**4-2**<meta http-equiv="X-UA-Compatible" content="IE=edge">: 设置浏览器的兼容模式版本（让IE使用	最新的渲染引擎工作)

   ​	**4-3**<meta name="viewport" content="width=device-width, initial-scale=1.0" user-scalable = no>:

   声明当前网页在移动端浏览器中展示的相关设置，包括宽度，初始化缩放，是否允许用户自行缩放。

   ​	**4-4**视口的知识点

   - 视口的作用：在移动浏览器中，当页面宽度超出设备，浏览器内部虚拟的一个页面容器，将页面容器缩放至设备这么大，然后展示，如果不想出现横向的滚动条，即可给里边的结构设置为width:100%

   - 目前大多数手机浏览器的视口宽度都是980

   - 视口的宽度可以通过meta标签设置，此属性为移动端页面视口设置，当前值表示在移动端页面为设备的宽度，并缩放级别是1

     **4-5** 条件注释：当满足一定条件的时候才会载入script标签，如果不满足条件，则当做注释，没什么作用

5. **字体图标** 

   <script src="//cdn.bootcss.com/html5shiv/3.7/html5shiv.min.js"></script>，html5shiv的引入cdn地址

   做字体图标的网站：icomoon.io

   首先由自己的图标，svg格式的，之后导入图标，生成字体，进入生成界面，填写字符编码，首选项中可以设置字体名称，以及class的前缀，之后可以下载下来进行引用

   学习链接：http://isux.tencent.com/icon-font.html

6. http://blog.koalite.com/bbg/生成按钮的网站

7. 优化完成之后的CSS代码

   ​

   ​

   ​



1. container的类，Normalize.css 为了增强浏览器表现的一致性，我们使用了Normalize.css，这是一个CSS重置的样式库。

2. 垂直居中和水平居中回去都自己试一下

3. target伪类写一个table选项卡    CSS3实现

4. rem，viewport，设备模拟器？？屏幕像素比?物理像素？设计图切图

5. 今天更新一下github上边的最外边的描述部分，base.css ,index.css,两个CSS文件

   ​

