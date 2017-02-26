
// 递归目录树
'use strict';
const fs = require('fs');
const path = require('path');
// 引入核心模块

// 获取当前有没有传入目标路径,你在命令行输入的路径
var target = path.join(__dirname, process.argv[2] || './');
// 编写显示目录树的函数，方便以后递归调用
function load(target, depth){
    var prefix = new Array(depth+1).join('| ');
    var dirinfos = fs.readdirSync(target);
    // 同步读取文件，避免文件顺序会发生颠倒的情况
    var dirs = [];
    var files = [];

    dirinfos.forEach(info=>{
        var stats = fs.statSync(path.join(target,info));
        // 获取当前目录的文件信息
        // 通过if函数区分开哪些是文件夹，哪些是文件
        if(stats.isFile()){
            files.push(info);
        }else{
            dirs.push(info);
        }
    });
    dirs.forEach(dir=>{
        console.log(`${prefix}├─${dir}`);
        // 当前是一个目录 需要深入进去
        load(path.join(target,dir),depth+1);
    });
    var count = files.length-1;
    files.forEach(file=>{
        var temp = count -- ?'├':'└';
        console.log(`${prefix}${temp}─${file}`);
    })
};
load(target, 0);
