/*
* @Author: anchen
* @Date:   2016-11-30 14:56:56
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-30 22:27:19
*/
// 在node中以追加的方式写入文件
'use strict';
var fs = require('fs');
var path = require('path');
var data = 'hello world,I can write in the file';
// 异步写入文件内容
fs.writeFile(path.join(__dirname,'./text.txt'),data,'utf8',(err)=>{
    if(err){
        console.log(err);
    }
});
// 追加文件内容
// fs.appendFile(path.join(__dirname,'./text.txt'),data,'utf8',(err)=>{
//     if(err){
//         console.log(err);
//     }
// });
//
// 流式写入文件内容
 // var streamWriter = fs.creatWriteStream(path.join(__dirname,'./text.txt'));
 // setInterval(
 //    streamWriter.write('hello',()=>{
 //     console.log('+1');
 // });
 //    ,1000)
