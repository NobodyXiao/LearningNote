## CSS3背景## 

1.CSS3中包含几个新的背景属性，提供更大背景元素控制,具体有如下几个：

- background-image：背景图片，可以添加多张，不同的背景图像用逗号隔开

 - background-image: url(img_flwr.gif), url(paper.gif); 

 - background-position: right bottom, left top;

- background-repeat: no-repeat, repeat; 

  ​	另外一种写法：background: url(img_flwr.gif) right bottom no-repeat, url(paper.gif) left top repeat;

- background-size：背景的尺寸，可以使用像素和百分比，百分比大小是相对于父级元素的

- background-origin：背景定位区域，content-box, padding-box,和 border-box区域内可以放置背景图像。

- background-clip：背景从哪里开始绘制，border-box，padding-box，content-box

