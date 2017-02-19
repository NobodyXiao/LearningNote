/*
* @Author: anchen
* @Date:   2016-11-28 22:20:13
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-29 07:36:48
*/
// 动态的显示歌词
'use strict';

// 引入核心模块
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
// 方便转码，ICONV-LITE,使node支持gbk编码

// 首先要按行拿到歌词
fs.readFile('./致青春.lrc',(error,data)=>{
    var lines = iconv.decode(data, 'gbk').split('\n');
    // var lines = data.split('\n');
    // 把歌词文件按照行数进行划分
    var regex = /\[(\d{2})\:(\d{2})\.(\d{2})\]\s(.+)/;
    // 用正则表达式进行匹配
    var begin = new Date().getTime();
    lines.forEach((line)=>{
        var matches = regex.exec(line);
        if(matches){
            var m = parseFloat(matches[1]);
            var s = parseFloat(matches[2]);
            var ms =parseFloat(matches[3]);
            var lyric = matches[4];

            // 消除代码执行至输出第一句歌词时候的时间差
            var offset = new Date().getTime() - begin;
            // 当前行歌词不是立即执行
            setTimeout(() => {
                console.log(lyric);
                },m*60*1000+s*1000+ms-begin);
        }else{
            // 不是一行歌词
             console.log(line);
        }
    })
});