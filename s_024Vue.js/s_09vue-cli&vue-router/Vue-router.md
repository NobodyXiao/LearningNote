## Vue-router路由模块##

1. **vue-router的安装**

   vue-router是一个插件包，所以我们还是需要用npm来安装，打开命令行，进入项目目录，输入下面命令

   ```
   npm install vue-router --save-dev
   ```

   可以使用淘宝镜像，如果你已经使用vue-cli安装了vue-router，就不需要重新安装了

2. **解读router/index.js文件**

   src/router/index.js文件是路由模块的核心文件

   ```
   import Vue from 'vue'   //引入Vue
   import Router from 'vue-router'  //引入vue-router
   import Hello from '@/components/Hello'  //引入根目录下的Hello.vue组件
    
   Vue.use(Router)  //Vue全局使用Router
    
   export default new Router({
     routes: [              //配置路由，这里是个数组
       {                    //每一个链接都是一个对象
         path: '/',         //链接路径
         name: 'Hello',     //路由名称，
         component: Hello   //对应的组件模板
       }
     ]
   })
   ```

3. **增加一个Hi路由和页面**

   具体操作步骤如下：

   3.1 在src/components目录下，新建Hi.vue文件，编写文件内容，和我们之前讲过的一样，分为三个部分<template><script>和<style>。

   3.2 引入Hi组件，我们需要在router/index.js文件的上边引入Hi组件

   ```
   import Hi from '@/components/Hi'
   ```

   3.3增加路由配置：在router/index.js文件的router[]数组中，新增加一个对象

   ```
   {
     path:'/hi',
     name:'Hi',
     component:Hi
   }
   ```

4. **router-link制作导航**

   如果需要制作导航条，那么就需要用到router-link标签，首先先看一下它的基本用法

   ```
    <router-link to="/">[显示字段]</router-link>
   ```

   - **to：**是我们的导航路径，要填写的是你在router/index.js文件里配置的path值，如果要导航到默认首页，只需要写成  to=”/”  ，
   - **[显示字段] ：**就是我们要显示给用户的导航名称，比如首页  新闻页。

5. **vue-router配置子路由**

   子路由的情况一般用在一个页面有他的基础模版，然后他下面的页面都隶属于这个模版，只是部分改变样式。

   5.1我们需要先改造app.vue的导航代码，来实现基本的导航功能。我们用<router-link>标签增加了两个新的导航链接。

   ```
   <p>导航 ：
         <router-link to="/">首页</router-link> | 
         <router-link to="/hi">Hi页面</router-link> |
         <router-link to="/hi/hi1">-Hi页面1</router-link> |
         <router-link to="/hi/hi2">-Hi页面2</router-link>
   </p>
   ```

   5.2 改写components/Hi.vue页面

   把Hi.vue改成一个通用的模板，加入<router-view>标签，给子模板提供插入位置。“Hi页面1”   和 “Hi页面2”  都相当于“Hi页面”的子页面，有点想继承关系。我们在“Hi页面”里加入<router-view>标签。

   5.3 在components目录下新建2个组件模版 Hi1.vue和Hi2.vue

   5.4 修改router/index.js的代码

   我们现在导航有了，母模板和子模板也有了，只要改变我们的路由配置文件就可以了。子路由的写法是在原有的路由配置下加入children字段。

   ```
   children:[
   {path:'/',component:xxx},
   {path:'xx',component:xxx},
   ]
   ```

   children字段后边跟的是个数组，数组里和其他配置路由基本相同，需要配置path和component。具体看一下这个子路由的配置写法。

   ```
   import Vue from 'vue'   
   import Router from 'vue-router'  
   import Hello from '@/components/Hello'  
   import Hi from '@/components/Hi' 
   import Hi1 from '@/components/Hi1' 
   import Hi2 from '@/components/Hi2' 
    
   Vue.use(Router) 
    
   export default new Router({
     routes: [             
       {                    
         path: '/',        
         name: 'Hello',     
         component: Hello   
       },{
         path:'/hi',
         component:Hi,
         children:[
           {path:'/',component:Hi},
           {path:'hi1',component:Hi1},
           {path:'hi2',component:Hi2},
         ]
       }
     ]
   })
   ```

   **需要注意的是，在配置路由文件前，需要先用import引入Hi1和Hi2。**

