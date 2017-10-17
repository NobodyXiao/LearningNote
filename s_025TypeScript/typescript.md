## 学习TypeScript小记##

Typescript是JavaScript的一个超集，主要提供**类型系统** 和**对ES6的支持** ，它可以编译成纯 JavaScript。编译出来的 JavaScript 可以运行在任何浏览器上。TypeScript 编译工具可以运行在任何服务器和任何系统上。TypeScript 是开源的。

1. #### TypeScript 增加了代码的可读性和可维护性### #

   - 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
   - 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
   - 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等

2.  #### TypeScript非常包容####

   - TypeScript 是 JavaScript 的超集，`.js` 文件可以直接重命名为 `.ts` 即可
   - 即使不显式的定义类型，也能够自动做出类型推断
   - 可以定义从简单到复杂的一切类型
   - 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
   - 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取

3.  #### 安装TypeScript####

   在命令行直接使用Node.js包来安装,安装：npm install -g typescript；编译：tsc helloworld.ts

   #### TypeScript的基础###

4.  #### 原始数据类型 ####

   **布尔型** ：let isDone: boolean = false;

   **数值类型** ：let decLiteral: number = 6; let hexLiteral: number = 0xf00d;

   **字符串类型** ：let myName: string = 'Xcat Liu';

   **空类型** ：在TS中，可以用void表示没有任何返回值的函数，另外生命一个void类型的变量没有什么用，因为你只能给它赋值undefined和null。

   **Null和Undefined** :在TS中，可以使用null和undefined来定义这两个原始数据类型，与void是区别是：`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型，string类型等等的变量：

5. #### 任意值####

   在TS里边使用any来表示允许赋值为任意类型。

   如果一个变量被定义为任意值类型，那么这个变量可以被多次赋予不同类型的值。

   **声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值**。

   如果一个变量在生命的时候，没有指定类型，那么这个变量会被识别为任意值类型。

6. #### 类型推论####

   如果没有明确的指定类型，那么TS会依照类型推论的规则推断出一个类型。

   ```
   let myFavoriteNumber = 'seven';
   myFavoriteNumber = 7;
   //其中这段代码会报错，因为myFavoriteNumber会被推断为string类型的值
   ```

   **在TypeScript 2.1 之前，如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查**

   ```
   let myFavoriteNumber;
   myFavoriteNumber = 'seven';
   myFavoriteNumber = 7;//这里就不会报错
   ```

   **TypeScript 2.1 中，编译器会考虑对 myFavoriteNumber 的最后一次赋值来检查类型**

7.  #### 联合类型####

   7.1 联合类型（Union Types）表示取值可以为多种类型中的一种。联合类型使用 `|` 分隔每个类型。

   ```
   let myFavoriteNumber: string | number;
   myFavoriteNumber = 'seven';
   myFavoriteNumber = 7;
   ```

   如上所示，这边可以是string类型，也可以是number类型，但是不能是其他类型。

   **7.2 访问联合类型的属性或方法 ，我们只能访问此联合类型的所有类型里共有的属性和方法。** 

   7.3 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

   ```
   let myFavoriteNumber: string | number;
   myFavoriteNumber = 'seven';
   console.log(myFavoriteNumber.length); //此处myFavoriteNumber被推断为string类型
   ```

8. #### 接口####

   8.1 在TS中我们使用接口定义对象的类型（形状），它是对行为的抽象，具体由**类** 去实现。**接口一般是首字母大写** 

   8.2 定义接口的时候，我们一般要求接口中属性和变量中的属性最好是一致的，不多不少。但是有可选属性，任意属性等时候，可以不一样。

   8.3 可选属性：即接口中的某些属性在变量中可有可无，但是不可以添加接口中不存在的属性

   ```
   interface Person {
     name: string;
     age?: number;
   }
   //其中的age属性在实际变量中可有可无，但是变量中不能私自出现其余接口中没有出现过的属性。
   let xcatliu: Person = {
     name: 'Xcat Liu',
     age: 25,
     website: 'http://xcatliu.com',
   };//此处出现了website属性，所以会报错
   ```

   8.4 任意属性：使用 `[propName: string]` 定义了任意属性取`string` 类型的值。

   **一旦定义了任意属性，那么确定属性和可选属性必须是它的子属性** 

   ```
   interface Person {
     name: string;
     age?: number;
     [propName: string]: string;
   }
    //此处任意属性的类型是string类型，那么要求其余属性必须也是string属性
   let xcatliu: Person = {
     name: 'Xcat Liu',
     age: 25,
     website: 'http://xcatliu.com',
   };//此处的age属性是number属性，所以会直接报错
   ```

   8.5 只读属性

   **只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候，也就是不是在声明这个变量的时候报错的，是后边声明完之后重新改动的时候出错**：

   ```
   interface Person {
     readonly id: number;
     name: string;
     age?: number;
     [propName: string]: any;
   }

   let xcatliu: Person = {
     id: 89757,
     name: 'Xcat Liu',
     website: 'http://xcatliu.com',
   };

   xcatliu.id = 9527;
   //此处会报错，因为接口中的ID属性是只读类型
   ```

9.  #### 数组类型####

   两种定义方式：

   ```
   let fibonacci: number[] = [1, 1, 2, 3, 5];//只允许出现数字类型的至
   let fibonacci: Array<number> = [1, 1, 2, 3, 5];//使用数组泛型的方式
   ```

   使用接口表示数组：

   ```
   interface NumberArray {
     [index: number]: number;
   }
   let fibonacci: NumberArray = [1, 1, 2, 3, 5];//其中指定索引是number，是数字类型的数组
   ```

   其中有一个常见的做法是，用any表示数组中允许出现任意类型

   ```
   let list: any[] = ['Xcat Liu', 25, { website: 'http://xcatliu.com' }];
   ```

10. #### 函数类型####

   10.1 定义函数类型的时候，需要把输入和输出都要考虑到，其中有两种定义函数类型的方式

   ```
   function sum(x: number, y: number): number {
     return x + y;
   }//函数声明
   let mySum = function (x: number, y: number): number {
     return x + y;
   };//函数表达式
   ```

   等号左边的mySum的类型是通过赋值操作进行类型推断出来的。如果手动添加类型的

   ```
   let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
     return x + y;
   };
   ```

   `=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

   10.2可选参数和默认参数

   可选参数和接口中的可选属性类似，我们用？表示可选参数，**可选参数必须接在必需参数后边** 

   参数默认值：当函数默认参数的位置 没有传入参数或者是undefined的时候，我们函数中是默认使用默认参数来参与计算。

   10.3 剩余参数

   ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数（rest 参数），rest 参数只能是最后一个参数。

