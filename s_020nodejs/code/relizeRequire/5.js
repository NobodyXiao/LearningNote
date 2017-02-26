/*
* @Author: anchen
* @Date:   2016-11-23 22:18:42
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-25 07:34:21
*/
// 自己实现一个require函数
'use strict';
function $require(id) {
  // 1. 先找到文件 如果文件不存在 Cannot find module './module/modu3.js'
  // 2. 读取文件内容 内容是JS代码
  const fs = require('fs');
  const path = require('path');

  // 要加载的JS文件的完整路径
  const filename = path.join(__dirname, id);

  //C:\Users\iceStone\Desktop\fed01\day02\code\module\module4.j
  // 要加载的JS文件目录的路径（完整路径）
  const dirname =  path.dirname(filename);
  //C:\Users\iceStone\Desktop\fed01\day02\code\module

  let code = fs.readFileSync(filename, 'utf8'); // 不会进入事件队列，阻塞的操作
  // 3. 执行代码, 所要执行的代码 需要营造一个私有空间
  let module = { id: filename, exports: {} };
  let exports = module.exports;
  code =`
  (function($require, module, exports, __dirname, __filename) {
    ${code}
  })($require, module, exports, dirname, filename);`;

  eval(code);

  // 4. 返回值
  return module.exports;
}
var m1 = $require('./6.js');
m1.say('hello');