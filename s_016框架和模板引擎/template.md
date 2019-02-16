## artTemplate：高性能的JavaScript模板引擎## 

**1) artTemplate模板引擎的使用方法：**

- **a) 首页应该在页面中引入模板擎:**

```html
<script src="dist/template-native.js"></script>对应原生语法模板
<script src="dist/template.js"></script>对应简洁语法模板
```

- **b) 编写模板，使用一个type="text/html"的script标签存放模板，其中type类型是为了告诉浏览器此script中编写的HTML代码：**

```html
<!-- 简洁模板：-->
<script id="test" type="text/html">
<h1>{{title}}</h1>
<ul>
    {{each list as value i}}
        <li>索引 {{i + 1}} ：{{value}}</li>
    {{/each}}
</ul>
</script>
<!-- 原生模板：略 -->
```

- **c) 渲染模板**

```javascript
var data = {
    title: '标签',
    list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
};
var html = template('test', data);
document.getElementById('content').innerHTML = html;
```

**2) 模板的语法：简洁语法（推荐使用的），原生语法**

- **a)** 简洁语法：

 - **a1)** 表达式：`{{` 与 `}}` 符号包裹起来的语句则为模板的逻辑表达式。

    >
     > 输出表达式：
     >
     >对内容编码输出：{{content}}
     >
     > 不编码输出：{{#content}}

 - **a2)** 逻辑：遍历表达式

    ```html
    {{each list as value index}}
        <li>{{index}} - {{value.user}}</li>
    {{/each}}
    ```

 - **a3)** 模板包含表达式:

    > 用于嵌入子模板:  {{include 'template_name'}}
    >
    > 子模板默认共享当前数据，亦可以指定数据：{{include 'template_name' news_list}}

 -  **a4)** if判断

    > {{if value}}...{{/if}}
    > {{if v1}}... {{else if v2}}... {{/if}}

 - **a5)** 变量

    > {{set temp = data.sub.content}}

 - **a6)**继承

    ```
    {{extend './layout.art'}}
    {{block 'head'}} ... {{/block}}
    ```

    继承语法允许你定义一个基础模版的骨架，之后可以在别的模版中继承此模版，用例如下所示：

    ```html
    <!--layout.art-->
    <!doctype html>
    <html>
    <head>
       <meta charset="utf-8">
       <title>{{block 'title'}}My Site{{/block}}</title>
       {{block 'head'}}
       <link rel="stylesheet" href="main.css">
       {{/block}}
    </head>
    <body>
        {{block 'content'}}{{/block}}
    </body>
    </html>
    ```

    ```html
    <!--index.art-->
    {{extend './layout.art'}}
    {{block 'title'}}{{title}}{{/block}}
    {{block 'head'}}
        <link rel="stylesheet" href="custom.css">
    {{/block}}
    	{{block 'content'}}
    
    <p>This is just an awesome page.</p>
    
    {{/block}}
    ```

    第二段部分的block分别替换相应上边继承模版中的block部分，实现自己的模版。

 - **a7)** 过滤

    > 定义过滤器
    >
    > ```
    > template.defaults.imports.dateFormat = function(date, format){/*[code..]*/};
    > template.defaults.imports.timestamp = function(value){return value * 1000};
    > {{date | timestamp | dateFormat 'yyyy-MM-dd hh:mm:ss'}}
    > ```

**b)** 原生语法：

- **b1)** 表达式：`<%` 与 `%>` 符号包裹起来的语句则为模板的逻辑表达式。

  > 输出表达式：
  >
  > 	对内容编码输出：<%=content%>
  > 	
  > 	不编码输出：<%=#content%>

- **b2)** 循环	

  ```html
  <h1><%=title%></h1>
  <ul>
      <%for(i = 0; i < list.length; i ++) {%>
          <li>条目内容 <%=i + 1%> ：<%=list[i]%></li>
      <%}%>
  </ul>
  ```

- **b3)** 子模版

  > 用于嵌入子模板:  <% include('template_name') %>
  >
  > 子模板默认共享当前数据，亦可以指定数据：<% include('template_name', news_list) %>

- **b4)** if判断

  ```html
  <% if (value) {%> ... <%} %>
  <% if (value) {%> ... <%} else {%> ... <%} %>
  ```

- **b5)**定义变量

  ```html
  <% var temp = data.sub.content; %>
  ```

- **b6)** 继承

  ```html
  <% extend('./layout.art') %>
  <% block('head', function(){ %> ... <% }) %>
  ```

- **b7)**过滤

  ```html
  <%= $imports.dateFormat($imports.timestamp(date), 'yyyy-MM-dd hh:mm:ss') %>
  ```

  

**3)** 渲染的方法（在渲染模板中使用的）

