### HTML5知识点总结

1.越来越多的站点开始使用 [HTML5](http://baike.baidu.com/view/951383.htm) 标签。但情况是还有很多人在使用IE6，IE7，IE8。为了让所有网站浏览者都能正常的访问网站，有下面两个解决方案：

> **1)**. 针对IE浏览器比较好的解决方案是html5shiv。html5shiv主要解决HTML5提出的新的元素不被IE6-8识别，这些新元素不能作为父节点包裹子元素，并且不能应用CSS样式。让CSS 样式应用在未知元素上只需执行 document.createElement(elementName) 即可实现。html5shiv就是根据这个原理创建的。
>
> ```
> <!--[if lt IE9]> 
> <script src="http://cdn.static.runoob.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
> <![endif]-->
> ```
>
> **2)**. 初始化新标签，代码如下：
>
> ```/*html5*/
> /*html5*/ xxxxxxxxxx article,aside,dialog,footer,header,section,footer,nav,figure,menu{display:block} 
> ```
>
> 可以通过初始化新标签的这种形式来让IE浏览器识别这些标签，但是IE8和更早的浏览器不支持这种方式。
>

**2.新元素**

  >**canvas标签：**标签定义图形，比如图表和其他图像。该标签基于 JavaScript 的绘图 API
  >
  >**多媒体新标签**：**audio,vedio,source(定义audio和vedio的资源)**
  >
  >**新的表单元素**：**datalist(与input元素配合使用)**，kengen，**output(作为计算结果输出显示)**
  >
  >**语义性元素**：article，nav，section，header，footer，aside，progress，time，label

**3.<label> 标签为 input 元素定义标注（标记） **

```
    <form>

      <label for="male">Male</label>

      <input type="radio" name="sex" id="male" />

      <br />

      <label for="female">Female</label>

      <input type="radio" name="sex" id="female" />

    </form>
```

**4.sublime快捷键，ctrl+D连选, ctrl+K跳过**

**5.svg可缩放的矢量图形**

  >载入svg方式，iframe,object,embed,了解svg是如何载入并且使用的,iframe 为推荐的svg载入模式，iframe标签本身的作用是在网页中载入其他的网页。

**6.html5表单变动**

  >**1)**  新的 Input 类型
  >
  >- email：用于应该包含 e-mail 地址的输入域，在提交表单时，会自动验证 email 域的值。
  >- url：类型用于应该包含 URL 地址的输入域，在提交表单时，会自动验证 url 域的值。
  >- number：类型用于应该包含数值的输入域，您还能够设定对所接受的数字的限定：最大值，最小值，步长，默认值等等。
  >- range：类型用于应该包含一定范围内数字值的输入域，类型显示为滑动条，您还能够设定对所接受的数字的限定：最大值，最小值，步长，默认值等等。
  >- Date pickers (date, month, week, time, datetime, datetime-local)
    >-- date - 选取日、月、年
      - month - 选取月、年
      - week - 选取周和年
      - time - 选取时间（小时和分钟）
      - datetime - 选取时间、日、月、年（UTC 时间）
      - datetime-local - 选取时间、日、月、年（本地时间）
  >-search：用于搜索域，比如站点搜索或 Google 搜索。
  >-color：选取颜色 
  >
  >  >**虚拟键盘适配 ，根据type类型的不同，弹出的键盘模式不一样** 
  >
  >**2)**  新的表单元素
  >
  >- datalist：元素规定输入域的选项列表，列表是通过 datalist 内的 option 元素创建的，option 元素永远都要设置 value 属性，而不是设置内容。
  >
  >- output：用于不同类型的输出，比如计算或脚本输出：
  >
  >- keygen：keygen 元素的作用是提供一种验证用户的可靠方法。
  >
  >  > keygen 元素是密钥对生成器（key-pair generator）。当提交表单时，会生成两个键，一个是私钥，一个公钥。
  >  >
  >  >  私钥（private key）存储于客户端，公钥（public key）则被发送到服务器。公钥可用于之后验证用户的客户端证书（client certificate）。
  >
  >**3)**  新的表单属性
  >
  >  新的 input 属性：
     > autocomplete
     > autofocus
     > form
     > form overrides (formaction, formenctype, formmethod, formnovalidate, formtarget)
     > height 和 width
     > list
     > min, max 和 step
     > multiple
     > pattern (regexp)
     > placeholder
     > required
  >  新的form属性：
     > autocomplete：自动补全
     > novalidate：不校验

**7.自定义属性的代码和示例**

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

8.HTML5 则通过 Application Cache 接口处理了离线应用中的一些问题，Application Cache(或 AppCache)让一个开发者可以指定浏览器需要保存哪个文件。当用户在离线情况下时，即使他们按了刷新按钮，你的应用也能正确加载和工作。

