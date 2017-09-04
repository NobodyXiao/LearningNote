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

   ```Js
   var data = { a: 1 }
   var vm = new Vue({
     data: data
   })
   vm.a === data.a // -> true,此时的vue实例等于上边定义的data对象
   ```

   3.2除了data属性之外，vue还暴漏了一些实例的属性和方法，这些属性和方法之前都要加上$,以便与代理区的data属性区分

   其中不要在实例属性和回调函数中使用箭头函数，因为箭头函数绑定父上下文，所以this不会像预期一样是vue实例，而且this.myMethod未被定义。

   ```Js
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

   ```Js
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
     >> ```Js
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
     >> ```Js
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


7. #### class与style绑定####

   我们使用v-bind可以绑定元素的class列表和内联样式等等属性。其中v-bind在绑定class和style的时候，其所跟随的结果类型除了表达式还可以是数组或者对象。  

     >**7.1对象形式绑定class**
     >
     >> 7.1.1`<div v-bind:class="{ active: isActive }"></div>`,其中当isActive为真值的时候，元素就被添加上类名active，否则不添加。
     >>
     >> 7.1.2当然我们也可以直接在这里绑定返回对象的计算属性。当然这时候计算属性里边返回的就是对象   `<div v-bind:class="classObject"></div>`
     >>
     >> ```Js
     >> data: {
     >>   isActive: true,
     >>   error: null
     >> },
     >> computed: {
     >>   classObject: function () {
     >>     return {
     >>       active: this.isActive && !this.error,
     >>       'text-danger': this.error && this.error.type === 'fatal',
     >>     }
     >>   }
     >> }
     >> ```
     >
     >> **7.2数组语法绑定class**
     >>
     >> > 7.2.1我们同时可以把一个数组传给v-bind:class，以应用一个class列表
     >> >
     >> > `<div v-bind:class="[activeClass, errorClass]">`
     >> >
     >> > ```Js
     >> > data: {
     >> >   activeClass: 'active',
     >> >   errorClass: 'text-danger'
     >> > }
     >> > ```
     >> >
     >> > 直接被渲染成<div class="active text-danger"></div>
     >> >
     >> > 7.2.2如果你想根据条件切换列表中的class，可以使用三元表达式：
     >> >
     >> > `<div v-bind:class="[isActive ? activeClass : '', errorClass]">`
     >> >
     >> > 7.2.3不过当有多个条件class时这样写有些繁琐，可以在数组语法中使用对象语法：
     >> >
     >
     >**7.3绑定style**
     >
     >**7.3.1对象语法绑定style**
     >
     >   >**v-bind:style**的对象语法十分直观——看着非常像 CSS ，其实它是一个 JavaScript 对象。 CSS 属性名可以用驼峰式（camelCase）或短横分隔命名（kebab-case）：
     >   >
     >   >`<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>`
     >   >
     >   >```js
     >   >data: {
     >   >  activeColor: 'red',
     >   >  fontSize: 30
     >   >}
     >   >```
     >   >
     >   >**也可以直接绑定一个样式对象**
     >   >
     >   >`<div v-bind:style="styleObject"></div>`
     >   >
     >   >```Js
     >   >data: {
     >   >  styleObject: {
     >   >    color: 'red',
     >   >    fontSize: '13px'
     >   >  }
     >   >}
     >   >```
     >
     >**7.3.2数组语法绑定style**
     >
     >`<div v-bind:style="[baseStyles, overridingStyles]">`
     >
     >**当 `v-bind:style` 使用需要特定前缀的 CSS 属性时，如 `transform` ，Vue.js 会自动侦测并添加相应的前缀。**

