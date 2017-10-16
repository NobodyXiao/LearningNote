/*
* @Author: anchen
* @Date:   2016-11-23 20:52:26
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-23 21:40:09
*/

'use strict';
const args=process.argv.slice(2);
// 了解process.argv.slice的用法

// 当输入不是3个字符的时候
if (args.length !== 3) {
  console.log('参数不合法');
  throw new Error('参数不合法');
  // return false;
}

// 定义参数和运算符
let para1 = args[0];
let operator = args[1];
let para2 = args[2];

// 引入计算模块
const calc = require('./4.js');

let result;
// 根据操作符的不同，引入模块中的不同函数
switch(operator){
    case '+':
    result = calc.add(para1, para2);
    break;
    case '-':
    result = calc.subtract(para1,para2);
    break;
    case '*':
    case 'x':
    result = calc.mutiply(para1,para2);
    break;
    case '/':
    result = calc.divide(para1,para2);
    break;
    default:
    throw new Error('不被支持的操作符' + operator);
}
console.log(result);