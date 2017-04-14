
var demo = new Vue({
	el:'#app',

	data:{
		
		items:[
			{
			"message":"Web Development",
			"price":300,
			"isclass":false,
			},
			{
			"message":"Design",
			"price":400,
			"isclass":false,
			},
			{
			"message":"Integration",
			"price":250,
			"isclass":false,
			},
			{
			"message":"Training",
			"price":220,
			"isclass":false,
			} 				
		]			 
	},
	methods:{
		choose:function(item){		
			item.isclass = !item.isclass;

		},
		total:function(){
			var totalNum = 0;
			for(var i=0;i<this.items.length;i++){
				if(this.items[i].isclass){
					totalNum+=this.items[i].price;
				}
				
			};
			return totalNum;
		}
	}
});