6. 使用vue-router传递参数

   6.1使用name传递参数

   1.在路由文件src/router/index.js里配置name属性。

   ```
    routes: [
       {
         path: '/',
         name: 'Hello',
         component: Hello
       }
    ]
   ```

   2.模板里(src/App.vue)用$router.name的形势接收，比如直接在模板中显示：

   ```
   <p>{{ $route.name}}</p>
   ```

   6.2通过<router-link>标签中的to传参数

   我们用<router-link>标签中的to属性进行传参，需要您注意的是这里的to要进行一个绑定，写成:to。

   ```
   <router-link :to="{name:xxx,params:{key:value}}">valueString</router-link>
   ```

   这里的to前边是带冒号的，然后后边跟的是一个对象形势的字符串.

   - name：就是我们在路由配置文件中起的name值。
   - params：就是我们要传的参数，它也是对象形势，在对象里可以传递多个值。

   把src/reouter/index.js文件里给hi1配置的路由起个name,就叫hi1.

   ```
   {path:'/hi1',name:'hi1',component:Hi1},
   ```

   最后在模板里(src/components/Hi1.vue)用$route.params.username进行接收.

   ```
   {{$route.params.username}}
   ```

7. vue-router利用url进行传参

   利用url传递参数的意思就是传递的参数可以在地址栏进行显示，同时通过：冒号这种方式实现。

   步骤有以下：

   7.1 我们可以在路由配置文件中以**：冒号**的形式传递参数，这就对参数进行了绑定。

   ```
   {
       path:'/params/:newsId/:newsTitle',
        component:Params
   }
   ```

   7.2 其次在相应的组件模版下，输出我们的url参数

   ```
   <template>
       <div>
           <h2>{{ msg }}</h2>
           <p>新闻ID：{{ $route.params.newsId}}</p>
           <p>新闻标题：{{ $route.params.newsTitle}}</p>
       </div>
   </template>
    
   <script>
   export default {
     name: 'params',
     data () {
       return {
         msg: 'params page'
       }
     }
   }
   </script>
   ```

   7.3 在App.vue文件中加入我们的<router-link>标签，直接写入我们的参数

   ```
   <router-link to="/params/198/jspang website is very good">params</router-link> |
   ```

   其中参数传递这种方式中经常用到正则表达式，可以对我们输入的参数进行验证。

8. vue-router的重定向-redirect

   开发过程中我们可能设置的路径不一样，但是我们希望跳转同一个页面，或者说是打开同一个组件，这时候我们就用到了路由的重新定向redirect参数。

   分为两种：

   8.1 第一种是直接跳转不加参数

   这时候我们只要配置一下src/router/index.js，把里边redirect参数配置成你想要跳转的路径即可。

   ```
   routes: [
       {
         path: '/',
         component: Hello
       },{
         path:'/params/:newsId(\\d+)/:newsTitle',
         component:Params
       },{
         path:'/goback',
         redirect:'/'
       }
   ```

   8.2 在重新定向中传递参数

   ```
   {
     path:'/params/:newsId(\\d+)/:newsTitle',
     component:Params
   },{
     path:'/goParams/:newsId(\\d+)/:newsTitle',
     redirect:'/params/:newsId(\\d+)/:newsTitle'
   }
   ```

9. alias别名的使用

   使用别名的形式，我们可以实现类似重新定向的效果

   9.1 首先在配置的路由中，给路径起别名

   ```
   {
       path: '/hi1',
       component: Hi1,
       alias:'/jspang'
    }
   ```

   9.2其次在App.vue中，<router-link>配置时，可以直接在to后边跟我们起过的别名，进行重新定向

   ```
   <router-link to="/jspang">jspang</router-link>
   ```

   那么redirect和alias有什么区别呢？

   - redirect：仔细观察URL，redirect是直接改变了url的值，把url变成了重新定向之后模版对应的路径
   - alias：URL路径没有改变，这种情况更友好，让用户知道自己访问的路径，只是把重新定向的模版内容渲染出来而已

   9.3前车之鉴：不要在path为"/"的路由中使用别名，这样不会起作用

   ```
   {
     path: '/',
     component: Hello,
     alias:'/home'
   }
   ```

   9.4针对传参数的情况同样适用

   ```
   {
         name: 'params',
         path: '/params/:newsId/:newsTitle',
         component: Params,
         alias: '/gotoParams/:newsId/:newsTitle'
       },
   <router-link to="/gotoParams/144/ I wanna go homex"> gotoParams</router-link>|
   ```

