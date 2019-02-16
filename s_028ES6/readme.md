## ES6知识点总结

1. **将ES6转换成ES5的方法**

   1.1 使用Babel来完成转换，具体方法如下：

     >a.先建立一个项目的工程目录，并在目录下边建立两个文件夹：**src**和**dist**
     >
     >- src：书写ES6代码的文件夹，写的js程序都放在这里。
     >- dist：利用Babel编译成的ES5代码的文件夹，在HTML页面需要引入的是这里的js文件。
     >
     >b.初始化项目npm init -y，-y的意思代表默认全部都同意
     >
     >c.全局安装Babel-cli,使用命令`npm install -g babel-cli`
     >
     >d.本地安装babel-preset-es2015和babel-cli,使用命令`npm install --save-dev babel-preset-es2015 babel-cli`
     >
     >e.在根目录下边新建.babelrc文件，打开进行配置
     >
     >```
     >{
     >    "presets":[
     >        "es2015"
     >    ],
     >    "plugins":[]
     >}
     >```
     >
     >之后我们在终端输入转换命令的时候就可以成功转换了，`babel src/index.js -o dist/index.js`
     >
     >当然你也可以简化以上转换的命令，只要在package.json中进行一下配置即可
     >
     >```
     >"scripts": {
     >    "build": "babel src/index.js -o dist/index.js"
     >  },
     >```
     >
     >这样你就可以使用`npm run build`命令进行转换了。

   1.2使用gulp和babel6来进行ES6和ES5之间的转换

     >a.安装依赖
     >
     >全局安装gulp`npm run build`>>安装项目中使用的gulp`npm install --save-dev gulp`>>安装gulp上babel插件`npm install --save-dev gulp-babel`>>安装babel上将ES6转换成ES5的插件`npm install --save-dev babel-preset-es2015`
     >
     >b.gulp配置
     >
     >gulpfile.js的内容
     >
     >```
     >var gulp = require("gulp");
     >var babel = require("gulp-babel"); 
     >gulp.task("default", function () { 
     >	return gulp.src("src/**/*.js")// ES6 源码存放的路径 
     >		.pipe(babel()) 
     >		.pipe(gulp.dest("dist")); //转换成 ES5 存放的路径 
     >});
     >```
     >
     >如果要生成Soucemap,则使用[gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps)，形如：
     >
     >```
     >var gulp = require("gulp");
     >var sourcemaps = require("gulp-sourcemaps"); 
     >var babel = require("gulp-babel"); 
     >var concat = require("gulp-concat"); 
     >gulp.task("default", function () { 
     >	return gulp.src("src/**/*.js") 
     >        .pipe(sourcemaps.init()) 
     >        .pipe(babel()) 
     >        .pipe(concat("all.js")) 
     >        .pipe(sourcemaps.write(".")) 
     >        .pipe(gulp.dest("dist")); 
     >});
     >```
     >
     >c.babel配置
     >
     >在项目的跟路径创建文件.babelrc，内容为
     >
     >```
     >{ 
     >	"presets": ["es2015"] 
     >}
     >```
     >
     >d.转换
     >
     >在命令行执行命令`gulp`

2. **新的声明方式**

   ES6对声明进行了扩展，可以有三种声明方式，var,let,const

     >2.1var在ES6中是用来声明全局变量的，例子如下：
     >
     >```
     >var a=2;
     >{
     >   var a=3;
     >}
     >console.log(a);
     >```
     >
     >2.1let用来声明局部变量，以避免对全局变量的一个污染
     >
     >```
     >for(var i=0;i<10;i++){
     >console.log('循环体中:'+i);
     >}
     >console.log('循环体外:'+i);
     >上边的会打印出来10，但是下边就会直接报错，因为找不到全局的i
     >for(let i=0;i<10;i++){
     >console.log('循环体中:'+i);
     >}
     >console.log('循环体外:'+i);
     >```
     >
     >2.3const声明常量
     >
     >这些常量在声明之后就始终不变，这时候就需要使用const进行声明。