11. #### 类型断言####

    类型断言就是可以绕过编译器的类型推断，手动制定一个值的类型。

    其中有两种方式：<类型>值   和    值 as 类型

    可以把一个联合类型的变量指定为一个更加具体的类型

    ```
    function getLength(something: string | number): number {
      if ((<string>something).length) {
        return (<string>something).length;
      } else {
        return something.toString().length;
      }
    }
    ```

    当然给这个变量断言一个联合类型中没有的子类型，是不可以的。

12. #### 声明文件#### 

    当使用第三方库时，我们需要引用它的声明文件。

    12.1 声明语句

    假如我们想使用第三方库，比如 jQuery，这时，我们需要使用 `declare` 关键字来定义它的类型，帮助 TypeScript 判断我们传入的参数类型对不对

    ```
    declare var jQuery: (string) => any;

    jQuery('#foo');
    ```

    `declare` 定义的类型只会用于编译时的检查，编译结果中会被删除。

    12.2 声明文件

    通常我们会把类型声明放到一个单独的文件中，这就是声明文件，我们约定声明文件以 `.d.ts` 为后缀。

    ```
    /// <reference path="./jQuery.d.ts" />

    jQuery('#foo');
    ```

    12.3 第三方声明文件

    当然，jQuery 的声明文件不需要我们定义了，已经有人帮我们定义好了

     TypeScript 2.0 推荐使用 @types 来管理。@types 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：

    ```
    npm install @types/jquery --save-dev
    ```

