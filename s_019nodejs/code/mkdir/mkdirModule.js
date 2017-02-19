/*
* @Author: anchen
* @Date:   2016-11-30 08:02:37
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-30 08:20:55
*/
// 创建层级目录模块
// 创建模块的步骤：创建文件，定义模块成员，导出模块成员，载入模块，使用模块
'use strict';
const fs = require('fs');
const path = require('path');

function mkdirs(pathname,callback){
    var root = path.dirname(module.parent.filename);
    // 获取引入模块的执行文件目录
    pathname = path.isAbsolute(pathname) ? pathname : path.join(root,pathname);
    // 判断传入的是否是一个绝对路径
    var relativepath = path.relative(root,pathname);
    // 获取需要创建的目录和根目录之间的相对路径，方便判断之后要创建几级
    var folders = relativepath.split(path.sep);
    // 根据分隔符把相对路径进行分割
    try{
        var pre ='';
        // 定义前缀，方便层级创建
        folders.forEach(folder=>{
            // 判断文件是否已经存在
            try {
            // 如果不存在则报错
                fs.statSync(path.join(root, pre, folder));
            } catch (error) {
            //如果文件不存在，则重新创建文件
                fs.mkdirSync(path.join(root, pre, folder));
            }
            pre = path.join(pre,folder);
            // 拼合前缀

        });
        callback&&callback(null);
    }catch(error){
        callback && callback(error);
    }
};
// 导出模块成员
module.exports = mkdirs;