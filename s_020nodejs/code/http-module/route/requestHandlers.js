// 处理url请求

var fs = require('fs');

// home.html 主页
function home(res) {
    console.log('Request handler "home" was called.');

    // 读取home.html文件，读取出来的内容放在content里边
    var content = fs.readFileSync('./views/home.html');
    // 写数据进去通用头
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // 把内容写入到响应体里边去
    res.write(content);
    // 发送响应数据
    res.end();
}

// about.html 关于页面
function about(res) {
    console.log('Request handler "about" was called.');

    // 读取about.html文件
    var content = fs.readFileSync('./views/about.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(content);
    res.end();
}

// 导出页面处理函数
exports.home = home;
exports.about = about;