8. #### 条件渲染####

   vue中的条件渲染有两种语法，v-if，v-show，两者的区别在于，v-show是直接操作class属性来实现的。

   >**8.1v-if**
   >
   >  >基本语法是（v-else跟在v-if后边，不可单独使用；v-else-if充当 v-if 的“else-if 块”，也不可单独使用）
   >  >
   >  >**当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。**
   >  >
   >  >```html
   >  ><h1 v-if="ok">Yes</h1>
   >  ><h1 v-else>No</h1>
   >  >```
   >  >
   >  >**template中的v-if条件组**
   >  >
   >  >因为 `v-if` 是一个指令，需要将它添加到一个元素上。但是如果我们想切换多个元素呢？此时我们可以把一个 `<template>` 元素当做包装元素，并在上面使用 `v-if`。最终的渲染结果不会包含 `<template>` 元素。
   >  >
   >  >```html
   >  ><template v-if="ok">
   >  >  <h1>Title</h1>
   >  >  <p>Paragraph 1</p>
   >  >  <p>Paragraph 2</p>
   >  ></template>
   >  >```
   >
   >**8.2用key值管理可复用元素**
   >
   >  >Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这样做可以使vue变得非常快，还有一些其他的好处
   >  >
   >  >```html
   >  ><template v-if="loginType === 'username'">
   >  >  <label>Username</label>
   >  >  <input placeholder="Enter your username">
   >  ></template>
   >  ><template v-else>
   >  >  <label>Email</label>
   >  >  <input placeholder="Enter your email address">
   >  ></template>
   >  >```
   >  >
   >  >在上边切换loginType将不会清除用户的输入内容，因为两个模版使用了相同的元素，input不会被替换掉，而是替换它的placeholder
   >  >
   >  >但是有时候这样也不能满足实际的需求，也就是说两个元素使独立的，不复用他们，这种情况下只需要添加一个key属性即可。
   >  >
   >  >```html
   >  ><template v-if="loginType === 'username'">
   >  >  <label>Username</label>
   >  >  <input placeholder="Enter your username" key="username-input">
   >  ></template>
   >  ><template v-else>
   >  >  <label>Email</label>
   >  >  <input placeholder="Enter your email address" key="email-input">
   >  ></template>
   >  >```
   >  >
   >  >这样在每次切换的时候，就会重新渲染
   >  >
   >  >但是`<label>` 元素仍然会被高效地复用，因为它们没有添加 `key` 属性。
   >
   >**8.3v-show**
   >
   >v-show跟v-if他们都是条件渲染，但是不同的是带有 `v-show` 的元素始终会被渲染并保留在 DOM 中。`v-show` 是简单地切换元素的 CSS 属性 `display`
   >
   >**注意， `v-show` 不支持 `<template>` 语法，也不支持 `v-else`。**
   >
   >**8.4v-if VS v-show**
   >
   >8.4.1`v-if` 是“真正的”条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
   >
   >8.4.2`v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
   >
   >8.4.3相比之下， `v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
   >
   >一般来说， `v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件不太可能改变，则使用 `v-if` 较好。

9. #### 列表渲染####

   我们用 `v-for` 指令根据一组数组的选项列表进行渲染。 `v-for` 指令需要以 `item in items` 形式的特殊语法， `items`是源数据数组并且 `item` 是数组元素迭代的别名。

     >**9.1基本语法**
     >
     >```html
     ><ul id="example-1">
     >  <li v-for="item in items">
     >    {{ item.message }}
     >  </li>
     ></ul>
     >```
     >
     >在 `v-for` 块中，我们拥有对父作用域属性的完全访问权限。 `v-for` 还支持一个可选的第二个参数为当前项的索引。
     >
     >```html
     ><ul id="example-2">
     >  <li v-for="(item, index) in items">
     >    {{ parentMessage }} - {{ index }} - {{ item.message }}
     >  </li>
     ></ul>
     >```
     >
     >**同时你也可以用of代替in作为分隔符，因为它是最接近 JavaScript 迭代器的语法。**
     >
     >**也可以用带有v-for的`<template>` 标签来渲染多个元素块。把v-for=“item in items”写在tempalte标签里**`<template v-for="item in items"> ...</template>`
     >
     >**9.2同时列表渲染可以进行对象迭代，整数迭代，具体语法如下：**
     >
     >**对象迭代**
     >
     >```html
     ><li v-for="value in object">//此处object是一个对象
     ><div v-for="(value, key) in object">//这里接收了第二个参数key
     ><div v-for="(value, key, index) in object">//这里接收了三个参数,分别是value,key,inde
     >```
     >
     >**整数迭代**
     >
     > <span v-for="n in 10">{{ n }}</span>
     >

   **数组的更新与检测**

     >vue中包含一组观察数组的变异方法（会改变之前的数组），所以他们也将触发视图的更新，方法如下：
     >
     >- `push()`
     >
     >- `pop()`
     >
     >- `shift()`
     >
     >- `unshift()`
     >
     >- `splice()`
     >
     >- `sort()`
     >
     >- `reverse()`
     >
     >  同时也存在一些非变异的方法，例如`filter()`, `concat()`, `slice()` ，他们不会改变数组，但是每次都会返回一个新数组，
     >
     >  ```js
     >  example1.items = example1.items.filter(function (item) {
     >    return item.message.match(/Foo/)
     >  }
     >  ```
     >
     >**但是vue不能检测以下方式变动的数组：**
     >
     >1. 当你利用索引直接设置一个项时，例如： `vm.items[indexOfItem] = newValue`
     >
     >2. 当你修改数组的长度时，例如： `vm.items.length = newLength`
     >
     >   为了解决第一类问题，以下两种方式都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果， 同时也将触发状态更新：
     >
     >   ```javascript
     >   // Vue.set
     >   Vue.set(example1.items, indexOfItem, newValue)
     >   ```
     >
     >   ```javascript
     >   // Array.prototype.splice`
     >   example1.items.splice(indexOfItem, 1, newValue)//把数组相应所以位置替换一个新值
     >   ```
     >
     >   为了解决第二类问题，你也同样可以使用 `splice`：
     >
     >   ```javascript
     >   example1.items.splice(newLength)//把数组切分成新的长度，即改变数组的长度
     >   ```

   **显示排序和过滤**

   有时，我们想要显示一个数组的过滤或排序副本，而不实际改变或重置原始数据。在这种情况下，可以创建返回过滤或排序数组的**计算属性**。

   ```javascript
   data: {
     numbers: [ 1, 2, 3, 4, 5 ]
   },
   computed: {
     evenNumbers: function () {
       return this.numbers.filter(function (number) {
         return number % 2 === 0
       })
     }
   }
   ```

   或者，你也可以在计算属性不适用的情况下 (例如，在嵌套 `v-for` 循环中) 使用 method 方法：

   ```javascript
   data: {
     numbers: [ 1, 2, 3, 4, 5 ]
   },
   methods: {
     even: function (numbers) {
       return numbers.filter(function (number) {
         return number % 2 === 0
       })
     }
   }
   ```

10. #### 事件处理器####

 >**10.1监听事件**
 >
 >可以用 `v-on` 指令监听 DOM 事件来触发一些 JavaScript 代码。
 >
 >`<button v-on:click="counter += 1">增加 1</button>`
 >
 >**10.2 也可以在v-on后边绑定方法，进行事件处理**
 >
 >` <button v-on:click="greet">Greet</button>`
 >
 >```javascript
 >methods: {
 >    greet: function (event) {
 >      // `this` 在方法里指当前 Vue 实例
 >      alert('Hello ' + this.name + '!')
 >      // `event` 是原生 DOM 事件
 >      alert(event.target.tagName)
 >    }
 >  }
 >```
 >
 >**10.3内联处理器方法**
 >
 >除了直接绑定到一个方法，也可以用内联 JavaScript 语句：
 >
 >`<button v-on:click="say('hi')">Say hi</button>`
 >
 >```javascript
 >methods: {
 >    say: function (message) {
 >      alert(message)
 >    }
 >  }
 >```
 >
 >有时候可能需要在内联语句中访问原生DOM事件，可以用特殊变量$event,把它传入方法：
 >
 >`<button v-on:click="warn('Form cannot be submitted yet.', $event)">Submit</button>`
 >
 >```javascript
 >methods: {
 >  warn: function (message, event) {
 >    // 现在我们可以访问原生事件对象
 >    if (event) event.preventDefault()
 >    alert(message)
 >  }
 >}
 >```
 >
 >**10.4事件修饰符**
 >
 >在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在 methods 中轻松实现这点，但更好的方式是：methods 只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。
 >
 >为了解决这个问题，vue.js为v-on提供了事件修饰符，通过点号(.)表示的指令后缀来调用修饰符。
 >
 >```html
 ><!-- 阻止单击事件冒泡 -->
 ><a v-on:click.stop="doThis"></a>
 >
 ><!-- 提交事件不再重载页面 -->
 ><form v-on:submit.prevent="onSubmit"></form>
 >
 ><!-- 修饰符可以串联  -->
 ><a v-on:click.stop.prevent="doThat"></a>
 >
 ><!-- 只有修饰符 -->
 ><form v-on:submit.prevent></form>
 >
 ><!-- 添加事件侦听器时使用事件捕获模式 -->
 ><div v-on:click.capture="doThis">...</div>
 >
 ><!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
 ><div v-on:click.self="doThat">...</div>
 >```
 >
 >2.1.4 新增
 >
 >```Html
 ><!-- 点击事件将只会触发一次 -->
 ><a v-on:click.once="doThis"></a>
 >```
 >
 >**10.5按键修饰符**
 >
 >在监听键盘事件时，我们经常需要监测常见的键值。 Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符：
 >
 >`<input v-on:keyup.13="submit">`
 >
 >记住所有的 keyCode 比较困难，所以 Vue 为最常用的按键提供了别名：
 >
 >```html
 ><!-- 同上 -->
 ><input v-on:keyup.enter="submit">
 >
 ><!-- 缩写语法 -->
 ><input @keyup.enter="submit">
 >```
 >
 >全部的按键别名：
 >
 >- `.enter`
 >- `.tab`
 >- `.delete` (捕获 “删除” 和 “退格” 键)
 >- `.esc`
 >- `.space`
 >- `.up`
 >- `.down`
 >- `.left`
 >- `.right`
 >
 >可以通过全局 `config.keyCodes` 对象[自定义按键修饰符别名](https://cn.vuejs.org/v2/api/#keyCodes)：
 >
 >```javascript
 >// 可以使用 v-on:keyup.f1
 >Vue.config.keyCodes.f1 = 112
 >```
 >
 >**2.1.0 新增**
 >
 >- `.ctrl`
 >- `.alt`
 >- `.shift`
 >- `.meta`
 >- 注意：在Mac系统键盘上，meta对应命令键 (⌘)。在Windows系统键盘meta对应windows徽标键(⊞)。在Sun操作系统键盘上，meta对应实心宝石键 (◆)。在其他特定键盘上，尤其在MIT和Lisp键盘及其后续，比如Knight键盘，space-cadet键盘，meta被标记为“META”。在Symbolics键盘上，meta被标记为“META” 或者 “Meta”。
 >
 >**在html中监听事件的好处**
 >
 >   >1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
 >   >2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
 >   >3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。

11. #### 表单控件绑定####

    **基本用法：**

    你可以用 `v-model` 指令在表单控件元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 `v-model` 本质上不过是语法糖，它负责监听用户的输入事件以更新数据，并特别处理一些极端的例子。

    几种常用的用法如下所示：

      >**文本：**
      >
      >```html
      ><input v-model="message" placeholder="edit me">
      ><p>Message is: {{ message }}</p>
      >```
      >
      >**多行文本：**
      >
      >```html
      ><span>Multiline message is:</span>
      ><p style="white-space: pre">{{ message }}</p>
      ><br>
      ><textarea v-model="message" placeholder="add multiple lines"></textarea>
      >```
      >
      >在文本区域插值( `<textarea></textarea>` ) 并不会生效，应用 `v-model` 来代替
      >
      >**复选框:**
      >
      >单个勾选框，逻辑值：
      >
      >```html
      ><input type="checkbox" id="checkbox" v-model="checked">
      ><label for="checkbox">{{ checked }}</label>
      >```
      >
      >**多个复选框：绑定到同一个数组**
      >
      >```html
      ><input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
      ><label for="jack">Jack</label>
      ><input type="checkbox" id="john" value="John" v-model="checkedNames">
      ><label for="john">John</label>
      ><input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
      ><label for="mike">Mike</label>
      ><br>
      ><span>Checked names: {{ checkedNames }}</span>
      >```
      >
      >```javascript
      >new Vue({
      >  el: '...',
      >  data: {
      >    checkedNames: []
      >  }
      >})
      >```
      >
      >此时勾选哪个选项，数组中就会多出来哪个选项
      >
      >**单选按钮：**
      >
      >```html
      ><div id="example-4" class="demo">
      >  <input type="radio" id="one" value="One" v-model="picked">
      >  <label for="one">One</label>
      >  <br>
      >  <input type="radio" id="two" value="Two" v-model="picked">
      >  <label for="two">Two</label>
      >  <br>
      >  <span>Picked: {{ picked }}</span>
      ></div>
      >```
      >
      >```javascript
      >new Vue({
      >  el: '#example-4',
      >  data: {
      >    picked: ''
      >  }
      >})	
      >```
      >
      >**选择列表：**
      >
      >单选列表:
      >
      >```html
      ><div id="example-5" class="demo">
      >  <select v-model="selected">
      >    <option>A</option>
      >    <option>B</option>
      >    <option>C</option>
      >  </select>
      >  <span>Selected: {{ selected }}</span>
      ></div> 
      >```
      >
      >```javascript
      >new Vue({
      >  el: '#example-5',
      >  data: {
      >    selected: null
      >  }
      >})
      >```
      >
      >多选列表（绑定到一个数组）：
      >
      >```html
      ><div id="example-6" class="demo">
      >  <select v-model="selected" multiple style="width: 50px">
      >    <option>A</option>
      >    <option>B</option>
      >    <option>C</option>
      >  </select>
      >  <br>
      >  <span>Selected: {{ selected }}</span>
      ></div>
      >```
      >
      > ```javascript
      >new Vue({
      >  el: '#example-6',
      >  data: {
      >    selected: []
      >  }
      >})
      > ```
      >
      >动态选项用 `v-for` 渲染：
      >
      >```html
      ><select v-model="selected">
      >  <option v-for="option in options" v-bind:value="option.value">
      >    {{ option.text }}
      >  </option>
      ></select>
      ><span>Selected: {{ selected }}</span>
      >```
      >
      >```javascript
      >new Vue({
      >  el: '...',
      >  data: {
      >    selected: 'A',
      >    options: [
      >      { text: 'One', value: 'A' },
      >      { text: 'Two', value: 'B' },
      >      { text: 'Three', value: 'C' }
      >    ]
      >  }
      >})
      >```

    **绑定value**

    对于单选按钮，勾选框及选择列表选项， `v-model` 绑定的 value 通常是静态字符串（对于勾选框是逻辑值）：

    ```html
    <!-- 当选中时，`picked` 为字符串 "a" -->
    <input type="radio" v-model="picked" value="a">
    <!-- `toggle` 为 true 或 false -->
    <input type="checkbox" v-model="toggle">
    <!-- 当选中时，`selected` 为字符串 "abc" -->
    <select v-model="selected">
      <option value="abc">ABC</option>
    </select>
    ```

    但是有时我们想绑定 value 到 Vue 实例的一个动态属性上，这时可以用 `v-bind` 实现，并且这个属性的值可以不是字符串。

    ```html
    <input
      type="checkbox"
      v-model="toggle"
      v-bind:true-value="a"
      v-bind:false-value="b"
    >
    // 当选中时
    vm.toggle === vm.a
    // 当没有选中时
    vm.toggle === vm.b
    ```

    **单选按钮**

    ```html
    <input type="radio" v-model="pick" v-bind:value="a">
    // 当选中时
    vm.pick === vm.a
    ```

    **选择列表设置**

    ```html
    <select v-model="selected">
        <!-- 内联对象字面量 -->
      <option v-bind:value="{ number: 123 }">123</option>
    </select>
    // 当选中时
    typeof vm.selected // -> 'object'
    vm.selected.number // -> 123
    ```

    **修饰符**

      >**.lazy**
      >
      >在默认情况下， `v-model` 在 `input` 事件中同步输入框的值与数据 (除了 [上述](https://cn.vuejs.org/v2/guide/forms.html#vmodel-ime-tip) IME 部分)，但你可以添加一个修饰符 `lazy` ，从而转变为在 `change` 事件中同步：
      >
      >```html
      ><!-- 在 "change" 而不是 "input" 事件中更新 -->
      ><input v-model.lazy="msg" >
      >```
      >
      >**.number**
      >
      >如果想自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值），可以添加一个修饰符 `number`给 `v-model` 来处理输入值：
      >
      >`<input v-model.number="age" type="number">`
      >
      >这通常很有用，因为在 `type="number"` 时 HTML 中输入的值也总是会返回字符串类型。
      >
      >**.trim**
      >
      >如果要自动过滤用户输入的首尾空格，可以添加 `trim` 修饰符到 `v-model` 上过滤输入：
      >
      >`<input v-model.trim="msg">`

12. #### 深入了解响应式原理####

    >**原理：** 当我们把一个普通的js对象传递给Vue实例的data选项，Vue将遍历此对象所有的属性，并使用Object.defineProperty把这些属性全部转化成getter／setter，这些属性的getter和setter在内部是允许Vue追踪依赖的，在属性被访问和修改的时候通知变化。
    >
    >​	    每个组件实例都有相应的watcher实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的setter被调用时，会通知watcher重新计算，从而致使它关联的组件得以更新。
    >
    >**变化监测：**Vue不能检测到对象属性的添加或删除。由于Vue会在初始化实例时对属性执行getter／setter转化过程，所以属性必须在data对象上才能让Vue转化它，这样才能让它是响应的。
    >
    >但是可以现在已经创建的对象上添加属性，之后使用Vue.set(object , key , value)方法将**响应属性添加到嵌套的对象**上：
    >
    >```
    >var vm = new Vue({
    >  data:{
    >  a:1
    >  }
    >})
    >// `vm.a` 是响应的
    >vm.b = 2
    >// `vm.b` 是非响应的
    >Vue.set(vm.someObject, 'b', 2)
    >```
    >
    >您还可以使用 `vm.$set` 实例方法，这也是全局 `Vue.set` 方法的别名：
    >
    >```
    >this.$set(this.someObject,'b',2)
    >```

13. #### 过度效果和状态####

      >**13.1单元素／组件的过渡**
      >
      >Vue提供了transition的封装组件，在下列的情形下，可以给元素和组件添加饿entering／leaving过渡
      >
      >条件渲染（使用v-if）、条件展示（使用v-show）、动态组件、组件根节点
      >
      >当插入或删除包含在transition组件中的元素时，Vue将会做以下处理：
      >
      >1.自动嗅探目标元素是否应用了CSS过渡或者动画，如果是，在恰当时机添加或者删除类名。
      >
      >2.如果过度组件提供了js钩子函数，这些钩子函数将在恰当的时机呗调用。
      >
      >3.如果没有找到js钩子函数并且也没有检测到CSS过度／动画，DOM操作在下一帧立即执行。
      >
      >**13.2过渡用到的CSS类名**
      >
      >1. `v-enter`: 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
      >2. `v-enter-active`: 定义过渡的状态。在元素整个过渡过程中作用，在元素被插入时生效，在 `transition/animation`完成之后移除。 这个类可以被用来定义过渡的过程时间，延迟和曲线函数。
      >3. `v-enter-to`: **2.1.8版及以上** 定义进入过渡的结束状态。在元素被插入一帧后生效（于此同时 `v-enter` 被删除），在 `transition/animation` 完成之后移除。
      >4. `v-leave`: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
      >5. `v-leave-active`: 定义过渡的状态。在元素整个过渡过程中作用，在离开过渡被触发后立即生效，在 `transition/animation` 完成之后移除。 这个类可以被用来定义过渡的过程时间，延迟和曲线函数。
      >6. `v-leave-to`: **2.1.8版及以上** 定义离开过渡的结束状态。在离开过渡被触发一帧后生效（于此同时 `v-leave` 被删除），在 `transition/animation` 完成之后移除。
      >
      >对于这些在enter／leave过度中切换的类名，v-是这些类名的前缀，使用`<transition name="my-transition">` 可以重置前缀，比如 `v-enter` 替换为 `my-transition-enter`。
      >
      >**13.3CSS过渡**
      >
      >```
      >／／html部分
      ><div id="example-1">
      >  <button @click="show = !show">
      >    Toggle render
      >  </button>
      >  <transition name="slide-fade">
      >    <p v-if="show">hello</p>
      >  </transition>
      ></div>
      >／／js部分
      >new Vue({
      >  el: '#example-1',
      >  data: {
      >    show: true
      >  }
      >})
      >／／css部分
      >/* 可以设置不同的进入和离开动画 */
      >/* 设置持续时间和动画函数 */
      >.slide-fade-enter-active {
      >  transition: all .3s ease;
      >}
      >.slide-fade-leave-active {
      >  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      >}
      >.slide-fade-enter, .slide-fade-leave-active {
      >  transform: translateX(10px);
      >  opacity: 0;
      >}
      >```
      >
      >**13.4CSS动画**
      >
      >CSS动画同CSS过渡，区别是在动画中v-enter类名在节点插入DOM后不会立即删除，而是在animationend事件触发时删除。
      >
      >**13.5自定义过渡类名**
      >
      >我们可以通过以下特性来自定义过渡类名：
      >
      >- `enter-class`
      >- `enter-active-class`
      >- `leave-class`
      >- `leave-active-class`
      >
      >**他们**的优先级高于普通的类名，这对于Vue的过渡系统和其他第三方CSS动画库，如Animate.css结合使用十分有用。
      >
      >```
      > <transition
      >    name="custom-classes-transition"
      >    enter-active-class="animated tada"
      >    leave-active-class="animated bounceOutRight"
      >  >
      >    <p v-if="show">hello</p>
      >  </transition>
      >```
      >
      >**13.6使用js钩子函数**
      >
      >钩子函数可以结合CSS transition/animations使用，也可以单独使用。
      >
      >当只用js过渡的时候，在enter和leave中，回调函数done是必须的，否则，他们会被同步调用，过渡会立即完成。
      >
      >**13.7多个元素过渡**
      >
      >对于原生标签可以使用v-if／v-else。最常用的多标签过渡是一个列表和描述这个列表为空消息的元素
      >
      >```
      ><transition>
      >  <table v-if="items.length > 0">
      >    <!-- ... -->
      >  </table>
      >  <p v-else>Sorry, no items found.</p>
      ></transition>
      >```
      >
      >可以这样使用，但是有一点需要注意：
      >
      >当有**相同标签名**的元素切换时，需要通过 `key` 特性设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容。即使在技术上没有必要，**给在 <transition> 组件中的多个元素设置 key 是一个更好的实践。**
      >
      >```
      ><transition>
      >  <button v-bind:key="docState">
      >    {{ buttonMessage }}
      >  </button>
      ></transition>
      >// ...
      >computed: {
      >  buttonMessage: function () {
      >    switch (docState) {
      >      case 'saved': return 'Edit'
      >      case 'edited': return 'Save'
      >      case 'editing': return 'Cancel'
      >    }
      >  }
      >}
      >```
      >
      >在多元素过渡时，这些元素会同时出发，vue提供了两个属性，在其中加入mode属性，它有两个属性值
      >
      >**in-out**: 新元素先进行过渡，完成之后当前元素过渡离开。 
      >**out-in**: 当前元素先进行过渡，完成之后新元素过渡进入。
      >
      >**13.8多个组件的过渡**
      >
      >多个组件的过渡简单很多，我们不需要使用key特性。相反，我们只需要使用**动态组件**，**这时候就要用到is属性了。**
      >
      >**13.9列表过渡**
      >
      >列表过渡，我们会使用到v-for和<transition-group>组件，不同于<transition>,它会以一个真实元素呈现：默认是一个<span>,你也可以通过tag特性更换为其他元素，**内部元素总是需要提供唯一的key属性值。**

      ​




