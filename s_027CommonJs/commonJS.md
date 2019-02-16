## commonJS

###在ES6被出现之前，javascript缺少模块系统，类，标准库也比较少，缺乏包管理工具；可是人们又很希望把javascript代码模块化，这样减轻耦合，增加重用性，并为模块创建一个私有的作用域，不会污染局部变量，所以commonJS和AMD等模块规范应运而生。

1. commonJS规范

   - commonJS规范规定，每个模块内部，使用module.exports导出对外的变量或者接口，通过require()来导入其他模块的变量或者接口， 输入到当前模块中。

   - commonJS的特点：

     - 所有代码都运行在模块作用域，不会污染全局作用域。
     - 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
     - 模块加载的顺序，按照其在代码中出现的顺序。
     - 加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作
     - CommonJS模块输出的是一个值的复制，CommonJS模块是运行时加载

   - 关于commonJS的module对象以及module.exports属性

     - Node内部提供一个`Module`构建函数。所有模块都是`Module`的实例。每个模块内部，都有一个`module`对象，代表当前模块。它有以下属性。

       ```
       module.id 模块的识别符，通常是带有绝对路径的模块文件名。
       module.filename 模块的文件名，带有绝对路径。
       module.loaded 返回一个布尔值，表示模块是否已经完成加载。
       module.parent 返回一个对象，表示调用该模块的模块。
       module.children 返回一个数组，表示该模块要用到的其他模块。
       module.exports 表示模块对外输出的值。
       ```

     - module.exports属性

       `module.exports`属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取`module.exports`变量。

     - exports变量

       为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。

       ```
       var exports = module.exports;
       ```

       造成的结果是，在对外输出模块接口时，可以向exports对象添加方法。

       但是要注意，不能直接将exports变量指向一个值，因为这样等于切断了`exports`与`module.exports`的联系。 

       ```
       exports = function(x) {console.log(x)};
       //禁止这样做
       ```

2. AMD规范

   CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD规范则是非同步加载模块，允许指定回调函数，在模块未加载完之前，不影响后续代码执行。由于Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以CommonJS规范比较适用。但是，如果是浏览器环境，要从服务器端加载模块，等待时间取决于网速的快慢，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范。

   - AMD规范使用define方法定义模块

     ```
     define(['package/lib'], function(lib){
       function foo(){
         lib.log('hello world!');
       }
     
       return {
         foo: foo
       };
     });
     
     ```

   - AMD规范允许输出的模块兼容CommonJS规范，这时`define`方法需要写成下面这样：

     ```
     define(function (require, exports, module){
       var someModule = require("someModule");
       var anotherModule = require("anotherModule");
     
       someModule.doTehAwesome();
       anotherModule.doMoarAwesome();
     
       exports.asplode = function (){
         someModule.doTehAwesome();
         anotherModule.doMoarAwesome();
       };
     });
     ```

   - `AMD`也采用`require()`语句加载模块

     ```
     require([module], callback);
     
     require(['clock'],function(clock){
       clock.start();
     });
     ```

3. CMD规范

   `CMD` (Common Module Definition), 是`seajs`推崇的规范，`CMD`则是依赖就近，用的时候再`require`。它写起来是这样的：

   ```
   define(function(require, exports, module) {
      var clock = require('clock');
      clock.start();
   });
   ```

   `AMD`和`CMD`最大的区别是对依赖模块的执行时机处理不同，而不是加载的时机或者方式不同，二者皆为异步加载模块。
   `AMD`依赖前置，`js`可以方便知道依赖模块是谁，立即加载；而`CMD`就近依赖，需要使用把模块变为字符串解析一遍才知道依赖了那些模块

###ES6的模块规范

但是随着ES6出现以后，实现了模块化，实现了自己的import和export接口用来载入和导出模块。但是ES6的模块规范不同于commonJS规范和AMD规范的是，CommonJS和AMD（现在基本快被放弃的加载方式）模块，都只能在运行时确定这些东西。比如， CommonJS模块就是对象，输入时必须查找对象属性，

```
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat, exists = _fs.exists, readfile = _fs.readfile;
```

上面代码的实质是整体加载fs 模块（即加载fs 的所有方法），生成一个对象（_fs ），然后再从这个对象上面读取3个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

ES6模块不是对象，而是通过export 命令显式指定输出的代码，输入时也采用静态命令的形式。

```
// ES6模块
import { stat, exists, readFile } from 'fs';
```

上面代码的实质是从fs 模块加载3个方法，其他方法不加载。这种加载称为“编译时加载”，即ES6可以在编译时就完成模块编译，效率要比CommonJS模块的加载方式高。  当然，这也导致了没法引用ES6模块本身，因为它不是对象。

* export命令

  - export命令除了输出变量，还可以输出函数或类（class）

  - 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export 关键字输出该变量。**因为不推荐单独每个都命令输出，所以建议在底部一起命令输出。**

    ```
    var firstName = 'Michael';
    var lastName = 'Jackson';
    var year = 1958;
    export {firstName, lastName, year};
    ```

* import命令

  * import 命令接受一个对象（用大括号表示）

    ```
    // main.js
    import {firstName, lastName, year} from './profile';
    ```

  * 为输入的变量重新取一个名字

    ```
    import { lastName as surname } from './profile';
    ```

  * import 命令具有提升效果

    ```
    foo();
    import { foo } from 'my_module'; // 会提升到顶部
    ```

  * 模块整体加载

    这种用法多用于常量定义方式（当然对函数，类都可以使用）。

    ```
    // profile.js
    const firstName = 'Michael';
    const lastName = 'Jackson';
    const year = 1958;
    export {firstName, lastName, year};
    ```

    分别用两种加载方式举例

    ```
    // main.js （逐一加载）
    import { firstName, lastName } from './circle';
    console.log("姓名： " + firstName);
    
    // main.js （整体加载）
    import * as userName from './circle';
    console.log("姓名： " + userName.firstName); 
    ```

* Export default命令

  使用import 命令的时候，开发者需要知道所要加载的变量名或函数名，否则无法加载。

  为了解决这种情况，就要用到export default 命令，为模块指定默认输出。

  当然，一个模块只能有一个默认输出，因此export deault 命令只能使用一次。 
  所以， import 命令后面才不用加大括号，因为只可能对应一个方法。

  通过export方式导出，在导入时要加{ }，export default则不需要

  ```
  var name="李四";
  export { name }
  //import { name } from "/.a.js" 
  可以写成：
  var name="李四";
  export default name
  //import name from "/.a.js" 这里name不需要大括号
  ```

  

  











​

