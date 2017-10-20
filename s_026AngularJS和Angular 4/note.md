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

   ## Angular 4

   1. ####模块#### 

      模块由一块代码组成，可用于执行一个简单的任务。Angular应用是有模块化的，有自己的模块系统，**NgModules** ，每个Angular应该至少要有一个**根模块** ，一般可以命名为AppModule，Angular模块是一个带有@NgModule装饰器的类，它接收一个用来描述模块属性的元数据对象。

      简单的根模块

      ```
      import { NgModule }      from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      @NgModule({
        imports:      [ BrowserModule ],
        providers:    [ Logger ],
        declarations: [ AppComponent ],
        exports:      [ AppComponent ],
        bootstrap:    [ AppComponent ]
      })
      export class AppModule { }
      ```

      其中@NgModule装饰器里边的几个重要的属性：

      - **declarations （声明）** - 视图类属于这个模块。 Angular 有三种类型的视图类： 组件 、 指令 和 管道 。
      - **exports** - 声明（ declaration ）的子集，可用于其它模块中的组件模板 。
      - **imports** - 本模块组件模板中需要由其它导出类的模块。
      - **providers** - 服务的创建者。本模块把它们加入全局的服务表中，让它们在应用中的任何部分都可被访问到。
      - **bootstrap** - 应用的主视图，称为根组件，它是所有其它应用视图的宿主。只有根模块需要设置 bootstrap 属性中。

      之后我们就可以在 main.ts 文件中来引导 AppModule ，启动应用

      ```
      import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';//导入需要模块
      import { AppModule } from './app.module';// 根模块
       
      platformBrowserDynamic().bootstrapModule(AppModule);// 编译启动模块
      ```

      **模块中所有用到的组件，指令，管道，都需要在模块中事先声明好，才能在具体的组件中使用。服务可以在模块，组件，指令中的providers声明，也可以直接在运行时提供。**

   2. #### 组件####

      组件是一个模板的控制类用于处理应用和逻辑页面的视图部分，组件是构成 Angular 应用的基础和核心，可用于整个应用程序中。

      **创建 Angular 组件的方法有三步：** 

      - 从 @angular/core 中引入 Component 修饰器
      - 建立一个普通的类，并用 @Component 修饰它
      - 在 @Component 中，设置 selector **自定义标签**，以及 template **模板**

      ```
      // hello.component.ts

      import { Component } from '@angular/core';

      @Component({  //装饰器@Component告诉Angular这个类是组件类            
          selector: 'hello',//，selector属性说明了该组件对外的使用标记
          template: '<p> {{greeting}} </p>',
          styles: [`p { color: red;}`]
      })
      export class HelloComponent{
          private greeting: string;
          constructor(){
              this.greeting = 'Hello, Angular2!';
          }
      }
      ```

      **组件的生命周期：**

      - constructor：构造器函数，一般用于注入服务

      - ngOnChanges：检测到输入数据变化，首次触发发生在ngOnInit前。注意对象的属性发生变化时监听不到

      - ngOnInit：组件初始化，通常会设置一些初始值

      - ngDoCheck：手动触发更新检查

      - - ngAfterContentInit：内容初始化到组件之后
        - ngAfterContentChecked：内容变更检测之后
        - ngAfterViewInit：视图 初始化之后
        - ngAfterViewChecked：视图发生变化检测之后，这个可以用来保证用户视图的及时更新

      - ngOnDestroy：组件注销时的清理工作，通常用于移除事件监听，退订可观察对象等

   3. #### 注入服务####

      3.1 **新建服务**

      新建之后会出现两个文件mail.service.spec.ts - 用于单元测试，mail.service.ts - 新建的服务

      ```
      $ ng g s mail
      ```

      3.2**配置服务**

      新建服务之后，我们需要到根模块去配置一下服务

      ```
      import {MailService} from "./mail.service";

      @NgModule({
        ...
        providers: [MailService],
        bootstrap: [AppComponent]
      })
      export class AppModule { }
      ```

      3.3**更新服务（在mail.service.ts 更新）**

      ```
      import { Injectable } from '@angular/core';

      @Injectable()
      export class MailService {
        message: string  ='该消息来自MailService';
        constructor() { }
      }
      ```

      3.4**使用服务（在根组建中使用）**

      ```
      import { Component } from '@angular/core';
      import {MailService} from "./mail.service";

      @Component({
        selector: 'app-root',
        template: `
          <h3>{{title}}</h3>
          <div>
            <app-simple-form></app-simple-form>
            {{mailService.message}}
          </div>
        `
      })
      export class AppComponent {
        title = 'Hello, Angular';
        constructor(private mailService: MailService) {}
      }
      ```

      除了使用 `constructor(private mailService: MailService)` 方式注入服务外，我们也可以使用 `Inject` 装饰器来注入 `MailService` 服务：

      不过对于 `Type` 类型(函数类型) 的对象，我们一般使用 `constructor(private mailService: MailService)` 方式进行注入。而 `Inject `装饰器一般用来注入非 `Type` 类型的对象。

      ```
      import {Component, Inject} from '@angular/core';

      @Component({...})
      export class AppComponent {
        title = 'Hello, Angular';
        
        constructor(@Inject(MailService) private mailService) {}
      }
      ```

   4. #### Input装饰器####

      Angular 为我们提供了 `Input` 装饰器，用于定义组件的输入属性。

   5. #### Output装饰器####

      `Output` 装饰器的作用是用来实现子组件将信息，通过事件的形式通知到父级组件。

   6. #### Angular 指令####

      **6.1Angular 的指令分为三种：** 

      - 组件(Component directive)：用于构建UI组件，继承于 Directive 类
      - 属性指令(Attribute directive)：用于改变组件的外观或行为
      - 结构指令(Structural directive)：用于动态添加或删除 `DOM` 元素来改变 `DOM `布局

      **6.2 创建指令** 

      在Angular中，我们可以使用 `HostBinding` 装饰器，实现元素的属性绑定。

      ​

      ​

   7. #### Reactive Form简介####

      如果要使用Reactive Form需要一下几个步骤：

      7.1 导入ReactiveFormsModule

      ```
      import { ReactiveFormsModule } from "@angular/forms";
      ```

      7.2 在NgModule 的 `imports` 属性值对应的数组中，添加 `ReactiveFormsModule`

      ```
      @NgModule({
        imports: [
          BrowserModule,
          ReactiveFormsModule
        ],
      })
      export class AppModule { }
      ```

      7.3 绑定 form 元素的 `formGroup` 属性

      ```
      <form (ngSubmit)="save()" [formGroup]="signupForm"></form>
      ```

      7.4 关联input元素对应的`FormControl` 实例

      ```
      <input type="text" name="userName" placeholder="请输入用户名" 
        formControlName="userName">
      ```

      7.5 使用FormGroup

   8. #### 路由快速入门####

      路由是 Angular 应用程序的核心，它加载与所请求路由相关联的组件，以及获取特定路由的相关数据。这允许我们通过控制不同的路由，获取不同的数据，从而渲染不同的页面。

      **8.1 安装路由模块** 

      安装 Angular Router，可以通过运行以下任一操作来执行此操作：npm i --save @angular/router，以上命令执行后，将会自动下载 `@angular/router` 模块到 `node_modules` 文件夹中。

      **8.2 添加Base href标签** 

      我们需要做的最后一件事，是将 `<base>` 标签添加到我们的 `index.html` 文件中。路由需要根据这个来确定应用程序的根目录。

      ```
      <!doctype html>
      <html>
        <head>
          <base href="/">
          <title>Application</title>
        </head>
        <body>
          <app-root></app-root>
        </body>
      </html>
      ```

      这样我们就 Angular 路由，应用程序的根目录是 `/` 。

      **8.3使用路由模块** 

      要使用路由模块，我们需要在AppModule模块中，导入RouterModule，具体如下所示:

      ```
      import { NgModule } from '@angular/core';
      import { BrowserModule } from '@angular/platform-browser';
      import { RouterModule } from '@angular/router';

      import { AppComponent } from './app.component';

      @NgModule({
        imports: [
          BrowserModule,
          RouterModule
        ],
        bootstrap: [
          AppComponent
        ],
        declarations: [
          AppComponent
        ]
      })
      export class AppModule {}
      ```

      此时我们的路由还不能正常工作，因为我们还未配置应用程序路由的相关信息。`RouterModule` 对象为我们提供了两个静态的方法：`forRoot()` 和 `forChild()` 来配置路由信息。

      **RouterModule.forRoot() 方法** 用于在主模块中定义主要的路由信息，通过调用该方法使得我们的主模块可以访问路由模块中定义的所有指令。

      ```
      // ...
      import { Routes, RouterModule } from '@angular/router';

      export const ROUTES: Routes = [];

      @NgModule({
        imports: [
          BrowserModule,
          RouterModule.forRoot(ROUTES)
        ],
        // ...
      })
      export class AppModule {}
      ```

      我们通过使用 `const` 定义路由的配置信息，然后把它作为参数调用 `RouterModule.forRoot()` 方法，而不是直接使用 `RouterModule.forRoot([...])` 这种方式，这样做的好处是方便我们在需要的时候导出 `ROUTES` 到其它模块中。

      **RouterModule.forChild():** 根模块中使用 `forRoot()`，子模块中使用 `forChild()`

      这个功能非常强大，因为我们不必在一个地方（我们的主模块）定义所有路由信息。反之，我们可以在特性模块中定义模块特有的路由信息，并在必要的时候将它们导入我们主模块。`RouterModule.forChild()` 的使用方法如下：

      ```
      import { NgModule } from '@angular/core';
      import { CommonModule } from '@angular/common';
      import { Routes, RouterModule } from '@angular/router';

      export const ROUTES: Routes = [];

      @NgModule({
        imports: [
          CommonModule,
          RouterModule.forChild(ROUTES)
        ],
        // ...
      })
      export class ChildModule {}
      ```

      **8.4Configuring a route配置`ROUTES` 对象**

      我们定义的所有路由都是作为ROUTES数组中的对象，首先为我们的主页定义一个路由：

      ```
      import { Routes, RouterModule } from '@angular/router';
      import { HomeComponent } from './home/home.component';
      export const ROUTES: Routes = [
        { path: '', component: HomeComponent }
      ];
      @NgModule({
        imports: [
          BrowserModule,
          RouterModule.forRoot(ROUTES)
        ],
        // ...
      })
      export class AppModule {}
      ```

      示例中我们通过 `path` 属性定义路由的匹配路径，而 `component` 属性用于定义路由匹配时需要加载的组件。

      **配置完路由信息后，下一步是使用一个名为 `router-outlet` 的指令告诉 Angular 在哪里加载组件。当 Angular 路由匹配到响应路径，并成功找到需要加载的组件时，它将动态创建对应的组件，并将其作为兄弟元素，插入到 `router-outlet` 元素中，在跟组件和当前组件的模板中加入此标签**

      ​

      **8.5Dynamic routes动态模板**

      如果路由始终是静态的，那没有多大用处，动态路由可以根据不同的路由参数，渲染不同的页面。

      例如我们根据不同页面显示不同用户信息，可以使用一下方式

      ```
      import { HomeComponent } from './home/home.component';
      import { ProfileComponent } from './profile/profile.component';

      export const ROUTES: Routes = [
        { path: '', component: HomeComponent },
        { path: '/profile/:username', component: ProfileComponent }
      ];
      ```

      这里的关键点在于冒号‘：’告诉Angular路由，:username是路由参数，而不是URL中实际的部分。

      此时一个动态路由已经建好了，最重要的就是如何获取路由参数，要访问当前路由的相关信息，我们需要先从 `@angular/router` 模块中导入 `ActivatedRoute`，  然后在组件类的构造函数中注入该对象，最后通过订阅该对象的 `params` 属性，来获取路由参数，具体示例如下：

      ```
      import { Component, OnInit } from '@angular/core';
      import { ActivatedRoute } from '@angular/router';

      @Component({
        selector: 'profile-page',
        template: `
          <div class="profile">
            <h3>{{ username }}</h3>
          </div>
        `
      })
      export class SettingsComponent implements OnInit {
        username: string;
        constructor(private route: ActivatedRoute) {}
        ngOnInit() {
          this.route.params.subscribe((params) => this.username = params.username);
        }
      }
      ```

      **8.6子路由** 

      设置子路由的方法，我们可以在根组件中修改路由对象，如下：

      ```
      export const ROUTES: Routes = [
        { 
          path: 'settings', 
          component: SettingsComponent,
          children: [
            { path: 'profile', component: ProfileSettingsComponent },
            { path: 'password', component: PasswordSettingsComponent }
          ]
        }
      ];
      ```

      紧接着在SettingsComponent组件中添加`router-outlet` 指令即可。

      **8.7Component-less路由**

      另一个很有用的路由功能是 `component-less` 路由。使用 `component-less` 路由允许我们将路由组合在一起，并让它们共享路由配置信息和 outlet。

      我们可以定义settings路由而不使用`SettingsComponent` 组件：

      ```
      export const ROUTES: Routes = [
        {
          path: 'settings',
          children: [
            { path: 'profile', component: ProfileSettingsComponent },
            { path: 'password', component: PasswordSettingsComponent }
          ]
        }
      ];
      ```

      **8.8 loadChildren**

      告诉路由从另一个模块中获取子路由。具体代码如下

      ```
      export const ROUTES: Routes = [
        {
          path: '',
          component: SettingsComponent,
          children: [
            { path: 'profile', component: ProfileSettingsComponent },
            { path: 'password', component: PasswordSettingsComponent }
          ]
        }
      ];
      @NgModule({
        imports: [
          CommonModule,
          RouterModule.forChild(ROUTES)
        ],
      })
      ```

      注意此处我们使用的是RouterModule.forChild(ROUTES)方法，因为`SettingsModule` 不是我们应用的主模块。另外一个区别是我们将`SettingsModule` 模块的主路径设置为空路径 ('')。那么 `/settings` 路由信息在 `AppModule` 中配置。这时我们就需要用到 `loadChildren` 属性，具体如下：

      ```
      export const ROUTES: Routes = [
        {
          path: 'settings',
          loadChildren: './settings/settings.module#SettingsModule'
        }
      ];

      @NgModule({
        imports: [
          BrowserModule,
          RouterModule.forRoot(ROUTES)
        ],
        // ...
      })
      export class AppModule {}
      ```

      需要注意的是，我们没有将 `SettingsModule` 导入到我们的 `AppModule` 中，而是通过 `loadChildren` 属性，告诉 Angular 路由依据 `loadChildren` 属性配置的路径去加载 `SettingsModule` 模块。这就是模块懒加载功能的具体应用，当用户访问 `/settings/**` 路径的时候，才会加载对应的 `SettingsModule` 模块，这减少了应用启动时加载资源的大小。

      **8.9路由指令**

      除了 `router-outlet` 指令，路由模块中还提供了一些其它指令。

      **routerLink：** 通过此指令，我们可以连接到我们的路由

      ```
      <nav>
        <a routerLink="/">Home</a>
        <a routerLink="/settings/password">Change password</a>
        <a routerLink="/settings/profile">Profile Settings</a>
      </nav>
      其中/settings/password为路由的路径
      ```

      当我们点击以上的任意链接时，页面不会被重新加载。反之，我们的路径将在 URL 地址栏中显示，随后进行后续视图更新，以匹配 `routerLink` 中设置的值。

      **routerLinkActive：** 

      在实际开发中，我们需要让用户知道哪个路由处于激活状态，通常情况下我们通过向激活的链接添加一个 class 来实现该功能。为了解决上述问题，Angular 路由模块为我们提供了 `routerLinkActive`指令

      ```
      <nav>
        <a routerLink="/settings" routerLinkActive="active">Home</a>
        <a routerLink="/settings/password" routerLinkActive="active">Change password</a>
        <a routerLink="/settings/profile" routerLinkActive="active">Profile Settings</a>
      </nav>
      ```

      **8.10Router API**

      我们可以通过路由还提供的 API 实现与 `routerLink` 相同的功能。要使用 Router API，我们需要在组件类中注入 `Router` 对象，具体如下：

      ```
      import { Component } from '@angular/core';
      import { Router } from '@angular/router';

      @Component({
        selector: 'app-root',
        template: `
          <div class="app">
            <h3>Our app</h3>
            <router-outlet></router-outlet>
          </div>
        `
      })
      export class AppComponent {
        constructor(private router: Router) {}
      }
      ```

      组件类中注入的router对象有一个navigate()方法，该类型支持的参数类型与routerLink指令一样，调用该方法之后，页面将会自动跳转到对应的路由地址，具体使用如下：

      ```
      import { Component, OnInit } from '@angular/core';
      import { Router } from '@angular/router';

      @Component({
        selector: 'app-root',
        template: `
          <div class="app">
            <h3>Our app</h3>
            <router-outlet></router-outlet>
          </div>
        `
      })
      export class AppComponent implements OnInit {
        constructor(private router: Router) {}
        ngOnInit() {
          setTimeout(() => {
            this.router.navigate(['/settings']);
          }, 5000);
        }
      }
      ```

      若以上代码成功运行，用户界面将在 5 秒后被重定向到 `/settings` 页面。这个方法非常有用，例如当检测到用户尚未登录时，自动重定向到登录页面。

      另外的一个示例是页面在跳转的时候如何传递数据，具体如下：

      ```
      import { Component, OnInit } from '@angular/core';
      import { Router } from '@angular/router';

      @Component({
        selector: 'app-root',
        template: `
          <div class="app">
            <h3>Users</h3>
            <div *ngFor="let user of users">
              <user-component 
                [user]="user"
                (select)="handleSelect($event)">
              </user-component>
            </div>
            <router-outlet></router-outlet>
          </div>
        `
      })
      export class AppComponent implements OnInit {
        users: Username[] = [
          { name: 'toddmotto', id: 0 },
          { name: 'travisbarker', id: 1 },
          { name: 'tomdelonge', id: 2 }
        ];
        
        constructor(private router: Router) {}
        
        handleSelect(event) {
          this.router.navigate(['/profile', event.name]);
        }
      }
      ```

      ​

   9. ​