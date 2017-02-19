// Markdown文件自动转换

const fs = require('fs');
const path = require('path');
const marked = require('marked');
// 将marked文件转换成html文件形式
const browserSync = require("browser-sync");
// 实现浏览器端的自动刷新

// 接收需要转换的文件路径
const target = path.join(__dirname, process.argv[2] || './README.md');

// 转换为HTML后保存的位置
var filename = target.replace(path.extname(target), '.html');

// 获取HTML文件名，标识浏览器首先加载的那个文件
var indexpath = path.basename(filename);

// 通过browsersync创建一个文件服务器
browserSync({
  notify: false,
  server: path.dirname(target), // 网站根目录
  index: indexpath // 默认文档：（如果浏览器访问一个目录的话，默认返回那个文件）
});

// 监视文件变化，interval表示文件刷新的时间
fs.watchFile(target, { interval: 200 }, (curr, prev) => {
  // 一旦文件变化，触发该函数
  
  // 判断文件到底有没有变化， 减少不必要的转换
  if (curr.mtime === prev.mtime) {
    return false;
  }
  
   
  // 读取文件 转换为新的HTML
  fs.readFile(target, 'utf8', (err, content) => {
    if (err) {
      throw err;
    }
    var html = marked(content);
    
    // 注入CSS样式
    
      html = template.replace('{{{content}}}', html);
      // 这里的HTML就已经有内容 有样式
      
      fs.writeFile(filename, html, 'utf8', (err) => {
        // 通过browserSync发送一个消息给浏览器，流量器刷新
        browserSync.reload(indexpath);
        console.log('updated@' + new Date);
      });
  });
});

var template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div class="vs">
    {{{content}}}
  </div>
</body>
</html>
`;