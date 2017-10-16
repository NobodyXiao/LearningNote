// 主程序

// 引入server，router及requestHandler
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

// 保存url处理方法,定义一个空对象，向其中添加请求地址
var handle = {};
// 将相应的处理函数跟请求地址匹配起来
handle['/'] = requestHandlers.home;
handle['/about'] = requestHandlers.about;
// handle{"/":requestHandlers.home,'/about':requestHandlers.about};

// 启动http server
server.start(router.route, handle);