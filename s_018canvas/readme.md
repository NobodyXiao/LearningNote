## Canvas知识点总结##

1. 设置canvas标签的宽高不要通过CSS进行设置，会把画布等比例拉伸；要写在HTML中，通过内联样式设置宽高，后期操作的时候通过js来设置宽高（canvas的属性进行设置宽高）。
2. 一般会在canvas标签的内部会写上提示性文字，来提示用户浏览器不支持canvas属性，一般在移动端支持比较好，PC端支持不太好，一般会通过嵌入Flash来弥补。
3. canvas上下文？怎么获得上下文？
4. 先获得canvas标签，之后获得canvas的上下文，在画布上进行绘制
5. ctx.stroke();是对路径进行描边的意思，如果没有的话，就基本上在画布里边看不到路径；通过ctx.strokeStyle进行设置，一定是在描边之前设置描边的样式也就是ctx.stroke();之前
6. 设置线宽，ctx.lineWidth实行进行设置；填充，默认填充是黑色ctx.fill()，如果填充别的颜色是ctx.fillStyle="";
7. 今天把canvas表格绘制出来？查询canvas知识点，另外复习一下js的原型和继承，MVC，mvvc等？？


