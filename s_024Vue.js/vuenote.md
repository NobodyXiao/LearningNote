## 学习vue的记录##

别人嘲笑的不是你的梦想，而是你的实力；自律才自由，自律是战胜拖延症的法宝，是实现一切梦想的前提。

1. #### 使用vue的常见方法####

   a.使用独立版本，引入cdn，在开发过程中要使用开发版本，因为遇到错误，它会给出友好提示。

   b.使用npm进行安装，`npm install vue`,构建大型项目的时候使用这种方法能很友好的与Webpack\Browserify混合使用。

2. #### 关于使用npm方式构建vue的时候，独立构建和运行时构建的不同####

   两种方式的区别在于前者包括模版编译器，而后者不包括；模版编译器的作用是用于将vue模版字符串变异成js渲染函数，即template模版字符串。

   Vue.js 的运行过程实际上包含两步。第一步，编译器将字符串模板（template）编译为渲染函数（render），称之为编译过程；第二步，运行时实际调用编译的渲染函数，称之为运行过程。

   由于 Vue.js 1.0 的编译过程需要依赖浏览器的 DOM，所以无法（或者说没有意义）将编译器和运行时分开。因此在 Vue.js 1.0 分发包中，编译器和运行时是打包在一起，都在浏览器端执行。

   然而到了 Vue.js 2.0，为了支持服务端渲染（server-side rendering），编译器不能依赖于 DOM，所以必须将编译器和运行时分开。这就形成了独立构建（编译器 + 运行时）和运行时构建（仅运行时）。显而易见，运行时构建要小于独立构建。

3. #### vue的属性和方法####

   3.1每个vue实例都会代理其data对象中的所有属性，只有这些被代理的属性是响应的，如果在实例创建之后，添加属性上去，那么久不会触发视图更新。

   ```
   var data = { a: 1 }
   var vm = new Vue({
     data: data
   })
   vm.a === data.a // -> true,此时的vue实例等于上边定义的data对象
   ```

   3.2除了data属性之外，vue还暴漏了一些实例的属性和方法，这些属性和方法之前都要加上$,以便与代理区的data属性区分

   其中不要在实例属性和回调函数中使用箭头函数，因为箭头函数绑定父上下文，所以this不会像预期一样是vue实例，而且this.myMethod未被定义。

   ```
   var data = { a: 1 }
   var vm = new Vue({
     el: '#example',
     data: data
   })
   vm.$data === data // -> true
   vm.$el === document.getElementById('example') // -> true,指明vue元素绑定的元素
   // $watch 是一个实例方法
   vm.$watch('a', function (newVal, oldVal) {
     // 这个回调将在 `vm.a`  改变后调用
   })
   ```

4. #### 实例的生命周期####

   每个vue实例在被创建之前都要经过一系列初始化过程。例如实例需要**配置数据观测**，**编译模版**，**挂载实例到DOM**，然后在**数据变化时更新DOM**。在这个过程中，实例也会调用一些生命周期钩子，这就给我们提供了自定义逻辑的机会。例如created这个钩子在实例创建之后被调用：

   ```
   var vm = new Vue({
     data: {
       a: 1
     },
     created: function () {
       // `this` 指向 vm 实例
       console.log('a is: ' + this.a)
     }
   })
   // -> "a is: 1"
   ```

   也有一些其他钩子，在实例周期的不同阶段被调用，比如mouted，updated，destroyed，钩子的**this指向调用它的vue实例**。

5. #### vue过滤器####

   vue.js 2.0允许我们自己定义过滤器，可被用做一些常见的文本格式化，过滤器可以用在两个地方，：**mustache插值**和**v-bind表达式**。过滤器应该被添加在JavaScript表达式的尾部，由管道符指示。

   ```
   <!-- in mustaches -->
   {{ message | capitalize }}
   <!-- in v-bind -->
   <div v-bind:id="rawId | formatId"></div>
   ```

   **注意： ** Vue 2.x 中，过滤器只能在 mustache 绑定和 v-bind 表达式（从 2.1.0 开始支持）中使用，因为过滤器设计目的就是用于文本转换。为了在其他指令中实现更复杂的数据变换，你应该使用**计算属性**（在计算属性中定义过滤器函数，之后返回想要的数据，之后在前边渲染的时候进行遍历）。

   过滤器函数总接受表达式的值作为第一个参数，如果多个参数的时候，注意参数的顺序问题。

   另外过滤器也可以接受参数`{{ message | filterA('arg1', arg2) }}`,这里，字符串 `'arg1'` 将传给过滤器作为第二个参数， `arg2` 表达式的值将被求值然后传给过滤器作为第三个参数。

   过滤器可以串联`{{ message | filterA | filterB }}`