13. #### 内置对象####

    JavaScript中很多内置对象，可以直接在TS中当做定义好了的类型使用，内置对象是指根据标准在全局作用域上存在的对象。

    13.1 ECMAScript的内置对象有Boolean，Error，Date，RegExp等，我们可以将变量定义为这些类型

    ```
    let b: Boolean = new Boolean(1);
    let e: Error = new Error('Error occurred');
    let d: Date = new Date();
    let r: RegExp = /[a-z]/;
    ```

    13.2 DOM和BOM的内置对象有`Document`、`HTMLElement`、`Event`、`NodeList` 等。

    ```
    let body: HTMLElement = document.body;
    let allDiv: NodeList = document.querySelectorAll('div');
    document.addEventListener('click', function(e: MouseEvent) {
      // Do something
    ```

14. #### 类型别名####

    类型别名用来给一个类型起一个新名字，使用type来重新定义别名，类型别名经常用于联合类型

    ```
    type Name = string;
    type NameResolver = () => string;
    type NameOrResolver = Name | NameResolver;
    function getName(n: NameOrResolver): Name {
      if (typeof n === 'string') {
        return n;
      }
      else {
        return n();
      }
    }
    ```

15. #### 字符串字面量类型####

    字符字面量类型用来约束取值只能是某几个字符串中的一个。

    ```
    type EventNames = 'click' | 'scroll' | 'mousemove';
    function handleEvent(ele: Element, event: EventNames) {
      // do something
    }

    handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
    ```

    注意：类型别名与字符字面量类型都是使用type进行定义的。

16. #### 元组####

    数组合并了相同类型的对象，而元组合并了不同类型的对象。

    ```
    let xcatliu: [string, number] = ['Xcat Liu', 25];
    ```

    元组可以针对里边的变量分别进行赋值，当然也可以一次性对元组进行赋值，只是这时候，元组类型中的变量的个数和类型要和赋值对的上

    ```
    let xcatliu: [string, number];
    xcatliu = ['Xcat Liu', 25];
    let xcatliu: [string, number] = ['Xcat Liu'];
    //这时候就会报错，因为只对元组中其中一个变量赋值
    ```

    对于越界的元素，它的类型会被赋值为元组中每个类型的联合类型

    ```
    let xcatliu: [string, number];
    xcatliu = ['Xcat Liu', 25, 'http://xcatliu.com/'];
    ```

    数组中的第三项满足联合类型`string | number`。那么当访问一个越界元素的时候，也会识别为元组中每个类型的联合类型，访问它属性的时候可能会出错，因为联合类型只能访问联合类型里所有类型的共有属性和方法。

17. #### 枚举类型####

    17.1 枚举类型其实就是用对象表示，每个成员都会被付给一个对应的数值，枚举值和枚举名相互映射。

    枚举使用 `enum` 关键字来定义：enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};枚举值默认是从0开始，下一个枚举名的枚举值+1，当然也可以手动为枚举项进行赋值，没有赋值的枚举值依然会以步长值1递增，如果后边的枚举值与前边重复了，那么就直接赋值前边的枚举值。

    17.2  常数项和计算所得项

    枚举项有两种类型：常数项和计算所得项

    ```
    enum Color {Red, Green, Blue = "blue".length};
    //"blue".length 就是一个计算所得项。
    ```

    但是**如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错**：

    ```
    enum Color {Red = "red".length, Green, Blue};
    // index.ts(1,33): error TS1061: Enum member must have initializer.
    // index.ts(1,40): error TS1061: Enum member must have initializer.
    ```

    常数项和计算所得项的完整定义：

    当满足以下条件时，枚举成员被当作是常数：

    - 不具有初始化函数并且之前的枚举成员是常数。在这种情况下，当前枚举成员的值为上一个枚举成员的值加 `1`。但第一个枚举元素是个例外。如果它没有初始化方法，那么它的初始值为 `0`。
    - 枚举成员使用常数枚举表达式初始化。常数枚举表达式是 TypeScript 表达式的子集，它可以在编译阶段求值。当一个表达式满足下面条件之一时，它就是一个常数枚举表达式：
      - 数字字面量
      - 引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的）如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用
      - 带括号的常数枚举表达式
      - `+`, `-`, `~` 一元运算符应用于常数枚举表达式
      - `+`, `-`, `*`, `/`, `%`, `<<`, `>>`,`>>>`, `&`, `|`, `^` 二元运算符，常数枚举表达式做为其一个操作对象。若常数枚举表达式求值后为NaN或Infinity，则会在编译阶段报错

    所有其它情况的枚举成员被当作是需要计算得出的值。

    17.3 常数枚举

    ```
    const enum Directions {Up, Down, Left,Right}
    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
    ```

    常数枚举如果包含计算成员，就会报错。