3. **变量的解构赋值**

   ES6允许按照一定的模式，从数组和对象中提取值，对变量进行复制，这被称为解构。解构赋值可以在实际开发中大量减少我们的代码量，并且让我们的程序结构更加清晰。

     >3.1数组的解构赋值
     >
     >```
     >let [a,b,c]=[1,2,3];
     >```
     >
     >**数组模式需要和赋值模式统一**，等号左边的模式需要和等号右边的模式统一，如果不统一则可能得到undefined或者直接报错。
     >
     >**解构还可以设置默认值**
     >
     >```
     >let [a,b="JSPang"]=['技术胖']
     >console.log(a+b); //控制台显示“技术胖JSPang”
     >```
     >
     >需要格外注意的是**undefined**和**null**的区别
     >
     >```
     >let [a,b="JSPang"]=['技术胖',undefined];
     >console.log(a+b); //控制台显示“技术胖JSPang”
     >
     >let [a,b="JSPang"]=['技术胖',null];
     >console.log(a+b); //控制台显示“技术胖null”
     >```
     >
     >其中undefined相当于什么都没有，未被定义；但是null是一个空对象指针，是有值的。
     >
     >3.2对象的解构赋值
     >
     >```
     >let {foo,bar} = {foo:'JSPang',bar:'技术胖'};
     >console.log(foo+bar); //控制台打印出了“JSPang技术胖”
     >```
     >
     >**对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。**
     >
     >**圆括号的使用**
     >
     >如果你解构之前就定义了变量，这时候再解构就会出现问题，
     >
     >```
     >let foo;
     >{foo} ={foo:'JSPang'};
     >console.log(foo);
     >编译的时候会报错，需要在解构等式两边加上括号
     >
     >let foo;
     >({foo} ={foo:'JSPang'});
     >console.log(foo); //控制台输出jspang
     >```
     >
     >3.3字符串的解构
     >
     >```
     >const [a,b,c,d,e,f]="JSPang";
     >console.log(a);
     >console.log(b);
     >console.log(c);
     >console.log(d);
     >console.log(e);
     >console.log(f);
     >```

4. **扩展运算符和rest运算符**

   **扩展运算符和rest运算符**可以很好的为我们解决参数和对象数组未知情况下的编程，让我们的代码更健壮和简洁。

     >4.1对象扩展运算符
     >
     >当编写一个方法时，我们允许它传入的参数是不确定的。这时候可以使用对象扩展运算符来作参数
     >
     >```
     >function jspang(...arg){
     >    console.log(arg[0]);
     >    console.log(arg[1]);
     >    console.log(arg[2]);
     >    console.log(arg[3]);
     > 
     >}
     >jspang(1,2,3);／／这时我们看到控制台输出了 1,2,3，undefined，因为实际传入的是3个函数，你要打印出来4个
     >```
     >
     >扩展运算符的用处
     >
     >我们声明两个数组arr1和arr2，然后我们把arr1赋值给arr2，然后我们改变arr2的值，你会发现arr1的值也改变了，因为我们这是对内存堆栈的引用，而不是真正的赋值。
     >
     >```
     >let arr1=['www','jspang','com'];
     >let arr2=arr1;
     >console.log(arr2);／／["www", "jspang", "com"]
     >arr2.push('shengHongYu');
     >console.log(arr1);　／／["www", "jspang", "com", "shengHongYu"]
     >```
     >
     >这不是我们想看到的，我们可以使用扩展运算符来解决这个问题
     >
     >```
     >let arr1=['www','jspang','com'];
     >//let arr2=arr1;
     >let arr2=[...arr1];
     >console.log(arr2);
     >arr2.push('shengHongYu');
     >console.log(arr2);
     >console.log(arr1);
     >```
     >
     >4.2rest运算符
     >
     >```
     >function jspang(first,...arg){
     >    console.log(arg.length);
     >}
     > 
     >jspang(0,1,2,3,4,5,6,7);//这时候控制台打印出了7，说明我们arg里有7个数组元素
     >```
     >
     >另外我们可以使用for...of循环来打印出arg的值
     >
     >```
     >function jspang(first,...arg){
     >    for(let val of arg){
     >        console.log(val);
     >    }
     >}
     > 
     >jspang(0,1,2,3,4,5,6,7);
     >```
     >
     >for…of的循环可以避免我们开拓内存空间，增加代码运行效率，所以建议大家在以后的工作中使用for…of循环。

