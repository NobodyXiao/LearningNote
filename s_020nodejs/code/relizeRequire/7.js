/*
* @Author: anchen
* @Date:   2016-11-25 07:27:25
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-25 08:03:47
*/
// 理解require的缓存机制
// 手动清除缓存（在需要的时候）
'use strict';
setInterval(()=>{
    // 遍历require.cache中所有的键值，之后删除对应的key
    Object.keys(require.cache).forEach((key)=>{
        delete require.cache[key];
    });
    var date = require('./date.js');
    console.log(date.getTime());
},1000);
// 通过打印require.cache了解里边的成员，便于清除缓存
// console.log(require.cache);