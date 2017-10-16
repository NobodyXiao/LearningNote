/*
* @Author: anchen
* @Date:   2016-10-17 20:29:13
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-08 08:26:38
*/

'use strict';
$(document).ready(function(){
$('[data-toggle="tooltip"]').tooltip();
addbga();
changeTitle();
changeCarousel();
})

$(window).on('resize',resize).trigger('resize');
//当页面刚刚加载的时候，可能还没有执行resize中的命令，trigger函数是手动触发一下函数
function resize(){
    var windowWidth = $(window).width();//获取屏幕的宽度
    var isSmallScreen = windowWidth<768;
    //利用each函数进行遍历，来为每个item根据情况添加url地址
        $('#main_ad>.carousel-inner>.item').each(function(i,item){
            var $item = $(item);//获取item对象,转换成jquery对象，血的教训
            var imgSrc = $item.data(isSmallScreen?'image-xs':'image-lg');
            //使用data属性来获取image-xs和image-lg后边对应的属性值
            $item.css('backgroundImage','url("'+imgSrc+'")');
            // 利用jquery的css属性，帮背景添加相应的url地址
            if(isSmallScreen){
                $item.html('<img src="'+imgSrc+'" alt="扫一扫" />');
                }
                else{
                    $item.empty();
                }
         })
        setUlwidth();
        }
function setUlwidth(){
    var ulWidth = 162;
    var liWrapper =$("#ul-wrapper>ul");
    // console.log(ulWrapper);

    //获取ul的所有子元素
    var ulChildren = liWrapper.children();
    // console.log(ulChildren);
    ulChildren.each(function(index,element){
        element = $(element);
        // console.log(element.width());
        ulWidth += element.width();
    })

    //当屏幕宽度小于ul的宽度的时候再给外边的容器加滚动条
    if($(window).width() < ulWidth){
        liWrapper.css("width",ulWidth);
        $('#ul-wrapper').css('overflowX','scroll');
    }else{
        liWrapper.css("width",'100%');
        $('#ul-wrapper').css('overflowX','hidden');

    }
}

// 新闻部分，当鼠标点击的时候会改变图标的颜色
    function addbga(){
        var picList = $(".news-pics>a>span");
        picList.each(function(index,element){

            $(element).on('click',function(){
                // 先把所有的a背景都设置成白色
                $(".news-pics>a>span").css('background',"#d0d0d0");
                $(this).css('background',"#e61e25");
            })
        })
    }

//利用js动态的改变标题的内容
   function changeTitle(){
       var newsTitle = $(".news-pics>a");
       newsTitle.on('click',function(){
           var  $this = $(this);
           var  title = $this.data('title');
           $('.news-list-title').text(title);
       })
   }

//利用js实现手左滑右滑的时候切换轮播图
//1.获取轮播图容器，之后添加事件，获取到鼠标在轮播图容器上的位置
//2.根据两个鼠标开始位置和结束位置的对比，来决定是在像走滑动还是向右滑动

  function  changeCarousel(){
    //获取页面上的轮播图容器
    //并且给轮播图容器添加事件
    var $carousels = $(".carousel");
    var startX;
    var endX;
    $carousels.on('touchstart',function(e){
        startX =e.originalEvent.touches[0].clientX;
        // console.log(startX);
    })
    //获取到最后的水平坐标值，touchend函数不能使用，因为会始终找不到最后的坐标值
    $carousels.on('touchmove',function(e){
        endX =e.originalEvent.touches[0].clientX;
        var distance = Math.abs(startX-endX);
          // 当绝对值大于一定值是，认为产生了滑动
        if(distance>30){
            $(this).carousel(startX>endX?'next':'prev');
        }
        // console.log(endX);
    })


  }

