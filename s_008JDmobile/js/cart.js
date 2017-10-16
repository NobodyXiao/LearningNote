/*
* @Author: anchen
* @Date:   2016-11-09 07:23:59
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-10 20:57:22
*/

'use strict';
// 复选框，删除弹出层加动画效果，分类的列表出现

$(document).ready(function(){
    categoryToggle();
    selectStatus();
    deletePro();
    calculate();
    addSub();
})
// 点击右上角的分类按钮的时候，显示分类的隐藏栏
function categoryToggle(){
    $("#jd-cart-topBar>.icon-category").click(function(){
    $("#jd-cart-topBar>ul").toggle();
   });
};

// 点击checkbox的时候可以让其变成选中状态
function selectStatus(){
    var selectAll = $(".selectAll>.pro-checkBox>span");
    var shops = $(".pro-title>.pro-checkBox>span");
    var span = $(".pro-detial>.pro-detial-middle>.pro-checkBox>span");
    span.each(function(index,ele){
        $(ele).click(function(){
            var hasChecked = $(ele).hasClass("checked");
            if(!hasChecked){
                $(ele).addClass('checked');
            }else{
                $(ele).removeClass('checked');
            }

            // 获取页面中所有的spanBox,可以点击的那些按钮
            var contentSpan = $(".pro-detial").find(".pro-checkBox>span");
            // 获取页面中所有的类名为checked的元素，也就是被选中的那些元素
            var checkedSpan = $(".pro-detial").find("[class*='checked']");
            // console.log(checkedSpan.length);
            // console.log(contentSpan.length);
            // 通过匹配两者的数目是否一样，来决定结算页面的按钮的状态
            if((contentSpan.length)==checkedSpan.length){
                selectAll.addClass('checked');
            }else{
                selectAll.removeClass('checked');
            }

            // 当点击过所有店铺下边的商品的按钮之后，店铺上边的全选按钮被选中，一旦全部商品有一个不被选中，整个店铺上边的全选按钮将不被选中
            var productItem = $(this).parent().parent().parent().parent();

            var shopItemSpans = productItem.find(".pro-detial .pro-checkBox>span");
            var shopItemchecked = productItem.find(".pro-detial").find("[class*='checked']");

            if(shopItemSpans.length==shopItemchecked.length){
                productItem.find(".pro-title>.pro-checkBox>span").addClass('checked');
            }else{
                productItem.find(".pro-title>.pro-checkBox>span").removeClass('checked');
            }
            // 点击店铺下边按钮的时候，选中商品，检测页面中所有店铺的下边的选中商品数量和金额即可
            var moneySum=0;
            var selectNum=$(".pro-detial").find(".checked");
            selectNum.parent().siblings('.pro-info').find("strong").each(function(index,ele){
                moneySum+=parseInt($(ele).html());
                console.log(parseInt($(ele).html()));
            });
            $(".submit>span").html("("+selectNum.length+")");
            $(".amount-part1>span").html(moneySum);
        })
    })
    // 获取每个店铺的按钮元素，点击的时候，下边商品全选和全不选
    shops.each(function(index,ele){
        $(this).click(function(){
            // 找到店铺下边每个具体商品前边的按钮
            var shopSpans = $(this).parent().parent().siblings(".pro-detial").find(".pro-checkBox>span");
            if($(this).hasClass('checked')){
                $(this).removeClass('checked');
                shopSpans.each(function(index,ele){
                     $(ele).removeClass('checked');
                });
            }else{
                $(this).addClass('checked');
                shopSpans.each(function(index,ele){
                $(ele).addClass('checked');
             });
             }
            // 如果两个店铺前边的按钮都勾选的话，那么全选被勾上
            if(shops.length==$(".pro-title").find("[class*='checked']").length){
               selectAll.addClass("checked");
               $(".submit>span").html("("+$(".pro-detial").length+")");
                // 结算金额显示为要结算的商品金额
                // 计算所有商品的金额
                var moneySum = 0;
                $(".pro-price>strong").each(function(index,ele){
                    moneySum+=parseInt($(".pro-price>strong").html());
                })
                $(".amount-part1>span").html(moneySum);
            }else{
                   selectAll.removeClass("checked");
                   // 当前编辑的店铺按钮下边的选中的商品数量加上其他店铺的选中商品数量
                  var currentNum=$(this).parent().parent().siblings(".pro-detial").find(".checked");
                  var otherShops = $(this).parent().parent().parent().parent().parent().siblings(".shop");
                  var otherNum = otherShops.find(".pro-detial").find(".checked");
                  var seletedNum=currentNum.length+otherNum.length;
                  $(".submit>span").html("("+seletedNum+")");
                  var moneySum = 0;
                  var currentshopMoney=0;
                  var otherShopMoney=0;
                  currentNum.parent().siblings(".pro-info").find("strong").each(function(index,ele){
                        currentshopMoney+=parseInt($(ele).html());
                  });
                  otherNum.parent().siblings(".pro-info").find("strong").each(function(index,ele){
                        otherShopMoney+=parseInt($(ele).html());
                  })
                        moneySum = currentshopMoney+otherShopMoney;
                  $(".amount-part1>span").html(moneySum);

                }
        })
    })

// 点击结算部分的全选可以全选和全不选商品
    selectAll.click(function(){

        if($(this).hasClass('checked')){
            $(this).removeClass('checked');
            span.each(function(index,ele){
                $(ele).removeClass('checked');
             })
            shops.each(function(index,ele){
               $(ele).removeClass('checked');
            })
            $(".submit>span").html("(0)");
            $(".amount-part1>span").html("0");

        }else{
            $(this).addClass('checked');
            span.each(function(index,ele){
                $(ele).addClass('checked');
             })
            shops.each(function(index,ele){
               $(ele).addClass('checked');
            })
            // 结算数量显示为所有商品数量
            $(".submit>span").html("("+$(".pro-detial").length+")");
            // 结算金额显示为要结算的商品金额
            // 计算所有商品的金额
            var moneySum = 0;
            $(".pro-price>strong").each(function(index,ele){
                moneySum+=parseInt($(".pro-price>strong").html());
            })
            $(".amount-part1>span").html(moneySum);
        }

    })

};
// 统一设置pro-detial类名下的href属性
var aList = $(".pro-detial").find("a");
aList.each(function(index,ele){
    $(ele).attr("href","javascript:void(0);");
})

