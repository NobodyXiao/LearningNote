### HTML5知识点总结



1. 越来越多的站点开始使用 [HTML5](http://baike.baidu.com/view/951383.htm) 标签。但情况是还有很多人在使用IE6，IE7，IE8。为了让所有网站浏览者都能正常的访问网站，有下面两个解决方案：

   ​    **1)**. 为网站创建多套模板，通过程序对[User-Agent](http://baike.baidu.com/view/3398471.htm)的判断给不同的浏览器用户显示不同的页面，比如优酷网就是采用的这种模式。

   ​    **2)**. 使用[Javascript](http://baike.baidu.com/view/16168.htm)来使不支持HTML5的浏览器支持[HTML](http://baike.baidu.com/view/692.htm)标签。很多网站采用的这种方式。

   ​    **3)**. 针对IE浏览器比较好的解决方案是html5shiv。html5shiv主要解决HTML5提出的新的元素不被IE6-8识别，这些新元素不能作为父节点包裹子元素，并且不能应用CSS样式。让CSS 样式应用在未知元素上只需执行 document.createElement(elementName) 即可实现。html5shiv就是根据这个原理创建的。

   ​    **4)**. 载入之后，需要初始化新标签，代码如下：

   ```/*html5*/
   /*html5*/ xxxxxxxxxx article,aside,dialog,footer,header,section,footer,nav,figure,menu{display:block} 
   ```

   ​    **5)**. 需要在文档中插入代码：

   ```
   <!--[if lt IE9]> 
   <script src="http://cdn.static.runoob.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
   <![endif]-->
   ```

2. <label> 标签为 input 元素定义标注（标记） 

   ```
   <form>

     <label for="male">Male</label>

     <input type="radio" name="sex" id="male" />

     <br />

     <label for="female">Female</label>

     <input type="radio" name="sex" id="female" />

   </form>
   ```

3. jquery 操作一定要做变量本地化，$(function(){ }),定义一个单独的作用域，避免变量名污染的情况

4. sublime快捷键，ctrl+D连选, ctrl+K跳过

5. svg可缩放的矢量图形

   载入svg方式，iframe,object,embed,了解svg是如何载入并且使用的,iframe 为推荐的svg载入模式，iframe标签本身的作用是在网页中载入其他的网页。

6. html5表单变动

   **1)**  新的 Input 类型

   - email：用于应该包含 e-mail 地址的输入域，在提交表单时，会自动验证 email 域的值。

   - url：类型用于应该包含 URL 地址的输入域，在提交表单时，会自动验证 url 域的值。

   - number：类型用于应该包含数值的输入域，您还能够设定对所接受的数字的限定：最大值，最小值，步长，默认值等等。

   - range：类型用于应该包含一定范围内数字值的输入域，类型显示为滑动条，您还能够设定对所接受的数字的限定：最大值，最小值，步长，默认值等等。

     - Date pickers (date, month, week, time, datetime, datetime-local)

     - date - 选取日、月、年
     - month - 选取月、年
     - week - 选取周和年
     - time - 选取时间（小时和分钟）
     - datetime - 选取时间、日、月、年（UTC 时间）
     - datetime-local - 选取时间、日、月、年（本地时间）

   - search：用于搜索域，比如站点搜索或 Google 搜索。

   - color：选取颜色 

     **虚拟键盘适配 ，根据type类型的不同，弹出的键盘模式不一样**         

   **2)**  新的表单元素

   - datalist：元素规定输入域的选项列表，列表是通过 datalist 内的 option 元素创建的，

     option 元素永远都要设置 value 属性，而不是设置内容。

   - keygen：keygen 元素的作用是提供一种验证用户的可靠方法。

     keygen 元素是密钥对生成器（key-pair generator）。当提交表单时，会生成两个键，一个是私钥，一个公钥。

     私钥（private key）存储于客户端，公钥（public key）则被发送到服务器。公钥可用于之后验证用户的客户端证书（client certificate）。

   - output：用于不同类型的输出，比如计算或脚本输出：

     **3)**  新的表单属性

     新的 input 属性：

     - autocomplete
     - autofocus
     - form
     - form overrides (formaction, formenctype, formmethod, formnovalidate, formtarget)
     - height 和 width
     - list
     - min, max 和 step
     - multiple
     - pattern (regexp)
     - placeholder
     - required

     新的form属性：

     - autocomplete：自动补全
     - novalidate：不校验

     ​

7. 自定义属性的代码和示例

   ```
   <ul>
   	<li data-target =.panel-news>新闻</li>
   	<li data-target =.panel-sport>体育</li>
   </ul>
   <div class="panel">
   	<div class="panel-news"></div>
   	<div class="panel-sport"></div>
   </div>
   <script>
   //通过data属性，使某些元素对应关联起来
   	(function(){
   		var $lis = $("ul>li");
   		$lis.bind("click",function(){
   			//获取到被点击元素的data属性值，而这个属性值对应panel面板的一个div类名
   			var targetSelector = $(this).data("target");
   			//通过获取的类名选取到对应类名的选择器
   			var $target = $(targetSelector);
   			//接下来即可对这个对象进行绑定一些事件
   			。。。。。
   		})
   	});
   </script>
   ```

   auto file name

   ​

​       任何一个元素设置高度100%，是从其父级元素读取的，父级元素里边没有内容，高度不是100%，所以先给父级设置高度是100%，即html,body{height:100%};



字面量和变量，以及直接输出

字面量和变量连接用+，之后需要用引号将字面量包裹起来，之后再用+连接

    var str = 'abcde';//字符串命名需要用引号包裹
    console.log('我是字面量' + str);//输出结果是  我是字面量abcde

一般JavaScript中用单引号，创建变量的时候，避免和HTML结构中的双引号弄混了；而HTML中用双引号，这样规范一些，养成良好的个人习惯。

如果你容易弄混，字面量和变量的连接，那么你也可以直接用



JavaScript中的HTML DOM classList 属性

该属性用于在元素中添加，移除及切换 CSS 类,classList的属性 有length，方法有add, contains, item, remove, toggle

```
document.getElementById("myDIV").classList.add("mystyle ","anotherClass","thirdClass");//添加多个类名

var x = document.getElementById("myDIV").classList;//获取类名的列表

console.log(x);//打印myDIV的类名为mystyle anotherClass thirdClass
```



Application cache,网页离线访问,html标签中引入manifest属性，之后设置一下，manifest = “cache.manifest”,配置一下cache.manifest文件，对于客户端比较有用



new Date()获取的是时间对象，.toLcalTimeString()转换成我们可以认识的时间字符串。.toLcalDateString()转换成我们可以认识的日期字符串













怎么把自己电脑上的文件部署到本地服务器？？

全屏API?



对于表单里边的input可以直接通过name属性找到的:document.form[0].input_file，其中input_file是name名

bootstrap了解一下，

文件操作，选取文件，读取文件列表，保留两位小数，去掉读取列表按钮，给点击按钮变化的时候就去执行函数，change

drag&&drop//花时间写一个例子








