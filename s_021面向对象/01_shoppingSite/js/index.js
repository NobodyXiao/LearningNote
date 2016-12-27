/*
* @Author: anchen
* @Date:   2016-12-25 20:42:43
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-27 08:43:41
*/
'use strict';
window.onload = function(){
    imageEnlarge();
    thumbImgBtn();
    proDetialSec();
    buyCar();
}
// 新闻信息部分文字滚动效果
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
// 新闻信息部分文字滚动效果
// 图标的放大展示效果
function imageEnlarge(){
    // 获取装小图片的盒子
    var smallPic = document.getElementById('zoom_01');
    // 当我点击下边图片的时候，上边的图片进行相应的变化
    var images =$('#imageMenu>li>img');
    images.click(function(){
        var src = $(this).data("image");
        var bigImage = $(this).data("bigImage");
        $(this).parent().parent().find("img").attr("class","");
        $(this).attr("class","active");
        // 改变小图图片
        $(smallPic).attr("src",src);
        // 更换大图的图片
        $(".zoomContainer>.zoomWindowContainer>div")
        .css("backgroundImage",'url("'+bigImage+'")');

    });
    $("#zoom_01").elevateZoom();
}
function thumbImgBtn(){
    var i=4;
    $(".smallImageUp").click(function(){

        $("#imageMenu").find("img").each(function(index,ele){
                $(ele).removeClass("active");
            });

        var currentSrc = $("#zoom_01").attr("src");
        if(i<=1){
            i=4;
            $("#zoom_01").attr("src","imgs/small/image4.png");
            $(".zoomContainer>.zoomWindowContainer>div")
            .css("backgroundImage",'url("imgs/large/image4.jpg")');
            // 设置最后一个图片的边框为红色
            $("#imageMenu").find("img").each(function(index,ele){
                $(ele).removeClass("active");
            });

        }else{
            --i;
            $("#zoom_01").attr("src","imgs/small/image"+i+".png");

             $(".zoomContainer>.zoomWindowContainer>div")
            .css("backgroundImage",'url("imgs/large/image'+i+'.jpg")');
        }

        var activeImage = $("#imageMenu").find("img")[i-1];
            $(activeImage).attr("class","active");
    });

    $(".smallImageDown").click(function(){

        $("#imageMenu").find("img").each(function(index,ele){
                $(ele).removeClass("active");
            });
        var currentSrc = $("#zoom_01").attr("src");
        if(i>=4){
            i=1;
            $("#zoom_01").attr("src","imgs/small/image1.png");
            $(".zoomContainer>.zoomWindowContainer>div")
            .css("backgroundImage",'url("imgs/large/image1.jpg")');
            // 设置第一个图片边框为红色

            var activeImage = $("#imageMenu").find("img")[i-1];
            $(activeImage).attr("class","active");

        }else{
            ++i;
            $("#zoom_01").attr("src","imgs/small/image"+i+".png");

            $(".zoomContainer>.zoomWindowContainer>div")
            .css("backgroundImage",'url("imgs/large/image'+i+'.jpg")');
        }

        var activeImage = $("#imageMenu").find("img")[i-1];
            $(activeImage).attr("class","active");
    });
}
function proDetialSec(){
    $("#carStyle>span").click(function(){
        // 清空当前所有兄弟元素的红色表框，之后给选中的元素加上红色边框、
        $(this).parent().find("span").removeClass('choosed');
        $(this).attr("class","choosed");
    })
    $("#carColor>a").click(function(){
        // 清空当前所有兄弟元素的红色表框，之后给选中的元素加上红色边框、
        $(this).parent().find("a").removeClass('choosed');
        $(this).attr("class","choosed");
    })
}
function buyCar(){
    $("#submit").click(function(){
        // 获取当前字符并转换成字符
        var currentNum = parseInt($("#search>#cart>#cartNum").text());
        // 数字进行自加操作并转换成字符
        currentNum++;
        currentNum.toString();
        // 重新对内容进行赋值
        $("#search>#cart>#cartNum").text(currentNum.toString());
    })
}

