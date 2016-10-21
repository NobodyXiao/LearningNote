/*
* @Author: anchen
* @Date:   2016-10-17 20:29:13
* @Last Modified by:   anchen
* @Last Modified time: 2016-10-21 09:15:24
*/

'use strict';
$(document).ready(function(){
$('[data-toggle="tooltip"]').tooltip();
})
$(window).on('resize',resize).trigger('resize');
//当页面刚刚加载的时候，可能还没有执行resize中的命令，trigger函数是手动触发一下函数
function resize(){
    var windowWidth = $(window).width();//获取屏幕的宽度
    var isSmallScreen = windowWidth<768;
    //利用each函数进行遍历，来为每个item根据情况添加url地址
        $('#main_ad>.carousel-inner>.item').each(function(i,item){
            var $item = $(item);//获取item对象,转换成jquery对象，重要的知识点，血的教训
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
        }


