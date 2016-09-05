$(document).ready(function(){
	
	initialization();

})

var initialization=function(){
//展示搜索的下拉框	
	$(".edit").bind("keyup",function(){
		$("#search-result-list").show();
		$(document).bind('click', function() {  
        $('#search-result-list').hide(); 
    });	
	})
    tagle();
	shade();
	login();
	showIcon();
}
//hover Office Online时候出现下拉框
var tagle = function(){
    var timeout_id;
	function stopPropagation(e) {  
        if (e.stopPropagation)  
            e.stopPropagation();  
        else  
            e.cancelBubble = true;  
    }
    // show logic 
    $('#office-menu').mouseenter(function () {
        clearTimeout(timeout_id);
        $('#office-list').show(50);
        stopPropagation(e); 
    });
    $('#office-list').mouseenter(function(event) {
        clearTimeout(timeout_id);
    });

    // hide logic
    $('#office-menu').mouseleave(function () {
        timeout_id = setTimeout(function () {
            if ($('#office-list').is(':visible')) { //if unvisible show up it
                $('#office-list').hide();
            }
        }, 100);
    });

    $('#office-list').bind('mouseleave', function(event) {
        timeout_id = setTimeout(function () {
            if ($('#office-list').is(':visible')) { //if unvisible show up it
                $('#office-list').hide();
            }
        }, 80);
    });
    $(document).bind("click",function(){ // hide it when click documents
        if ($('#office-list').is(':visible')) {
    	   $('#office-list').hide();
        }
    })
}
//为背景图改变透明度，来获得添加遮罩层的效果,单击搜索结果，输入框内容会更改并跳转
var shade=function(){
 
  	 function stopPropagation(e) {  
        if (e.stopPropagation)  
            e.stopPropagation();  
        else  
            e.cancelBubble = true;  
    } 
    $(document).bind('click', function() {  
        $('.bground').css('opacity', '1');  
    });  
  
    $('.edit').bind('click', function(e) {  
        $('.bground').css('opacity', '0.6');
        stopPropagation(e);  
    });
    //当鼠标点击搜索结果的时候，输入框的内容变成点击的文字内容
    var result = document.getElementById("search-result");
    var resultList = result.getElementsByTagName("li");
    $.each(resultList,function(){
        $(this).bind("click",function(){
            $(".edit").val($(this).text());
        })
    })
    }

//点击登录按钮，出现登录下拉框，实现效果
    var login=function(){
    	var flag=0;
    	function stopPropagation(e) 
    {  
        if (e.stopPropagation)  
            e.stopPropagation();  
        else  
            e.cancelBubble = true;  
    }  
  
    $(document).bind('click', function() {  
        $('#login-box').hide(); 
        flag=0; 
    });  
  
    $('.login').bind('click', function(e) {  
    	
    	if(flag==0){
	         $('#login-box').show();
	         flag=1;
         } 
         else{
	         $('#login-box').hide();
	         flag=0;	
         }
         stopPropagation(e); 
    });
     $('#login-box').bind('click', function(e) {  
         $('#login-box').show();
         stopPropagation(e); 
    });
    }
    //在鼠标hover分享的时候显示微博，微信，QQ3个并排的分享图标
    var showIcon=function(){
    function stopPropagation(e) 
    {  
        if (e.stopPropagation)  
            e.stopPropagation();  
        else  
            e.cancelBubble = true;  
    } 
    	$("#share").bind("mouseenter",function(e){
    		$("#QQ").show(250);
    		$("#weixin").show(150);
    		$("#weibo").show(50);
    		stopPropagation(e);

    	})
    	$(document).bind("mouseout",function(){
    		$("#QQ").hide(250);
    		$("#weixin").hide(150);
    		$("#weibo").hide(50);
    	})
    }
  
