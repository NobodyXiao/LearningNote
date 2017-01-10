## CSS和CSS3知识点总结##

**1.a链接(如果没有遵循这个顺序，可能在不同浏览器会出现不起作用的bug)**  

关于a链接的4个状态在设置的时候需要注意一定的顺序，一般有以下的规矩：	

- a:hover 必须跟在 a:link 和 a:visited后面
- a:active 必须跟在 a:hover后面

**2.列表的设置中list-style其实是简写属性，属性具体列表如下所示**	

- list-style-type：设置列表项标志的类型，即列表项前边的标识是原点还是方块，或者是图片
- list-style-position：设置列表中列表项标志的位置（标志在li的位置）
- list-style-image：将图象设置为列表项标志（注意background的简写顺序，不重复）

**3.table表格中每个单元格都有独立的边框，如果使边框重合，那么使用属性：** 

​	table{border-collapse:collapse;}

**4.关于设置边框** 

​	可以使用简写设置border，也可以分别设置border-width，border-style，border-color

但是如果分开设置的时候，就**一定要先设置好border-style,** 其余设置才能起作用。

​	设置上右下左边框的时候，可以单独进行设置，例如：border-left-color,border-top-style等

**5.轮廓（outline）**

​	轮廓（outline）是绘制于元素周围的一条线，**位于边框边缘的外围** ，可起到突出元素的作用。

CSS outline 属性规定元素轮廓的样式、颜色和宽度，和border是一样设置的，只是位置不同而已。

**6.关于外边距（margin）和填充（padding）** 

​	**6.1** margin没有背景颜色，是完全透明的，Margin可以使用负值，可能的值：auto，length，%

​	**6.2** 可能的值：完全透明的，不可以使用负值，可能的值：length,%

**7.分组选择器** ，是将CSS设置一样的提取出来，写在一起，选择器用逗号分开，这样可以精简代码。