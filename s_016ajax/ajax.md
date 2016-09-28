1. 关于域名和IP的理解

   每一台机都有一个唯一的IP地址，域名相当于是IP地址，当IP地址很难记的时候就会出现域名，通过

   域名服务器来完成域名地址到IP地址转化，域名服务器运行着一个数据库，其中存储着域名和IP，访问百度首页的时候，其实发生了两件事:  **进行域名解析 （DNS）     通过解析得到的IP地址找到对应的计算机**

   IP与域名的对应关系是：

   （1）一对一：

   Internet上IP地址是唯一的，一个IP地址对应着唯一的一台主机。

   给定一个域名地址能找到一个唯一对应的IP地址。

   （2）一对多：

   一台计算机提供多个服务，既作www服务器又作邮件服务器。

   IP地址还是唯一，但可根据计算机提供的多个服务给予不同域名。

   一个IP地址可以对应多个域名。

2. URL地址

   URL组成部分：**<scheme>://<user>:<password>@<host>:<port>/<path>;<params>?<query>#<frag>**

   scheme	协议方案：

   ```
   http            #超文本转移协议，我们浏览网站都是这个
   https           #安全的http连接，在应用层和传输层中间加了SSL层
   mailto          #通过该链接可以在Internet中发送邮件
   ftp             #文件传输协议,传输文件
   rtsp.rtspu      #这个可能看见的少，是因为这是流传输，譬如视频流
   ```

   user: password：

   ```
   权限访问的时候使用帐号密码，譬如你的网站没配置好权限，有的时候你打开的时候就需要输入帐号密码
   ```

   host：简单的来说就是IP（域名）或者主机名domain

   port：端口，我们访问的端口，譬如80 443 8080等等

   path：访问资源的路径，相当于组件路径

   params：参数，但是这个不常用，指定一些参数，譬如指定传输方式

   query：查询参数，譬如我们get username=widuu&password=11111

   frag：html资源片段，譬如html文档过大的时候，frag定位到html的一部分

3. IPv6是Internet Protocol Version 6的缩写，其中Internet Protocol译为 ”互联网协议“。IPv6是IETF（互联网工程任务组，Internet Engineering Task Force）设计的用于替代现行版本IP协议（IPv4）的下一代IP协议，规范IP的样式 。

   由于IPv4最大的问题在于网络地址资源有限，严重制约了互联网的应用和发展。IPv6的使用，不仅能解决网络地址资源数量的问题，而且也解决了多种接入设备连入互联网的障碍。

   IPv4的地址位数为32位，也就是最多有2的32次方的电脑可以联到Internet上，IPV6是128位的，

   在使用IPv6网络中用户可以对网络层的数据进行加密并对IP报文进行校验,这极大的增强了网络安全.

4. 静态网站和动态网站的区别![1](file:///C:/Users/wochu/Desktop/LearningNote/s_016ajax/1.png?lastModify=1474986254)

5. B/S模式和C/S模式

   Browser/Server结构      Client/Server结构

6. ajax异步加载，局部更新，网页实现异步最早的时候使用iframe进行实现，现在使用ajax

    ![2](2.png)

you@yourdomain，localhost

很简单的注册示例，登录成功案例用ajax写一遍

get和post的区别,AJAX文档再看一看，龚欢昨天给我文档需要看一下，解决PHP不显示的问题，把自己必应浏览器的搜索框完善一下，Unicode编码，汉字格式