1. jquery,$(document).ready()事件可以写多次，开发过程中一般使用没有压缩的jquery版本，方便调试；项目上线的时候，用压缩过的版本

2. jQuery版本区别：jQuery1.x版本的框架兼容所有IE浏览器，而2.x版本的jQuery框架并不支持低端IE浏览器。此处的低版本浏览器指的是IE8及其以下版本，所以对于需要全都兼容的项目，就不得不使用1.x版本

3. jQuery引包放到jQuery代码上边，浏览器解析是自上而下的

4. JS的入口函数window.onload()事件时等到所有的内容都加载完毕之后才去执行，包括外部引入的图片资源等等；但是jQuery的入口函数是在所有的HTML标签加载完毕之后，就去执行。所以一般jQuery要比JS早执行。

5. ​

   **jQuery对象转成DOM对象： **两种转换方式将一个jQuery对象转换成DOM对象：[index]和.get(index); 
   (1)jQuery对象是一个数据对象，可以通过[index]的方法，来得到相应的DOM对象。 
   如：var $v =$("#v") ; //jQuery对象 
   var v=$v[0]; //DOM对象 
   alert(v.checked) //检测这个checkbox是否被选中 
   (2)jQuery本身提供，通过.get(index)方法，得到相应的DOM对象 
   如：var $v=$("#v"); //jQuery对象 
   var v=$v.get(0); //DOM对象 
   alert(v.checked) //检测这个checkbox是否被选中 

   **DOM对象转成jQuery对象:** 
   对于已经是一个DOM对象，只需要用$()把DOM对象包装起来，就可以获得一个jQuery对象了。$(DOM对象) 
   如：var v=document.getElementById("v"); //DOM对象 
   var $v=$(v); //jQuery对象 
   转换后，就可以任意使用jQuery的方法了。 

   ​

6. jQuery的选择器：基本选择器，层叠选择器，过滤选择器，属性选择器，筛选选择器，等等。

7. 基本选择器：#ID, div,  .class , *等等，层级选择器：后代选择器，子元素选择器>  ,紧邻选择器+  ，同胞选择器~     

   过滤选择器：first,last,odd,even,eq(),gt(),lt()

   筛选选择器:  .eq()   ,   .children(),    .parent(),    sublings(),

   属性选择器:  $(``"div[id]"``),$("input[name='newsletter']")

   ​                   $("input[name!='newsletter']")

   ``		   $("input[name^='news']")  			

   ​		    $("input[name$='news']") 

   ​		    $("input[name*='man']")  

   ​		    $("input[id][name$='man']") 

8. 创建对象的两种方法：

    	var obj={

   ​		ready:function(){

   ​		}

   ​	};

   ​	var obj = new Object();

   ​	obj.ready = function(){

   ​	}

   ​	var obj = Object.crearte();

9. jQuery自定义函数的多种方法：

   方法一：

   jQuery.fn.setApDiv=function () { 
   ​	//apDiv浮动层显示位置居中控制 
   ​	var wheight=$(window).height(); 
   ​	var wwidth=$(window).width(); 
   ​	var apHeight=wheight-$("#apDiv").height(); 
   ​	var apWidth=wwidth-$("#apDiv").width(); 
   ​	$("#apDiv").css("top",apHeight/2); 
   ​	$("#apDiv").css("left",apWidth/2); 
   } 

   调用方法：$("#apDiv").setApDiv(); 

   方法二： 
   //jQuery 应用扩展 
   jQuery.extend({ 
   // 设置 apDiv 
   ​	setApDiv:function () { 
   ​	//apDiv浮动层显示位置居中控制 
   ​	var wheight=$(window).height(); 
   ​	var wwidth=$(window).width(); 
   ​	var apHeight=wheight-$("#apDiv").height(); 
   ​	var apWidth=wwidth-$("#apDiv").width(); 
   ​	$("#apDiv").css("top",apHeight/2); 
   ​	$("#apDiv").css("left",apWidth/2); 
   } 
   }); 
   调用方法：$.setApDiv();

   方法三： 

   $.postJSON = function(url, data, callback) { 
   $.post(url, data, callback, "json"); 
   }; 
   调用方法：$.postJSON('/post/getsecurejsonpost',{}, function(data) {}); 

   w330px

   jquery和DOM对象转换

   ​

10. 自定义动画：(*selector*).animate(*{styles},speed,easing,callback*)

11. height()，css("height")区别,前者获得的是数字，后者获得的是字符，offset设置之后会变成相对定位

12. 常用的DOM操作：元素操作，属性操作，样式操作等等

   **（1）.三个简单实用的用于 DOM 操作的 jQuery 方法：** 

   · text() - 设置或返回所选元素的文本内容 

   · html() - 设置或返回所选元素的内容（包括 HTML 标记） 

   · val() - 设置或返回表单字段的值 

   **2）.对html内容的添加**。

   **添加新的 HTML 内容 ** 

   我们将学习用于添加新内容的四个 jQuery 方法： 

   append() - 在被选元素的结尾插入内容 

   prepend() - 在被选元素的开头插入内容

   after() - 在被选元素之后插入内容 

   before() - 在被选元素之前插入内容

   wrap() - 把匹配的元素用指定的内容或元素包裹起来。

   **删除元素** 

   remove() - 删除被选元素（及其子元素）

   empty() - 从被选元素中删除子元素

   **3）.jQuery 操作 CSS** 

   jQuery 拥有若干进行 CSS 操作的方法。我们将学习下面这些： 

   addClass() - 向被选元素添加一个或多个类 

   removeClass()- 从被选元素删除一个或多个类 

   toggleClass()- 对被选元素进行添加/删除类的切换操作 

   css() - 设置或返回样式属性 

   如需设置多个 CSS 属性，请使用如下语法： 

   css({"propertyname":"value","propertyname":"value",...}); 

   检查匹配的元素是否拥有指定的类:   hasClass();

   **4).attr()获取属性**。当然这两也是可以自己设置值来修改的，

   removeAttr() -   从所有匹配的元素中移除指定的属性。

   **5).jQuery 尺寸 方法** 

   jQuerywidth() 和height() 方法 

   width() 方法设置或返回元素的宽度（不包括内边距、边框或外边距）。 

   height() 方法设置或返回元素的高度（不包括内边距、边框或外边距）。 

   jQueryinnerWidth() 和innerHeight() 方法 

   innerWidth() 方法返回元素的宽度（包括内边距）。 

   innerHeight() 方法返回元素的高度（包括内边距）。 

   jQueryouterWidth() 和outerHeight() 方法 

   outerWidth() 方法返回元素的宽度（包括内边距和边框）。 

   outerHeight() 方法返回元素的高度（包括内边距和边框）。

   offset():  返回第一个匹配元素相对于文档的位置,包含两个参数，top和left

   offsetParent():   返回最近的定位祖先元素。

   position():  返回第一个匹配元素相对于父元素的位置。

   scrollLeft() 方法:   返回或设置匹配元素的滚动条的水平位置。

   scrollTop() 方法:   返回或设置匹配元素的滚动条的垂直位置。

13. 表格中的border-collapse:折叠表格的边框，border-space：0；使边距为0 
    ctrl+shift+g,在sublime中给子元素设置包裹父元素
    ctrl+/,注释代码；ctrl+shift+/,取消注释

   

   ​