- **template(id, data)** :

  > 根据 id 渲染模板。内部会根据document.getElementById(id)查找模板(所以不支持传入的路径参数)，渲染完成之后就可以将此模板添加到HTML文档中进行显示。
  >
  > 其中data数据在渲染模板中是直接使用的，一般传入的是一个对象，直接拿里边的数据进行使用。
  >
  > ```
  > //例如data是object类型
  > object{
  > 	error_code:0
  > 	reason:"Success"
  > 	result{
  > 		data:[{},{},{}]
  > 	}
  > }
  > ```
  >
  > 那么如果在编写模板的时候，需要引用result对象中的data数组的时候，直接写result.data[i]即可，相当于是比template(id, data)中的data缩进一级，少表示一级, 如果没有 data 参数，那么将返回一渲染函数。
  >
  > 用法：
  >
  > ```html
  > <!DOCTYPE html>
  > <html lang="en">
  > <head>
  >     <meta charset="UTF-8">
  >     <title>template使用</title>
  >     <!--导入引擎模板-->
  >     <script src="js/template-native.js"></script>
  > </head>
  > <body>
  > <div id="content"></div>
  >     <!--定义模板-->
  >      <script id="test" type="text/html">
  >          <h1><%=title%></h1>
  >          <ul>
  >              <%for (var i =0;i<list.length;i++){%>
  >                  <li>索引<%=i+1%>:<%=list[i]%></li>
  >              <% } %>
  >          </ul>
  >      </script>
  > 
  >   <!--定义对象-->
  >     <script>
  >         var data ={
  >             title:"artTemplate",
  >             isTemplate:"true",
  >             list:['读书', '听歌', '摄影', '旅行', '跑步', '爬山', '骑行']
  >         };
  > //        调用模板引擎提供的方法
  >      /*   参数1：模板的id
  >         参数2：对象（注意是  对象）*/
  >         var html = template('test',data);
  >         //找到并替换
  >         document.getElementById('content').innerHTML = html;
  >     </script>
  > ```

- **template.helper(name, callback) :** 添加公用辅助方法

  > 使用方法:
  >
  > ```js
  > //定义
  > template.helper( 'fn' , function( a , b  ){
  >   if( b == 'level' ){
  >     return a>90 ? '优':'中' ;
  >   }
  > });
  > 
  > //使用
  > <script type="text/html" id="template">
  >   <h1>{{ 100 | fn:'level' }}</h1>
  > </script>
  > 
  > //原生语法使用
  > <script type="text/html" id="template">
  >   <h1><%= 100 | fn:'level' %></h1>
  > </script>
  > 
  > //another example
  > template.helper('getJquery', function () {
  >     return $;
  > });
  > 
  > <% getJquery(); %>
  > ```

- **template.config：** 更改引擎的默认配置

  >  用法：**template.config(name, value)**
  >
  > 参数如下：
  >
  > - openTag     String          {{            语法开始标签
  > - closeTag     String          }}            语法结束标签
  > - escape        Boolean        true         是否编码输出 HTML 字符
  > - cache          Boolean        true         是否开启缓存（依赖 options 的 filename 字段）
  > - compress     Boolean       false         是否压缩 HTML 多余空白字符

- **template.compile(source, options)：** 预编译模版，返回一个渲染函数

- **template.render(source, options)：** 结合渲染函数和所需数据，渲染模版

  ```js
  var render = template.compile(tpl); // 传入模板
  var html = render(data); // 传入数据给render
  
  var source =    '<% for (var i = 0; i < list.length; i ++) { %>'
      	+        '<li><%= list[i].name %></li>'
      	+    '<% } %>';
  var render = template.compile(source);
  var html = render({list: ['摄影', '电影', '民谣', '旅行', '吉他']}); 
  ```

- **template.defaults:**模板引擎默认配置

  > options选项：
  >
  > - filename: null, // 模板名
  > - rules: [nativeRule, artRule], // 模板语法规则列表
  > - **escape: true,**  // 是否开启对模板输出语句自动编码功能。为 false 则关闭编码输出功能, escape 可以防范 XSS 攻击
  > - **debug: detectNode ? process.env.NODE_ENV !== 'production' : false, **  // 启动模板引擎调试模式。如果为 true: {cache:false, minimize:false, compileDebug:true}
  > - bail: true, // bail 如果为 true，编译错误与运行时错误都会抛出异常
  > - cache: true,  // 是否开启缓存
  > - **minimize: true, **  // 是否开启压缩。它会运行 htmlMinifier，将页面 HTML、CSS、CSS 进行压缩输出, 如果模板包含没有闭合的 HTML 标签，请不要打开 minimize，否则可能被 htmlMinifier 修复或过滤
  > - compileDebug: false,  // 是否编译调试版
  > - resolveFilename: resolveFilename,  // 模板路径转换器
  > - include: include,  // 子模板编译适配器
  > - **htmlMinifier: htmlMinifier,  **  // HTML 压缩器。仅在 NodeJS 环境下有效,HTML 压缩器配置。参见 https://github.com/kangax/html-minifier
  > - onerror: onerror,  // 错误事件。仅在 bail 为 false 时生效
  > - loader: loader,  // 模板文件加载器
  > - caches: caches,  // 缓存中心适配器（依赖 filename 字段)
  > - root: '/',   // 模板根目录。如果 filename 字段不是本地路径，则在 root 查找模板
  > - extname: '.art',   // 默认后缀名。如果没有后缀名，则会自动添加 extname
  > - ignore: [],   // 忽略的变量。被模板编译器忽略的模板变量列表
  > - imports: runtime,   // 导入的模板变量

