var vm = new Vue({
	el:'#main',
	data:{
		text:'HTML',
		items:[
			{message:"HTML",active:"show"},
			{message:"CSS",active:""},
			{message:"JS",active:""}
		]	
	},
	methods:{
		addClass:function(item,$index){
			this.text = item.message;
            for(var i=0; i<this.items.length;i++){
            	this.$data.items[i].active= '';
            }
            this.$data.items[$index].active = 'show';
		}
	}
})
/*
var vm = new Vue({
	el:'#main',
    data:{
    	active:'HTML',
    	items:[
        	{name:'HTML', active:true},
            {name:'CSS', active:false},
            {name:'JavaScript', active:false},
            {name:'Vue.js', active:false}
        ]
    },
    methods: {
		makeActive: function(item, index){
			this.active = item.name;
            for(var i=0; i<this.items.length;i++){
            	this.items[i].active = false;
            }
            this.items[index].active = true;
		}
	}
});
*/