1. for...of   和for...in的区别

   遍历Array可以采用下标循环，遍历Map和Set就无法使用下标。为了统一集合类型，ES6标准引入了新的iterable类型，Array、Map和Set都属于iterable类型。

   具有iterable类型的集合可以通过新的for ... of循环来遍历。

   for ... in循环由于历史遗留问题，它遍历的实际上是对象的属性名称。一个Array数组实际上也是一个对象，它的每个元素的索引被视为一个属性。

   当我们手动给Array对象添加了额外的属性后，for ... in循环将带来意想不到的意外效果：

   ```
   var a = ['A', 'B', 'C'];
   a.name = 'Hello';
   for (var x in a) {
       alert(x); // '0', '1', '2', 'name'
   }
   ```

   for ... in循环将把name包括在内，但Array的length属性却不包括在内。

   for ... of循环则完全修复了这些问题，它只循环集合本身的元素，不会出现上述的问题

   **更好的方式是直接使用iterable内置的forEach方法，它接收一个函数，每次迭代就自动回调该函数** 

2. arguments和剩余参数rest的区别

   - arguments是一个伪数组（Array-like）,用来表示函数全部的实参
   - 剩余参数是一个真正数组（Array），具有Array.prototype上的所有方法,用来表示除开始参数意外，其余的参数
   - arguments上有callee，callee上有caller,这个暂时不懂

3. this的指向问题？

4. 原装的ajax函数封装，EMS案例还未完成？？

5. JavaScript 的解析过程分为分两个阶段：**预编译期** (变量和函数提升)和**执行期** （按顺序执行代码）

   预编译期会对代码的变量和函数进行变量提升，变量只对声明进行提升，不对值进行提升；函数表达式（可以立即调用）只对变量提升，不提升赋值，函数声明（不可以立即调用）将进行整体提升，所以会出现函数可以先调用后定义的情况。

6. 函数的双重身份:对象和构造函数，函数作为对象时，this在函数内部创建的属性和方法，而创建的属性和方法，通过函数名.属性的方式在函数外部不可调用。

7. 高阶函数：就是一个函数的参数接受的是另外一个函数

   **map();**   作用于数组的每一个元素，之后得到一个新的数组，例如把字符数组转化成数值数组,**映射函数** 

   **filter():**   用于把Array的某些元素过滤掉，过滤掉返回为false的那些数组元素，然后返回剩下的元素,正确实现一个**筛选** 函数

   **一个数组用来过滤出素数：** 

   	function get_primes(arr) {
   	    function isPrime(x){
   	        if(!Number.isInteger(x)||x<=1) return false;//Number.isInteger()用来判断书否是整数
   	        for(var i=2;i<=Math.sqrt(x);i++){
   	            if(x%i==0) return false;//如果能够被整除则表明是合数，那么则返回false，函数到此结束
   	        };
   	        return true;
   	    }//定义一个函数用来判断数组元素是否为素数，如果返回true则是，返回false则不是，之后filter函数就根据这个返回数值来筛选
   	    var a=arr.filter(isPrime);//此时a是筛选出来的数组
   	    return a;
   	}
   **sort:排序** ，sort()方法默认把所有元素先转换为String再排序，10，2进行排序，结果`'10'`排在了`'2'`的前面，因为字符`'1'`比字符`'2'`的ASCII码小

   **要按数字大小排序，我们可以这么写：** 

   ```
   var arr = [10, 20, 1, 2];
   arr.sort(function (x, y) {
       if (x < y) {
           return -1;
       }
       if (x > y) {
           return 1;
       }
       return 0;
   }); // [1, 2, 10, 20]
   ```

   **reduce();**       Array的`reduce()`把一个函数作用在这个`Array`的`[x1, x2, x3...]`上，这个函数必须接收两个参数，`reduce()`把结果继续和序列的下一个元素做**累计** 计算，求和，求乘积等等

   ```
   [x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
   ```

8. 字符串和字符数组之间转化

   **字符串转化成字符数组** 

   **1) ** function toArray(str){

       if(typeof str !="string"){

           return [];

       }

       var arr=[];

       for(var i=0;i<str.length;i++){

           arr.push(str[i])

       } 

       return arr;

   }

   **2)** var arr=str.match(/./g); 

   strObj.match（reg）方法对字符串对象进行检索,返回包含所有匹配结果的数组。而 正则表达式 /./g 匹配的是所有的字符， 所以str.match(/./g)返回的是由字符串str中所有的字符组成的数组，以此达到将字符串转换为数组的目的。

   **3)** str.split("")	

   **字符数组转化成字符串** 

   使用strObj.join（）方法可以指定数组元素之间的连接符，默认为"," 

   如对于 var arr=['a','b','c']; arr.join()返回 "a,b,c ", arr.join("")返回"abc", arr.join("join")返回"ajoinbjoinc". 

9. 深入理解JavaScript中的立即执行函数(function(){…})()

   函数声明：function fnName () {…};

   函数表达式：var fnName = function () {…};

   匿名函数：function () {};

   使用function关键字声明一个函数，但未给函数命名，所以叫匿名函数，匿名函数属于函数表达式，匿名函数有很多作用，赋予一个变量则创建函数，赋予一个事件则成为事件处理程序或创建闭包等等。

   **函数声明和函数表达式不同之处在于** ，

   一、Javascript引擎在解析javascript代码时会‘函数声明提升'（Function declaration Hoisting）当前执行环境（作用域）上的函数声明，而函数表达式必须等到Javascirtp引擎执行到它所在行时，才会从上而下一行一行地解析函数表达式，

   二、函数表达式后面可以加括号立即调用该函数，函数声明不可以，只能以fnName()形式调用 。

   ( function(){…} )(n)在函数体外边加的括号是为了告诉JavaScript引擎，这是一个函数表达式，不是函数声明，可以通过加（）的形式，立即调用这个函数，n是立即执行函数的参数

   **使用立即执行函数的用处** 

   javascript中没用私有作用域的概念，如果在多人开发的项目上，你在全局或局部作用域中声明了一些变量，可能会被其他人不小心用同名的变量给覆盖掉，根据javascript函数作用域链的特性，可以使用这种技术可以模仿一个私有作用域，用匿名函数作为一个“容器”，“容器”内部可以访问外部的变量，而外部环境不能访问“容器”内部的变量，所以( function(){…} )()内部定义的变量不会和外部的变量发生冲突，俗称“匿名包裹器”或“命名空间”。JQuery就是使用这种做法来保护内部变量的	。

10. ​

   ​


   

   ​

   ​

   ​