## ejs

一套嵌入式的javascript模版引擎，拥有语法简单，直接使用js代码编写即可；执行速度快，可以缓存js函数的中间代码，从而提升执行速度；能够轻松捕获异常，输出异常发生的位置，使得调试代码很容易等特点。

**语法：** ejs不像art-template一样拥有两种语法的书写方式，ejs只有一种书写方式，且语法跟art-template的原生语法相似，具体例子如下所示：

1. 包含的标签

   - `<%` '脚本' 标签，用于流程控制，无输出。(代表脚本开始的地方)
   - `<%_` 删除其前面的空格符
   - `<%=` 输出数据到模板（输出是转义 HTML 标签）
   - `<%-` 输出非转义的数据到模板
   - `<%#` 注释标签，不执行、不输出内容
   - `<%%` 输出字符串 '<%'
   - `%>` 一般结束标签
   - `-%>` 删除紧随其后的换行符
   - `_%>` 将结束标签后面的空格符删除

2. 可以自定义分隔符

   ```js
   var ejs = require('ejs'),
   users = ['geddy', 'neil', 'alex'];
   // 单个模板文件
   ejs.render('<?= users.join(" | "); ?>', {users: users},{delimiter: '?'});
   
   // 全局
   ejs.delimiter = '$';
   ejs.render('<$= users.join(" | "); $>', {users: users});
   ```

3. 可以包含子模版

   通过include指令可以将指定相对路径文件中的模版子片段包含进来，例如：<%- include('user/show'); %>

   ```html
   <ul>
     <% users.forEach(function(user){ %>
       <%- include('user/show', {user: user}); %>
     <% }); %>
   </ul>
   ```

   include的片段是在执行时间进行插入的，所以我们可以使用一个变量来代替相对路径，<%- include(somePath) %>，全局变量可以用于所有的include中，但是本地变量需要传递才能使用，此处的变量有js中的作用域的特性。

4. 渲染方法

   * 引入ejs模块

     ```
     let ejs = require('ejs');
     let template = ejs.compile(str, options);
     template(data);
     // => Rendered HTML string
     
     ejs.render(str, data, options);
     // => Rendered HTML string
     
     ejs.renderFile(filename, data, options, function(err, str){
         // str => Rendered HTML string
     });
     ```

   * 支持客户端

     你可以下载最新版的ejs.js或者ejs.min.js，包含任意一个，你就可以全局使用ejs

     ```
     <div id="output"></div>
     <script src="ejs.min.js"></script>
     <script>
       let people = ['geddy', 'neil', 'alex'],
           html = ejs.render('<%= people.join(", "); %>', {people: people});
       // With jQuery:
       $('#output').html(html);
       // Vanilla JS:
       document.getElementById('output').innerHTML = html;
     </script>
     ```

   * options(渲染过程中用到的选项)

     - `cache` 缓存编译后的函数，需要提供 `filename`（需要缓存的文件）
     - `filename` 被 `cache` 参数用做键值，同时也用于 include 语句
     - `context` 函数执行时的上下文环境
     - `compileDebug` 当为 `false` 时不编译调试语句
     - `client` 返回独立的编译后的函数
     - `delimiter` 放在角括号中的字符，用于标记标签的开与闭
     - `debug` 将生成的函数体输出
     - `_with` 是否使用 `with() {}` 结构。如果为 `false`，所有局部数据将存储在 `locals` 对象上。
     - `localsName` 如果不使用 `with` ，localsName 将作为存储局部变量的对象的名称。默认名称是 `locals`
     - `rmWhitespace` 删除所有可安全删除的空白字符，包括开始与结尾处的空格。对于所有标签来说，它提供了一个更安全版本的 `-%>` (在一行的中间并不会剔除标签后面的换行符)。
     - `escape` 为 `<%=` 结构设置对应的转义（escape）函数。它被用于输出结果以及在生成的客户端函数中通过 `.toString()` 输出。(默认转义 XML)。

5. EJS用一个基本的进程来缓存用于呈现模板的中间JavaScript函数。使用node的LRU缓存库很容易插入LRU缓存：

   ```
   let ejs = require('ejs'),
       LRU = require('lru-cache');
   ejs.cache = LRU(100); // LRU cache with 100-item limit
   ```

   如果要清除EJS缓存，请调用ejs.clearCache。如果使用LRU缓存并需要不同的限制，则简单地将ejs.cache重新设置为LRU的新实例。

6. 使用方法:

   * 插值

     ```
     <input type="text" name="title" value="<%= post.title %>">
     ```

   * If 判断

     ```
     <% if (user) { %>
       <h2><%= user.name %></h2>
     <% } %>
     ```

   * for循环

     ```
     <ul>
       <% users.forEach(function(user){ %>
         <%- include('user/show', {user: user}); %>
       <% }); %>
     </ul>
     ```

   * 引入子模版

     ```
     <%- include('user/show', {user: user}); %>
     <%- include('components/nav') %>
     ```


