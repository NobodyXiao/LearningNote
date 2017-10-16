## 组件##

1. 组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。

2. #### 注册组件####

   > 全局注册组件（**组件注册必须保证在初始化跟实例之前**）
   >
   > ```
   > // 注册
   > Vue.component('my-component', {
   >   template: '<div>A custom component!</div>'
   > })
   > // 创建根实例
   > new Vue({
   >   el: '#example'
   > })
   > ```
   >
   > 局部注册组件
   >
   > 不必在全局注册每一个组件，通过使用组件实例选项注册，可以使组件仅在另一个实例／组件作用域中可用：
   >
   > ```
   > var Child = {
   >   template: '<div>A custom component!</div>'
   > }
   >
   > new Vue({
   >   // ...
   >   components: {
   >     // <my-component> 将只在父模板可用
   >     'my-component': Child
   >   }
   > })
   > ```

   ​

3. #### DOM模版解析说明####

   当使用DOM作为模版的时候，后出现一些HTML模版方面的限制，因为Vue只有在浏览器解析和标准化HTML之后才能获取模版的内容，尤其是像这样的元素`<ul>` ，`<ol>`，`<table>` ，`<select>` 限制了能被它包裹的元素， 而一些像 `<option>` 这样的元素只能出现在某些其它元素内部。

   （意思就是当组件想被包裹在这些有内部元素有限制的HTML模版中的时候，就要使用is属性变通，来避免错误）。

   ```
   <table>
     <tr is="my-row"></tr>
   </table> 
   //例如table标签中只能一些thead，tbody等列表元素标签，使用is属性，可以将组件的名称赋给属性址，这样可以被正确的渲染。
   ```

   注意：如果我使用以下字符串模版将不起作用：

   - `<script type="text/x-template">`
   - JavaScript内联模版字符串
   - `.vue` 组件

   因此有必要的话，尽量使用字符串模版。

4. #### 组件中的data属性必须是函数####

   这个是必要条件，否则Vue会停止工作，这样也可以保证每个实例的data属性都是独立的。

5. #### 构成组件####

   组件意味着协同工作，通常父子组件会是这样的关系：组件 A 在它的模版中使用了组件 B 。它们之间必然需要相互通信：父组件要给子组件传递数据，子组件需要将它内部发生的事情告知给父组件。然而，在一个良好定义的接口中尽可能将父子组件解耦是很重要的。这保证了每个组件可以在相对隔离的环境中书写和理解，也大幅提高了组件的可维护性和可重用性。

   在 Vue.js 中，父子组件的关系可以总结为 **props down, events up** 。父组件通过 **props** 向下传递数据给子组件，子组件通过 **events** 给父组件发送消息。看看它们是怎么工作的。

6. #### Prop####

   组件的作用域是孤立的，这意味着不能在子组件的模版内直接引用父组件的数据，如果想使用父组件的数据，那么我们子组件可以使用props选项。

   子组件需要显示的用props选项声明它期待获得的数据：

   ```
   Vue.component('child', {
     // 声明 props
     props: ['message'],
     // 就像 data 一样，prop 可以用在模板内
     // 同样也可以在 vm 实例中像 “this.message” 这样使用
     template: '<span>{{ message }}</span>'
   })
   //然后我们就可以在HTML模版中给他赋值进行使用
   <child message="hello!"></child>
   ```

   **camelCase vs. kebab-case**

   注意如果组件中使用的属性是驼峰命名方法的时候，在HTML中引用的时候，要使用短横线隔开的方式。

   **动态的Prop**

   在模板中，要动态地绑定父组件的数据到子模板的props，与绑定到任何普通的HTML特性相类似，就是用 `v-bind`。每当父组件的数据变化时，该变化也会传导给子组件：

   ```
   <div>
     <input v-model="parentMsg">
     <br>
     <child v-bind:my-message="parentMsg"></child>
   </div>
   ```

   在这样的做法中，相当于把父组件的parentMsg和子组件的y-message关联起来

   **字面量vs动态语法**

   如果你想在组件中绑定一个数字，需要使用v-bind

   <comp v-bind:some-prop="1"></comp>

   **单向数据流**

   prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。

   另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你**不应该**在子组件内部改变 prop 。如果你这么做了，Vue 会在控制台给出警告。

   为什么我们会有修改prop中数据的冲动呢？通常是这两种原因：

   1. prop 作为初始值传入后，子组件想把它当作局部数据来用；
   2. prop 作为初始值传入，由子组件处理成其它数据输出。

   对这两种原因，正确的应对方式是：

   1. 定义一个局部变量，并用 prop 的值初始化它：

      ```
      props: ['initialCounter'],
      data: function () {
        return { counter: this.initialCounter }
      }
      ```

   2. 定义一个计算属性，处理 prop 的值并返回。

      ```
      props: ['size'],
      computed: {
        normalizedSize: function () {
          return this.size.trim().toLowerCase()
        }
      }//即利用一个计算属性，在不改变初始值的情况下，得到想要的结果
      ```

   **Prop 验证**

   我们可以为组件的 props 指定验证规格。如果传入的数据不符合规格，Vue 会发出警告。当组件给其他人使用时，这很有用，验证方法如下所示：

   ```
   Vue.component('example', {
     props: {
       // 基础类型检测 （`null` 意思是任何类型都可以）
       propA: Number,
       // 多种类型
       propB: [String, Number],
       // 必传且是字符串
       propC: {
         type: String,
         required: true
       },
       // 数字，有默认值
       propD: {
         type: Number,
         default: 100
       },
       // 数组／对象的默认值应当由一个工厂函数返回
       propE: {
         type: Object,
         default: function () {
           return { message: 'hello' }
         }
       },
       // 自定义验证函数
       propF: {
         validator: function (value) {
           return value > 10
         }
       }
     }
   })
   ```

   `type` 可以是下面原生构造器：String，Number，Boolean，Function，Object，Array；`type` 也可以是一个自定义构造器函数，使用 `instanceof` 检测。

