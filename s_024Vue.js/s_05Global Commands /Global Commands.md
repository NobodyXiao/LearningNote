## 学习全局API的记录##

别人嘲笑的不是你的梦想，而是你的实力；自律才自由，自律是战胜拖延症的法宝，是实现一切梦想的前提。
1. #### Vue.directive自定义指令####

      >除了默认的核心指令（v-model和v-show），Vue也允许注册自定义指令，**在Vue2.0里边，代码复用的主要形式和抽象是组件**，但是有些情况下，你仍然需要对DOM元素进行底层操作，这时候就会用到自定义指令。
      >
      >```
      >//html部分
      ><div id="app">
      >        <div v-fxx="background">
      >            {{num}}
      >        </div>
      >        <div>
      >            <button @click="add">Add</button>
      >        </div>
      ></div>
      >//js部分
      >var demo = new Vue({
      >            el: '#demo',
      >            data: {
      >                "num":10,
      >                //"color":"green",
      >                "background":"#eee"
      >            },
      >            methods:{
      >                add:function(){
      >                    this.num++;
      >                }
      >            }
      >})
      >Vue.directive('fxx',function(el,binding,vnode){
      >            el.style.background=binding.value;
      >            console.log(binding);
      >})
      >```
      >
      >需要注意的几点：
      >
      >1.其中在html中，需要在要绑定的元素上绑定自定义指令，例如v-fxx="background",其中fxx是我们自定义的指令名，background是我们需要绑定的value(也是你后边变化的时候需要用到的数值)
      >
      >2.在js中，需要在vue实例中声明你的value值(也就是background)
      >
      >3.在Vue.directive()中，第一个参数是指令名，第二个参数可以是处理方法，可以是一个function(){},也可以是一个对象(不使用钩子函数的这种方式可以成为简写形式)，里边是一些钩子函数
      >
      >```
      >// 注册一个全局自定义指令 v-focus
      >Vue.directive('focus', {
      >  // 当绑定元素插入到 DOM 中。
      >  inserted: function (el) {
      >    // 聚焦元素
      >    el.focus()
      >  }
      >})
      >```
      >
      >> 至于function和钩子函数中用到的参数:
      >>
      >> el:代表你指定当前绑定的元素
      >>
      >> binding:是一个对象,包含以下属性：
      >>
      >>   >- **name**: 指令名，不包括 `v-` 前缀。
      >>   >- **value**: 指令的绑定值， 例如： `v-my-directive="1 + 1"`, value 的值是 `2`。
      >>   >- **oldValue**: 指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
      >>   >- **expression**: 绑定值的字符串形式。 例如 `v-my-directive="1 + 1"` ， expression 的值是 `"1 + 1"`。
      >>   >- **arg**: 传给指令的参数。例如 `v-my-directive:foo`， arg 的值是 `"foo"`。
      >>   >- **modifiers**: 一个包含修饰符的对象。 例如： `v-my-directive.foo.bar`, 修饰符对象 modifiers 的值是 `{ foo: true, bar: true }`。
      >>
      >> **vnode**: Vue 编译生成的虚拟节点，查阅 [VNode API](https://cn.vuejs.org/v2/api/#VNode接口) 了解更多详情。
      >>
      >> **oldVnode**: 上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

2. #### 自定义指令中的钩子函数（生命周期）##

      >指令定义函数提供了几个钩子函数（可选）：
      >
      >- `bind`: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
      >- `inserted`: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
      >- `update`: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
      >- `componentUpdated`: 被绑定元素所在模板完成一次更新周期时调用。
      >- `unbind`: 只调用一次， 指令与元素解绑时调用(通常是在app实例外部通过js原生方法去绑定一个dom，之后在js文件中定义一个函数销毁实例中的钩子函数。)
      >
      >接下来我们来看一下钩子函数的参数 (包括 `el`，`binding`，`vnode`，`oldVnode`) 。

3. #### Vue.extend 构造器的延伸##

      >Vue.extend构造器返回的是一个“扩展实例构造器”，也就是预设了部分选项的Vue实例构造器，经常服务于Vue.component用来生成组件，可以简单理解为凼仔模版中遇见该组件名称作为标签的自定义元素时，会自动调用“扩展实例构造器”来生成组件实例，并挂载到自定义元素上边。用法如下：
      >
      >```
      ><!DOCTYPE html>
      ><html lang="en">
      ><head>
      >    <meta charset="UTF-8">
      >    <script type="text/javascript" src="../assets/js/vue.js"></script>
      >    <title>vue.extend-扩展实例构造器</title>
      ></head>
      ><body>
      >    <h1>vue.extend-扩展实例构造器</h1>
      >    <hr>
      >    <author></author>
      > 
      >    <script type="text/javascript">
      >       var authorExtend = Vue.extend({
      >           template:"<p><a :href='authorUrl'>{{authorName}}</a></p>",
      >           data:function(){
      >               return{
      >                   authorName:'JSPang',
      >                   authorUrl:'http://www.jspang.com'
      >               }
      >           }
      >       });
      >       new authorExtend().$mount('author');
      >    </script>
      ></body>
      ></html>
      >```

4. #### Vue.set全局操作##

      >4.1 用于设置对象的属性，如果对象时响应式的，确保属性被创建之后也是响应式的，同时触发试图更新。这个方法主要用于避开Vue不能监测属性被添加的限制。
      >
      >简单说就是在实例外部操作内部的数据、属性或者方法。
      >
      >4.2 什么是外部数据，就是不在Vue构造器里里的data处声明，而是在构造器外部声明，然后在data处引用就可以了。外部数据的加入让程序更加灵活，我们可以在外部获取任何想要的数据形式，然后让data引用。
      >
      >```
      >var outData={
      >     arr:['aaa','bbb','ccc']
      >};
      >var app=new Vue({
      >     el:'#app',
      >     data:outData
      >})
      >```
      >
      >4.3 由于js的限制，Vue不能自动监测以下变动的数组。
      >
      >  >*当你利用索引直接设置一个项时，vue不会为我们自动更新。
      >  >
      >  >*当你修改数组的长度时，vue不会为我们自动更新。
      >
      >这时候使用Vue.set就会有实际作用。

5. #### Vue的生命周期（钩子函数）##

    Vue一共有10个生命周期函数，这些函数通常是写在methods对象里边，一边在每个不同的阶段进行不同的操作。

    以下图展示各个生命周期的发生位置：

    ![vue-lifecycle (1)](/Users/xiao/Desktop/LearningNote/LearningNote/s_024Vue.js/s_05Global Commands /vue-lifecycle (1).png)

6. #### Component父子组件关系##

    在构造器外部写局部注册组件，这种方法主要是为了适应组件代码量很大，影响可读性。

    父子组件的嵌套(组件套组件):组件嵌套，即可在构造器外边注册组件，之后在父组件的template选项中写入相关标签，之后在父组件的components选项中绑定子组件即可。

    ```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <script type="text/javascript" src="../assets/js/vue.js"></script>
        <title>component-3</title>
    </head>
    <body>
        <h1>component-3</h1>
        <hr>
        <div id="app">
          <jspang></jspang>  
        </div>
        <script type="text/javascript">
           var city={
               template:`<div>Sichuan of China</div>`
           }
            var jspang = {
                template:`<div>
                        <p> Panda from China!</p>
                        <city></city>
                </div>`,
                components:{
                    "city":city
                }
            }
            var app=new Vue({
                el:'#app',
                components:{
                    "jspang":jspang
                }
               
            })s
        </script>
    </body>
    </html>
    ```

7. #### component标签##

    component标签用于动态的绑定组件，根据条件挂载不同的组件，这时候通常在外部声明多个局部组件，之后通过在vue实例里边data选项中绑定不同的组件，在html中的component标签中通过is属性去绑定组件。

    ```
    <div id="app">
           <component v-bind:is="who"></component>
           <button @click="changeComponent">changeComponent</button>
    </div>
    var app=new Vue({
                el:'#app',
                data:{
                    who:'componentA'
                },
                components:{
                    "componentA":componentA,
                    "componentB":componentB,
                    "componentC":componentC,
                },
                methods:{
                    changeComponent:function(){
                        if(this.who=='componentA'){
                            this.who='componentB';
                        }else if(this.who=='componentB'){
                            this.who='componentC';
                        }else{
                            this.who='componentA';
                        }
                    }
                }
            })
    ```

    ​



