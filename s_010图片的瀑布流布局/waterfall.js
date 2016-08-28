window.onload = function(){

	waterfall("main","box");
	var dataimage={"image":[{'src':'image/data/26.jpg'},
							{'src':'image/data/27.jpeg'},
							{'src':'image/data/28.jpg'},
							{'src':'image/data/29.jpg'},
							{'src':'image/data/30.jpg'},
							{'src':'image/data/31.jpeg'},
							{'src':'image/data/32.jpg'},
							{'src':'image/data/33.jpg'},
							{'src':'image/data/34.jpg'},
							{'src':'image/data/35.jpg'},
							{'src':'image/data/36.jpg'},
							{'src':'image/data/37.jpg'},
							{'src':'image/data/38.jpg'},
							{'src':'image/data/39.jpg'},
							{'src':'image/data/40.jpg'},
							{'src':'image/data/41.jpg'},
							{'src':'image/data/42.jpg'},
							{'src':'image/data/43.jpg'},
							{'src':'image/data/44.jpg'},
							{'src':'image/data/45.jpg'},
							{'src':'image/data/46.jpg'},
							{'src':'image/data/47.jpg'},
							{'src':'image/data/48.jpg'},
							{'src':'image/data/49.jpg'},
							{'src':'image/data/50.jpg'},
							{'src':'image/data/51.jpg'},
							]};
	//改窗口添加滚动事件，滚动条滚动即触发
	window.onscroll= function(){
		//判断check()的数值，当此函数为真的时候加载图片
		if(check()){
			//向最大的div中添加元素
			var oParent = document.getElementById('main');
			for(var i=0;i < dataimage.image.length;i++){
				var addBox = document.createElement("div");
				addBox.className = "box";
				oParent.appendChild(addBox);  
				var addBoxchild = document.createElement("div");
				addBoxchild.className = "pic";
				addBox.appendChild(addBoxchild);
				var oImage = document.createElement("img");
				oImage.src = dataimage.image[i].src;
				addBoxchild.appendChild(oImage);

			}
			//针对添加的元素也要执行瀑布流函数
			waterfall('main','box');

		}
	}
	
}
function waterfall(parent,cls){
     var oParent = document.getElementById(parent);
     var oBox = getClassobj(oParent,cls);
    // console.log(oBox.length);
     var winWidth = document.documentElement.clientWidth;
     var boxWidth = oBox[0].offsetWidth;
     var num = Math.floor(winWidth/boxWidth);
    // console.log(num);
    oParent.style.cssText='width:'+boxWidth*num+'px;margin:0 auto;';//给最外层的盒子定宽，使得网页中显示的图片是一定数目的
    var boxHadd=[];//用于存储每一列图片相加的高度的数组的
    for(var j=0;j < oBox.length;j++)
    {
    	var picH = oBox[j].offsetHeight;//
    	if(j < num){
    		boxHadd[j] = picH;//把每一行的高放进数组中，先存储起来
    }
     else{
     	    var minH=Math.min.apply(null,boxHadd);//数组boxHadd中的最小值minH
            var minHIndex=getminHIndex(boxHadd,minH);//找出最小的那张图片的索引
            oBox[j].style.position='absolute';//设置绝对位移
            oBox[j].style.top=minH+'px';//设置第二行第一张图片的高度
            oBox[j].style.left=oBox[minHIndex].offsetLeft+'px';//设置第二行第一张图片的左侧距离
            //数组 最小高元素的高 + 添加上的oBox[j]块框高
            boxHadd[minHIndex]+=oBox[j].offsetHeight;//更新添加了块框后的列高
     }
    }
    

}
//由于html5和IE对getElementByClassName不是很支持,所以以下的函数是通过传参来获取特定位置class值得数组的。
var getClassobj = function(parents,clss){

	var allObj = parents.getElementsByTagName('*');
	var clsall = [];
	for(var i = 0;i < allObj.length;i++){
		if(allObj[i].className == clss){

			clsall.push(allObj[i]);
		}
	}
	return clsall;

}

function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}
function check(){
    var oParent=document.getElementById('main');
    var oBox=getClassobj(oParent,'box');
    var lastboxH=oBox[oBox.length-1].offsetTop+Math.floor(oBox[oBox.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性
    var documentH=document.documentElement.clientHeight;//页面高度
    return (lastboxH < scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
}