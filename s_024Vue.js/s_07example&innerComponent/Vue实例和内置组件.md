## Vue实例和内置组件

1. #### 实例属性####

   实例的作用就是给原生的或者其他javascript框架一个融合的接口或者说是机会，让Vue和其他框架一起使用。

   vue可以喝jquery一起使用，其中只要引用jquery的包，另外就是使用钩子函数，在相应的时候去改变

   ```
   //在Vue中使用jQuery
   mounted:function(){
      $('#app').html('我是jQuery!');
   }
   ```

   这时候定义的vue变量app，给jquery提供了入口，之后可以改变页面的值；

   另外也可以在实例外部调用实例内部的函数

   ```
   app.add();
   ```

   这时需要注意add方法的后边需要添加括号，否则不会起作用。

2. #### 实例方法####

     >2.1$mount方法
     >
     >$mount方法是用来挂载我们的扩展的,也就是将全局扩展挂载到vue实例上，这个之前在接触全局Vue实例的时候已经讲过的
     >
     >2.2$destroy() 卸载方法
     >
     >用$destroy()进行卸载，完全销毁一个实例，清楚它与其它实例的连接，解绑它的全部指令及事件监听器。（触发 `beforeDestroy` 和 `destroyed` 的钩子。）
     >
     >```
     ><p><button onclick="destroy()">卸载</button></p>
     >function destroy(){
     >   vm.$destroy();
     >}
     >```
     >
     >2.3$forceUpdate() 更新方法
     >
     >迫使Vue实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。(同样会触发updated钩子函数)
     >
     >2.4$nextTick() 数据修改方法
     >
     >将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 `this` 自动绑定到调用它的实例上
     >
     >```
     >function tick(){
     >    vm.message="update message info ";
     >    vm.$nextTick(function(){
     >        console.log('message更新完后我被调用了');
     >    })
     >}
     >```
     >
     >所以vm.$nextTick(),里边跟的是一个回调函数。

3. #### 实例事件####

     >3.1实例事件就是在构造器外部写一个调用构造器内部的方法。这样写的好处是可以通过这种写法在构造器外部调用构造器内部的数据。
     >
     >$on：监听当前实例上的自定义事件。事件可以由`vm.$emit`触发。回调函数会接收所有传入事件触发函数的额外参数。
     >
     >$on接收两个参数，第一个参数是调用时的事件名称，第二个参数是一个匿名方法,另外还需要调用$emit来执行。
     >
     >```
     >app.$on('reduce',function(){
     >    console.log('执行了reduce()');
     >    this.num--;
     >});
     >//外部调用内部事件
     >function reduceone(){
     >    app.$emit('reduce');
     >}
     >```
     >
     >3.2$once执行一次,这是与$on的区别所在
     >
     >3.3$off关闭事件
     >
     >这个事件可以用来关闭某些其它的事件
     >
     >```
     >function off(){
     >   demo.$off('reduce');
     >}
     >```
     >
     >这边注意，demo.$off('reduce');中的参数，是你在$on中绑定的函数，而并不是触发时用到的函数名

   ​

   ​