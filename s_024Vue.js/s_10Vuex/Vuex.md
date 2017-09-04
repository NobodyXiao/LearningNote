## Vuex状态管理器##

vuex的工作原理

![WechatIMG87](/Users/xiao/Desktop/LearningNote/LearningNote/s_024Vue.js/s_10Vuex/WechatIMG87.jpeg)

需要掌握的：

- 用户在组件中的输入操作触发 action 调用；
- Actions 通过分发 mutations 来修改 store 实例的状态；
- Store 实例的状态变化反过来又通过 getters 被组件获知。

1. **引入vuex**

   使用脚手架工具新建项目

   ```
   vue init webpack vuex1；
   cd vuex1;
   npm install;
   npm run dev
   ```

   1.1首先利用npm包管理工具，进行安装vuex。在控制命令行中输入以下命令

   **注意：在安装的时候package.json配置文件中项目目录的名称不能是vuex，否则安装不了**

   ```
   npm install vuex --save
   ```

    需要注意的是这里一定要加上-save，因为这个包是要在生产环境下使用的。

   1.2其次新建一个vuex文件夹，并且在文件夹下新建store.js文件，文件中引入我们的vue和vuex

   ```
   import Vue from 'vue';
   import Vuex from 'vuex';
   ```

   1.3使用我们vuex，引入之后用Vue.use进行引用

   ```
   Vue.use(Vuex);
   ```

2. **牛刀小试（demo）**

   利用加减按钮计数

   2.1.首先在store.js文件中新增加一个常量。

   ```
   const state={
       count:1
   }
   ```

   2.2用export default封装代码，让外部可以引用

   ```
   export default new Vuex.Store({
   	state
    
   })
   ```

   2.3新建一个vue模版，位置在components文件夹下，名字叫count.vue，在模版中引入我们刚刚建立的store.js文件，并在模版中用{{$store.state.count}}输出count的值

   ```
   <template>
       <div>
           <h2>{{msg}}</h2>
           <hr/>
           <h3>{{$store.state.count}}</h3>
       </div>
   </template>
   <script>
       import store from '@/vuex/store'
       export default{
           data(){
               return{
                   msg:'Hello Vuex',
               }
           },
           store    
       }
   </script>
   ```

   2.4在store.js文件中加入连个改变state的方法

   ```
   const mutations={
       add(state){
           state.count++;
       },
       reduce(state){
           state.count--;
       }
   }
   ```

   这里的mutations是固定写法，之后在模版中增加两个按钮进行方法调用即可

   ```
   <div>
       <button @click="$store.commit('add')">+</button>
       <button @click="$store.commit('reduce')">-</button>
   </div>
   ```

3. **state访问状态**

   在store.js中声明的常量state就是我们说的访问状态对象，它是我们单页应用中的共享值，通常在模版中通过插值的方式，我们希望插入的是简单值，而不是$store.state.count这样的值，那么对状态随想赋值给内部对象，有三种方法，如下：

   3.1通过computed的计算属性直接复制

   computed属性可以在输出前，对data中的值进行改变，我们就利用这种特性把store.js中的state值赋值给我们模板中的data值。

   ```
   computed:{
       count(){
           return this.$store.state.count;
       }
   }
   ```

   3.2通过mapState的对象来赋值

   首先要用import引入mapState

   ```
   import {mapState} from 'vuex';
   ```

   然后还在computed计算属性里写入如下代码：

   ```
   computed:mapState({
           count:state=>state.count
    })
   ```

   3.3通过mapState的数组来赋值

   ```
    computed:mapState(["count"])
   ```

   这算是最简单的写法了，在项目中用的也最多。

