var demo = new Vue({
	el:"#app",
	data:{
		"num":"1",
	},
	methods:{
		add:function(){
			this.num++;
		}
	}
})
demo.$on('reduce',function(){
	this.num--;
});
function reduceone(){
	demo.$emit('reduce');
}
function off(){
   demo.$off('reduce');
}