> **使用这个接口让你的应用拥有三方面的优势：**
>
>   >   ***1)***离线浏览——用户在不能联网的时候依然能浏览整个站点
>   >
>   >   ***2)***高速——缓存资源是存储在本地的，因此能更快加载。
>   >
>   >   ***3)***更小的服务器负载——浏览器只需要从服务器端下载有改变的资源即可，相同资源不需要重复下载。
>
> 为了让一个应用能启用application cache，需要在文档的html标签中包含manifest属性
>
> ```
> <html manifest=”example.appcache”> 
>   …
> </html>
> ```
>
> **一个manifest文件可能包括三个部分：CACHE, NETWORK 以及 FALLBACK.**
>
>   >CACHE:
>   >
>   >这是默认部分，列在这个条目下的文件（或者紧跟在CACHE MANIFEST字符串之后的）都会在第一次被下载后进入cache。
>   >
>   >NETWORK:
>   >
>   >这一部分中所列出的资源都是需要联网使用的资源。它们都不会进入cache中，即使用户处于离线状态。这部分可能会使用Wildcards。
>   >
>   >FALLBACK:
>   >
>   >可选部分，指定了如果资源获取失败，将会呈现怎样的页面。第一个URL是资源，第二个就是fallback页面。两个URL都必须是相对地址，并且由同一个manifest文件指定。可以使用Wildcards。
>
> **更新缓存** 
>
> > 一旦应用被缓存，它就会保持缓存直到发生下列情况：
> >
> > - 用户清空浏览器缓存
> > - manifest 文件被修改（参阅下面的提示）
> > - 由程序来更新应用缓存

**9.web存储**

HTML5 web 存储,一个比cookie更好的本地存储方式，在本地存储浏览的数据，这些数据不会被保存在服务器上，但是这些数据只用于用户请求网站数据上.它也可以存储大量的数据，而不影响网站的性能。数据以 键/值 对存在, web网页的数据只允许该网页访问使用。

  >**客户端存储数据的两个对象**
  >
  >**localStorage和sessionStorage**
  >
  >不管是 localStorage，还是 sessionStorage，可使用的API都相同，常用的有如下几个（以localStorage为例）：
  >
  >保存数据：localStorage.setItem(key,value);
  >
  >读取数据：localStorage.getItem(key);
  >
  >删除单个数据：localStorage.removeItem(key);
  >
  >删除所有数据：localStorage.clear();
  >
  >得到某个索引的key：localStorage.key(index);
  >
  >  >**localStorage对象**
  >  >
  >  >localStorage 对象存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用。
  >  >
  >  >**sessionStorage对象**
  >  >
  >  >sessionStorage 方法针对一个 session 进行数据存储。当用户关闭浏览器窗口后，数据会被删除。

**10.web Sql**

Web SQL 数据库 API 并不是 HTML5 规范的一部分，但是它是一个独立的规范，引入了一组使用 SQL 操作客户端数据库的 APIs。

**核心方法**

  >1. **openDatabase**：这个方法使用现有的数据库或者新建的数据库创建一个数据库对象。
  >2. **transaction**：这个方法让我们能够控制一个事务，以及基于这种情况执行提交或者回滚。
  >3. **executeSql**：这个方法用于执行实际的 SQL 查询。

实例：

**如果数据库存在，那么就打开这个数据库，如果数据库不存在，就创建一个新的数据库**

```
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
```

**增删改查操作**

```
db.transaction(function (tx) {
   tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');//创建
   tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "菜鸟教程")');//插入
   tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "www.runoob.com")');//插入
});
```

**11.Server-Sent Events（SSE）服务器发送事件**

HTML5 服务器发送事件（server-sent event）允许网页自动获得来自服务器的更新，属于单向消息传递。

实例

```
var source=new EventSource("demo_sse.php");
source.onmessage=function(event)
{
    document.getElementById("result").innerHTML+=event.data + "<br>";
};
```

实例解析：

- 创建一个新的 EventSource 对象，然后规定发送更新的页面的 URL（本例中是 "demo_sse.php"）
- 每接收到一次更新，就会发生 onmessage 事件
- 当 onmessage 事件发生时，把已接收的数据推入 id 为 "result" 的元素中

为了让实例运行，您还需要能够发送数据更新的服务器，此处使用PHP写的服务器,php代码如下

```
<?php 
header('Content-Type: text/event-stream'); 
header('Cache-Control: no-cache'); 
$time = date('r'); 
echo "data: The server time is: {$time}\n\n"; 
flush(); 
?>
```

**12.Web socket**

在WebSocket API中，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。

浏览器通过 JavaScript 向服务器发出建立 WebSocket 连接的请求，连接建立以后，客户端和服务器端就可以通过 TCP 连接直接交换数据。

当你获取 Web Socket 连接后，你可以通过 **send()** 方法来向服务器发送数据，并通过 **onmessage** 事件来接收服务器返回的数据。

> **创建Websocket对象**
>
> ```
> var Socket = new WebSocket(url, [protocol] );
> ```
>
> **Websocket属性 **
>
>  Socket.readyState：只读属性 **readyState** 表示连接状态
>
> Socket.bufferedAmount:只读属性 **bufferedAmount** 已被 send() 放入正在队列中等待传输，但是还没有发出的 UTF-8 文本字节数。
>
> **Websocket事件**
>
> Socket.onopen：连接建立时触发
>
> Socket.onmessage：客户端接收服务端数据时触发
>
> Socket.onerror：通信发生错误时触发
>
> Socket.onclose：连接关闭时触发
>
> **Websocket方法**
>
> Socket.send()：使用连接发送数据
>
> Socket.close()：关闭连接