5. **字符串模版**

   字符串模版避免了繁琐的拼接过程，减少了出错率，并且支持在模版中有简单的计算操作

   ```
   //传统的字符串拼接
   let jspang='技术胖';
   let blog = '非常高兴你能看到这篇文章，我是你的老朋友'+jspang+'。这节课我们学习字符串模版。';
   document.write(blog);
   //字符串模版
   let jspang='技术胖';
   let blog = `非常高兴你能看到这篇文章，我是你的老朋友${jspang}。这节课我们学习字符串模版。`;
   document.write(blog);
   ```

   并且支持html标签

   ```
   let jspang='技术胖';
   let blog = `<b>非常高兴你能看到这篇文章</b>，我是你的老朋友${jspang}。<br/>这节课我们学习字符串模版。`;
   document.write(blog);
   ```

   以及简单的计算操作

   ```
   let a=1;
   let b=2;
   let result=`${a+b}`;
   document.write(result);
   ```

   强大的字符串模版，在实际开发中，我们可以让后台写一个活动页面，然后轻松的输出给用户。

   ES6还增加了字符串的查找功能,如下边所示

     >1.字符串查找
     >
     >先来看一下ES5的写法，其实这种方法并不实用，给我们的索引位置，我们自己还要确定位置。
     >
     >```
     >let jspang='技术胖';
     >let blog = '非常高兴你能看到这篇文章，我是你的老朋友技术胖。这节课我们学习字符串模版。';
     >document.write(blog.indexOf(jspang));
     >```
     >
     >ES6直接用includes就可以判断，不再返回索引值，这样的结果我们更喜欢，更直接。
     >
     >```
     >let jspang='技术胖';
     >let blog = '非常高兴你能看到这篇文章，我是你的老朋友技术胖。这节课我们学习字符串模版。';
     >document.write(blog.includes(jspang));
     >```
     >
     >**判断开头是否存在：**
     >
     >```
     >blog.startsWith(jspang);
     >```
     >
     >**判断结尾是否存在：**
     >
     >```
     >blog.endsWith(jspang);
     >```
     >
     >includes,starts和ends 后边都要加s，避免写错哦。
     >
     >2.复制字符串
     >
     >我们有时候是需要字符串重复的，比如分隔符和特殊符号，这时候复制字符串就派上用场了，语法很简单。
     >
     >```
     >document.write('jspang|'.repeat(3));
     >```

6. **ES6的数字操作**

     >6.1二进制和八进制的晟敏
     >
     >**二进制声明：**二进制的英文单词是Binary,二进制的开始是0（零），然后第二个位置是b（注意这里大小写都可以实现），然后跟上二进制的值就可以了。
     >
     >```
     >let binary = 0B010101;
     >console.log(binary);//21
     >```
     >
     >**八进制声明：**八进制的英文单词是Octal，也是以0（零）开始的，然后第二个位置是O（欧），然后跟上八进制的值就可以了。
     >
     >```
     >let b=0o666;
     >console.log(b);//438
     >```
     >
     >6.2数字的判断和转换
     >
     >数字的验证
     >
     >**Number.isFinite( xx )**用来检验数字是否是有限数值，其中这些数值可能是经过类型转换之后得到的
     >
     >NaN是特殊的非数字，可以使用**Number.isNaN()**来进行验证。下边的代码控制台返回了true。
     >
     >**Number.isInteger(xx)**：用来判断数字是否为整数
     >
     >**整数转换Number.parseInt(xxx)和浮点型转换Number.parseFloat(xxx)**：
     >
     >```
     >let a='9.18';
     >console.log(Number.parseInt(a)); 
     >console.log(Number.parseFloat(a));
     >```
     >
     >6.3整数的取值范围操作
     >
     >最大安全整数
     >
     >```
     >console.log(Number.MAX_SAFE_INTEGER);
     >```
     >
     >最小安全整数
     >
     >```
     >console.log(Number.MIN_SAFE_INTEGER);
     >```
     >
     >**安全整数判断isSafeInteger( )**
     >
     >```
     >let a= Math.pow(2,53)-1;
     >console.log(Number.isSafeInteger(a));//false
     >```

