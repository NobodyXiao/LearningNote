/*
* @Author: anchen
* @Date:   2016-10-30 20:50:50
* @Last Modified by:   anchen
* @Last Modified time: 2016-10-31 07:17:12
*/

'use strict';
$(document).ready(function(){
changeli();
})
// 当左边通栏中的A被点击的时候字体变成红色,右边边框消失,要给当前被点击的li加上now类名

function changeli(){
    var $lis = $(".jd-category-left>div>ul>li");
    $lis.each(function(index,element){

        $(this).on('click',function(){
            $(this).addClass('now').siblings().removeClass("now");;
        })
    })
}