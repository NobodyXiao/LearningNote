var suggestion = ["短袖T恤","夹克长裙","棉衣羽绒服"];
var addtwo ={
	methods:{
		a:function(){
			console.log("我是用混入方式实现的+2");
			this.temperature+=2;
		},
		b:function(){
			console.log("我是用混入方式实现的-2");
			this.temperature-=2;
		}
	}

}
var demo = new Vue({
	el:"#app",
	data:{
		"temperature":16,
		"clothes":""
	},
	methods:{
		addtemp:function(){
			this.temperature++;
		},
		reducetemp:function(){
			this.temperature--;
		}
	},
	mixins:[addtwo],
	watch:{
		temperature:function(oldVal,newVal){
			 if(oldVal>26){
                   this.clothes=suggestion[0];
             }else if(oldVal<=26 && oldVal >0)
             {
                   this.clothes=suggestion[1];
             }else{
                   this.clothes=suggestion[2];
             }
		}
	}	
})