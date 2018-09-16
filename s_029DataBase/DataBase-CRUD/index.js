// 引入项目需要的模块
const express  = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      app = express(),
      expressValidator = require('express-validator');
      routes = require('./routes');

// 设置模版引擎
app.set('views', './views');


app.set('view engine', 'ejs');

// 设置中间件和静态文件路径
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

// 设置mysql连接
const connection = require('express-myconnection');
      mysql = require('mysql');

// 应用连接数据库
app.use(
  connection(mysql, {
    host: 'localhost',
    user: 'root',
    password : '258068',
    port : 3306, //port mysql
    database:'test'
  },'single')
);

// 路由
routes(app)

// 设置应用监听的端口
const server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Express app listening at: http://%s:%s ' ,host, port);
});





