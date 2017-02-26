/*
* @Author: anchen
* @Date:   2016-11-22 21:06:43
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-22 21:15:39
*/
const fs = require('fs');

console.time('timer');
//先判断是否有相应的文件
fs.stat('./ceshi.md',(err,stats)=>{
    if(err){
        console.error('文件不存在');
        fs.writeFile('./ceshi.md',new Date(),(err)=>{
            if(err){
                console.error(err);
                return false;
            }
            console.log('文件创建成功');
        });
        return false;
    }
    // 存在此文件的情况下要删除
     fs.unlink('./ceshi.md',(err)=>{
        if(err){
            console.error(err);
            return false;
        }
        fs.writeFile('./ceshi.md',new Date(),(err)=>{
            if(err){
                console.error(err);
                return false;
            }
            console.log('文件删除后创建成功');
        });
     });
});
console.timeEnd('timer');