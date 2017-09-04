
var demo = new Vue({
            el: '#demo',
            data: {
                "num":10,
                "color":"green",
                "background":"#eee"
            },
            methods:{
                add:function(){
                    this.num++;
                }
            }
})
// 简写形式
// Vue.directive('fxx',function(el,binding,vnode){
//             el.style.background=binding.value;
//             console.log(binding);

// })
Vue.directive('fxx',{
    // 只调用一次，第一次绑定就调用
    bind:function(el,binding,vonde){
        el.style.background=binding.value;
        console.log("1");
    },
    // 被绑定元素插入父节点时调用
    inserted:function(el,binding,vonde){
        el.style.background=binding.value;
        console.log("2");
    },
    // 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
    update:function(el,binding,vonde){
        el.style.background=binding.value;
        console.log("3");
    },
    // 被绑定元素所在模板完成一次更新周期时调用。
    componentUpdated:function(el,binding,vonde){
        el.style.background=binding.value;
        console.log("4");
    },
    // 只调用一次， 指令与元素解绑时调用。
    unbind:function(el,binding,vonde){
        el.style.background=binding.value;
        console.log("5");
    }

})
function unbind(){
    demo.$destroy();
    console.log("5");
}