/*
* @Author: anchen
* @Date:   2016-12-25 20:42:43
* @Last Modified by:   anchen
* @Last Modified time: 2017-01-04 22:05:25
*/

'use strict';
function Product(){

        this.name = "";
        this.salePrice = "";
        this.originalPrice = "";
        this.carYear = "";
        this.carStyle =[];
        this.color = [];
        this.button = "";
}
// 绑定图片的基本信息
    Product.prototype.bindDOMDetail=function(){
        $('#proDuctName').html(this.name);
        $('#money strong').html(this.salePrice);
        $('#money del').html(this.originalPrice);
        $('#year strong').html(this.carYear);
        $('#carStyle').html(`车款：<span class="choosed"><a href="#">${this.carStyle[0]}</a></span>
                <span><a href="#">${this.carStyle[1]}</a></span>
                <span><a href="#">${this.carStyle[2]}</a></span>`);
        $('#carColor').html(`颜色：
                <a href="#" class="choosed">
                    <i style="background-color: #90947e;"></i>${this.color[0]}
                </a>
                <a href="#">
                    <i style="background-color: #bbbfc0;"></i>${this.color[1]}
                </a>
                <a href="#">
                    <i style="background-color: #a2967c;"></i>${this.color[2]}
                </a>
                <a href="#">
                    <i style="background-color: #1e1e1e;"></i>${this.color[3]}
                </a>`);
        $('#submit').html(this.button);
    }
// 当点击右侧图片的颜色和车型的时候，相应出现红色边框
    Product.prototype.effect= function(){
        var that = this;
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
    };
// 点击购买的时候使得购物车页面变化，商品明细增加一项
    Product.prototype.buy=function(){
        var that = this;
        $("#submit").click(function(){
            // 获取当前字符并转换成字符
            var currentNum = parseInt($("#search>#cart>#cartNum").text());
            var listNum = parseInt($("#listTitle>span").text());
            // 数字进行自加操作并转换成字符
            currentNum++;
            listNum++;
            // 重新对内容进行赋值
            $("#search>#cart>#cartNum").text(currentNum.toString());
            $("#listTitle>span").text(listNum.toString());
            // 点击购买按钮之后，相应的在隐藏的购物车列表中添加一项商品信息
            // 获取商品的标题
            var cartTitle = $(this).parent().find("#proDuctName").text();
            // 获取商品的图片地址
            var imgUrl = $(this).parent().find("#imgUrl").text();

            $("#cartList").append("<div id='cartPro'></div>");
            // 选中最后添加的元素，向其中继续添加html结构
            $("#cartList>div:last").append('<a href="#"><img src="'+imgUrl+
                        '"/><span class="cartProName">'+cartTitle+'</span><span>x1</span></a>');
        });

        // 购物车页面的显示和隐藏
        $("#cart").mouseenter(function(){
            $("#cartList").show();
            $(this).css("background","#fff");
            $("#cartList").mouseenter(function(){
                $("#cartList").show();
                $("#cart").css("background","#fff");
            });
            $("#cartList").mouseleave(function(){
                $("#cartList").hide();
                $("#cart").css("background","#f0f0f0");
            });
        });
        $("#cart").mouseleave(function(){
            $("#cartList").hide();
            $(this).css("background","#f0f0f0");
        })
    };
// 点击缩略图，进行更换展示的图片，同时将大图片的地址进行更换，进行图片放大
    Product.prototype.imageEnlarge = function(){
        var that = this;
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
    };
// 点击按钮实现图片的依次切换，之后将放大的那张图片换成当前选中的图片，进行放大
    Product.prototype.thumbImgBtn = function(){
        var that = this;
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
    };


