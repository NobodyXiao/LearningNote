// Markdown文件自动转换

const fs = require('fs');
const path = require('path');
// 实现浏览器端的自动刷新

// 接收需要转换的文件路径
const target = path.join(__dirname, process.argv[2] || './README.md');

// 监视文件变化，interval表示文件刷新的时间
fs.watchFile(target, { interval: 200 }, (curr, prev) => {
  // 一旦文件变化，触发该函数  
    console.log(`current:${curr.size};previous:${prev.size}`);
});

