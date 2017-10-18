## AngularJS和Angular 4##

## AngularJS 1##

1. #### AngularJS服务####

   在AngularJS中，服务是一个函数或者对象，可在你的AngularJS应用中使用，其中AngularJS內建了30多个服务。

   相应的服务有：

   **$location** ：返回当前页面的URL地址

   ```
   var app = angular.module('myApp', []);
   app.controller('customersCtrl', function($scope, $location) {
       $scope.myUrl = $location.absUrl();
   });
   ```

   **$http 服务：**是AngularJS应用中最常用的服务。服务向服务器发送请求，应用响应服务器传送过来的数据。

   ```
   var app = angular.module('myApp', []);
   app.controller('myCtrl', function($scope, $http) {
       $http.get("welcome.htm").then(function (response) {
           $scope.myWelcome = response.data;
       });
   });
   ```

   **$timeout 服务：** AngularJS **$timeout** 服务对应了 JS **window.setTimeout** 函数。

   ```
   var app = angular.module('myApp', []);
   app.controller('myCtrl', function($scope, $timeout) {
       $scope.myHeader = "Hello World!";
       $timeout(function () {
           $scope.myHeader = "How are you today?";
       }, 2000);
   });
   ```

   **$interval 服务：**AngularJS **$interval** 服务对应了 JS **window.setInterval** 函数。

2. #### AngularJS Http####

   **$http** 是 AngularJS 中的一个核心服务，用于读取远程服务器的数据。

   ```
   // 简单的 GET 请求，可以改为 POST
   $http({
       method: 'GET',
       url: '/someUrl'
   }).then(function successCallback(response) {
           // 请求成功执行代码
       }, function errorCallback(response) {
           // 请求失败执行代码
   });
   ```

   $http.get(url) 是用于读取服务器数据的函数。

3. #### AngularJS模块####

   模块定义了一个应用程序，是应用程序中不同部分的容器，是应用控制器的容器，控制器通常属于一个模块。

   **3.1 创建模块**

   你可以通过 AngularJS 的 **angular.module** 函数来创建模块：

   ```
   <div ng-app="myApp">...</div>
   <script>
   var app = angular.module("myApp", []); 
   </script>
   ```

   "myApp" 参数对应执行应用的 HTML 元素。 此处执行应用的就是DIV元素；其中var app = angular.module("myApp", []);，其中的[]代表模块的依赖，此处没有依赖，所以为空。

   **3.2 添加控制器** 

   你可以使用 **ng-controller** 指令来添加应用的控制器:

   ```
   app.controller("myCtrl", function($scope) {
       $scope.firstName = "John";
       $scope.lastName = "Doe";
   });
   ```

   **3.3添加指令**

   AngularJS提供了很多内置指令，此外你也可以使用模块来为你的应用添加指令

   ```
   <div ng-app="myApp" runoob-directive></div>
   <script>
   var app = angular.module("myApp", []);
   app.directive("runoobDirective", function() {
       return {
           template : "我在指令构造器中创建!"
       };
   });
   </script>
   ```

   另外模块和控制器可以写在单独的JS文件中。

   **3.4函数会影响到全局命名空间**

   JavaScript 中应避免使用全局函数。因为他们很容易被其他脚本文件覆盖。AngularJS 模块让所有函数的作用域在该模块下，避免了该问题。

   3.5在我们的实例中，所有 AngularJS 库都在 HTML 文档的头部载入，因为对 angular.module 的调用只能在库加载完成后才能进行。另一个解决方案是在 <body> 元素中加载 AngularJS 库，但是必须放置在您的 AngularJS 脚本前面。

4. #### AngularJS表单输入验证####

   AngularJS 表单和控件可以验证输入的数据。AngularJS 表单和控件可以提供验证功能，并对用户输入的非法数据进行警告。

   **客户端的验证不能确保用户输入数据的安全，所以服务端的数据验证也是必须的。**

   ```
   <!DOCTYPE html>
   <html>
   <script src="http://apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js"></script>
   <body>

   <h2>Validation Example</h2>

   <form  ng-app="myApp"  ng-controller="validateCtrl"
   name="myForm" novalidate>

   <p>用户名:<br>
     <input type="text" name="user" ng-model="user" required>
     <span style="color:red" ng-show="myForm.user.$dirty && myForm.user.$invalid">
     <span ng-show="myForm.user.$error.required">用户名是必须的。</span>
     </span>
   </p>

   <p>邮箱:<br>
     <input type="email" name="email" ng-model="email" required>
     <span style="color:red" ng-show="myForm.email.$dirty && myForm.email.$invalid">
     <span ng-show="myForm.email.$error.required">邮箱是必须的。</span>
     <span ng-show="myForm.email.$error.email">非法的邮箱。</span>
     </span>
   </p>

   <p>
     <input type="submit"
     ng-disabled="myForm.user.$dirty && myForm.user.$invalid ||
     myForm.email.$dirty && myForm.email.$invalid">
   </p>

   </form>

   <script>
   var app = angular.module('myApp', []);
   app.controller('validateCtrl', function($scope) {
       $scope.user = 'John Doe';
       $scope.email = 'john.doe@gmail.com';
   });
   </script>

   </body>
   </html>
   ```

   实例解析：AngularJS ng-model指令绑定输入元素到模型中，模型对象有两个属性“user和email，我们使用ng-show指令，color:red在邮件是**$dirty** 或 **$invalid** 才显示。

   | 属性        | 描述       |
   | --------- | -------- |
   | $dirty    | 表单有填写记录  |
   | $valid    | 字段内容合法的  |
   | $invalid  | 字段内容是非法的 |
   | $pristine | 表单没有填写记录 |

