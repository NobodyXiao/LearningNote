// 定义一个extend构造器，并定义模版和相关引用数据
var authorExtend = Vue.extend({
    template:"<p><a :href='authorUrl'>{{authorName}}</a></p>",
    data:function(){
        return{
            authorName:'JSPang',
            authorUrl:'http://www.jspang.com'
        }
    }
})
// 将这个扩展器挂载到相应的dom元素上边
new authorExtend().$mount('author');