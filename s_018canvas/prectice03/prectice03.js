/*
* @Author: anchen
* @Date:   2016-11-14 22:13:24
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-14 22:13:36
*/

'use strict';

(function(){

    var canvas = document.getElementById("canvasElem");
    var ctx = canvas.getContext("2d");
    canvas.width =200;
    canvas.height =200;
    canvas.style.border = "1px solid #000";
    // ctx.stroke();
    var dirIndex =0;
    var img = new Image();
    // 创建一个图片对象
    img.src = 'NPC4.png';
    // 设置图片的来源
    // 图片加载完之后对图片进行操作
    img.onload = function(){
        var frameIndex = 0;
        setInterval(function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // 清除画布，否则看不到效果
            // canvas.width = canvas.width;
            ctx.drawImage(
                img,
                frameIndex*40, //需要开始进行截取时候的X轴位置
                dirIndex * 65, //需要开始进行截取时候的Y轴位置
                40,//需要截取的宽度
                65,//需要截取的高度
                60,//开始绘制的X轴位置
                30,//开始绘制的Y轴位置
                80,//绘制的宽度
                65*2//绘制的高度
                )
            frameIndex++;
            frameIndex%=4;//图片循环
        },200);

    //==================绑定事件==============
            //绑定按钮的点击事件
        var btnLeft = document.getElementById('btn-dir-left');
        btnLeft.onclick = function() {
            //小哥哥朝着左方向
            dirIndex = 1;
        };
        var btnRight = document.getElementById('btn-dir-right');
        btnRight.onclick = function() {
            //小哥哥朝着右方向
            dirIndex = 2;
        };
        var btnUp = document.getElementById("btn-dir-up");
        btnUp.onclick = function() {
            //小哥哥朝着上方向
            dirIndex = 3;
        };
        var btnDown = document.getElementById('btn-dir-down');
        btnDown.onclick = function() {
            //小哥哥朝着下方向
            dirIndex = 0;
        };

    }
 }())





