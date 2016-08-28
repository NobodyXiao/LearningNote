

**var minH = Math.min.apply(null,colH);**

针对上述语句的解释:

apply() 的作用是改变执行的执行环境。

就是说数组 **colH** 没有min这个方法，但是**Math**对象可以求最小值，有min这个方法

例如 var a = Math.min(3,2,1,4)，那么a将赋值为1

**colH**想使用Math对象的min方法，就需要使用call/apply来改变执行环境了。

Math.min(3,2,1,4)等价于 Math.min.apply(null, [3,2,1,4])，null是上下文，传入的对象对应函数中的this，min函数并没有使用this，因此这里可以为null，[3,2,1,4]是给min函数的参数列表。



function getByClass(clsName, parent){
 //定义函数getByClass()实现获取document或指定父元素下所有class为on的元素  

    var oP=parent?document.getElementById(parent):document,
        box=new Array();
        s = oP.getElementsByTagName('*');
    for(i=0;i<s.length;i++){
        if(s[i].className==clsName){
            box.push(s[i]);
        }
    }
    return box;
    }
