#JD mobile website

1. **移动端开发一般会用到 3种布局模式** 

   1.1 有最小宽度和最大宽度的百分比页面布局（门户网站首页，图片较多的首页）

   使用百分比进行布局，但是为了避免页面在极端宽高的情况下会出现问题，所以设置最小宽度和最大宽度等等

   1.2全屏整屏的百分比布局（信息文字较多的网页，内容较多网页）

   一般是整个网页的html,body元素设置为height：100%；width:100%,之后，网页中最外边的盒子一般是结合position来进行定位，内部的盒子设置百分比进行宽高的控制。

   1.3自由的百分比布局（单页面网页，移动web app 页面）

2. **viewpoint视口的概念**

   视口其实就是我们在手机屏幕上用来显示网页的区域，在不同的移动设备上，视口是不一样的，但是一般的手机浏览器的视口宽度是980px，为了避免手机浏览器视口小于设备本身的宽度，出现横向滚动条的情况（设备不同的设备），那么就要求视口跟我们的移动设备宽度是一致的，我们使用meta标签设置视口，一般设置如下所示：

   `<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">`

3. **关于设备**

   **3.1三个需要了解的概念:**

   - PPI: 可以理解为屏幕的显示密度
   - DPR: 设备物理像素和逻辑像素的对应关系，即物理像素/逻辑像素
   - Resolution: 就是我们常说的分辨率

   **3.2物理像素与逻辑像素**

   看了我们上面内容一的第一点之后，或许有些人会有些疑问，安卓手机，买回来的是1920x1080的或者其他更高的，比我之前所谓的那个viewport默认的980px要大。

   这样的问题，也就是我之前所说的物理像素与逻辑像素的关系了（即DPR）。以1920x1080为例，1080为物理像素，而我们在 viewport中，获取到的，比如"width-device"，是逻辑像素。所以之前viewport的默认值，所比对的大小，其实是逻辑像素的大 小，而非物理像素的大小。

   以iphone6为例，在不做任何缩放的条件下，iphone6的获取到的'width-device'为375px,为屏幕的逻辑像素。而购买时我们所知的750px，则为屏幕的物理像素。

   **3.3CSS的问题**

   有了上面第二点的一些基础，还是以iphone6为例，我们可以知道，其实我们所写的1px，在iphone6上为2px的物理像素。所以，最后的，给出一个结论。就是我们写的1px，在移动端，是逻辑像素的1px，而非物理像素的1px。

4. **rem和媒体查询@media**

   **4.1rem适配不同的手机分辨率**

     >rem就是相对于根元素的字体大小的单位。来现在手机的分辨率越来越多了，我们的网页需要适配不同型号的手机，我们需要做到根据屏幕的尺寸来展示大小不一的文字、图片等等
     >
     >不同的手机分辨率不一样，那么在相同的css像素的情况下，字体、图片的大小也不一样。

   4.2**@media**

     >响应式布局中，为了适配不同的终端设备，一般会使用@media媒体查询进行补救，在不同宽度的设备商，显示不同的效果。需要注意的是有时由于条件比较多，所以设置的查询条件就重合了，在这种条件下，一定要检查好查询条件。

