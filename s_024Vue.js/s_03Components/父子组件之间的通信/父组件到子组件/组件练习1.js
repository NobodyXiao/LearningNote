//创建组件的方法1:全局创建组件
// Vue.component('my-component',{
// 	template: '<div>A custom component!</div>'
// })
//创建组件的方法2:局部创建组件
var data = {
		
		counter:0
	}
var Child = {
	props:['context'],
	template: '<button v-on:click="counter += 1">{{context}}</button>',
	data: function(){
		return{
			counter:0
		}												
	}
}

	
var demo = new Vue({
	el:'#main',
	data:{
		text_content:'Edit',
	},
	components:{
		'my-component':Child
	}
});