7. **ES6中新增的数组知识**

     >7.1JSON数组格式转换
     >
     >为了前端快速的把JSON转换成数组的一种格式
     >
     >```
     >let  json = {
     >    '0': 'jspang',
     >    '1': '技术胖',
     >    '2': '大胖逼逼叨',
     >    length:3
     >}
     > //这就是一个标准的JSON数组格式，跟普通的JSON对比是在最后多了一个length属性。
     >let arr=Array.from(json);
     >console.log(arr)
     >```
     >
     >7.2Array.of()方法
     >
     >它负责把一堆文本或者变量转换成数组。
     >
     >```
     >let arr =Array.of(3,4,5,6);
     >console.log(arr);
     >```
     >
     >7.3find()实例方法
     >
     >这里的find方法是从数组中查找。在find方法中我们需要传入一个匿名函数，函数需要传入三个参数：
     >
     >- value：表示当前查找的值。
     >- index：表示当前查找的数组索引。
     >- arr：表示当前数组。
     >
     >在函数中如果找到符合条件的数组元素就进行return，并停止查找。
     >
     >```
     >let arr=[1,2,3,4,5,6,7,8,9];
     >console.log(arr.find(function(value,index,arr){
     >    return value > 5;
     >}))
     >```
     >
     >7.4fill()实例方法
     >
     >作用时将数组进行填充，它接受3个参数，第一个参数时填充的变量，第二个参数是开始填充的位置，第三个参数是填充到的位置
     >
     >```
     >let arr=[0,1,2,3,4,5,6,7,8,9];
     >arr.fill('jspang',2,5);
     >console.log(arr);
     >```
     >
     >7.5数组的遍历
     >
     >for…of循环：比for循环高效且简单
     >
     >```
     >let arr=['jspang','技术胖','大胖逼逼叨']
     > 
     >for (let item of arr){
     >    console.log(item);
     >}
     >```
     >
     >**for…of数组索引**:有时候开发中是需要数组的索引的，那我们可以使用下面的代码输出数组索引。
     >
     >```
     >let arr=['jspang','技术胖','大胖逼逼叨']
     >for (let index of arr.keys()){
     >    console.log(index);
     >}
     >```
     >
     >同时输出数组的内容和索引
     >
     >```
     >let arr=['jspang','技术胖','大胖逼逼叨']
     >for (let [index,val] of arr.entries()){
     >    console.log(index+':'+val);
     >}
     >```

8. ES6中的箭头函数和扩展

     >8.1函数的默认值操作
     >
     >```
     >function add(a,b=1){
     >    return a+b;
     >}
     >console.log(add(1));
     >```
     >
     >8.2主动抛出错误：ES6中我们直接用throw new Error( xxxx ),就可以抛出错误。
     >
     > ```
     >function add(a,b=1){
     >   
     >    if(a == 0){
     >        throw new Error('This is error')
     >    }
     >     return a+b;
     >}
     > 
     >console.log(add(0));
     > ```
     >
     >8.3函数中的严谨模式
     >
     >```
     >function add(a,b=1){
     >    'use strict'
     >    if(a == 0){
     >        throw new Error('This is error');
     >    }
     >     return a+b;
     >}
     > 
     >console.log(add(1));
     >```
     >
     >上边的代码如果运行的话，浏览器会直接报错，这是ES6的一个坑，如果你使用了默认值，再使用严谨模式，就会发生冲突
     >
     >8.4获得需要传递的参数个数
     >
     >ES6为我们提供了得到参数的方法(xxx.length).我们用上边的代码看一下需要传递的参数个数。
     >
     >```
     >function add(a,b){
     >    'use strict'
     >    if(a == 0){
     >        throw new Error('This is error');
     >    }
     >     return a+b;
     >}
     > 
     >console.log(add.length);
     >```
     >
     >其中我们去掉严谨模式，并且给第二个参数加上默认值的话，这时候add.length的值就变成1了，这里打印的是必须传入的参数个数。
     >
     >8.5箭头函数：箭头函数中不可加new，也就是箭头函数不能当构造函数进行使用