5. **一些细节方面的问题**

   可能处理细节就是在解决兼容性的问题吧!还好手机端没有蹦出个IE来,基本都是webkit内核和IOS自带的浏览器。

   **5.1、禁止自动识别电话和android自动识别邮箱**

   ```
   <meta content="telephone=no" name="format-detection" />
   <meta content="email=no" name="format-detection" />
   ```

   **5.2、使用无衬线字体（西方文字中的一种字体）**

   ```
    body {
          font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
       }
   ```

   iOS 4.0+ 使用英文字体 Helvetica Neue,之前的iOS版本降级使用 Helvetica。中文字体设置为华文黑体STHeiTi。需补充说明,华文黑体并不存在iOS的字体库中,但系统会自动将华文黑体 STHeiTi 兼容命中系统默认中文字体黑体-简或黑体-繁。

   **5.3、禁止选择文本**

   ```
    html, body {
          -webkit-user-select: none;   /* 禁止选中文本(如无文本选中需求,此为必选项) */
          user-select: none;
   }
   ```

   **5.4、禁止长按链接与图片弹出菜单**

   ```
   a, img {
          -webkit-touch-callout: none; /* 禁止长按链接与图片弹出菜单 */
   }
   ```

   **5.5、去除A连接input标签,点击出现自带的阴影样式**

   ```
   a,input{
       -webkit-tap-highlight-color:rgba(0,0,0,0);/*ios android去除自带阴影的样式*/
   }
   ```

   **5.6、屏蔽阴影:**

   ```
   -webkit-appearance:none;
   ```

   可以同时屏蔽输入框怪异的内阴影,解决iOS下无法修改按钮样式,测试还发现一个小问题就是,加了上面的属性后,iOS下默认还是带有圆角的,不过可以使用 border-radius属性修改。

   **5.7、单击延迟**

   click 事件因为要等待双击确认,会有 300ms 的延迟,体验并不是很好。

   开发者大多数会使用封装的 tap 事件来代替click 事件,所谓的 tap 事件由 touchstart 事件 + touchmove 判断 + touchend 事件封装组成。

   **5.8、手机拍照和上传图片**

   ```
   <input type=”file”>的accept 属性
   <!-- 选择照片 -->
   <input type=file accept="image/*">
   <!-- 选择视频 -->
   <input type=file accept="video/*">
   ```

   **5.9苹果手机的一些设置**

   ```
   <meta name="apple-mobile-web-app-capable" content="yes">
   ```

   如果content设置为yes，Web应用会以全屏模式运行，反之，则不会。content的默认值是no，表示正常显示。你可以通过只读属性window.navigator.standalone来确定网页是否以全屏模式显示。

   **5.10上下拉动滚动条时卡顿、慢**

   ```
    body {
       -webkit-overflow-scrolling: touch;
       overflow-scrolling: touch;
   }
   ```

   **5.11避免长时间按住时出现闪退**

   ```
   element {
       -webkit-touch-callout: none;
   }
   ```

   **5.12去掉iphone及ipad下输入框默认内阴影**

   ```
   Element{
       -webkit-appearance: none; 
   }
   ```

   **5.13去掉ios和android下触摸元素时出现半透明灰色遮罩**

   ```
   Element {
       -webkit-tap-highlight-color:rgba(255,255,255,0)
   }
   ```

   **5.14旋转屏幕时，字体大小调整的问题**

   ```
   *{
      -webkit-text-size-adjust:100%;  
   }
   ```

   **5.15IOS中input键盘事件keyup、keydown、keypress支持不是很好**

   问题是这样的，用input search做模糊搜索的时候，在键盘里面输入关键词，会通过ajax后台查询，然后返回数据，然后再对返回的数据进行关键词标红。用input监听键盘keyup事件，在安卓手机浏览器中是可以的，但是在ios手机浏览器中变红很慢，用输入法输入之后，并未立刻相应keyup事件，只有在通过删除之后才能相应！

   解决方法：可以用html5的oninput事件去代替keyup

   ```
   <input type="text" id="testInput">
   <script type="text/javascript">
       document.getElementById(‘testInput‘).addEventListener(‘input‘, function(e){
           var value = e.target.value;
       });
   </script>
   ```

