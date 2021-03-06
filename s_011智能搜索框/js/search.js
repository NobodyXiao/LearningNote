$(document).ready(function(){
	initialization();
})

var initialization=function(){
    search();
    tagle();
	shade();
	login();
    set();
	showIcon();
    showCode();
    side();
}
//展示搜索的下拉列表,并且根据输入内容动态显示结果
var search = function(){

    $(".edit").bind("keyup",function(){
        $("#search-result-list").show();
        $(document).bind('click', function() {
        $('#search-result-list').hide();
        });
        var searchkey = $('.edit').val();
        // console.log(searchkey);
        var url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+searchkey;
        querySUG(url);//querySUG()函数是用函数体包裹了一下jquery的ajax函数，方便调用和代码的规范化
    })
}

function querySUG(url){
    // document.getElementById('list').innerHTML = '';
    $.ajax({
       type : "get",
       async: true,
       url : url,
       dataType : "jsonp",
       jsonp: "cb",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
       jsonpCallback:"callback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名(类似：jQuery1102016820125747472048_1450147653563(["zhangsan", "lisi", "wangwu"]);)
       success : function(data){
           var tag = '<ul id ="search-result">';
           for(var i=0;i<data.s.length;i++){
               tag += '<li>'+data.s[i]+'</li>';
           }
           tag += '</ul>';
           $('#search-result-list').html(tag).show();
            //当鼠标点击搜索结果的时候，输入框的内容变成点击的文字内容

           var result = document.getElementById("search-result");
           var resultList = result.getElementsByTagName("li");
           $.each(resultList,function(){
               $(this).bind("click",function(){
                   $(".edit").val($(this).text());
               })
           })
          //当鼠标点击搜索结果的时候，输入框的内容变成点击的文字内容
       },
       error:function(){
           console.log('fail');
       }
    });
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
    $('#office-menu').mouseenter(function (e) {
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

            if ($('#office-list').is(':visible')) { 
                $('#office-list').hide();
            }

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
        $('#login-box').hide();
        $('#setting-box').hide();
        $('#sidebar').hide();
        stopPropagation(e);
    });
}

//点击登录按钮，出现登录下拉框，实现效果
var login=function(){

    function stopPropagation(e) {
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;
    }

    $(document).bind('click', function() {
        $('#login-box').hide();
    });

    $('.login').bind('click', function(e) {

          $('#setting-box').hide();
          $('#sidebar').hide();
          $('.bground').css('opacity', '1');
	      $('#login-box').toggle();
          stopPropagation(e);
    });
     $('.account').bind('click', function(e) {
         $('#login-box').show();
         stopPropagation(e);
    });
}

//点击设置按钮，出现设置下拉框，实现效果
var set=function(){
    function stopPropagation(e) {
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;
    }
    $(document).bind('click', function() {
        $('#setting-box').hide();
    });

    $('#settings').bind('click', function(e) {

         $('#setting-box').toggle();
         $('#login-box').hide();
         $('#sidebar').hide();
         $('.bground').css('opacity', '1');
         stopPropagation(e);
    });
}
//在鼠标hover分享的时候显示微博，微信，QQ3个并排的分享图标
var showIcon=function(){
    var timer1,timer2;
    function stopPropagation(e) {
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;
    }

    $("#share").bind("mouseenter",function(e){
        clearTimeout(timer2);
        $("#QWW span").show();
        $("#shareWay").animate({width:"206"});
        stopPropagation(e);
    })

    $("#share").bind("mouseleave",function(e){
        timer1=setTimeout(function(){
           $("#QWW span").hide();
           $("#shareWay").animate({width:0});
        },150)
        stopPropagation(e);
    })
    $("#shareWay").bind("mouseenter",function(){
        clearTimeout(timer1);
    })
    $("#shareWay").bind("mouseleave",function(){
       timer2=setTimeout(function(){
           $("#QWW span").hide();
           $("#shareWay").animate({width:0});
        },150)
    })
}
//鼠标hover二维码按钮的时候，二维码显示出来
var showCode = function(){

    $("#QRcode").bind('mouseenter', function() {
        $('#bingapp-QrCode').show();
    });
     $("#QRcode").bind('mouseleave', function() {
        $('#bingapp-QrCode').hide();
    });
}

//边栏部分的函数
var side = function(){

    function stopPropagation(e){
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;
    }

    $("#side-button").bind("click",function(e){
    $('#login-box').hide();
    $('#setting-box').hide();
    var sideBar = document.getElementById("sidebar");
    sideBar.style.height = $(document.body).outerHeight(true) + "px";
    $('.bground').css('opacity', '1');
    $('#sidebar').toggle();
     stopPropagation(e);
    })

    $(document).bind('click', function() {
        $('#sidebar').hide();
    });
}