9. ES6种的函数和数组补漏

   **函数解构赋值**

   在前后端分离时，后端经常返回JSON格式的数据，我们希望直接把这个JSON格式数据当作参数，传递到参数内部进行处理。

   ```
   let json = {
       a:'jspang',
       b:'技术胖'
   }
   function fun({a,b='jspang'}){
       console.log(a,b);
   }
   fun(json);
   ```

   数组的函数解构

   函数能解构JSON，那也可以进行数组解构

   ```
   let arr = ['jspang','技术胖','免费教程'];
   function fun(a,b,c){
       console.log(a,b,c);
   }
    
   fun(...arr);
   ```

   **in的用法**

   in是用来判断对象或者数组种是否存在某个值的

   >对象判断
   >
   >```
   >let obj={
   >    a:'jspang',
   >    b:'技术胖'
   >}
   >console.log('a' in obj);  //true
   >```
   >
   >数组判断
   >
   >先来看一下ES5判断的弊端，以前会使用length属性进行判断，为0表示没有数组元素。但是这并不准确，或者说真实开发中有弊端。
   >
   >```
   >let arr=[,,,,,];
   >console.log(arr.length); //5
   >```
   >
   >ES6中的in就可以解决这个问题
   >
   >```
   >let arr=[,,,,,];
   >console.log(0 in arr); //false
   > 
   >let arr1=['jspang','技术胖'];
   >console.log(0 in arr1);  // true
   >```
   >
   >注意：这里的0指的是数组下标位置是否为空，空则表现为false，有值则返回true

   **数组的遍历方法**

     >forEach方法
     >
     >```
     >let arr=['jspang','技术胖','前端教程']; 
     >arr.forEach((val,index)=>console.log(index,val));
     >```
     >
     >forEach循环的特点是会自动省略为空的数组元素，相当于直接给我们筛空了。
     >
     >filter()方法
     >
     >```
     >let arr=['jspang','技术胖','前端教程']; 
     >arr.filter(x=>console.log(x));
     >```
     >
     >some()方法
     >
     >```
     >let arr=['jspang','技术胖','前端教程']; 
     >arr.some(x=>console.log(x));
     >```
     >
     >map()方法
     >
     >```
     >let arr=['jspang','技术胖','前端教程']; 
     >console.log(arr.map(x=>'web'));
     >```

   **数组转换成字符串**

   jion()方法

   ```
   let arr=['jspang','技术胖','前端教程'];
   console.log(arr.join('|'));
   ```

   toString()方法

   ```
   let arr=['jspang','技术胖','前端教程']; 
   console.log(arr.toString());
   ```

   转换时只是用逗号隔开了

10. **ES6中的对象**

  10.1ES6允许把声明的变量直接复制给对象

  ```
  let name="jspang";
  let skill= 'web';
  var obj= {name,skill};
  console.log(obj);
  ```

  10.2对象Key值构建

  有时候我们会在后台取出key值，而不是我们前台定义好的，这时候我们如何构建我们的key值？比如我们在后台取了一个key值，然后可以用[ ] 的形式，进行对象的构建。

  ```
  let key='skill';
  var obj={
      [key]:'web'
  }
  console.log(obj.skill);
  ```

  10.3自定义对象

  对象方法就是把兑现中的属性，用匿名函数的形式编程方法。这个在以前就有应用，我们这里只是简单的复习一下。

  ```
  var obj={
      add:function(a,b){
          return a+b;
      }
  }
  console.log(obj.add(1,2));  //3
  ```

  10.4Object.is()对象比较

  ```
  var obj1 = {name:'jspang'};
  var obj2 = {name:'jspang'};
  console.log(obj1.name === obj2.name);//true
  console.log(Object.is(obj1.name,obj2.name)); //true
  ```

  ```
  console.log(+0 === -0);  //true
  console.log(NaN === NaN ); //false
  console.log(Object.is(+0,-0)); //false
  console.log(Object.is(NaN,NaN)); //true
  ```

  ===为同值相等(类型相同，值还相同)，is()为严格相等。

  10.5Object.assign()合并对象

  ```
  var a={a:'jspang'};
  var b={b:'技术胖'};
  var c={c:'web'};
   
  let d=Object.assign(a,b,c)
  console.log(d);
  ```

