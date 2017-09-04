## Vue-Option##

别人嘲笑的不是你的梦想，而是你的实力；自律才自由，自律是战胜拖延症的法宝，是实现一切梦想的前提。

1. #### propsData选项####

   用在全局扩展时的数据传递，和Vue.extend一起使用，当然使用组件来做也是很容易做到的

   ```
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <script type="text/javascript" src="../assets/js/vue.js"></script>
       <title>PropsData Option Demo</title>
   </head>
   <body>
       <h1>PropsData Option Demo</h1>
       <hr>
       <header></header>
    
       <script type="text/javascript">
          var  header_a = Vue.extend({
              template:`<p>{{message}}{{a}}</p>`,
              data:function(){
                  return {
                      message:'Hello,I am Header'
                  }
              }
          }); 
          new header_a({propsData:{a:1}}).$mount('header');
       </script>
   </body>
   </html>
   ```

   总结：propsData在实际开发中我们使用的并不多，我们在后边会学到Vuex的应用，他的作用就是在单页应用中保持状态和数据的。

2. #### computed选项####

   computed 的作用主要是在不污染原始数据的情况下，对原数据进行改造输出。改造输出包括：包括格式的编辑，大小写转换，顺序重排，添加符号……。

3. #### methods选项####

   这个选项中通常放一些方法（函数），你可以在其中传参，也可以不在函数中传参数，其中有一些比较特殊的参数，$event参数，用来获取一些鼠标点击时候的属性和事件，主要用于交互性比较高的案例中；

   其次.native修饰符，可以给组件绑定一些vue实例中原生的事件，而不是组件中包含的事件和方法。

4. #### watch选项####

   watch选项通常是用来监测数据的监控，来响应数据的变化；这在执行异步操作或开销比较大的操作的时候会很有用。

   使用 `watch` 选项允许我们执行异步操作（访问一个 API），限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这是计算属性无法做到的。

   这边可能有两种方式来进行监控：

     >1.其中一种是写在vue实例里边，作为其中一个选项来写
     >
     >2.另外一种方法是写在vue实例外边，作为属性来进行监控
     >
     >```
     >app.$watch('xxx',function(){})
     >```

5. #### Mixins选项####

   > 5.1 主要有两个用途：第一种用途是，在你实例都已经写好之后，需要增加方法或者临时的活动，这时候为了避免影响源代码，会选择混入方式实现效果
   >
   > 第二种用途是很多地方可能会用到公用的方法，用混入的方法可以减少代码量，实现代码重用。
   >
   > 5.2 Mixins的调用顺序：全局的mixins>局部mixins，如果在实例中和mixins中都挂载钩子函数，那么mixins中的先执行，原生方法后执行
   >
   > 5.3 混入中的函数写在methods选项里边即可。
   >
   > 5.4其中水中的mixins选项是数组形式 mixins:[addLog]
   >
   > ```
   > <!DOCTYPE html>
   > <html lang="en">
   > <head>
   >     <meta charset="UTF-8">
   >     <script type="text/javascript" src="../assets/js/vue.js"></script>
   >     <title>Mixins Option Demo</title>
   > </head>
   > <body>
   >     <h1>Mixins Option Demo</h1>
   >     <hr>
   >     <div id="app">
   >         <p>num:{{ num }}</p>
   >         <P><button @click="add">增加数量</button></P>
   >     </div>
   >  
   >     <script type="text/javascript">
   >         //额外临时加入时，用于显示日志,方法名写在methods里边
   >         var addLog={
   >             methods:{
   > 				a:function(){
   > 					console.log("我是局部的混入方式，写在methods里边");
   > 		},
   >         }}
   >         //全局的混入方式，注意此时的mixin是没有s结尾的
   >         Vue.mixin({
   >             updated:function(){
   >                 console.log("数据放生变化,变化成"+this.num+".");
   >             }
   >         })
   >         var app=new Vue({
   >             el:'#app',
   >             data:{
   >                 num:1
   >             },
   >             methods:{
   >                 add:function(){
   >                     this.num++;
   >                 }
   >             },
   >             mixins:[addLog]//混入
   >         })
   >     </script>
   > </body>
   > </html>
   > ```

6. #### extends选项####

   其实extends选项和mixins选项非常相似，都是通过外部添加对象的形式，来对vue实例进行扩展，但是有一点需要注意，就是vue实例中的extends后边跟的不再是数组，而是一个对象。

   ```
   var app=new Vue({
               el:'#app',
               data:{
                   message:'hello Vue!'
               },
               methods:{
                   add:function(){
                       console.log('我是原生方法');
                   }
               },
               extends:bbb//后边跟的是一个选项
           })
   ```

   其中包括函数的调用顺序和mixins也是类似的，都是扩展的>实例原生的，但是如果扩展中存在有相同的函数名，那么extends里边的函数将不被执行

7. #### delimiters 选项####

   delimiters的作用是改变我们插值的符号。Vue默认的插值是双大括号{{}}。但有时我们会有需求更改这个插值的形式。

   ```
    delimiters:['${','}']
   ```

   现在我们的插值形式就变成了${}。


