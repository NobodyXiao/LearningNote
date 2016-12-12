## Canvas知识点总结##

1. 设置canvas标签的宽高不要通过CSS进行设置，会把画布等比例拉伸；要写在HTML中，通过内联样式设置宽高，后期操作的时候通过js来设置宽高（canvas的属性进行设置宽高）。

2. 一般会在canvas标签的内部会写上提示性文字，来提示用户浏览器不支持canvas属性，一般在移动端支持比较好，PC端支持不太好，一般会通过嵌入Flash来弥补。

3. <canvas> 标签只是图形容器，您必须使用脚本JavaScript来绘制图形。

4. Canvas支持基本绘图能力的2D上下文，以及基于WebGL的3D上下文，通俗的讲就是JavaScript操作Canvas的接口（绘制操作api的入口或者集合。）。

5. 先获得canvas标签，之后获得canvas的上下文，在画布上进行绘制

         <canvas id="cavsElem">
           你的浏览器不支持canvas，请升级浏览器
       </canvas>
       
       javascript部分：
       //===============基本绘制api====================
       //获得画布
       var canvas = document.querySelector('#cavsElem');
       var ctx = canvas.getContext('2d');  //获得上下文
       
       canvas.width = 900;     //设置标签的属性宽高
       canvas.height = 600;    //千万不要用 canvas.style.height
       canvas.style.border = "1px solid #000";
       以下内容是在画布进行绘制的部分
       //绘制三角形
       ctx.beginPath();        //开始路径
       ctx.moveTo(100,100);    //三角形，左顶点
       ctx.lineTo(300, 100);   //右顶点
       ctx.lineTo(300, 300);   //底部的点
       ctx.closePath();        //结束路径
       ctx.stroke();           //描边路径

6. ctx.stroke();是对路径进行描边的意思，如果没有的话，就基本上在画布里边看不到路径；通过ctx.strokeStyle进行设置描边样式，一定是在描边之前设置描边的样式也就是ctx.stroke();之前

7. 开始一个新的状态的时候beginPath();可以进行新的样式的设置

8. 设置线宽，ctx.lineWidth实行进行设置；填充，默认填充是黑色ctx.fill()，如果填充别的颜色是ctx.fillStyle="";

9. 另外复习一下js的原型和继承，MVC，mvvc等？？

10. base64编码

   Base64编码可用于在[HTTP](http://baike.baidu.com/view/9472.htm)环境下传递较长的标识信息，通常用于把二进制数据编码为可写的字符形式的数据，这是一种可逆的编码方式。

   编码后的数据是一个字符串，其中包含的字符为：A-Z、a-z、0-9、+、/共64个字符：26 + 26 + 10 + 1 + 1 = 64。64个字符需要6位来表示，表示成数值为0~63。

   ![img](http://img.blog.csdn.net/20140225001055906?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveHVlZmVuZzA3MDc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

   例：

   字符串“Xue”经过Base64编码后变为“WHVl”。

   ![img](http://img.blog.csdn.net/20140225003033156?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveHVlZmVuZzA3MDc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

   这样，长度为3个字节的数据经过Base64编码后就变为4个字节。

   长度为3个字节的数据位数是8*3=24，可以精确地分成6*4。

   如果数据的字节数不是3的倍数，则其位数就不是6的倍数，那么需要就不能精确地划分成6位的块。，

   此时，需在原数据后面添加1个或2个零值字节，使其字节数是3的倍数。

   然后，在编码后的字符串后面添加1个或2个等号“=”，表示所添加的零值字节数。

   例：字符串“Xu”经过Base64编码后变为“WHU=”。

   ![img](http://img.blog.csdn.net/20140225004642625?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveHVlZmVuZzA3MDc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

11. ​

12. ​

13. ​


 