# respos

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 搞定项目图标iconfont

整个项目中使用的是阿里巴巴的矢量图标库，能满足我们大部分需求。

1. 挑选图标的流程

   1.1进入网站：Iconfont网址：http://www.iconfont.cn

   1.2点击网站上方的“官方图标库”，选择自己喜欢的图标。在这里我选择天猫的图标库。

   1.3选择好自己喜欢的图标，你可以有两个选择，下载代码 和 添加至项目。

   1.4我们这两选择添加至项目，然后新建项目，并输入名称。

   1.5项目添加好后，会自动给我们转入到我们项目库中。点击查看在线链接。

   1.6生产css引入的代码，生成后就可以在项目首页index.html引入了。

2. 如何使用图标

   图标引入到项目中之后，我们可以在“我的项目中”看到图标的font class值，只需要在模版中增加以下命令进行引入

   ```
   <i class="icon iconfont icon-hanbao"></i>
   ```

3. 添加更多图标

   如果感觉图标不够用，想更新自己的图标库，可以通过以下步骤添加

   3.1去Iconfont网站继续挑选，把相中的图标加入购物车中。

   3.2把购物车中的图标加入到项目中。

   3.3重新生成在线链接。（这部很重要）

   3.4在项目主页中(index.html)，更换css引入链接。

### 编写独立的侧边栏导航组件

1. 建立leftNav.vue文件

   我们需要在src/components目录下，先新建一个common和page文件夹

   - common文件夹用来放共用组件，下面写的leftNav.vue组件就放到这里，之后在新建的模版中写入代码
   - page文件夹用来放我们的页面模板组件，页面的模板文件放到这里。

