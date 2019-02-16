## express

**基于node.js平台的，快速，开放极简的web开发框架。它拥有丰富的http快捷方式和任意排列组合的connect中间件**

**1. 安装使用express**

创建一个目录myapp，之后切换到此myapp目录下，通过npm init命令生成一个package.json文件，并键入一些配置信息。之后在myapp目录下安装express

```
npm install express --save
//本地安装方式，应用此方式express模块会被添加到package.json文件中的dependencies 依赖列表中，之后在重新使用npm install 命令即可自动安装依赖列表中所列出的所有模块。
```

**2生成一个express项目**

- **2.1手动生成**

进入myapp目录，之后新建一个文件夹主作用主程序入口，app.js，之后键入以下内容

```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
```

意思是新建一个express程序，之后命名为app，把主路由*’/‘*绑定到app变量上，之后访问这个路由的时候返回文字 Hello World。之后应用express本地起一个服务，绑定端口号为3000，监听应用程序。

- **2.2利用生成器生成**

通过应用程序生成器工具可以快速生成一个应用的骨架，Express 应用生成器所创建的应用框架包含多个 JavaScript 文件、Jade 模板和针对不同用途的子目录。

安装express-generator，$ npm install express-generator -g

然后安装所有的依赖npm install,之后启动这个应用， npm start

**3.利用express托管静态文件**

通过express内置的中间件express.static可以托管静态文件，只需要将静态资源的所在目录作为参数传给 `express.static` 中间件就可以提供静态资源文件的访问了。所有文件的路径都是相对于存放目录的，因此，存放静态文件的目录名不会出现在 URL 中。

```
app.use(express.static('public'));
```

例如访问public文件下的images下的kitten.jpg，就可以直接访问地址http://localhost:3000/images/kitten.jpg

如果你的静态资源存放在多个目录下面，你可以多次调用 `express.static` 中间件：

```
app.use(express.static('public'));
app.use(express.static('files'));
```

访问静态资源文件时，`express.static` 中间件会根据目录添加的顺序查找所需的文件。

如果你希望所有通过 `express.static` 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录[指定一个挂载路径](http://www.expressjs.com.cn/4x/api.html#app.use)的方式来实现，如下所示：

```
app.use('/static', express.static('public'));
```

现在，你就爱可以通过带有 “/static” 前缀的地址来访问 `public` 目录下面的文件了。

```
http://localhost:3000/static/images/kitten.jpg
```

**4.路由** 

路由是由一个 URI、HTTP 请求（GET、POST等）和若干个句柄组成，它的结构如下：app.METHOD(path, [callback...], callback)， app 是 express 对象的一个实例， method是一个 http请求方法， path是服务器上的路径， callback是当路由匹配时要执行的函数。

- **4.1**`app.all()` 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。

在下面的例子中，来自 “/secret” 的请求，不管使用 GET、POST、PUT、DELETE 或其他任何 http模块支持的 HTTP 请求，句柄都会得到执行。

```
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
```

- **4.2**路由路径和请求方法一起定义了请求的端点，它可以是字符串、字符串模式或者正则表达式。

使用字符串的路由路径示例：

```
// 匹配 /about 路径的请求
app.get('/about', function (req, res) {
  res.send('about');
});
```

使用字符串模式的路由路径示例：

```
// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});
```

使用正则表达式的路由路径示例：

```
// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
```

- **4.3**路由句柄

可以为请求处理提供多个回调函数，其行为类似中间件。唯一的区别是这些回调函数可以通过调用 `next('route')` 方法而略过其他路由回调函数，可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。

路由句柄有多种形式，可以是一个函数、一个函数数组，或者是两者混合，如下所示.

使用一个回调函数处理路由：

```
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});
```

使用多个回调函数处理路由（记得指定 `next` 对象）：

```
app.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
```

使用回调函数数组处理路由：

```
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);
```

响应方法：

res.download() >> 提示下载文件，res.end() >> 终结响应处理流程， res.json()，res.jsonp()，发送指定格式的响应，

Res.redirect() >> 重定向请求， res.render >> 渲染视图模版， res.send() >> 发送各种类型的响应， res.sendFile >>

以八位字节流的形式发送文件， res.sendStatus() >> 设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。

**以上响应对象（`res`）的方法向客户端返回响应，终结请求响应的循环。如果在路由句柄中一个方法也不调用，来自客户端的请求会一直挂起。** 

- **4.4app.router()**

可使用 `app.route()` 创建路由路径的链式路由句柄。由于路径在一个地方指定，这样做有助于创建模块化的路由，而且减少了代码冗余和拼写错误。

```
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
```

- **4.5express.Router**

可使用express.Router()类创建模块化、可挂载的路由句柄。Router实例是一个完整的中间件和路由系统，因此被称为一个“mini-app”，使用方法如下：

创建一个名为birds.js的文件：

```
var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
```

然后在应用中加载路由模块：

```
var birds = require('./birds');
...
app.use('/birds', birds);
```

**5中间件**

Express是一个自身功能极简，完全是由路由和中间件构成俄一个web开发框架，从本质上来说，一个express应用就是在调用各种中间件。中间件是一个函数，它可以访问请求对象，响应对象，和web应用中处于请求-响应循环流程的中间件，一般被命名为next的变量。

- **5.1中间件的功能包括：执行任何代码，修改请求和响应对象，终结请求-响应循环，调用堆栈中的下一个中间件。**

- **5.2如果中间件没有终结请求-响应循环，则必须调用next()方法将控制权交给下一个中间件，否则就会挂起。**

- **5.3中间件分类**

  应用级的中间件，路由级的中间件，错误处理中间件，express内置的中间件，第三方的中间件等

- **5.4应用级中间件**

应用级中间件绑定到app对象，使用app.use()和app.METHOD(),其中METHOD指http请求方法，get，post等

```
var app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
```

也可以在一个挂载点装载一组中间件

```
// 一个中间件栈，对任何指向 /user/:id 的 HTTP 请求打印出相关信息
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

**如果想要在中间件栈中跳过剩余的中间件，可以调用next('router'),将控制权交给下一个路由，注意： next('route')只对使用 app.VERB()或 router.VERB()加载的中间件有效。**

**其中VERB指各种http的方法，比如GET/POST/DELETE等**

```
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route');
  // 否则将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  // 渲染常规页面
  res.render('regular');
});