11. **Symbol在对象中的作用**

    Symbol的意思是全局标记

      >11.1首先看一下它的声明方式
      >
      >```
      >var f= Symbol();
      >console.log(typeof(d));
      >```
      >
      >11.2 Symbol的打印
      >
      >```
      >var g = Symbol('jspang');
      >console.log(g);
      >console.log(g.toString());
      >```
      >
      >这时候我们仔细看控制台是有区别的，没有toString的是红字，toString的是黑字。
      >
      >11.3 Symbol在对象中的应用
      >
      >用Symbol可以构建对象的Key，并调用和赋值
      >
      >```
      >var jspang = Symbol();
      >var obj={
      >    [jspang]:'技术胖'
      >}
      >console.log(obj[jspang]);
      >obj[jspang]='web';
      >console.log(obj[jspang]);
      >```
      >
      >11.4Symbol对象元素的保护作用
      >
      >在对象中有很多值，要循环输出的时候，我们不希望全部输出，可以使用Symbol进行保护
      >
      >```
      >let obj={name:'jspang',skill:'web'};
      >let age=Symbol();
      >obj[age]=18;
      >for (let item in obj){
      >    console.log(obj[item]);
      >} 
      >console.log(obj);
      >```
      >
      >这时候在循环输出的时候就没有输出age，因为它是一个Symbol类型的值，已经进行了保护

12. **Set和WeakSet数据解构**

    Set是一种数据类型，Set的数据结构是以数组的形式构建的。它与Array的区别在于，Set不允许内部有重复的值，如果有的话，只会显示一个。

      >12.1创建Set类型的数据
      >
      >```
      >let setArr = new Set(['jspang','技术胖','web','jspang']);
      >console.log(setArr);//Set {"jspang", "技术胖", "web"}
      >```
      >
      >12.2Set值的增删查
      >
      >  >**追加add**
      >  >
      >  >Set和数组有一点不一样的就是，不能使用push进行追加值，需要使用add进行追加
      >  >
      >  >```
      >  >let setArr = new Set(['jspang','技术胖','web','jspang']);
      >  >console.log(setArr);//Set {"jspang", "技术胖", "web"}
      >  > 
      >  >setArr.add('前端职场');
      >  >console.log(setArr);//Set {"jspang", "技术胖", "web","前端职场"}
      >  >```
      >  >
      >  >**删除delete**
      >  >
      >  >```
      >  >let setArr = new Set(['jspang','技术胖','web','jspang']);
      >  >console.log(setArr);//Set {"jspang", "技术胖", "web"}
      >  > 
      >  >setArr.add('前端职场');
      >  >console.log(setArr); //Set {"jspang", "技术胖", "web", "前端职场"}
      >  > 
      >  >setArr.delete('前端职场');
      >  >console.log(setArr); //Set {"jspang", "技术胖", "web"}
      >  >```
      >  >
      >  >**全部删除clear**
      >  >
      >  >```
      >  >let setArr = new Set(['jspang','技术胖','web','jspang']);
      >  >console.log(setArr);//Set {"jspang", "技术胖", "web"}
      >  >setArr.clear();
      >  > 
      >  >console.log(setArray);//true
      >  >```
      >  >
      >  >**查找has**
      >  >
      >  >```
      >  >let setArr = new Set(['jspang','技术胖','web','jspang']);
      >  >console.log(setArr);//Set {"jspang", "技术胖", "web"}
      >  > 
      >  >console.log(setArr.has('jspang'));//true
      >  >```
      >
      >12.3Set循环
      >
      >  >**For…of...循环**
      >  >
      >  >```
      >  >let setArr = new Set(['jspang','技术胖'，'web','js']);
      >  >for(let item of setArr){
      >  >  console.log(item);
      >  >}
      >  >```
      >  >
      >  >**size属性**
      >  >
      >  >size属性可以获得Set值的数量
      >  >
      >  >```
      >  >let setArr = new Set(['jspang','技术胖','web','jspang']);
      >  >for (let item of setArr){
      >  >    console.log(item);
      >  >}
      >  > 
      >  >console.log(setArr.size);
      >  >```
      >  >
      >  >**forEach循环**
      >  >
      >  >```
      >  >let setArr = new Set(['jspang','技术胖','web','jspang']);
      >  >setArr.forEach((value)=>console.log(value);
      >  >```

    WeakSet的声明

    WeakSet声明有点复杂，不能直接将对象放进括号里边，需要采用迂回战术

    ```
    let weakObj=new WeakSet();//首先声明一个该类型的变量
    let obj={a:'jspang',b:'技术胖'}//其次声明一个对象
    weakObj.add(obj);//之后使用add方法将对象放进变量中
     
    console.log(weakObj);
    ```

    WeakSet里边的值也是不允许重复的，这里指的是不能放引用同一内存地址的数据，否则就会报错。