6. **京东M站中的页面逻辑等等**

   6.1页面结构如下所示：

   ```
   <body>
   	<div id="jd-wrap">
   		<!-- 头部区域 -->
   		<section id="jd-headers">...</section>
   		<!-- 头部区域 -->
   		<!-- 广告轮播 -->
   		<section id="carousel-01">...</section>
   		<!-- 广告轮播 -->
   		<!-- 产品内容展示-->
   		<section id="jd-content">...</section>
   		<!-- 产品内容展示-->
   		<!-- 脚注区域 -->
   		<section id="bottom-bar">...</section>
   		<!-- 脚注区域 -->
   	</div>
   </body>
   ```

   > **首页布局**
   >
   > > 1.首先整体布局采用的是**有最大和最小宽度的百分比布局方式**，宽度限定，高度自适应
   > >
   > > 2.**顶部通栏和页面脚注部分**采用的是**固定定位fixed+position调整位置**
   > >
   > > 3.**轮播图和其他页面内容部分采用了宽度100%+高度自适应布局**, 
   > >
   > > 4.导航部分和一些其余出现类似区块排列部分使用了float浮动+等百分比布局
   >
   > **分类页面布局**
   >
   >   >1.分类页面的整体布局是全屏自适应布局，body设置的宽高均是100%，之后加上position布局辅助
   >   >
   >   >2.**顶部通栏自适应**，隐藏一个分类的类目，是在点击顶部通栏上边右边的分类按钮才显示出来的。
   >   >
   >   >3.**下边的内容区域** ，采用了左右两列布局，左边类目部分采用固定宽度76px，高度100%，之后右边的宽度设置成100%，之后设置padding-left为76px,这样两边就完整的呈现在页面中了，同时使用@media媒体查询进行补救，因为这大屏幕的时候手机显示左侧会显得很窄，右边很宽，媒体查询可以解决这个问题。
   >
   > **购物车页面布局**（主要是页面的逻辑比较复杂）
   >
   > > 1.购物车页面也采用了全屏百分百自适应布局，body,html均设置成宽高均为100%，之后是position定位辅助
   > >
   > > 2.**顶部通栏自适应** ，隐藏一个分类的类目，是在点击顶部通栏上边右边的分类按钮才显示出来的。
   > >
   > > 3.**底部结算** 部分使用的固定定位，z-index:200
   > >
   > > 4.**购物车明细** 部分分为**提示部分tipBar**,**两家店铺shop**,没什么特别的，就是自然布局，但是在鼠标点击**编辑** 按钮的时候，商品信息部分会改变，另外编辑按钮也会变成删除和完成两个按钮，这个注意也要写在里边。
   > >
   > > 5.**删除模态框** ,在点击 删除按钮的时候会弹出让你确认是否删除的模态框，模态框的布局方式是宽高均是100%的全屏布局，之后模态框背景是灰色的，之后内部的删除框采取的是固定定位fixed
   >
   > **登录页面布局**
   >
   >   >登录页面的布局比较简单，body使用全屏自适应+position定位，顶部通栏部分采用高度固定，宽度是100%，之后使用position进行位置辅助。
   >   >
   >   >**其他登录方式** 这一块背景中划线的实现方法，通过设置其他登录方式span的伪类来实现，伪类是一条横线，这个通过border: 1px solid #e0e0e0;实现，之后设置span和span::after的z-index不同来实现叠加效果。

   6.2页面逻辑部分

   **首页页面逻辑** 

   > **首页的逻辑比较少，顶部通栏部分透明度随着滚动条向上滚动逐渐增加至1，主要是轮播图原生js书写，另外一个是秒杀区块的逻辑**
   >
   > 1.**顶部通栏的透明度变化** 
   >
   > 获取到**顶部通栏的元素#jd-search-box** 、**轮播图区块的元素#carousel-01** ，获取到其高度boxHeight，轮播图的高度bannerHeight，求得两个的高度差diffHeight，之后就是当页面滚动的高度scrollTop>diffHeight，顶部通栏的背景设置成透明度为1，之后其余情况根据scrollTop/diffHeight来进行透明度设置。
   >
   > 2.**秒杀区域** 
   >
   > 创建截止时间deadlineTime，获取现在时间nowTime，之后获取时间差的秒数，获取到填写时间的6个小的区块数组对象，之后就是对时间差进行操作，依次将数值填进相应数字块中，倒计时效果通过定时器实现，每一秒钟执行依次diffTime--即可。
   >
   > 3.**轮播图的实现效果**
   >
   > 其实使用bootstrap是最简单的，套用结构，更换一些数值和图片地址就可以了，但是我也尝试了一下用原生的js书写，轮播图页面的由两个无序列表ul组成，一个用来存放图片，另一个用来存放控制按钮；图片盒子里边存放8张图片是为了满足手动滑动的时候左滑和右滑图片能够连贯，控制按钮是有6个的。
   >
   > > **3.1**首先获取到页面的图片盒子和按钮盒子，获取到里边的li数组元素，定义了过度效果函数addTranstion和去除过度效果的函数removeTranstion，图片改变位置的函数setTransform，之后就是设置定时器，每两秒钟去改变一下图片的位置并改变控制按钮的样式。
   > >
   > > **3.2**对图片盒子添加事件监听函数，当过渡结束之后，对图片盒子的位置进行判断，也就是图片索引index的数值，如果index>6,说明在最后一张图片上，那么就设置index=1，如果是index<=0,图片向右反方向滑动，应该将index设置成6。
   > >
   > > **3.3**最后就是补充效果了，手动滑动轮播图，需要用到touchstart，touchmove，touchend事件，当触滑动开始的时候纪录一些开始触摸的位置，startX，在滑动过程中，记录一下移动的位置；这时候应该停止定时器，停止自动滑动，之后根据不放手情况下移动的距离，改变图片的位置；当触摸结束的时候，纪录一下结束的位置endX，之后根据移动差值moveX = startX-endX;当满足Math.abs(moveX)>1/3*width&&moveX!=0，认为产生了滑动，之后就是根据moveX正负进行改变，左滑一张或者是右滑一张，当判断结束之后，不要忘记将startX，endX清零，并开启定时器timer

   **分类页面逻辑**

     >1.**顶部通栏部分跳转类目的显示和隐藏**
     >
     >2.当滑动手机左边类目，和滑动右边商品展示区的时候，滑动到上下边界时候，会出现自动弹回的效果，以及左边点击的时候，被点击的类目自动向上弹至顶部的效果。
     >
     >> 2.1获取左边类目的parentDom父盒子**.jd-category-leftBox**,之后获取其子元素ul，并命名为childDom，之后定义边界值，upDownMax=150，downUpMax = -(childH - parentH + 150)
     >>
     >> 2.2定义currY,给childDom添加touchustart,touchmove,touchend事件，并在touchstart的时候记录一下startY，在touchmove的时候纪录一下endY，计算moveY,之后当每次满足(currY - moveY) <= upDownMax && (currY - moveY) >= downUpMax的时候，就将childDom进行移动translateY("+(currY - moveY)+"px)
     >>
     >> 2.3当滑动结束的时候，如果是满足(currY - moveY) <= 0 && (currY - moveY) >= -(childH - parentH)，那么说明在滑动范围内滑动，则重新给currY赋值，currY = currY - moveY，此时currY纪录的是累计移动的距离，当然正负代表方向；否则就是不让移动的范围，满足（currY - moveY) > 0的时候，说明向上弹回，设置currY = 0，并执行translateY("+(currY)+"px)；满足(currY - moveY) < -(childH - parentH)，说明该向下弹回，设置currY = -(childH - parentH)，并执行translateY("+(currY)+"px)
     >
     >3.当左边类目点击的时候，需要实现自动向上弹至顶部的效果，这个只要在在touchend事件的回调函数中判断一下是否满足moveY == 0 && endTime-startTime < 200，如果满足则认为是点击事件，即可通过e.target得到当前点击的元素，进而知道属于哪个li，之后根据target.index*46，即可获得向上移动的高度.
     >
     >4.右边的逻辑跟左边基本是一致的，但是需要加上当鼠标点击左边类目进行切换的时候，右边的类目切换并出现在初始位置，banner在最上边，这时候只需要将右边将处于展示状态的元素移动-currY的距离即可。但是目前仍然存在别的问题有待解决。

   **购物车页面逻辑** 

     >1.通过增删复选框的类名来改变复选框的样式，达到勾选和不勾选的效果
     >
     >2.购物车购买数量和金额的变化，是通过统计整个页面中所有的商品盒子**.pro-detial**里边有多少个类名为checked的span元素，计算这些的数目和相应金额。
     >
     >3.全选和全不选，单个店铺里边的全选和全不选，以及单独去勾选商品的时候，注意满足一定条件的时候要变化店铺和最终购物车复选框的样式，考虑周全就行，都是通过查找类名checked进行判断的。

   ​

   ​

   ​