10. 路由的过渡动画

   有时候我们想要给路由加上一些过渡动画，需要在<router-view>标签的外边添加<transition>标签，标签海需要一个name属性。

   ```
   <transition name="fade">
     <router-view ></router-view>
   </transition>
   ```

   然后就可以在css中来写动画效果了，这里有四个css类名fade-enter，fade-enter-active，fade-enter,fade-leave-active，针对这4个类名进行效果设置即可

   另外还有过渡的模式：

   in-out:新元素先进入过渡，完成之后当前元素过渡离开。

   out-in:当前元素先进行过渡离开，离开完成后新元素过渡进入。

11. mode的设置和404页面的处理

    在路由设置中有mode这一项，用来设置地址栏路径的样式。

    有两种样式：

    11.1histroy模式：URL就像正常的url一样，例如：http://jsapng.com/lms/，也好看！

    11.2hash模式：在不设置mode的情况下，默认是hash，就像无意义的字符排列，不太好看也不符合我们的浏览习惯。

    11.3 404页面的设置：

    用户经常会输错页面，当输错页面的时候，我们应当友好的去提示一下，返回另外一个404页面给他

    我们可以配置路径和模版，当输入错误地址的时候就🔙那个米板即可。

    设置路由配置文件（/src/router/index.js）：

    ```
    {
       path:'*',
       component:Error
    }
    ```

    这里的*就代表，输入不存在的路径时候，我们要跳转到Error模版

    其余还需要在components里边新建一个Error.vue的文件，之后在App.vue中设置<router-link>跳转链接。

12. 路由中的钩子函数

    钩子函数即声明周期函数，我们从一个组件进入到销毁会有很多钩子函数，同样在路由中也设置了钩子函数，路由的钩子函数可以卸载路由配置文件中，也可以写在我们的组件模版中。

    12.1写在路由配置文件中

    ```
    {
          path:'/params/:newsId(\\d+)/:newsTitle',
          component:Params,
          beforeEnter:(to,from,next)=>{
            console.log('我进入了params模板');
            console.log(to);
            console.log(from);
            next();
    },
    ```

    其中的3个参数：

    1. to:路由将要跳转的路径信息，信息是包含在对像里边的。
    2. from:路径跳转前的路径信息，也是一个对象的形式。
    3. next:路由的控制参数，常用的有next(true)和next(false)，和next(path：'/')指定下一次跳转到某个路径。

    写在模版中的钩子函数

    **在路由配置文件中的钩子函数直邮一个beforeEnter,但是写在模版中的钩子函数有两个**

    - beforeRouteEnter：在路由进入前的钩子函数。
    - beforeRouteLeave：在路由离开前的钩子函数。

13. 编程式导航

    编程式导航的意思就是能够前进和后退，功能跟我们浏览器上的前进和后退按钮一样，这在业务逻辑上经常用到，其中router.go(-1)代表着后退，	并且地址栏会有所变化；router.go(1)代表着前进；

    13.1我们先在app.vue文件里加入一个按钮，按钮并绑定一个goback( )方法。

    ```
    <button @click="goback">后退</button>
    ```

    13.2在我们的script模块中写入goback()方法，并使用this.$router.go(-1),进行后退操作。

    ```
    <script>
    export default {
      name: 'app',
      methods:{
        goback(){
          this.$router.go(-1);
        }
      }
    }
    </script>
    ```

    之后就可以打开浏览器进行测试了。

    另外**this.$router.push(‘/xxx ‘)**的作用是用来跳转的，括号中填入要跳转的路径即可。

    ​

