// 'use strict';
// const fs = require('fs');
// const path = require('path');
// var reader = fs.createReadStream(path.join(__dirname,'./test.cc'));
// var writer = fs.createWriteStream(path.join(__dirname,'./test1.cc'));

// reader.pipe(writer);   


// 进度条的模块
var ProgressBar = require('progress');
 
var bar = new ProgressBar('progress:[:bar]', { total: 50 ,complete:">"});
var timer = setInterval(function () {
  bar.tick(5);//控制速度的
  if (bar.complete) {
    console.log('\ncomplete\n');
    clearInterval(timer);
  }
}, 100);