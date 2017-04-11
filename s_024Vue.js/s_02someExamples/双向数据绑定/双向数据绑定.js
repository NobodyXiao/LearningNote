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
	}
	
});
// console.log(demo.$data.show_tooltip);