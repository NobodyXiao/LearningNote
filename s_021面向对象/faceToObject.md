### 面向对象的编程思想和方法###

实例没什么特效，主要是面向对象变成的练习而已（鼠标点击购买按钮的时候，顶部购物车部分会在明细中增加商品，并且角标上的数量也会增加），另外顺便回顾了一些bootstrap实现轮播图以及学习了实现了大图小图的效果等等。

#### 1.面向对象思想：####

​	面向对象（Object-Oriented， OO）的语言有一个标志，那就是它们都有**类**的概念，而通过类可以创建任意多个具有相同属性和方法的对象。前面提到过，ECMAScript中没有类的概念，因此它的对象也与基于类的语言中的对象有所不同。	

#### 2.数据属性和构造器属性####

​	数据属性和构造器属性是标示javascript中对象属性类型的，描述了属性的各种特征。

#### （1）数据属性包含了数据值的位置，在这个位置可以读取和写入值，数据属性有4个描述其行为的特性####


​		    a）**[[Configurable]]:表示能否通过delete删除属性从而重新定义属性**（这个属性是否可配置），能否修改属性的特性，或者能否把属性修改为访问器属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为true。

**一旦将此属性定义成不可配置的，那么就不能重新定义成可以配置的，当然也会影响到其他数据属性的设置**

​		    b）**[[Enumerable]]:表示能否通过for-in循环返回属性。**（这个属性是否是可数的）像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为true。

​		    c）**[[Writable]]:表示能否修改属性的值。**（这个属性是否是可写的），像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为true。

​		    d）**[[Value]]:包含这个属性的数据值。**（保存数据的位置）读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。这个特性的默认值为undefined。

​	**使用Object.definePropert()方法来修改属性默认的特性**，默认情况下这些属性的特性都是true，但是调用Object.definePropert()方法来设置的时候，如果不制定，那么[[Configurable]]，[[Enumerable]]，[[Writable]]的默认值都是false

​	Object.definePropert()方法接受3个参数，分别是属性所在的对象，属性的名字和一个描述符对象，描述符对象的属性必须是[[Configurable]]，[[Enumerable]]，[[Writable]]，[[Value]]。

```
var person = {  
        name:"Nicholas",  
        age:29,  
        toString:function(){  
            return "[name=" + this.name + "; age=" + this.age + "]";  
        }  
};
Object.defineProperty(person , "name",{  
    writable:false  
});  
person.name="goskalrie";//修改无效  
alert(person);//[name=Nicholas; age=29]  
```

#### 	(2)访问器属性不包含数据值，，包含一对getter和setter函数，在读取访问其属性的时候会调用getter函数，这个函数负责返回有效的数值；在写入访问器属性的时候，会调用setter函数并传入新的数值，这个函数负责决定如何处理数据。####

​		  a）**[[Configurable]]:表示能否通过delete删除属性从而重新定义属性**，能否修改属性的特性，或者能否把属性修改为数据属性。对于直接在对象上定义的属性，它们的这个特性默认值为true。

​		b）**[[Enumerable]]:表示能否通过for-in循环返回属性。**对于直接在对象上定义的属性，它们的这个特性默认值为true。

​		c）**[[Get]]:在读取属性时调用的函数。默认值为undefined。**

​		d）**[[Set]]:在写入属性时调用的函数。默认值为undefined。**

​	访问器属性不能直接定义，必须通过Object.defineProperty()来进行定义，使用访问器属性常见的方式是通过

修改其中一个属性的数值，改变其他属性的数值。在严格模式下，getter属性和setter属性需要一起使用，否则会报错，在非严格模式下，两者都可以单独使用。

```
var book = {  
        _year:2004,  
        edition:1  
};  
Object.defineProperty(book , "year" , {  
    get:function(){  
        return this._year;  
    },  
    set:function(newValue){  
        if(newValue > 2004){  
            this._year = newValue;  
            this.edition += newValue - 2004;  
        }  
    }  
});  
book.year = 2005;  
alert(book.edition);//2  	
```

#### 3.创建对象的模式或者方法####

​	**1）工厂模式:用函数来封装以特定接口创建对象的细节**

```	
function createPerson(name , age){  
    var obj = new Object();  
    obj.name = name;  
    obj.age = age;  
    obj.sayName = function(){  
        alert(this.name);  
    };  
    return obj;  
}  
var person1 = createPerson("Nicholas" , 29);  
var person2 = createPerson("Greg" , 21); 
```

**缺点：没有解决对象识别问题(即怎么知道一个对象的类型)**		

​	**2）构造函数模式**

​		a)构造函数：javascript中有原生的构造函数（Array和Object），当然也可以自己创建构造函数，构造函数跟普通函数其实没什么区别，只是构造函数一般都是以大写字母开头（**Person()**）,另外在调用的时候必须以**new关键字调用**。

```
function Person(name , age){  
    this.name = name;  
    this.age = age;  
    this.sayName = function(){  
        alert(this.name);  
    };  
}  
var person1 = new Person("Nicholas" , 29);  
var person2 = new Person("Greg" , 21);  
```

​	使用构造函数创建对象的时候，不会显示的创建对象，并且直接将属性和方法赋值给了this对象，并且没有return语句。

​	使用构造函数创建对象的4个步骤：

​		a）创建一个新对象；

​		b）将构造函数的作用域给新对象（因此this就指向了这个新对象）；

​		c）执行构造函数中的代码（为这个新对象添加属性）；

​		d）返回新对象。

检测对象的类型：使用**instanceof操作符**，使用方法：

```
person1 instanceof Object    //true
person1 instanceof People   //true
```

​	如果构造函数不使用new关键字进行调用，那么它就是一个普通函数，它将被添加到window全局环境中去，那么就可以通过window对象进行调用

```
Person("Grey",27,"Doctor")；
window.sayName(); // Grey
```

​	使用构造函数创建对象的缺点是**每个方法都会在每个实例上重新创建一遍**，且这些方法不是同一个函数

​	**3）原型模式**

​	我们创建的每个函数都有一个原型属性（prototype），这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的方法和属性。

​	也就是说我们可能通过构造函数的prototype属性来创建所有实例共享的属性和方法。所以我们就可以将一些共享的属性和方法添加到原型对象中。

```
function Person(){
  this.name="Nicholas";
  this.age=29;
}  
 Person.prototype.sayName = function(){alert(this.name);};  
 var person1 = new Person();  
 person1.sayName();//"Nicholas"  
 var person2 = new Person();  
 person2.sayName();//"Nicholas"  
 alert(person1.sayName == person2.sayName);//true  
```