5. #### AngularJS API####

   API 意为 **A**pplication **P**rogramming **I**nterface（应用程序编程接口）。

   **AngularJS全局API:**AngularJS 全局 API 用于执行常见任务的 JavaScript 函数集合.

   | API                 | 描述                        |
   | ------------------- | ------------------------- |
   | angular.lowercase() | 转换字符串为小写                  |
   | angular.uppercase() | 转换字符串为大写                  |
   | angular.isString()  | 判断给定的对象是否为字符串，如果是返回 true。 |
   | angular.isNumber()  | 判断给定的对象是否为数字，如果是返回 true。  |

   ```
   <div ng-app="myApp" ng-controller="myCtrl">
   <p>{{ x1 }}</p>
   <p>{{ x2 }}</p>
   </div>

   <script>
   var app = angular.module('myApp', []);
   app.controller('myCtrl', function($scope) {
   $scope.x1 = "JOHN";
   $scope.x2 = angular.lowercase($scope.x1);
   });
   </script>
   ```

6. #### AngularJS依赖注入：####

   依赖注入（Dependency Injection，简称DI）是一种软件设计模式，在这种模式下，一个或更多的依赖（或服务）被注入（或者通过引用传递）到一个独立的对象（或客户端）中，然后成为了该客户端状态的一部分。

   该模式分离了客户端依赖本身行为的创建，这使得程序设计变得松耦合，并遵循了依赖反转和单一职责原则。与服务定位器模式形成直接对比的是，它允许客户端了解客户端如何使用该系统找到依赖。

   **AngularJS 提供很好的依赖注入机制。以下5个核心组件用来作为依赖注入：value，factory，service，provider，constant**

7. #### ​AngularJS路由####

   AngularJS 路由允许我们通过不同的 URL 访问不同的内容，通过路由，我们可以实现多视图的单页Web应用，但是在单页应用中，AngularJS 通过 **# + 标记** 实现不同路由。

   ```
   <html>
       <head>
           <meta charset="utf-8">
           <title>AngularJS 路由实例 - 菜鸟教程</title>
       </head>
       <body ng-app='routingDemoApp'>
        
           <h2>AngularJS 路由应用</h2>
           <ul>
               <li><a href="#/">首页</a></li>
               <li><a href="#/computers">电脑</a></li>
               <li><a href="#/printers">打印机</a></li>
               <li><a href="#/blabla">其他</a></li>
           </ul>
            
           <div ng-view></div>
           <script src="http://apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js"></script>
           <script src="http://apps.bdimg.com/libs/angular-route/1.3.13/angular-route.js"></script>
           <script>
               angular.module('routingDemoApp',['ngRoute'])
               .config(['$routeProvider', function($routeProvider){
                   $routeProvider
                   .when('/',{template:'这是首页页面'})
                   .when('/computers',{template:'这是电脑分类页面'})
                   .when('/printers',{template:'这是打印机页面'})
                   .otherwise({redirectTo:'/'});
               }]);
           </script>
        
       </body>
   </html>
   ```

   首先，需要载入实现路由的js文件：angular-route.js，其次要包含ngRoute模块作为主应用模块的依赖模块。

   ```
   angular.module('routingDemoApp',['ngRoute'])
   ```

   第三步：使用 ngView 指令。

   ```
   <div ng-view></div>  //该 div 内的 HTML 内容会根据路由的变化而变化。
   ```

   第四部：配置 $routeProvider，AngularJS $routeProvider 用来定义路由规则。

   ```
   module.config(['$routeProvider', function($routeProvider){
       $routeProvider
           .when('/',{template:'这是首页页面'})
           .when('/computers',{template:'这是电脑分类页面'})
           .when('/printers',{template:'这是打印机页面'})
           .otherwise({redirectTo:'/'});
   }]);
   ```

   AngularJS 模块的 config 函数用于配置路由规则。通过使用 configAPI，我们请求把$routeProvider注入到我们的配置函数并且使用$routeProvider.whenAPI来定义我们的路由规则。

   $routeProvider 为我们提供了 when(path,object) & otherwise(object) 函数按顺序定义所有路由，函数包含两个参数:

   - 第一个参数是 URL 或者 URL 正则规则。
   - 第二个参数是路由配置对象。

   **路由设置对象**

   AngularJS 路由也可以通过不同的模板来实现。$routeProvider.when 函数的第一个参数是 URL 或者 URL 正则规则，第二个参数为路由配置对象。

   **路由配置对象语法规则如下：**

   ```
   $routeProvider.when(url, {
       template: string,//如果我们只需要在 ng-view 中插入简单的 HTML 内容，则使用该参数
       
       templateUrl: string,//如果我们只需要在 ng-view 中插入 HTML 模板文件，则使用该参数
       
       controller: string, function 或 array,
       //function、string或数组类型，在当前模板上执行的controller函数，生成新的scope。
       
       controllerAs: string,  //为controller指定别名。
       
       redirectTo: string, function, //重定向的地址。
       
       resolve: object<key, function> //指定当前controller所依赖的其他模块。
   });
   ```

   ​