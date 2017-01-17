## Less总结##

#### Less是一门CSS预处理语言，它扩展了CSS语言，增加了变量、Mixin、函数等特性，使CSS更易维护和扩展,Less可以运行在Node或浏览器端####

**1.如何编译编写好的less文件：** 

​	**1.1.使用node.js编译（服务器端的方法）** 

​		a.确保电脑上已经安装node.js和包管理工具npm

​		b.通过npm安装LESS包，命令如下所示：npm install -g less命令

​		c.**进入到你的less文件目录** ，编译less文件，**输入lessc test.less > test.css命令** 

​		例如我的less文件存放目录在 E:\Code\VS2013\BootstrapDemo\LessDemo\Less\test.less

​		那么编译命令行代码就是 E:\Code\VS2013\BootstrapDemo\LessDemo\Less >lessc test.less > test.css

​	**1.2浏览器编译（客户端的方法）** 

​		**LESS可以在浏览器端不用编译直接使用** 。在浏览器端使用LESS的时候，需要引入一个JS文件，这个JS文件能够把LESS文件在浏览器端编译成CSS文件，然后在呈现到页面上。

​		1.2.1首先在你的页面上引入编写好的less文件，使用link引入，其中style属性指定为stylesheet/less

​		1.2.2从官网下载less.js文件，引入到页面中，地址：https://github.com/less/less.js/archive/v1.7.3.zip

​		或者引入 CDN**<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/1.7.3/less.min.js"></script>	** 

​		注意：本地静态网页不能直接使用这种方法，

​	**1.3第三方使用工具（Koala）**

​		Koala 是一款桌面程序，支持 less 、 sass 、 coffeescript 即时编译，帮助 web 开发者更高效地使用 less 、 sass 、 coffeescript 开发。

​		使用方法：只要将想要编译的整个less文件夹拖进图形化界面中，右键单击，选择保存位置即可。

**2.使用less的好处**

​	用编程的思想来编写样式，方便以后整体修改CSS样式，提高开发效率

**3. 变量：** 将需要重复使用或经常修改的值定义为变量，需要使用的地方引用，变量通常以@符号进行定义

​	less书写的例子：

```
@变量名: 变量值;
@bgColor: #f5f5f5;
@bodyWidth: 100px;
body{
  width: @bodyWidth;
  background-color: @bgColor;
}
```

​	经过编译之后的CSS：

```
body{
  width: 100px;
  background-color: #f5f5f5;
}
```

#### LESS 中的变量和其他编程语言一样，可以实现值的复用，同样它也有生命周期，也就是 Scope（变量范围，开发人员惯称之为作用域），简单的讲就是局部变量还是全局变量的概念，查找变量的顺序是先在局部定义中找，如果找不到，则查找上级定义，直至全局。####

**4.嵌套： **在less中可以嵌套的写css样式，遵循一定的规则，先写父级元素的样式，然后写子代选择器，在子代选择器中再写它的样式，这样一级一级嵌套，可以有效的节省代码量，使结构清晰。

**less书写的例子：** 

```
.container {
  width: @containerWidth;
> .row {
  height: 100%;
  a{
    color: #f40;
    &:hover{
      color: #f50;
    }
  }
}
div {
  width: 100px;
  .hello {
    background-color: #00f;
  }
}
}
```

**经过编译之后的CSS：** 

```
  .container {
    width: 1024px;
  }
  .container > .row {
    height: 100%;
  }
  .container > .row a {
    color: #f40;
  }
  .container > .row a:hover {
    color: #f50;
  }
  .container div {
    width: 100px;
  }
  .container div .hello {
    background-color: #00f;
  }
```

**5.Mixin：**混合，相当于写了一个样式集，以备重复应用的时候，被简单调用，调用一个类名和#id就能解决

```
.a, #b {
  color: red;
}
.mixin-class {
  .a();
}
.mixin-id {
  #b();
}
```

**通过调用mixin（类名和ID名）来渲染css样式，其中调用时的括号，可有可无。** 

```
.a, #b {
  color: red;
}
.mixin-class {
  color: red;
}
.mixin-id {
  color: red;
}
```

**不输出Mixin，在定义时候，加上括号即可,另外Mixin还可以带参数** 

```
.my-mixin {
  color: black;
}
.my-other-mixin(@color:red){
  background: @color;
}
.class {
  .my-mixin;
  .my-other-mixin(white);
}
```

通过调用mixin之后的CSS样式

```
.my-mixin {
  color: black;
}
.class {
  color: black;
  background: white;
}
```

**包含选择器的Mixin例子：** 

```
.my-hover-mixin() {
  &:hover {
    border: 1px solid red;
  }
}
button {
  .my-hover-mixin();
}
```

输出的CSS：

```
button:hover {
  border: 1px solid red;
}
```

**6.Import:** 我们可以在开发阶段将样式放到多个文件中，最后通过@import 的方式合并

```
// main.less
@btnColor: red;
@import url('_buttom.less');

body{
  width: 1024px;
}
// _buttom.less
.btn{
  color: @btnColor;
}
```

css输出：

```
.btn{
  color: red;
}
body{
  width: 1024px;
}
```

**7.运算和函数：**在less中可以对数值型的 value（数字、颜色、变量等）进行加减乘除四则运算，同时Less也提供了一些函数，字符串函数，列表函数，数学函数，类型函数以及函数方面的函数等等，方便用户使用

**8.Comments:** 

适当的注释是保证代码可读性的必要手段，LESS 对注释也提供了支持，主要有两种方式：单行注释和多行注释，这与 JavaScript 中的注释方法一样，我们这里不做详细的说明，只强调一点：LESS 中单行注释 (// 单行注释 ) 是不能显示在编译后的 CSS 中，所以如果你的注释是针对样式说明的请使用多行注释。





