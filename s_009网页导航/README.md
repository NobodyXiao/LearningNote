## 这个实例主要是通过jquery来实现一些特效---网站的动态定位导航

#### 吐槽：虽然jquery很强大，但是我的小脑袋瓜子还是一时间装不下它那么多好用的事件方法，属性等等的:sad:，But我想为了get这些炫酷的方法，我还是很乐意去多看几遍的，哈哈:happy:。

#### 干货：涉及的知识点主要有一下几个方面：

  要实现的效果，由于电脑不能录制效果，只能文字表述了

*  滚动鼠标固定的导航相应的楼层被添加样式


*  鼠标点击某一楼层，页面自动跳到相应的楼层明细页面

1. 实现点击楼层自动跳转页面，这个使用html中的**锚点定位**就可以了，其实在页面内的定位可以利用name和id两种方法来实现，但是HTML5中a标签不再支持name属性，所以这里是通过id实现的。

2. 这个需要用到几个方法 ：scroll()方法--当滚动条滚动的时候会运行函数；(document).scrollTop();获取滚动条的位置；var  m=$(this); 

    *offset()*: 获取匹配元素在当前视口的相对偏移。 返回的对象包含两个整形属性:*top* 和 left。m.offset().top获取的就是高度。

3. 通过item.each遍历左边的网页，循环判断滚动条的位移，以及当前遍历的元素相对于当前视口位移，比较(document).scrollTop()和m.offset().top进行实现；当满足条件的时候，页面提前进入视线，即可获取当前这个遍历项的id，比较nav中正处于选中状态的这一项（即类名是current）的herf值  和获取的id是否相等，如果不相等就去掉nav中选中状态的这项的样式（current类名），给真正herf为id的选项添加样式（添加类名current）。

4. 解决IE6不支持position：fixed的方法：

   * 固定在底部：

     	   _position: absolute; 
     	   _bottom:auto; 
     	  _top:expression(eval(document.documentElement.scrollTop)); 

   * 固定在顶部：

                _position:absolute;
                _bottom:auto;
           _top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)));  

   * 固定在任意位置：

         top{

            		 position:fixed;
            		 _position:absolute;
            		 bottom:0;//这两个值根据位置改变
            		 right:20px;//这两个值根据位置改变
            		 _bottom:auto;	_top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)));}

* 老师实例中用到的是这样子的，可以试一下，可能有用

  *html #menu ul li a.current{
      	position:absolute;
      	top:expression(((e=document.documentElement.scrollTop)?e:document.body.scrollTop)+100+"px")

}

* 解决此种方法引起的闪动问题：

      html,html body{	
      			background-image:url(about:blank);
      			background-attachment:fixed;
      	}

![website-navigation](website-navigation.gif)