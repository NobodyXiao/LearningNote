var suggestion = ["短袖T恤","夹克长裙","棉衣羽绒服"];
var demo = new Vue({
	el:"#app",
	data:{
		"message":"",
		"num":0
	},
	mounted:function(){
		$("#app").html("我是jquery输入的内容");
	},
	methods:{
		add:function(){
			this.num++;
			console.log("我已经实现+1");
		}
	}
})
// 通过声明的vue实例，可以在外部调用methods里边的方法
demo.add();