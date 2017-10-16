//创建组件的方法1:全局创建组件
// Vue.component('my-component',{
// 	template: '<div>A custom component!</div>'
// })
//创建组件的方法2:局部创建组件
var Child = {
	template: '<div>A custom component!</div>'
}

	
var demo = new Vue({
	el:'#main',
	data:{
		show_tooltip:false,
		text_content:'Edit me.'
	},
	methods:{
		hideTooltip:function(){
			this.show_tooltip = false;
			console.log(this.show_tooltip);
		},
		toggleTooltip:function(){
			this.show_tooltip = !this.show_tooltip;
			console.log(this.show_tooltip);
		}
	},
	components:{
		'my-component':Child
	}
});
