/*
* @Author: anchen
* @Date:   2016-12-01 08:10:03
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-01 10:14:09
*/

'use strict';
const fs = require('fs');
const path = require('path');
// 引入核心模块

// var reader = fs.createReadStream(path.join(__dirname,'../上午06-文件流的概念.web.mkv'));
// // 创建文件读取流，其实只是建立了文件与内存缓冲区的传输通道
// fs.stat(path.join(__dirname,'../上午06-文件流的概念.web.mkv'),(err,stats)=>{
//     // 通过fs.stat获取文件的信息，实际文件的大小
//     if(stats){
//         // 如果文件信息存在，说明文件存在
//         var readTotal = 0;
//         // 定义开始的读取量
//         reader.on('data',(chunk)=>{
//             // chunk代表每次从缓冲区读取的 文件的块
//             readTotal += chunk.length;
//             console.log('读取进度：'+(readTotal/ stats.size * 100) + '%');
//         })
//     }else{
//         console.log(err);
//     }
// });

var reader = fs.createReadStream(path.join(__dirname,'../上午06-文件流的概念.web.mkv'));
var writer = fs.createWriteStream(path.join(__dirname,'../上午07-文件流的概念.web.mkv'));
// 创建文件读取流，其实只是建立了文件与内存缓冲区的传输通道
fs.stat(path.join(__dirname,'../上午06-文件流的概念.web.mkv'),(err,stats)=>{
    // 通过fs.stat获取文件的信息，实际文件的大小
    if(stats){
        // 如果文件信息存在，说明文件存在
        var readTotal = 0;
        // 定义开始的读取量
        reader.on('data',(chunk)=>{
            // chunk代表每次从缓冲区读取的文件的块
            readTotal += chunk.length;
            writer.write(chunk, (err) => {
            console.log('写 进度：' + (readTotal / stats.size * 100) + '%');
      });
        });
    }else{
      console.log(err);
   }
});