6. #### vue的模版语法####

     >**6.1插值**
     >
     >  >**6.1.1 文本插值**
     >  >
     >  >vue中数据绑定最常见的方式就是使用Mustache语法（双大括号）的文本插值。mustache将会被替换成对应数据对象的属性，无论何时，当数据对象发生改变的时候，插值处的内容就会被更新。如果使用**v-once指令**，那么只能进行一次插值，**数据改变是将不会被更新**。
     >  >
     >  >**6.1.2插入html文本**
     >  >
     >  >如果像插入纯html文本，需要使用**v-html语法**，但是动态的渲染html是非常危险的，因为它很容易受到XSS 的攻击，所以只对可信内容进行html插值，不要对用户提供的内容进行插值。
     >  >
     >  >**6.1.3 属性插值**
     >  >
     >  >mustache不能在HTML属性中进行插值，需要用到v-bind指令,  例子如下：
     >  >
     >  >```
     >  >此处的dynamicId即为vue实例中的属性
     >  ><div v-bind:id="dynamicId"></div>
     >  >
     >  >另外属性插值，也可以像上边的例子一样，根据后边表达式的真假，来进行绑定；如果表达式为真，那么则绑定属性class="active",如果表达式为假，那么就不绑定class。
     >  ><a class="grid-icon" v-bind:class="{ 'active': layout == 'grid'}" v-on:click="layout = 'grid'"></a>
     >  >```
     >  >
     >  >**6.1.4结合JavaScript表达式进行插值**
     >  >
     >  >目前为止，我们插值中也可以使用JavaScript表达式，例如{{item.message+"hello"}}
     >  >
     >  >{{item.message.split('').reverse().join('')}}
     >
     >**6.2指令部分**
     >
     >  >指令时带有**v-**前缀的特殊属性。指令的职责就是当表达式的值改变的时候，相应的将某些行为绑定到dom上，一些指令带有参数，**在指令后以冒号指令**，例如**v-bind**:href=“url”,此处出现的href属性就是参数，表明此处href属性和表达式url的值绑定。
     >  >
     >  >另外**v-on指令**，后边绑定的事件名称：<a v-on:click="doSomething">，此处的click就是参数
     >  >
     >  >**v-for指令**，是进行列表渲染，通常的语法是`<li v-for="item in items">{{item.text}}<li>`
     >  >
     >  >**v-if指令**，条件渲染，根据条件的真假进行渲染，通常的写法是`<div v-if="seen">haha<div>`,其中参数值seen是一个布尔值，如果seen为真，那么div被渲染出来，否则就不被渲染
     >  >
     >  >**v-show指令**，同样也是条件渲染，写法类似`<div v-show="seen">haha<div>`，只是不被渲染只是操控html的css属性，将其设置成`display:none;`
     >
     >**6.3计算属性**	
     >
     >模版内的表达式插值等等，只能实现简单的运算，如果想要放入更多复杂的逻辑，那么你就要用到计算属性。计算属性其实也是属性，可以使用vue的指令进行绑定。
     >
     >> **6.3.1 **通常计算属性是写在computed里边的，其对应着一个处理函数，如下所示：
     >>
     >> ```
     >> <div id="example">
     >>   <p>Original message: "{{ message }}"</p>
     >>   <p>Computed reversed message: "{{ reversedMessage }}"</p>
     >> </div>
     >> //js 部分
     >> var vm = new Vue({
     >>   el: '#example',
     >>   data: {
     >>     message: 'Hello'
     >>   },
     >>   computed: {
     >>     reversedMessage: function () {
     >>       return this.message.split('').reverse().join('')
     >>     }
     >>   }
     >> })
     >> ```
     >>
     >> **6.3.2 计算缓存 vs Methods**
     >>
     >> 我们也可通过将某一个函数定义成一个method而不是一个计算属性，两种方式的结果是一样的，**不同的是计算属性是基于他们的依赖进行缓存的**，计算属性只有在他的相关依赖发生改变的时候才会重新求值，如果依赖message没发生改变，那么多次访问计算属性会立即返回结果，不用再次执行函数，而method只要重新渲染的时候，method调用总会执行函数。
     >>
     >> 这样做的好处就是，如果计算属性依赖的是一个极大的数据，这样只要数据不发生改变，那么就不用重新计算，而是依赖于缓存。
     >>
     >> **6.3.3computed属性 vs watched属性**
     >>
     >> watch属性也是用来观察数据变化的，但是一般监测数据变化还是使用computed属性，因为watch属性没有computed属性自动，容易使代码变得更加复杂。
     >>
     >> 以下的例子是当lastName和firstName其中任何一个发生变动的时候，fullName就要发生变化
     >>
     >> ```
     >> watch: {
     >>     firstName: function (val) {
     >>       this.fullName = val + ' ' + this.lastName
     >>     },
     >>     lastName: function (val) {
     >>       this.fullName = this.firstName + ' ' + val
     >>     }
     >> //computed属性
     >> computed: {
     >>     fullName: function () {
     >>       return this.firstName + ' ' + this.lastName
     >>     }
     >>   }
     >> ```
     >>
     >> **6.3.4计算属性同农场只有gettet，不过需要的时候也可以提供一个setter，但是通常要明确写出来**
     >>
     >> ```
     >> computed: {
     >>   fullName: {
     >>     // getter
     >>     get: function () {
     >>       return this.firstName + ' ' + this.lastName
     >>     },
     >>     // setter
     >>     set: function (newValue) {
     >>       var names = newValue.split(' ')
     >>       this.firstName = names[0]
     >>       this.lastName = names[names.length - 1]
     >>     }
     >>   }
     >> }
     >> ```
     >>
     >> **6.3.5观察Watchers**
     >>
     >> 虽然计算属性在大多数情况下更佳合适，但是有时候也需要定义一个watcher，因为当你想要在数据变化响应时，执行大量的异步操作，或者开销大的操作时，会很有用的。
     >>
     >> 除了 `watch` 选项之外，您还可以使用 [vm.$watch API]命令。   


7. **class与style绑定**

   ​

8. **条件渲染**

9. **列表渲染**

10. **事件处理器**

11. **表单控件绑定**

12. **组件**

13. ​

    ​



