## AngularJs#

### 1.AngularJs简介###

AngularJS 是一个 **JavaScript 框架**。它可通过 `<script>` 标签添加到 HTML 页面,为了页面加载迅速，一般放在body元素的最下边的位置。AngularJS 通过 **指令** 扩展了 HTML，且通过 **表达式** 绑定数据到 HTML。

### 2.AngularJs知识点详解###

#### 2.1AngularJS 表达式####

  **a. AngularJS 使用表达式把数据绑定到 HTML。**

AngularJS 表达式写在双大括号内：**{{ expression }}**，AngularJS 表达式把数据绑定到 HTML，这与 **ng-bind** 指令有异曲同工之妙，AngularJS 将在表达式书写的位置"输出"数据。

```	
<div ng-app="" ng-init="quantity=1;cost=5">
<p>总价： {{ quantity * cost }}</p> 
</div>

使用ng-bind方法进行绑定：
<div ng-app="" ng-init="quantity=1;cost=5">
<p>总价： <span ng-bind="quantity * cost"></span></p> 
</div>
```

**其中ng-init此处可以放置数字、字符串、数组、对象等等形式数据**   

  **b.AngularJS 表达式与JavaScript 表达式区别**

> 它们可以包含文字、运算符和变量。
>
> AngularJS 表达式可以写在 HTML 中，AngularJS 表达式不支持条件判断，循环及异常，AngularJS 表达式支持过滤器。

#### 2.2AngularJs指令####

AngularJS 通过被称为 **指令** 的新属性来扩展 HTML。

**一些常见的指定**

```
ng-app 指令初始化一个 AngularJS 应用程序。
ng-init 指令初始化应用程序数据。
ng-model 指令把元素值（比如输入域的值）绑定到应用程序。
ng-repeat ng-repeat 指令对于集合中（数组中）的每个项会 克隆一次 HTML 元素。（相当于遍历）
```

也可以通过.directive函数来自定义指令

#### 2.3AngularJs模型####

ng-model 指令用于绑定应用程序数据到 HTML 控制器(input, select, textarea)的值。









