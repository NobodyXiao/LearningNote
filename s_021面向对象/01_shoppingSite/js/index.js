/*
* @Author: anchen
* @Date:   2016-12-25 20:42:43
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-25 22:26:30
*/
'use strict';
    var Con = document.getElementById("sales-detials");
    Con.innerHTML+=Con.innerHTML;
    Con.scrollTop = 0;
    var iLiheight = 24;//滚动的行高
    var time = 50;
    var timer;//定时器
    var speed = 2000;//每两秒钟滚动一次
    function startMove(){
        timer=setInterval("scroll()",time);
        //使其接着向上滚动
        Con.scrollTop++;
        console.log(Con.scrollTop);
    }


    function scroll() {

        if(Con.scrollTop%iLiheight == 0){
            clearInterval(timer);
           //如果内容滚动的高度是行高的整数倍，那么就停止定时器，两秒之后再接着循环，制作出停顿的效果
           setTimeout("startMove()",speed);
           return;
       }

        if(Con.scrollTop >= Con.scrollHeight/2) {
            // 如果是内容滚动了一半，那么就把滚动的高度清空
            Con.scrollTop = 0;
        } else {
            Con.scrollTop++;
        }
    }

    // 2秒之后启动定时器，相当于一个trigger的作用
    setTimeout("startMove()",speed);


