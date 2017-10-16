// Vue.component('button-counter',{
// 	template:'<div><h2>我是子组件的标题</h2><slot name="slot1">只有在没有要分发的内容时才会显示。</slot></div>',
// 	data:function(){
// 		return{
// 			counter:0
// 		}
// 	},
// 	methods:{
// 		increament:function(){
// 			this.counter +=1;
// 			this.$emit('add');//要去触发的父组件的函数名，在html模版中会给此函数名进行赋值，指向实际去触发的函数
// 		}
// 	}
// })
// new Vue({
// 	el:'#main',
// 	data:{
// 		total:0
// 	},
// 	methods:{
// 		incrementTotal:function(){
// 			this.total +=1;
// 		}
// 	}
// })
Vue.component('child-component',{
	template:'<ul>' +
  '<slot name="child-ul" v-for="item in fruit" v-bind:text="item.name">?</slot>' +
  '</ul>',
	data:function(){
		return{
			fruit:[
				{name:"苹果"},
				{name:"桃子"},
				{name:"香蕉"}
			]
		}
	}
})
Vue.component('father-component',{
  template:'<child-component>' +
  '<template scope="props" slot="child-ul">' +
  '<li class="child-li" >{{props.text}}</li>' +
  '</template>' +
  '</child-component>'
});

var app16 = new Vue({
  el:'#main'
});	