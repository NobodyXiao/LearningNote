// import Store from './store';	
const STORAGE_KEY = '';
 Store={
	fetch : function(){
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
	},
	save : function(items){
		window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
	}
};
var demo = new Vue({
	el:'#app',
	data:{
		text:'',
		items:Store.fetch(),
			
	},
	methods:{
			changeClass:function(item){
				item.isFinished = !item.isFinished;
			},
			addThings:function(){
				this.items.push({label:this.text,isFinished:false});
				this.text='';	
			},
			deleteThing:function(item){
				item.isDelete = true;
			}
		},
	watch:{
			items:{
				handler:function(items){
					Store.save(items);
				},
				deep:true
		}
	}
})