Vue.component('button-counter',{
	template:'<button v-on:click="increament">{{counter}}</button>',
	data:function(){
		return{
			counter:0
		}
	},
	methods:{
		increament:function(){
			this.counter +=1;
			this.$emit('add');//要去触发的父组件的函数名，在html模版中会给此函数名进行赋值，指向实际去触发的函数
		}
	}
})
new Vue({
	el:'#main',
	data:{
		total:0
	},
	methods:{
		incrementTotal:function(){
			this.total +=1;
		}
	}
})