
var demo = new Vue({
            el: '#demo',
            data: {
                view:"a-view",
            },
            components:{
            	"a-view":{
            		template:"<div>我是第一个模板</div>"
            	},
            	"b-view":{
            		template:"<div>我是第二个模板</div>"
            	}
            },
            methods:{
            	 show:function(){
         			this.view = this.view == "a-view"?"b-view":"a-view";

       			}
            }
})