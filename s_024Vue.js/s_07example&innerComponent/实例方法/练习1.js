var demo = new Vue({
	el:"#app",
	data:{
		"message":"我是更新前的内容",
	},
	updated:function(){
		console.log("我已经被更新");
	}
})
function reload(){
	demo.$forceUpdate();
}
function tick(){
	demo.message = "update to now"
	demo.$nextTick(function(){
        console.log('message更新完后我被调用了');
    })
}
