Vue.component('simple-grid', {
            template: '#grid-template',
            props: {
                data: Array,
                columns: Array,
                filterKey: String
            },
            computed:{
            	filterBy:function(){
            		var value = this.filterKey;
            		if(!value){
            			return this.data;
            		}
            		value = value.trim().toLowerCase();
          			var result = this.data.filter(function(item){
            			if(item.name.toLowerCase().indexOf(value) !== -1){
                			return item;
          	  			}
          			})      
        			return result;
            	}
            }
})
var demo = new Vue({
            el: '#app',
            data: {
                searchQuery: '',
                gridColumns: ['name', 'age', 'sex'],
                gridData: [{
                    name: 'Jack',
                    age: 30,
                    sex: 'Male'
                }, {
                    name: 'Bill',
                    age: 26,
                    sex: 'Male'
                }, {
                    name: 'Tracy',
                    age: 22,
                    sex: 'Female'
                }, {
                    name: 'Chris',
                    age: 36,
                    sex: 'Male'
                }]
            }
})