// 处理 /user/:id， 渲染一个特殊页面
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
```

- **5.5路由级中间件**

路由级中间件和应用级中间件一样，只是它绑定的对象为 express.Router()。路由级中间件使用router.use()或者router.VERB()进行加载，写法规则和应用级中间件一致。

- **5.6错误处理中间件**

**错误处理中间件有 *4* 个参数，定义错误处理中间件时必须使用这 4 个参数。即使不需要 `next` 对象，也必须在签名中声明它，否则中间件会被识别为一个常规中间件，不能处理错误。**

```
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});	
```

- **5.7内置的中间件**

express中除了express.static(), Express 以前内置的中间件现在已经全部单独作为模块安装使用了

使用方法：express.static(root, [options])

express.static()是 Express 唯一内置的中间件。它基于 [serve-static](https://github.com/expressjs/serve-static)，负责在 Express 应用中提托管静态资源。

参数 root指提供静态资源的根目录,options是可选参数，有以下属性：

| 属性         | 描述                                                         | 类型    | 缺省值       |
| ------------ | ------------------------------------------------------------ | ------- | ------------ |
| dotfiles     | 是否对外输出文件名以点(.)开头的文件。可选值为 “allow”、“deny” 和 “ignore” | String  | “ignore”     |
| etag         | 是否启用 etag 生成                                           | Boolean | true         |
| extensions   | 设置文件扩展名备份选项                                       | Array   | []           |
| Index        | 发送目录索引文件，设置为false禁用目录索引。                  | Mixed   | “index.html” |
| lastModified | 设置 lastModified 头为文件在操作系统上的最后修改日期。可能值为 true  或 false。 | Boolean | true         |
| maxAge       | 以毫秒或者其[字符串格式](https://www.npmjs.org/package/ms)设置 Cache-Control 头的 max-age 属性。 | Number  | 0            |
| redirect     | 当路径为目录时，重定向至 “/”。                               | Boolean | true         |
| setHeaders   | 设置 HTTP 头以提供文件的函数。                               |         |              |

- **5.8第三方中间件**

通过使用第三方中间件从而为 Express 应用增加更多功能。

安装所需功能的 node 模块，并在应用中加载，可以在应用级加载，也可以在路由级加载。

```
npm install cookie-parser
```

```
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// 加载用于解析 cookie 的中间件
app.use(cookieParser());
```