7. #### 自定义事件####

   父组件通过props传递数组给子组件，子组件通过**自定义事件**把数据传递回去。

   **使用v-on绑定自定义事件**

   每个Vue实例都实现了事件借口（Events interface），**使用**

   - 使用 `$on(eventName)` 监听事件
   - 使用 `$emit(eventName)` 触发事件

   父组件可以在使用子组件的地方直接用v-on来监听子组件触发的事件。

   **使用自定义事件的表单输入组件**

   自定义事件可以用来创建自定义的表单输入组件，使用 `v-model` 来进行数据双向绑定。看看这个：

   ```
   <input v-model="something">
   这不过是以下示例的语法糖：
   <input v-bind:value="something" v-on:input="something = $event.target.value">
   所以在组件中使用时，它相当于下面的简写：
   <custom-input v-bind:value="something" v-on:input="something = arguments[0]"></custom-input>
   所以要让组件的 v-model 生效，它必须：
   接受一个 value 属性
   在有新的 value 时触发 input 事件
   ```

   有时候两个组件也需要通信(非父子关系)。在简单的场景下，可以使用一个空的 Vue 实例作为中央事件总线：

   var bus = new Vue()；

   ```
   // 触发组件 A 中的事件
   bus.$emit('id-selected', 1)
   // 在组件 B 创建的钩子中监听事件
   bus.$on('id-selected', function (id) {
     // ...
   })
   ```

   在复杂的情况下，	我们应该考虑使用专门的状态管理模式。

8. #### 使用Slot分发内容：####

   内容分发实际上就是混合父组件的内容和子组件的模版，把组件中的上下文内容（HTML 模版）插入到父组件中。（分发内容是在父组件作用域中编译的,但是slot标签是写在子组件中的）

   **组件的作用域：**

   1、父组件模板在父组件作用域内编译，父组件模板的数据用父组件内data数据；
   2、子组件模板在子组件作用域内编译，子组件模板的数据用子组件内data数据，如果要用父组件的必须用props传递；

   **单个Slot与具名Slot**

   > 单个Slot
   >
   > > 除非子组件模板包含至少一个 `<slot>` 插口，否则父组件的内容将会被**丢弃**。当子组件模板只有一个没有属性的 slot 时，父组件整个内容片段将插入到 slot 所在的 DOM 位置，并替换掉 slot 标签本身。
   > >
   > > 最初在 `<slot>` 标签中的任何内容都被视为**备用内容**。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容。
   >
   > 具名Slot
   >
   > > Slot标签元素可以用一个特殊的属性name来配置如何非分发内容，具名 slot 将匹配内容片段中有对应 `slot` 特性的元素。
   > >
   > > 仍然可以有一个匿名 slot ，它是**默认 slot** ，作为找不到匹配的内容片段的备用插槽。如果没有默认的 slot ，这些找不到匹配的内容片段将被抛弃。

   **作用域插槽**

   > 作用域插槽是一种特殊类型的插槽，用作使用一个**(能够传递数据到)**可重用的模版替换已渲染内容，在子组件中，只需将数据传递到插槽，就像你将 prop 传递给组件一样：
   >
   > ```
   > <div class="child">
   >   <slot text="hello from child"></slot>
   > </div>
   > ```
   >
   > 在父级中，**具有特殊属性 `scope` 的 `<template>` 元素**，表示它是作用域插槽的模板。`scope` 的值对应一个临时变量名，此变量接收从子组件中传递的 prop 对象：
   >
   > ```
   > <div class="parent">
   >   <child>
   >     <template scope="props">
   >       <span>hello from parent</span>
   >       <span>{{ props.text }}</span>
   >     </template>
   >   </child>
   > </div>
   > ```
   >
   > 如果我们渲染以上结果，得到的输出会是：
   >
   > ```
   > div class="parent">
   >   <div class="child">
   >     <span>hello from parent</span>
   >     <span>hello from child</span>
   >   </div>
   > </div>
   > ```
   >
   > 作用域插槽更具代表性的用例是列表组件，允许组件自定义应该如何渲染列表每一项

