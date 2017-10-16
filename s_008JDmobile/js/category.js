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
    //找到子容器
    var childDom = parentDom.getElementsByTagName('ul')[0];
    var liDom = childDom.getElementsByTagName('li');

    //取到父容器内容的高度
    var parentH = parentDom.offsetHeight;
    //减去头部的高度就是内容的高度
    parentH = parentH - 45;
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
    //开始的Y坐标,Y轴的坐标系是向下为正，即越向下滑动，Y轴数值越大
    var startY = 0;
    var endY = 0;
    //当次滑动的距离
    var moveY = 0;
    //目前为止滑动的距离，在点击的时候就是要向上移动的距离
    var currY = 0;
    //滑动的时候,向下移动的最大距离和向上移动的最大滑动距离
    //（downUpMax这边取得值是负值，是因为本身向上滑动moveY就是负值）
    var upDownMax = 150,downUpMax = -(childH - parentH + 150);
    //点击时间
    var startTime = 0,endTime = 0;

    childDom.addEventListener('touchstart',function(e){
        //拿到开始的Y坐标
        startY = e.touches[0].clientY;//相对你的父容器
        //console.log(startY);
        startTime = new Date().getTime();
    },false);
    childDom.addEventListener('touchmove',function(e){
        e.preventDefault();
        
        
        //拿到结束时候的Y坐标
        endY = e.touches[0].clientY;
        moveY = startY - endY;//向下滑动为负值，向上滑动为正值
        //currY此处实际上是纪录相对于盒子向上或者是向下移动的距离
        //此时的currY-moveY,实际上是用来计算相对于上次滑动，产生的距离
        if((currY - moveY) <= upDownMax && (currY - moveY) >= downUpMax){
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
            currY = -(childH - parentH);//此时currY是负值
            addTransition();
            //translateY(x)为设定元素在元素相对于原始位置的移动距离，负值向上移动，正值向下移动
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }

        endTime = new Date().getTime();
        //如果是滑动事件小于200ms，且移动的距离为零，那么认为当前是点击动作
        if(moveY == 0 && endTime-startTime < 200){
            //获取到鼠标点击的元素的父级元素，也就是点中了哪个li
            var target = e.target.parentNode;
            //清除所有li的样式，给点击的元素加上类名now
            for(var i = 0 ; i < liDom.length ; i ++){
                liDom[i].index = i;
                liDom[i].className = " ";
            }
            target.className = "now";

            //计算需要移动的高度
            var top = target.index*46;
            //当移动的距离小于差值的时候，默认允许移动
            if(top < (childH - parentH)){
                addTransition();
                childDom.style.transform = "translateY("+(-top)+"px)";
                childDom.style.webkitTransform = "translateY("+(-top)+"px)";
                //纪录当前移动的距离
                currY = -top;
            }else{
                addTransition();
                childDom.style.transform = "translateY("+(-(childH - parentH))+"px)";
                childDom.style.webkitTransform = "translateY("+(-(childH - parentH))+"px)";
                //纪录当前移动的距离
                currY = -(childH - parentH);
            }

            childDom.style.webkitTransition= "all 0.2s ease 0s";
            childDom.style.transition = "all 0.2s ease 0s";
            childDom.style.opacity = 0;
            setTimeout(function(){
                childDom.style.opacity = 1;
            },50);

        }

        //把参数清0
        startY = 0;
        endY = 0;
        moveY = 0;
    },false);
  
}

// 右边滑动的效果,任然存在bug，当滑动一个界面的时候，再点击第二个类目的时候，滑动第二个类目右边的内容的时候，向下滑动的时候会有问题
function initRight(){
    //右侧

    var sectionList =document.getElementById("jd-content");

    var parentDom = sectionList.getElementsByTagName('section')[1];
    //找到子容器
    var childDom = parentDom.getElementsByClassName('jd-category-right')[0];
    var rightBoxs = childDom.getElementsByClassName("rightBox");
    //取到父容器内容的高度
    var parentH = parentDom.offsetHeight;
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
    var slideY =0;
    var upDownMax = 150,downUpMax = -(childH - parentH+150);
    // 让左边的list被点击的时候，重新获取右边子元素的高度，并且位置回到最初顶端位置
    var categoryLiList = document.getElementById("categoryLiList");

    categoryLiList.addEventListener('click',function(){
            slideY=currY;
            var nowChild = categoryLiList.getElementsByClassName("now");
            var attr = nowChild[0].getAttribute("data-class");
            var showRight = childDom.getElementsByClassName(attr);
            showRight[0].style.transform = "translateY("+(-slideY)+"px)";

    },false);

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
        if(moveY>0&&(currY - moveY) <= upDownMax && (currY - moveY) >= downUpMax){
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