18. #### 类####

    JavaScript 通过构造函数实现类的概念，通过原型链实现继承。而在 ES6 中，我们终于迎来了 `class`。

    类的简单说明：

    - 类(Class)：定义了一件事物的抽象特点，包含它的属性和方法
    - 对象（Object）：类的实例，通过 `new`生成
    - 面向对象（OOP）的三大特性：封装、继承、多态
    - 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
    - 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
    - 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 `Cat` 和 `Dog` 都继承自 `Animal`，但是分别实现了自己的`eat` 方法。此时针对某一个实例，我们无需了解它是 `Cat` 还是 `Dog`，就可以直接调用 `eat` 方法，程序会自动判断出来应该如何执行 `eat`
    - 存取器（getter & setter）：用以改变属性的读取和赋值行为
    - 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如`public` 表示公有属性或方法
    - 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
    - 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

    18.1类的属性和方法

    使用 `class` 定义类，使用 `constructor` 定义构造函数。通过 `new` 生成新实例的时候，会自动调用构造函数。

    18.2类的继承

    使用 `extends` 关键字实现继承，子类中使用`super` 关键字来调用父类的构造函数和方法。

    18.3存取器：使用getter和setter可以改变属性的赋值和读取行为

    18.4静态方法：使用static修饰符修饰的方法称为静态方法，他们不需要实例化，而是直接通过类名来调用。

    ```
    class Animal {
      static isAnimal(a) {
        return a instanceof Animal;
      }
    }

    let a = new Animal('Jack');
    Animal.isAnimal(a); // true
    a.isAnimal(a); // TypeError: a.isAnimal is not a function
    ```

    18.4 ES7中类的用法

    ​	ES6 中实例的属性只能通过构造函数中的`this.xxx` 来定义，ES7 提案中可以直接在类里面定义：

    ```
    class Animal {
      name = 'Jack';
      constructor() {
        // ...
      }
    }
    ```

    ​	静态属性：ES7 提案中，可以使用 `static` 定义一个静态属性：

    18.5 TypeScript中类的用法

    **public, private 和 protected修饰符**

    - `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
    - `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问，也不能重新赋值，并且在子类中是不允许访问的。
    - `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的

    ```
    class Animal {
      private name;
      public constructor(name) {
        this.name = name;
      }
    }

    let a = new Animal('Jack');
    console.log(a.name); // Jack
    a.name = 'Tom';
    // index.ts(9,13): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
    // index.ts(10,1): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
    直接报错，因为name属性是不被用private修饰的，并类外部不能被访问的。
    ```

    **抽象类**

    `abstract` 用于定义抽象类和其中的抽象方法。

    首先，抽象类是不允许被实例化的，其次，抽象类中的抽象方法必须被子类实现。

    ```
    abstract class Animal {
      public name;
      public constructor(name) {
        this.name = name;
      }
      public abstract sayHi();
    }

    class Cat extends Animal {
      public sayHi() {
        console.log(`Meow, My name is ${this.name}`);
      }//此处抽象类中的抽象方法被子类实现了
    }

    let cat = new Cat('Tom');//没有去实例化Animal类，而是去实例化子类Cat
    ```

19. #### 类与接口####

    接口（Interfaces）可以用于对「对象的形状（Shape）」进行描述，也可以对类的一部分行为进行抽象。	

    19.1 类实现接口

    实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 `implements` 关键字来实现。这个特性大大提高了面向对象的灵活性。

    一个类可以实现多个接口

    ```
    interface Alarm {
      alert();
    }

    interface Light {
      lightOn();
      lightOff();
    }

    class Car implements Alarm, Light {
      alert() {
        console.log('Car alert');
      }
      lightOn() {
        console.log('Car light on');
      }
      lightOff() {
        console.log('Car light off');
      }
    }
    ```

    19.2 接口继承接口

    ```
    interface Alarm {
      alert();
    }

    interface LightableAlarm extends Alarm {
      lightOn();
      lightOff();
    }
    ```

    19.3接口继承类

    ```
    class Point {
      x: number;
      y: number;
    }

    interface Point3d extends Point {
      z: number;
    }

    let point3d: Point3d = {x: 1, y: 2, z: 3};
    ```

    19.4混合类型

    指的是一个接口实现的类型里边既有自己的属性也有方法

    ```
    interface Counter {
        (start: number): string;
        interval: number;
        reset(): void;
    }

    function getCounter(): Counter {
        let counter = <Counter>function (start: number) { };
        counter.interval = 123;
        counter.reset = function () { };
        return counter;
    }

    let c = getCounter();
    c(10);
    c.reset();
    c.interval = 5.0;
    ```

20. #### 泛型####

    20.1 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

    ```
    function createArray<T>(length: number, value: T): Array<T> {
      let result = [];
      for (let i = 0; i < length; i++) {
        result[i] = value;
      }
      return result;
    }

    createArray<string>(3, 'x'); // ['x', 'x', 'x']
    ```

    上例中，我们在函数名后添加了 `<T>`，其中 `T` 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了。

    接着在调用的时候，可以指定它具体的类型为 `string`。

    20.2  定义泛型的时候，可以一次定义多个类型参数

    ```
    function swap<T, U>(tuple: [T, U]): [U, T] {
      return [tuple[1], tuple[0]];
    }

    swap([7, 'seven']); // ['seven', 7]
    ```

    20.3泛型约束

    在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法，这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。这就是泛型约束。

    ```
    interface Lengthwise {
      length: number;
    }

    function loggingIdentity<T extends Lengthwise>(arg: T): T {
      console.log(arg.length);
      return arg;
    }
    loggingIdentity(7);//7不具有length属性
    ```

    但是调用的时候，传入的参数不包含length属性，编译的时候也会报错。

    20.4 泛型接口

    我们可以使用含有泛型的接口来定义函数的形状

    ```
    interface CreateArrayFunc {
      <T>(length: number, value: T): Array<T>;
    }

    let createArray: CreateArrayFunc;
    createArray = function<T>(length: number, value: T): Array<T> {
      let result = [];
      for (let i = 0; i < length; i++) {
        result[i] = value;
      }
      return result;
    }

    createArray(3, 'x'); // ['x', 'x', 'x']
    ```

    20.5 泛型类

    与泛型接口类似，泛型也可以用于类的类型定义中：

    ```
    class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;
    }

    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function(x, y) { return x + y; };
    ```

21. #### 声明合并####

    如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型：

    函数的合并:

    ```
    function reverse(x: number): number;
    function reverse(x: string): string;
    function reverse(x: number | string): number | string {
      if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
      } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
      }
    }
    ```

    接口的合并（同类的合并）

    ```
    interface Alarm {
      price: number;
    }
    interface Alarm {
      weight: number;
      price: number;
    }
    合并之后是下边这样

    interface Alarm {
      price: number;
      weight: number;
    }
    ```

    **合并的属性的类型必须是唯一的**：如果第二个Alarm中的price属性是string类型，那么就不能合并。