4. **Mutations修改状态**

   4.1 Vuex提供了commit方法来修改状态，其次我们如果想要传参，我们就需要在Mutations里再加上一个参数，并在commit的时候也传递参数就可以了。

   现在store.js文件里给add方法加上一个参数n。

   ```
   const mutations={
       add(state,n){
           state.count+=n;
       },
       reduce(state){
           state.count--;
       }
   }
   ```

   在Count.vue里修改按钮的commit( )方法传递的参数，我们传递10，意思就是每次加10.

   ```
   <p>
      <button @click="$store.commit('add',10)">+</button>
      <button @click="$store.commit('reduce')">-</button>
   </p>
   ```

   4.2 模版获取Mutations方法

   在实际开发中，我们其实不希望在模版中引用$store.commit( )这样的方法，我们希望跟调用模版中的方法一样，直接写函数名，为达到目的，我们只需要像下边这样写即可：

   在模板count.vue里用import 引入我们的mapMutations：

   ```
   import { mapState,mapMutations } from 'vuex';
   ```

   在模板的<script>标签里添加methods属性，并加入mapMutations

   ```
    methods:mapMutations([
           'add','reduce'
   ]),
   ```

   这样我们就直接可以引用函数名了

   ```
   <button @click="reduce">-</button>
   ```

5. **getters基本用法**

   5.1getters可以看作是获取数据之前对其进行的一个过滤和加工，使用方法如下：

   我们首先在store.js里用const声明我们的getters属性

   ```
   const getters = {
       count:function(state){
           return state.count +=100;
       }
   }
   ```

   写好getters之后，我们还需要在Vue.Store()里引入，

   ```
   export default new Vuex.Store({
       state,mutations,getters
   })
   ```

   这样在store.js里的配置算是完成了，我们需要到模版页对computed进行配置。在vue的构造器里边智能有一个conputed属性，如果你多写一个，那么就会覆盖是钱的那个，所以我们需要对computed属性进行扩展

   ```
   computed:{
       ...mapState(["count"]),
       count(){
           return this.$store.getters.count;
       }
   },
   ```

   5.2用mapGetters简化模版写法：

   state和mutations都有map的引用方法把我们模板中的编码进行简化，我们的getters也是有的，我们来看一下代码。

   首先用import引入我们的mapGetters

   ```
   import { mapState,mapMutations,mapGetters } from 'vuex';
   ```

   在compputed属性中加入mapGetters

   ```
   ...mapGetters(["count"])
   ```

6. **actions异步修改状态**

   actions和Mutations的功能基本一样，不同的是，actions是异步的修改state状态，而Mutations是同步修改状态的。

   6.1首先我们需要在store.js中声明actions，让actions调用Mutations里边的方法

   ```
   const actions ={
       addAction(context){
           context.commit('add',10)
       },
       reduceAction({commit}){
           commit('reduce')
       }
   }
   ```

   在actions里写了两个方法addAction和reduceAction，在方法体里，我们都用commit调用了Mutations里边的方法。其中传递的参数发生了改变

   - context：上下文对象，这里你可以理解称store本身。
   - {commit}：直接把commit对象传递过来，可以让方法体逻辑和代码更清晰明了。

   6.2在模版中使用

   在store.js中声明之后，我们需要在模版中进行调用，首先增加两个按钮，用来承载我们的方法

   ```
   <p>
     <button @click="addAction">+</button>
     <button @click="reduceAction">-</button>
   </p>
   ```

   其次我们需要改造一下我们的methods方法

   ```
   methods:{
       ...mapMutations([  
           'add','reduce'
       ]),
       ...mapActions(['addAction','reduceAction'])
   },
   ```

   6.3可以通过打印和设置定时器来检验是否异步

   ```
   setTimeOut(()=>{context.commit(reduce)},3000);
   console.log('我比reduce提前执行');
   ```

7. **module模块组**

 声明模块组，首先在vuex/store.js中声明模块组，还是用const常量的方法声明模块组。代码如下：

```
const moduleA={
    state,mutations,getters,actions
}
```

声明好了之后，我们需要修改原来的Vuex.Store里的值

```
export default new Vuex.Store({
    modules:{a:moduleA}
})
```

在模版中使用

现在我们就可以在模版中使用count状态了

```
<h3>{{$store.state.a.count}}</h3>
```

如果我们想用简单的方法引入，还是要在我们的计算属性中return我们的状态

```
computed:{
    count(){
        return this.$store.state.a.count;
    }
},
```