9. #### 动态组件####

   > 通过使用保留的 `<component>` 元素，动态地绑定到它的 `is` 特性，我们让多个组件可以使用同一个挂载点，并动态切换：
   >
   > ```
   > var vm = new Vue({
   >   el: '#example',
   >   data: {
   >     currentView: 'home'
   >   },
   >   components: {
   >     home: { /* ... */ },
   >     posts: { /* ... */ },
   >     archive: { /* ... */ }
   >   }
   > })
   > ```
   >
   > ```
   > <component v-bind:is="currentView">
   >   <!-- 组件在 vm.currentview 变化时改变！ -->
   > </component>
   > ```
   >
   > 也可以直接绑定到组件对象上：
   >
   > ```
   > var Home = {
   >   template: '<p>Welcome home!</p>'
   > }
   >
   > var vm = new Vue({
   >   el: '#example',
   >   data: {
   >     currentView: Home
   >   }
   > })
   > ```
   >
   > 此处is绑定的是组件的组件模版，在绑定内容变化的时候，这个组件也会发生变化。
   >
   > **keep-alive**
   >
   > 如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 `keep-alive` 指令参数：
   >
   > ```
   > <keep-alive>
   >   <component :is="currentView">
   >     <!-- 非活动组件将被缓存！ -->
   >   </component>
   > </keep-alive>
   > ```

   ​

10. #### 组件杂记####

   **12.9.1在template选项中拼接HTML元素比较麻烦**，这也导致了HTML和JS的高耦合性。庆幸的是，vue.提供了两种方式将定义在js中的HTML模版分离出来。

   **第一种方法是使用：script标签**

   ```
   html部分：
   <div id="app">
         <my-component></my-component>
   </div>
           
   <script type="text/x-template" id="myComponent">
         <div>This is a component!</div>
   </script>
   js部分：
   Vue.component('my-component',{
         template: '#myComponent'
   })
   ```

   这时template选项不再是HTML元素，而是一个id，Vue.js根据这个id查找对应的元素，然后将这个元素内的HTML作为模板进行编译。

   **第二种方法是使用：template标签**

   如果使用`<template>`标签，则不需要指定type属性，只需要一个id就行了。

   ```
    <div id="app">
         <my-component></my-component>
    </div>
           
    <template id="myComponent">
         <div>This is a component!</div>
    </template>
    js部分：
    Vue.component('my-component',{
         template: '#myComponent'
    })
   ```

   **12.9.2prop的绑定类型**

   单向绑定：prop默认是单向绑定：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意修改了父组件的状态

   双向绑定：如果想实现双向绑定，那么就可以使用`.sync`显式地指定双向绑定，这使得子组件的数据修改会回传给父组件。

   ```
   <my-component v-bind:my-name.sync="name" v-bind:my-age.sync="age"></my-component>
   ```

   单次绑定：

   可以使用`.once`显式地指定单次绑定，单次绑定在建立之后不会同步之后的变化，这意味着即使父组件修改了数据，也不会传导给子组件。

   ```
   <my-component v-bind:my-name.once="name" v-bind:my-age.once="age"></my-component>
   ```

   ​