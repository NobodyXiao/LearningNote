/*
* @Author: anchen
* @Date:   2016-11-19 17:26:21
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-19 22:33:19
*/


var fps=10;
var fs=require('fs');
var frames =[];
for(var i=1;i<9;i++){
    frames[frames.length]=fs.readFileSync(`./${i}.txt`,'utf8');
}
var index = 0;
var render = ()=>{
    //将当前控制台清空
    process.stdout.write('\033[2J');
    process.stdout.write('\033[0f');

    index%=8;
    process.stdout.write(frames[index++]);
};
setInterval(render,1000/fps);