13. **Promise对象**

    一个Promise对象可以理解成一次将要执行的操作(常常被用于异步操作)，使用了Promise对象之后可以用一种链式调用的方式来组织代码，让代码更加直观。而且由于Promise.all这样的方法存在，可以让同时执行多个操作变得更加简单。

       >**13.1Promise对象的两个方法(resolve和reject)**
       >
       >resolve方法可以使Promise对象的状态变成成功，同时传递一个参数用于后续成功后的操作
       >
       >reject方法则是将Promise对象的状态变成失败，同时将错误的信息传递到后续错误处理的操作。
       >
       >```
       >function helloWorld (ready) {
       >    return new Promise(function (resolve, reject) {
       >        if (ready) {
       >            resolve("Hello World!");
       >        } else {
       >            reject("Good bye!");
       >        }
       >    });
       >}
       >
       >helloWorld(true).then(function (message) {
       >    alert(message);
       >}, function (error) {
       >    alert(error);
       >});
       >```
       >
       >**13.2Promise的三种状态**
       >
       >resolve和reject可以改变Promise对象的状态，而Promise对象的状态有3种
       >
       >- Fulfilled 可以理解为成功的状态
       >- Rejected 可以理解为失败的状态
       >- Pending 既不是 Fulfilld 也不是 Rejected 的状态，可以理解为 Promise 对象实例创建时候的初始状态
       >
       >helloWorld 的例子中的 `then` 方法就是根据 Promise 对象的状态来确定执行的操作，resolve 时执行第一个函数（onFulfilled），reject 时执行第二个函数（onRejected）。
       >
       >**13.3then和catch**
       >
       >helloWorld 的例子当中利用了 `then(onFulfilld, onRejected)` 方法来执行一个任务打印 "Hello World!"，在多个任务的情况下 `then` 方法同样可以用一个清晰的方式完成。then可以使用链式调用的写法，原因在于每一次执行方法的时候总会返回一个promise对象
       >
       >`catch` 方法是 `then(onFulfilled, onRejected)` 方法当中 `onRejected` 函数的一个简单的写法，也就是说可以写成 `then(fn).catch(fn)`，相当于 `then(fn).then(null, fn)`。使用 `catch` 的写法比一般的写法更加清晰明确。
       >
       >**13.4 promise.all和promise.race**
       >
       >promise.all可以接受一个元素作为promise对象的数组作为参数，当这个数组里面所有的promise对象都变成resolve时，该方法才会返回。
       >
       >```
       >var p1 = new Promise(function (resolve) {
       >    setTimeout(function () {
       >        resolve("Hello");
       >    }, 3000);
       >});
       >
       >var p2 = new Promise(function (resolve) {
       >    setTimeout(function () {
       >        resolve("World");
       >    }, 1000);
       >});
       >
       >Promise.all([p1, p2]).then(function (result) {
       >    console.log(result); // ["Hello", "World"]
       >});
       >```
       >
       >日常开发中经常会遇到这样的需求，在不同的接口请求数据然后拼合成自己所需的数据，通常这些接口之间没有关联（例如不需要前一个接口的数据作为后一个接口的参数），这个时候 `Promise.all` 方法就可以派上用场了。
       >
       >还有一个和 `Promise.all` 相类似的方法 `Promise.race`，它同样接收一个数组，不同的是只要该数组中的 Promise 对象的状态发生变化（无论是 resolve 还是 reject）该方法都会返回。

14. **ES6中的模块化**

    ES6之前JavaScript并没有对模块化有过原生的支持，人们想出来`AMD`，`RequireJS`，`CommenJS`等等，现在终于有`import`和`export`运算符来实现了。

    引入模块es5中的写法

    ```
    module.exports = {
      port: 3000,
      getAccounts: function() {
        ...
      }
    }
    引入
    var service = require('module.js')
    console.log(service.port) // 3000
    ```

    但是在ES6中，我们用`export`和`import`

    ```
    导出
    export var port = 3000
    export function getAccounts(url) {
      ...
    }
    引入
    import {port, getAccounts} from 'module'
    console.log(port) // 3000​
    ```
