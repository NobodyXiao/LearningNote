/*
* @Author: anchen
* @Date:   2016-11-30 13:38:22
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-30 14:20:18
*/

'use strict';
console.log('开始读取');
const fs = require('fs');
// 异步读取文件
// fs.readFile('./text.txt','utf8',(err,data)=>{
//     if(err){
//         console.log(data);
//     }else{
//         console.log(data);
//     }
// });
// 同步读取文件
var data = fs.readFileSync('./text.txt','utf-8');
console.log(data);
console.log('读取结束');