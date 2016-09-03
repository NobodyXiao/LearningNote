$(document).ready(function(){
	
	initialization();

})

var initialization=function(){
//展示搜索的下拉框	
	$(".edit").bind("keyup",function(){
		$("#Drop-down").show();
		$(document).bind('click', function() {  
        $('#Drop-down').hide(); 
    });	
	})
	tagle();
	shade();
	login();
	showIcon();
	showselect();
}
//hover Office Online时候出现下拉框
var tagle=function(){
	 function stopPropagation(e) {  
        if (e.stopPropagation)  
            e.stopPropagation();  
        else  
            e.cancelBubble = true;  
    } 
    $(document).bind("mouseout",function(){
    	$('#menu-box').hide(); 	
    })
    $("#first-menu").bind("mouseenter",function(){
    	$('#menu-box').show();
    	stopPropagation(e);
    })

}
//为背景图改变透明度，来获得添加遮罩层的效果
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
  
    $('.checkin').bind('click', function(e) {  
    	
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
    	$("#share").bind("mouseenter",function(){
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
    var showselect = function(){
   			 
   		function stopPropagation(e) 
		    {  
		        if (e.stopPropagation)  
		            e.stopPropagation();  
		        else  
		            e.cancelBubble = true;  
		    } 
    	$("#tab").bind("mouseenter",function(){
    		$("#tab-2").show();

    	})
    	
    	$(document).bind("click",function(){
    		$("#tab-2").hide();
    	})

    }
