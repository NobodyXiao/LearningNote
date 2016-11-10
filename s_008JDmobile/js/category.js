/*
* @Author: anchen
* @Date:   2016-10-30 20:50:50
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-09 07:12:16
*/

'use strict';
$(document).ready(function(){
match();
categoryToggle();
initRight();
initLeft();
})
// 匹配点击的目录和右边显示的内容,并且相应选中的li变成选中状态
function match(){
    // 给所有选出来的li数组添加click事件，获取当前选中的li的data属性
    $(".jd-category-leftBox>ul>li").on('click',function(){
    var data = $(this).attr("data-class");
    $(this).addClass("now").siblings().removeClass("now");
    // 根据前边获取的data属性，选出右侧想用的内容块
    $(".jd-category-right>."+data).show().siblings().hide();
})

}
// 点击右上角的分类按钮的时候，显示/隐藏分类框
function categoryToggle(){
   $(".icon-category").click(function(){
   $(".jd-hiddenMenu").toggle();
   });
}


// 左边滑动的效果
function initLeft(){
    //找到父容器
    var parentDom = document.getElementsByClassName("jd-category-left")[0];
    var rightDom = document.getElementsByClassName("jd-category-leftBox")[0];
    //找到子容器
    var childDom = parentDom.getElementsByTagName('ul')[0];
    //点击滑动左分类栏
    var liDom = childDom.getElementsByTagName('li');

    //取到父容器内容的高度
    var parentH = parentDom.offsetHeight;//先取到盒子的高度
    parentH = parentH - 45;//减去头部的高度就是内容的高度
    //取到子容器盒子的高度
    var childH = childDom.offsetHeight;

    /*添加过渡*/
    var addTransition = function(){
        childDom.style.webkitTransition = "all .3s ease 0s";
        childDom.style.transition = "all .3s ease 0s";
    };
    /*删除过渡*/
    var removeTransition = function(){
        childDom.style.webkitTransition = "all 0s ease 0s";
        childDom.style.transition = "all 0s ease 0s";
    };

    /*滑动*/
    var startY = 0;//开始的Y坐标
    var endY = 0;//结束的Y坐标
    var moveY = 0;//滑动的距离
    var currY = 0;//当前translateY的值
    //滑动的时候限制的最大滑动距离和最小滑动距离
    var maxY = 150,minY = -(childH - parentH + 150);
    //点击时间
    var startTime = 0,endTime = 0;

    childDom.addEventListener('touchstart',function(e){
        //拿到开始的Y坐标
        startY = e.touches[0].clientY;//相对你的父容器
        startTime = new Date().getTime();
    },false);
    childDom.addEventListener('touchmove',function(e){
        e.preventDefault();
        console.log(1);
        //难道结束时候的Y坐标
        endY = e.touches[0].clientY;
        moveY = startY - endY;
        //只允许你在区间
        if((currY - moveY) <= maxY && (currY - moveY) >= minY){
            removeTransition();
            childDom.style.transform = "translateY("+(currY - moveY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY - moveY)+"px)";
        }
    },false);
    childDom.addEventListener('touchcancel',function(e){
        alert(0);
        //滑动结束之后记录下当前的translateY的值
        if((currY - moveY) <= 0 && (currY - moveY) >= -(childH - parentH)){
            currY = currY - moveY;
        }
        //当超过了0的时候就让子容器弹回去
        else if((currY - moveY) > 0){
            currY = 0;
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }
        //当超过了最大上滑动距离的时候就让子容器弹回去
        else if((currY - moveY) < -(childH - parentH)){
            currY = -(childH - parentH);
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }
        //把参数清0
        startY = 0;
        endY = 0;
        moveY = 0;
    });
    childDom.addEventListener('touchend',function(e){
        //滑动结束之后记录下当前的translateY的值
        if((currY - moveY) <= 0 && (currY - moveY) >= -(childH - parentH)){
            currY = currY - moveY;
        }
        //当超过了0的时候就让子容器弹回去
        else if((currY - moveY) > 0){
            currY = 0;
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }
        //当超过了最大上滑动距离的时候就让子容器弹回去
        else if((currY - moveY) < -(childH - parentH)){
            currY = -(childH - parentH);
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }

        endTime = new Date().getTime();
        //tap
        if(moveY == 0 && endTime-startTime < 200){
            var target = e.target.parentNode;
            //清除class给点击的元素加上now
            for(var i = 0 ; i < liDom.length ; i ++){
                liDom[i].index = i;
                liDom[i].className = " ";
            }
            target.className = "now";

            //计算需要滚动的高度
            var top = target.index*50;
            if(top < (childH - parentH)){
                addTransition();
                childDom.style.transform = "translateY("+(-top)+"px)";
                childDom.style.webkitTransform = "translateY("+(-top)+"px)";
                //设置当前的translateY的值
                currY = -top;
            }else{
                addTransition();
                childDom.style.transform = "translateY("+(-(childH - parentH))+"px)";
                childDom.style.webkitTransform = "translateY("+(-(childH - parentH))+"px)";
                //设置当前的translateY的值
                currY = -(childH - parentH);
            }

            rightDom.style.webkitTransition= "all 0.2s ease 0s";
            rightDom.style.transition = "all 0.2s ease 0s";
            rightDom.style.opacity = 0;
            setTimeout(function(){
                rightDom.style.opacity = 1;
            },300);
        }

        //把参数清0
        startY = 0;
        endY = 0;
        moveY = 0;
    },false);
    /* for(var i = 0 ; i < liList.length ; i ++){
     liList[i].index = i;
     liList[i].addEventListener('click',function(e){
     //清除class给点击的元素加上now
     for(var j = 0 ; j < liList.length ; j ++){
     liList[j].className = " ";
     }
     this.className = "now";

     //计算需要滚动的高度
     var top = this.index*liH;
     if(top < (childH - parentH)){
     addTransition();
     childDom.style.transform = "translateY("+(-top)+"px)";
     childDom.style.webkitTransform = "translateY("+(-top)+"px)";
     //设置当前的translateY的值
     currY = -top;
     }else{
     addTransition();
     childDom.style.transform = "translateY("+(-(childH - parentH))+"px)";
     childDom.style.webkitTransform = "translateY("+(-(childH - parentH))+"px)";
     //设置当前的translateY的值
     currY = -(childH - parentH);
     }

     //bug 2015-12-11 不加dom操作  分类点击后无法滑动
     //模拟加载效果
     /!*rightDom.style.webkitTransition= "all 0.2s ease 0s";
     rightDom.style.transition = "all 0.2s ease 0s";
     rightDom.style.opacity = 0;
     setTimeout(function(){
     rightDom.style.opacity = 1;
     },300);*!/

     },false);
     }*/
}