// 删除部分的效果
function deletePro(){

    var editBtn = $(".pro-edit>.edit>span");
    var finishBtn =$(".pro-edit>.finish>span");
    var deleteSpan = $(".pro-edit>.delete>span");
    var deleteLayer = $("#deleteLayer");
    var deleteChoice = $(".delete-choice>a");
    // console.log(editBtn);
    deleteChoice.each(function(index,ele){
    $(ele).attr("href","javascript:void(0);");
})

    editBtn.each(function(index,ele){
        $(ele).click(function(){
            if(!$(ele).hasClass('edited')){
                $(ele).addClass('edited');
                $(ele).parent().hide();
                $(ele).parent().siblings().show();
                var a=$(ele).parent().parent().parent();
                a.find(".pro-info>.pro-info-right>.pro-message").hide();
                a.find(".pro-info>.pro-info-right>.pro-prop").hide();
                a.find(".pro-info>.pro-info-right>.edit-model").show();
            }else{
                $(ele).removeClass('edited');
                $(ele).parent().siblings().hide();
                var a=$(ele).parent().parent().parent();
                a.find(".pro-info>.pro-info-right>.pro-message").show();
                a.find(".pro-info>.pro-info-right>.pro-prop").show();
                a.find(".pro-info>.pro-info-right>.edit-model").hide();
            }
    })
    })

    finishBtn.each(function(index,ele){
        $(ele).click(function(){
            $(ele).parent().hide();
            $(ele).parent().siblings('.edit').show();
            // console.log($(ele).parent().siblings('.edit>span').length);
            //使得编辑按钮的状态转变成不带edited类名，隐藏删除按钮
            $(ele).parent().siblings('.edit').children().removeClass('edited');
            $(ele).parent().siblings('.delete').hide();
            // 上边编辑完之后的信息要显示出来
            var a =$(ele).parent().parent().siblings('.pro-info');
            a.find(".pro-info-right>.pro-message").show();
            a.find(".pro-info-right>.pro-prop").show();
            a.find(".pro-info-right>.edit-model").hide();

        })
    })

    var deleteIndex;
    deleteSpan.each(function(index,ele){
        $(ele).click(function(){
            deleteLayer.show();
            deleteIndex=index;
            // 拿到删除按钮的下边就能判断是第几个商品
        })
    })
    deleteLayer.find(".cancel").click(function(){
        deleteLayer.hide();
    });
    deleteLayer.find(".sure").click(function(){
        deleteLayer.hide();
        console.log($(".pro-detial"));
       $(".pro-detial").eq(deleteIndex).hide();

    })
}

// 数字部分的计算
function calculate(){
    var numSpan = $(".pro-num");
    numSpan.each(function(index,ele){
        var num=$(ele).find("input").val();
        var priceAll = $(ele).siblings('.pro-price').find("strong");
        priceAll.html(num*799);
        $(ele).change(function(){
            var num=$(ele).find("input").val();
            var priceAll = $(ele).siblings('.pro-price').find("strong");
            priceAll.html(num*799);
            if(num<0){
                alert("请重新修改数字");
            }
        });
        var numBox =$(ele).find("input");
        numBox.on('input propertychange',(function(){
            if(num<0){
                alert("请重新修改数字");
            }
        })
        )

    })
}
// 加减按钮的操作
function addSub(){
    var add = $(".pro-num>.plus");
    var sub = $(".pro-num>.minus");
    // console.log(add);
    add.each(function(index,ele){
        $(ele).click(function(){
            var val = $(ele).siblings('input').val();
            val++;
            $(ele).siblings('input').val(val);
            var priceAll = $(ele).parent().siblings('.pro-price').find("strong");
            priceAll.html(val*799);

        })
    })

    sub.each(function(index,ele){
        $(ele).click(function(){
            var val = $(ele).siblings('input').val();
            val--;
            if(val<1){
                val=1;
            }
            $(ele).siblings('input').val(val);
            var priceAll = $(ele).parent().siblings('.pro-price').find("strong");
            priceAll.html(val*799);

        })
    })
}

