$(document).ready(function(){
	tagle();
	
})
var tagle=function(){

$("#first-menu").mouseenter(function(){
		//$("#menu-box").show();
			//显示出来之后立马又被隐藏起来，且mouseenter函数一旦被触发，就开始执行mousePlace函数，之后一直在执行
		setTimeout(mousePlace().one(),500);	
	
}
)
$("#first-menu").mouseout(function(){
		$("#menu-box").hide();
})
}

//判断鼠标位置的函数	
var mousePlace=function(e){
	
	$(document).mousemove(function (e) {
       if((e.pageX>=427&&e.pageX<=780)&&(e.pageY>=42&&e.pageY<=372)){
       	
       		$("#menu-box").show();	
       	}  	
	 
		else{
			$("#menu-box").hide();	
		}
    });
}