2. 把leftNav组件放到模版中

   先用import在App.vue中引入leftNav组件

   ```
   import leftNav from '@/components/common/leftNav'
   ```

   引入后在vue的构造器里边添加components属性，并放入我们的leftNav组件

   ```
   export default {
     name: 'app',
     components:{
       leftNav
     }
   }
   ```

   之后你就可以在App.vue组件中的template标签中引用了`<leftNav></leftNav>

### 开启Element封印

1. Element是一套为开发者、设计师和产品经理准备的基于Vue2.0的组件库，提供了配套的设计资源，帮助你的网站快速成型。

2. 我们可以通过npm的方式进行安装，它能更好的和webpack打包工具配合使用

   ```
   npm install element-ui --save
   ```

3. 完整引入项目，在main.js中写入以下内容：

   ```
   import Vue from 'vue'
   import ElementUI from 'element-ui'
   import 'element-ui/lib/theme-default/index.css'
   import App from './App.vue'
    
   Vue.use(ElementUI)
    
   new Vue({
     el: '#app',
     render: h => h(App)
   })
   ```

   以上代码便完成了Element的引入，需要注意的是样式文件需要单独引入。

4. 使用Element的el-row布局

   其中Element支持用24栏的形式进行布局

   ```
   <template>
     <div class="pos">
       <div>
           <el-row >
               <el-col :span='7'>
               我是订单栏
               </el-col>
               <!--商品展示-->
               <el-col :span="17">
                我是产品栏
               </el-col>
           </el-row>
       </div>
     </div>
   </template>
   ```

5. 解决100%高的问题

   在页面中使用了Element组件，它会自动给我们生产虚拟DOM，这样我们就无法设置高度100%，这时候可以利用javascript来设置100%高度问题。

   ```
    mounted:function(){
         var orderHeight=document.body.clientHeight;
         document.getElementById("order-list").style.height=orderHeight+'px';
     },
   ```

### 利用Element进行快速布局

1. el-tabs标签页组件

   用Element里提供的el-tabs可以快速制作我们的tabs标签页效果，基本用法比较简单，可以直接在模版中引入<el-tabs>标签，标签里边用<el-tab-pane>来代表每个标签页。具体详见element官网,其中label属性是标签页的标题，另外v-model="activeName"属性可以绑定默认显示的标签页，其中其中activeName属性是绑定的name的值“first”

   ```
   <el-tabs v-model="activeName">
         <el-tab-pane label="点餐" name="first">
          点餐   
         </el-tab-pane>
         <el-tab-pane label="挂单">
         挂单
         </el-tab-pane>
         <el-tab-pane label="外卖">
         外卖
        </el-tab-pane>
   </el-tabs>
   ```

2. el-table组件制作表格

   需要在订单的标签页中放入表格，把点选的食品放入到待结账列表中，可以使用Element的内置组件el-table，详见官网

   ```
   <el-table :data="tableData" border show-summary style="width: 100%" >
    
       <el-table-column prop="goodsName" label="商品"  ></el-table-column>
       <el-table-column prop="count" label="量" width="50"></el-table-column>
       <el-table-column prop="price" label="金额" width="70"></el-table-column>
       <el-table-column  label="操作" width="100" fixed="right">
           <template scope="scope">
               <el-button type="text" size="small">删除</el-button>
               <el-button type="text" size="small">增加</el-button>
    
           </template>
       </el-table-column>
   </el-table>
   ```

   这里我们采用了四列布表格， 在第1行中的:data是用来绑定数据源的， border代表表格有边框效果，fixed="right"代表最后的一列被固定在右边。

3. 按钮组件

   ```
   <el-button type="warning" >挂单</el-button>
   <el-button type="danger" >删除</el-button>
   <el-button type="success" >结账</el-button>
   ```

   可以通过type来设置按钮的样式

4. 常用商品区域布局&商品分类区布局

   这一块就是写一些基本的css和html，重要的是考虑结构以及调整样式，之后重复的部分可以利用相同的css类名进行样式定义；

### Axios从远程读取数据

1. 基于Promise的HTTP请求客户端，可同时在浏览器和node.js中使用

2. 功能特性：

   - 在浏览器中发送 XMLHttpRequests请求
   - 在 node.js 中发送 http请求
   - 支持 Promise API
   - 拦截请求和响应
   - 转换请求和响应数据
   - 自动转换 JSON 数据
   - 客户端支持保护安全免受 XSRF攻击

3. 安装Axios

   直接使用 npm install 来进行安装,需要安装到生产环境，因为需要打包发到生产环境中。

   ```
   npm install axios --save
   ```

4. 引入Axios

   在Pos.vue页面中进行引入，由于使用了npm进行安装，所以这里不需要填写路径

   ```
   import axios from 'axios'
   ```

5. 服务器拉取数据

   在拉取数据之前，通常你要知道一个远端的服务器地址，之后把axios的方法写到created钩子函数中，我们使用get方法进行拉取数据，如果拉取成功的话，就对data中的数组进行赋值。

   拉取常用商品数据

   ```
   created(){
         axios.get('http://jspang.com/DemoApi/oftenGoods.php')
         .then(response=>{
            console.log(response);
            this.oftenGoods=response.data;
         })
         .catch(error=>{
             console.log(error);
             alert('网络错误，不能访问');
         })
     },
   ```

   拉取分类商品数据

   ```
        //读取分类商品列表
         axios.get('http://jspang.com/DemoApi/typeGoods.php')
         .then(response=>{
            console.log(response);
            //this.oftenGoods=response.data;
            this.type0Goods=response.data[0];
            this.type1Goods=response.data[1];
            this.type2Goods=response.data[2];
            this.type3Goods=response.data[3];
    
         })
         .catch(error=>{
             console.log(error);
             alert('网络错误，不能访问');
         })
   ```

   拉取报错，一般有两种情况：

   1. 网络不通：网络状况不是很好，这可以在失败后隔5秒再次请求。
   2. 报决绝访问：这种多是后端程序员设置了不允许跨域访问，需要你和后端程序员一起调试解决。

### 订单模版核心功能制作

1. 添加商品到订单页面

   在vue的构造器里加入methods方法，在methods方法中再加入addOrderList方法，当我们点击右侧的商品的时候，就会把商品添加到左侧的列表里边，使用标志位来确定是否这个商品在订单列表里边，如果在订单列表中，那么就利用过滤方法进行帅选出来，之后把数量加1，否则就作为一个新值push到老数组里边

   利用forEach方法进行数量和金额的叠加

   ```
   methods:{
         //添加订单列表的方法
         addOrderList(goods){
               this.totalCount=0; //汇总数量清0
               this.totalMoney=0;
               let isHave=false;
               //判断是否这个商品已经存在于订单列表
               for (let i=0; i<this.tableData.length;i++){
                   console.log(this.tableData[i].goodsId);
                   if(this.tableData[i].goodsId==goods.goodsId){
                       isHave=true; //存在
                   }
               }
               //根据isHave的值判断订单列表中是否已经有此商品
               if(isHave){
                   //存在就进行数量添加
                    let arr = this.tableData.filter(o =>o.goodsId == goods.goodsId);
                    arr[0].count++;
                    //console.log(arr);
               }else{
                   //不存在就推入数组
                   let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
                    this.tableData.push(newGoods);

               }

               //进行数量和价格的汇总计算
               this.tableData.forEach((element) => {
                   this.totalCount+=element.count;
                   this.totalMoney=this.totalMoney+(element.price*element.count);   
               });
              
         }
     }
   ```

2. 给订单列表中的增加按钮添加功能

   商品中绑定addOrderList方法是非常容易的，如果在订单列表中绑定是需要特殊处理一下的，需要用到template的scope值，让后进行绑定。

   ```
   <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
   ```

3. 删除单个商品和全部商品

   对统计金钱和数量的方法进行提炼，之后分别调用

   ```
   //汇总数量和金额
   getAllMoney(){
       this.totalCount=0;
       this.totalMoney=0;
       if(this.tableData){
               this.tableData.forEach((element) => {
           this.totalCount+=element.count;
           this.totalMoney=this.totalMoney+(element.price*element.count);   
       });
       }   
   }
   ```

   在veu构造器methods属性里增加一个delSingleGoods方法，并接收goods对象为参数，用数组的filter可以轻松删除数组中单个的商品。

   ```
   //删除单个商品
      delSingleGoods(goods){
        console.log(goods);
        this.tableData=this.tableData.filter(o => o.goodsId !=goods.goodsId);
        this.getAllMoney();
   },
   ```

   之后绑定事件即可：

   ```
   <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
   ```

   删除全部订单商品

   ```
   delAllGoods() {
               this.tableData = [];
               this.totalCount = 0;
               this.totalMoney = 0;
   },
   ```

4. 模拟结账

   步骤一共是有4步：

   4.1、设置我们Aixos的Pos方法。

   4.2、接受返回值进行处理。

   4.3、如果成功，清空现有构造器里的tableData，totalMoney，totalCount数据。

   4.4、进行用户的友好提示。

   前边两步需要有服务器支持，涉及后端知识比较多，稍后做，先做后两步

   ```
   checkout() {
       if (this.totalCount!=0) {
           this.tableData = [];
           this.totalCount = 0;
           this.totalMoney = 0;
           this.$message({
               message: '结账成功，感谢你又为店里出了一份力!',
               type: 'success'
           });
    
       }else{
           this.$message.error('不能空结。老板了解你急切的心情！');
       }
    
   }
   ```

### 10项目打包和上线

1. 把绝对路径改成相对路径

   在config／index.js文件的build属性中，可以看到打包的基本配置，可以在这里修改打包的目录，打包的文件名，另外还要把绝对路径修改成相对目录

   ```
   assetsPublicPath:'./'
   ```

   这样就可以把项目正常打包起来

2. 在命令行中用npm run build 进行打包

   ```
   npm run build
   ```