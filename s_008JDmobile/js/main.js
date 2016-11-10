/*
* @Author: anchen
* @Date:   2016-10-26 08:28:06
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-09 08:05:39
*/

'use strict';
window.onload = function(){
    search();
    secKill();
    carousel();
}
function search(){
    // 获取搜索框元素
    var searchBox = document.getElementById("jd-search-box");
    var boxHeight = searchBox.offsetHeight;
    var bannerBox = document.getElementById("carousel-01");
    var bannerHeight = bannerBox.offsetHeight;
    var diffHeight = bannerHeight-boxHeight;

    window.onscroll = function(){
        var scrollTop = document.body.scrollTop;
        if(scrollTop>diffHeight){
           searchBox.style.background="rgba(201,21,35,1)";
        }else{
            var alpha =(scrollTop/bannerHeight)*1;
           searchBox.style.background="rgba(201,21,35,"+alpha+")";
        }
    }
}
function secKill(){
    // 获取截止日期以及于当前日期的时间差
   var deadlineTime = new Date("November 11,2016 20:44:00");
   var nowTime = new Date();
   var diffTime = (deadlineTime.getTime()-nowTime.getTime())/1000;
   var timeBox = document.getElementById("seckill-time");
   var timeSpans = timeBox.getElementsByTagName("span")
   var timer1=setInterval(function(){
    if(Math.floor(diffTime)<=0){
        clearInterval(timer1);
    }else{
        diffTime--;
        var hours = Math.floor(diffTime/(60*60));
        var minutes = Math.floor(diffTime/60%60);
        var seconds = Math.floor(diffTime%60);
        // console.log(hours+"-"+minutes+"-"+seconds);
        timeSpans[0].innerHTML = hours<10?0:hours/10;
        timeSpans[1].innerHTML = hours%10;

        timeSpans[3].innerHTML = minutes<10?0:minutes/10;
        timeSpans[4].innerHTML = minutes%10;

        timeSpans[6].innerHTML = seconds<10?0:seconds/10;
        timeSpans[7].innerHTML = seconds%10;
    }

   },1000)

}
// 轮播图的效果实现
function carousel(){
    // 获取操作元素
    var banner = document.getElementById("carousel-01");
    // 获取每一张图片的宽度
    var width = banner.offsetWidth;
    // 获取轮播图片的盒子
    var imgsBox = banner.getElementsByTagName("ul")[0];
    var imgsList = imgsBox.getElementsByTagName("li");
    // 获取轮播图片的控制按钮
    var pointsBox = banner.getElementsByTagName("ul")[1];
    var pointList = pointsBox.getElementsByTagName("li");
    var pointIndex =1;
    var index =1;
    var timer;
    // 图片过渡需要效果，加过渡函数
    var addTranstion = function(){
        imgsBox.style.transition="all 0.3s ease 0s";
        imgsBox.style.webkitTransition="all 0.3s ease 0s";
    }
    // 去除过渡效果
    var removeTranstion = function(){
        imgsBox.style.transition="none";
        imgsBox.style.webkitTransition="none";
    }
    // 改变位置函数
    var setTransform = function(t){
        imgsBox.style.transform='translateX('+t+'px)';
        imgsBox.style.webkitTransform='translateX('+t+'px)';
    }
    timer = setInterval(function(){
        for(var i=0;i<pointList.length;i++){
            pointList[i].style.background = 'none';
        }
        index++;
        pointIndex++;
        addTranstion();
        setTransform(-index*width);
        if(pointIndex>=7){
            pointIndex=1;
        }
        pointList[pointIndex-1].style.background = '#fff';
    },2000);

    imgsBox.addEventListener('transitionEnd', function(){
        if(index>6){
            index=1;
        }else if(index<=0){
            index=6;
            pointIndex=7;
        }
        removeTranstion();
        setTransform(-index*width);

    },false);
    imgsBox.addEventListener('webkitTransitionEnd', function(){
        if(index>6){
            index=1;
        }else if(index<=0){
            index=6;
            pointIndex=7;
        }
        removeTranstion();
        setTransform(-index*width);
    },false);

    // 触摸开始事件
var moveX=0;
var startX,endX;
imgsBox.addEventListener('touchstart',function(e){
    startX = e.touches[0].clientX;
    // console.log(startX);
    // 获取滑动开始时候的坐标
})

// 触摸滑动事件
imgsBox.addEventListener('touchmove',function(e){
    clearInterval(timer);
    // 首先触摸的时候应该先停止定时器，不让其自动滑动
    e.preventDefault();
    // 记录结束的位置
    endX = e.touches[0].clientX;
    // console.log(endX);
    moveX = startX-endX;
    // console.log(moveX);
    removeTranstion();
    setTransform(-index*width-moveX);

})
// 触摸结束事件
imgsBox.addEventListener('touchend',function(e){
    if(Math.abs(moveX)>1/3*width&&endX!=0){
        for(var i=0;i<pointList.length;i++){
            pointList[i].style.background = 'none';}
        // 向左滑动
        if(moveX>0){
            index++;
        }else{
            index--;
        }
        setTransform(-index*width);

    }
    // 回到原始的位置
    addTranstion();
    setTransform(-index*width);
    // 初始化
    startX =0;
    endX = 0;
    // clearInterval(timer);

    timer = setInterval(function(){
        for(var i=0;i<pointList.length;i++){
            pointList[i].style.background = 'none';
        }
        index++;
        pointIndex++;
        addTranstion();
        setTransform(-index*width);
        if(pointIndex>=7){
            pointIndex=1;
        }
        pointList[pointIndex-1].style.background = '#fff';

    },2000);
})
}

