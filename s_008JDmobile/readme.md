### JD mobile website###

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

5.  **一些细节方面的问题**

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
   >   >​
   >
   > ​

   6.1首先布局采用的是有最大和最小宽度的百分比页面布局，顶部通栏和底部的脚注部分采用固定定位fixed

   ​

   ​