// 右边滑动的效果
function initRight(){
    //右侧

    var sectionList =document.getElementById("jd-content");

    var parentDom = sectionList.getElementsByTagName('section')[1];
    //找到子容器
    var childDom = parentDom.getElementsByClassName('jd-category-right')[0];

    //取到父容器内容的高度
    var parentH = parentDom.offsetHeight;
    //取到子容器盒子的高度
    var childH = childDom.offsetHeight;
    // 让左边的list被点击的时候，重新获取右边子元素的高度，并且位置回到最初顶端位置
    var categoryLiList = document.getElementById("categoryLiList");
    categoryLiList.addEventListener('click',function(){

            childDom.style.transform = "translateY("+currY+"px)";
            var childH = childDom.offsetHeight;

    },false);
    /*添加过渡*/
    var addTransition = function(){
        childDom.style.webkitTransition = "all .3s ease 0s";
        childDom.style.transition = "all .3s ease 0s";
    };
    /*删除过渡*/
    var removeTransition = function(){
        childDom.style.webkitTransition = "all 0s ease 0s";
        childDom.style.transition = "all 0s ease 0s";
    };

    /*滑动*/
    var startY = 0;//开始的Y坐标
    var endY = 0;//结束的Y坐标
    var moveY = 0;//滑动的距离
    var currY = 0;//当前translateY的值
    //滑动的时候限制的最大滑动距离和最小滑动距离
    var maxY = 150,minY = -(childH - parentH + 150);

    childDom.addEventListener('touchstart',function(e){
        //拿到开始的Y坐标
        startY = e.touches[0].clientY;

    },false);
    childDom.addEventListener('touchmove',function(e){
        e.preventDefault();
        //拿到结束时候的Y坐标
        endY = e.touches[0].clientY;
        moveY = startY - endY;

        //只允许你在区间
        if((currY - moveY) <= maxY && (currY - moveY) >= minY){
            removeTransition();
            childDom.style.transform = "translateY("+(currY - moveY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY - moveY)+"px)";
        }
    },false);
    childDom.addEventListener('touchend',function(e){

        //滑动结束之后记录下当前的translateY的值
        if((currY - moveY) <= 0 && (currY - moveY) >= -(childH - parentH)){
            currY = currY - moveY;

        }
        //当超过了0的时候就让子容器弹回去
        else if((currY - moveY) > 0){
            currY = 0;
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }
        //当超过了最大上滑动距离的时候就让子容器弹回去
        else if((currY - moveY) < -(childH - parentH)){
            currY = -(childH - parentH);

            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }
        startY = 0;
        endY = 0;
    },false);
}