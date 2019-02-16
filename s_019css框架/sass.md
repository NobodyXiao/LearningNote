## Sass总结(css框架)

#### Sass是一门CSS预处理语言，它扩展了CSS语言，增加了变量、Mixin（混入）、函数等特性，使CSS更易维护和扩展。

**sass文件的后缀名有两种：一种是后缀名sass，语法中不使用大括号和分号；另外一种是scss，使用大括号和分号。**

**1.安装Sass的步骤：**

> **1.1因为sass依赖于ruby环境，所以装sass之前先确认装了ruby。**
>
> 先到官网下载个[ruby](http://rubyinstaller.org/downloads)在安装的时候，请勾选Add Ruby executables to your PATH这个选项，添加环境变量，不然以后使用编译软件的时候会提示找不到ruby环境。
>
> **1.2安装完ruby之后，在开始菜单中，找到刚才我们安装的ruby，打开Start Command Prompt with Ruby**
>
> 在Ruby的命令行下输入**gem install sass**,即可完成安装。如果你想更新安装的sass，可以使用**gem update sass**命令进行更新。

**2.Sass文件编译成css文件**

> **2.1命令行进行编译**
>
> 进入sass文件的存放目录，之后使用**sass  test.scss  test.css**即可将scss文件编译成css文件, 如果你想**监视Sass文件的变化**，一旦sass文件有改动，css文件自动编译成最新的，那么就使用下边命令：
>
> ```
> // watch a file监视一个sass文件变化
> sass --watch input.scss:output.css
> // watch a directory监视一个sass文件夹，自动更新css文件夹，适用于编译多个sass文件的情况
> sass --watch app/sass:public/stylesheets
> ```
>
> **2.2第三方工具编译（GUI编译）**
>
> 除了使用命令行编译，你还可以使用第三方工具进行编译，koala是一个优秀的编译器，界面清晰，操作简单，可以同时编译less和sass。
>
> **2.3Sass还可以进行在线编译**

**3.Sass相关语法**

> **3.1变量**
>
> SASS允许使用变量，所有变量以$开头，如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中。
>
> ```scss
> $blue : #1875e7;　//定义变量需要以$开头
> div {
> 　color : $blue;
> }
> $side : left;
> .rounded {
> 　border-#{$side}-radius: 5px;//如果变量镶嵌在字符串中间，那么就需要将变量写在#$中
> }
> ```
>
> **关于变量作用域**
>
> > 当前sass没有变量作用域这个概念，后边重新定义的变量，会覆盖之前定义的变量，这是sass最大的诟病
> >
> > 不过在sass 3.4以后的版本中将正式使用！global，即在声明的变量后边加上这个，那么这个变量就会声明成全局变量,  如果本作用域内没有定义变量，那么将会一层层向上寻找，如果没有找到，将使用全局变量
> >
> > **在选择器、函数、混合宏...的外面定义的变量为全局变量**
> >
> > ```scss
> > $fontSize:      12px;//全局变量
> > $color:         #333;//全局变量
> > body{
> >     $fontSize: 14px;   //重新定义$fontSize变量    
> >     $color：   #fff !global;//重新定义全局变量color
> >     font-size:$fontSize;//在当前作用域找变量$fontSize，找到了，即使用值14px
> >     color:$color;
> > }
> > p{
> >     font-size:$fontSize;//当前作用域没有，在全局环境中寻找，找到值12px
> >     color:$color;//当前作用域没有，在全局环境中寻找
> > }
> > 
> > //css style
> > //-------------------------------
> > body{
> >     font-size:14px;
> >     color:#fff;
> > }
> > p{
> >     font-size:12px;
> >     color:#fff;
> > }
> > ```
>
> **3.2嵌套**
>
> sass的嵌套包括两种：一种是选择器的嵌套；另一种是属性的嵌套。我们一般说起或用到的都是选择器的嵌套。
>
> 所谓选择器嵌套指的是在一个选择器中嵌套另一个选择器来实现继承，从而增强了sass文件的结构性和可读性。在选择器嵌套中，可以使用`&`表示父元素选择器。
>
> ```scss
> #top_nav{
>   line-height: 40px;
>   text-transform: capitalize;
>   background-color:#333;
>   li{
>     float:left;
>   }
>   a{
>     display: block;
>     padding: 0 10px;
>     color: #fff;
> 
>     &:hover{   //代表#top_nav a:hover{}
>       color:#ddd;
>     }
>   }
> }
> ```
>
> **3.3混合mixin**
>
> sass中使用`@mixin`声明混合，可以传递参数，参数名以$符号开始，多个参数以逗号分开，也可以给参数设置默认值。声明的`@mixin`通过`@include`来调用。
>
> 带参数的sass：
>
> ```scss
> @mixin opacity($opacity:50) {    //使用$声明变量，顺便把值也写上
>   opacity: $opacity / 100;
>   filter: alpha(opacity=$opacity);
> }
> 
> //css style
> //-------------------------------
> .opacity{
>   @include opacity; //参数使用默认值
> }
> .opacity-80{
>   @include opacity(80); //传递参数
> }
> ```
>
> less的混入是以**类名和#ID**作为名称，之后被调用的，可以带参数也可以不用带参数，调用时不需要使用@incllude。
>
> **3.4继承（子元素继承父级元素）**
>
> sass中，选择器继承可以让选择器继承另一个选择器的所有样式，并联合声明。**使用选择器的继承，要使用关键词`@extend`，后面紧跟需要继承的选择器。**
>
> ```scss
> h1{
>   border: 4px solid #ff9aa9;
> }
> .speaker{
>   @extend h1;
>   border-width: 2px;
> }
> 
> //css style
> //-------------------------------
> h1,.speaker{
>   border: 4px solid #ff9aa9;
> }
> .speaker{
>   border-width: 2px;
> }
> ```
>
> **3.5%占位符**
>
> 从sass 3.2.0以后就可以定义占位选择器`%`。这种选择器的优势在于：如果不调用则不会有任何多余的css文件，避免了以前在一些基础的文件中预定义了很多基础的样式，然后实际应用中不管是否使用了`@extend`去继承相应的样式，都会解析出来所有的样式。占位选择器以`%`标识定义，通过`@extend`调用。
>
> ```scss
> //sass style
> //-------------------------------
> %ir{
>   color: transparent;
>   text-shadow: none;
>   background-color: transparent;
>   border: 0;
> }
> %clearfix{
>   @if $lte7 {
>     *zoom: 1;
>   }
>   &:before,
>   &:after {
>     content: "";
>     display: table;
>     font: 0/0 a;
>   }
>   &:after {
>     clear: both;
>   }
> }
> #header{
>   h1{
>     @extend %ir;
>     width:300px;
>   }
> }
> .ir{
>   @extend %ir;
> }
> 
> //css style
> //-------------------------------
> #header h1,
> .ir{
>   color: transparent;
>   text-shadow: none;
>   background-color: transparent;
>   border: 0;
> }
> #header h1{
>   width:300px;
> }
> ```
>
> 如上代码，定义了两个占位选择器`%ir`和`%clearfix`，其中`%clearfix`这个没有调用，所以解析出来的css样式也就没有clearfix部分。占位选择器的出现，使css文件更加简练可控，没有多余。所以可以用其定义一些基础的样式文件，然后根据需要调用产生相应的css。
>
> **ps**：在`@media`中暂时不能`@extend` `@media`外的代码片段，以后将会可以。
>
> **3.6注释**
>
> sass有两种注释方式，一种是标准的css注释方式`/* */`，另一种则是`//`双斜杆形式的单行注释，不过这种单行注释不会被转译出来。（同less的注释方式一样）
>
> **3.7函数**
>
> sass定义了很多函数可供使用，当然你也可以自己定义函数，以@fuction开始。sass的官方函数链接为：[sass fuction](http://sass-lang.com/documentation/Sass/Script/Functions.html)，实际项目中我们使用最多的应该是颜色函数，而颜色函数中又以lighten减淡和darken加深为最，其调用方法为`lighten($color,$amount)`和`darken($color,$amount)`，它们的第一个参数都是颜色值，第二个参数都是百分比。
>
> ```scss
> //sass style
> //-------------------------------                     
> $baseFontSize:      10px !default;//默认变量
> $gray:              #ccc !defualt;//默认变量        
> 
> // pixels to rems //把px转换成rem的函数
> @function pxToRem($px) {
>   @return $px / $baseFontSize * 1rem;
> }
> 
> body{
>   font-size:$baseFontSize;
>   color:lighten($gray,10%);//颜色减淡函数
> }
> .test{
>   font-size:pxToRem(16px);
>   color:darken($gray,10%);//颜色加深函数
> }
> 
> //css style
> //-------------------------------
> body{
>   font-size:10px;
>   color:#E6E6E6;
> }
> .test{
>   font-size:1.6rem;
>   color:#B3B3B3;
> }
> ```
>
> **3.8运算**
>
> sass具有运算的特性，可以对数值型的Value(如：数字、颜色、变量等)进行加减乘除四则运算。**请注意运算符前后请留一个空格，不然会出错。**
>
> ```scss
> $baseFontSize:          14px !default;
> $baseLineHeight:        1.5 !default;
> $baseGap:               $baseFontSize * $baseLineHeight !default;
> $halfBaseGap:           $baseGap / 2  !default;
> $samllFontSize:         $baseFontSize - 2px  !default;
> 
> //grid 
> $_columns:                     12 !default;      // Total number of columns
> $_column-width:                60px !default;   // Width of a single column
> $_gutter:                      20px !default;     // Width of the gutter
> $_gridsystem-width:            $_columns * ($_column-width + $_gutter); //grid system width
> ```
>
> **3.9条件判断和循环**
>
> > **3.9.1@if判断**
> >
> > @if`可一个条件单独使用，也可以和`@else`结合多条件使用
> >
> > ```scss
> > //sass style
> > //-------------------------------
> > $lte7: true;//作为判断条件true或者false
> > $type: monster;//作为以后括号中进行比较的变量
> > .ib{
> >     display:inline-block;
> >     @if $lte7 {
> >         *display:inline;
> >         *zoom:1;//设置或检索对象的缩放比例
> >     }
> > }
> > p {
> >   @if $type == ocean {
> >     color: blue;
> >   } @else if $type == matador {
> >     color: red;
> >   } @else if $type == monster {
> >     color: green;
> >   } @else {
> >     color: black;
> >   }
> > }
> > 
> > //css style
> > //-------------------------------
> > .ib{
> >     display:inline-block;
> >     *display:inline;
> >     *zoom:1;
> > }
> > p {
> >   color: green; 
> > }
> > ```
> >
> > **3.9.2三目判断**
> >
> > 语法为：`if($condition, $if_true, $if_false)` 。三个参数分别表示：条件，条件为真的值，条件为假的值。
> >
> > ```scss
> > if(true, 1px, 2px) => 1px
> > ```
> >
> > **3.9.3for循环**
> >
> > for循环有两种形式，分别为：`@for $var from  through `和`@for $var from  to `。$i表示变量，start表示起始值，end表示结束值，这两个的区别是关键字through表示包括end这个数，而to则不包括end这个数（其实相当于有等号和没等号的分别）。
> >
> > ```scss
> > //sass style
> > //-------------------------------
> > @for $i from 1 through 3 {
> >   .item-#{$i} { width: 2em * $i; }
> > }
> > 
> > //css style
> > //-------------------------------
> > .item-1 {
> >   width: 2em; 
> > }
> > .item-2 {
> >   width: 4em; 
> > }
> > .item-3 {
> >   width: 6em; 
> > }
> > ```
> >
> > 本身正常的for循环，if(var i=0; i<5; i++)，像sass这样限定了变量的变化趋势（从1到3），就直接说明是i是自加的，如果变量是从10变化到5，那么变量就是自减的。
>
> **3.10.导入**
>
> sass的导入(`@import`)规则和CSS的有所不同，编译时会将`@import`的scss文件合并进来只生成一个CSS文件。但是如果你在sass文件中导入css文件如`@import 'reset.css'`，那效果跟普通CSS导入样式文件一样，导入的css文件不会合并到编译后的文件中，而是以`@import`方式存在。
>
> 所有的sass导入文件都可以忽略后缀名`.scss`。一般来说基础的文件命名方法以_开头，如`_mixin.scss`。这种文件在导入的时候可以不写下划线，可写成`@import "mixin"`。
>
> 被导入的sass文件a.scss
>
> ```
> //a.scss
> //-------------------------------
> body {
>   background: #eee;
> }
> ```
>
> 需要导入样式的sass文件b.scss：
>
> ```
> @import "reset.css";
> @import "a";
> p{
>   background: #0982c1;
> } 
> ```
>
> 转译出来的b.css样式：
>
> ```
> @import "reset.css";
> body {
>   background: #eee;
> }
> p{
>   background: #0982c1;
> }
> ```
>
> 根据上面的代码可以看出，b.scss编译后，reset.css继续保持import的方式，而a.scss则被整合进来了。	

**4.使用过程中遇到的问题**

- **4.1.编码问题**

>  我的是win10系统，如果你在编译的过程，存放sass文件的目录包含中文名称，那么你可能会遇到以下问题，**Syntax error: Invalid GBK character**
>
> **解决办法：**
>
> 1.如果你使用命令行编译，那么你需要找到ruby安装目录下边的一个文件engine.rb，我的是以下路径
>
> C:\Ruby\lib\ruby\gems\1.9.1\gems\sass-3.3.14\lib\sass，之后在所有的require之后，添加一行代码
>
> ```
> Encoding.default_external = Encoding.find('utf-8')
> ```
>
> 2.如果你使用GUI软件进行编译（koala），那么你也需要找到这个文件，进行相应的操作，可能存放在类似下边地址的路径中 C:\Program Files (x86)\Koala\rubygems\gems\sass-3.3.7\lib\sass

​	







