## artTemplate：高性能的JavaScript模板引擎 

**1)** artTemplate模板引擎的使用方法：

​	**a)** 首页应该在页面中引入模板擎：

```
<script src="dist/template-native.js"></script>对应原生语法模板
<script src="dist/template.js"></script>对应简洁语法模板
```

​	**b)** 编写模板，使用一个type="text/html"的script标签存放模板，其中type类型是为了告诉浏览器此script中编写的HTML代码：

```
简洁模板：
<script id="test" type="text/html">
<h1>{{title}}</h1>
<ul>
    {{each list as value i}}
        <li>索引 {{i + 1}} ：{{value}}</li>
    {{/each}}
</ul>
</script>
原生模板：
<script id="test" type="text/html">
<h1><%= title %></h1>
<ul>
    <% for(var i=0; i<list.length; i++){ %> 
        <%= i+1 %> <%= list[i] %>
    <%} %>
</ul>
</script>
```

​	**c)** 渲染模板

```
var data = {
    title: '标签',
    list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
};
var html = template('test', data);
document.getElementById('content').innerHTML = html;
```

**2)** 模板的语法：简洁语法（推荐使用的），原生语法

**a)** 简洁语法：

- **a1)表达式：`{{` 与 `}}` 符号包裹起来的语句则为模板的逻辑表达式。**

	> 输出表达式：
	> 对内容编码输出：{{content}}	
	不编码输出：{{#content}}

- **a2)逻辑：遍历表达式**

```html
{{each list as value index}}
    <li>{{index}} - {{value.user}}</li>
{{/each}}
```

- **a3)模板包含表达式** 
 > 用于嵌入子模板:  {{include 'template_name'}} 
 >
 >子模板默认共享当前数据，亦可以指定数据：{{include 'template_name' , news_list}}

- **a4)if判断**

**b)** 原生语法：

- **b1)** 表达式：`<%` 与 `%>` 符号包裹起来的语句则为模板的逻辑表达式。

	> 输出表达式：
	
	> 对内容编码输出：<%=content%>
	
	> 不编码输出：<%=#content%>

- **b2)** 逻辑：支持使用 js 原生语法	

```html
<h1><%=title%></h1>
<ul>
    <%for(i = 0; i < list.length; i ++) {%>
        <li>条目内容 <%=i + 1%> ：<%=list[i]%></li>
    <%}%>
</ul>
```

- **b3)** 模板包含表达式

	> 用于嵌入子模板:  <% include('template_name') %>
	
	> 子模板默认共享当前数据，亦可以指定数据：<% include('template_name', news_list) %>

**3) 渲染的方法（在渲染模板中使用的）template(id, data):**

​根据 id 渲染模板。内部会根据document.getElementById(id)查找模板，渲染完成之后就可以将此         模板添加到HTML文档中进行显示。

​其中data数据在渲染模板中是直接使用的，一般传入的是一个对象，直接拿里边的数据进行使用。

​例如data是object类型

	​		object{
	
	​			error_code:0
	
	​			reason:"Success"
	
	​			result{
	
	​			data:[{},{},{}]
	
	​			}
	
	​		}

那么如果在编写模板的时候，需要引用result对象中的data数组的时候，直接写result.data[i]即可，相当于是比template(id, data)中的data缩进一级，少表示一级

​如果没有 data 参数，那么将返回一渲染函数。

**template.helper(name, callback) :** 添加辅助方法