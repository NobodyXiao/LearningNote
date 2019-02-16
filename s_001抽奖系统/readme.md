# Lottery-system-concerning-keyboard-events
#一个涉及键盘事件的抽奖系统的案例
##刚刚开始学习JS，还是有很多不会的地方，也有许多地方思考不周，容易遗漏，希望每次实践都能记录下来，记录那些错误和知识点。
***
1. 键盘事件包括3种：keyDown，keyPress，keyUp
 - keyDown事件:当用户按下键盘上的任意键时触发，而且如果按住不放的话，会重复触发此事件。
 - keyPress事件：当用户按下键盘上的字符键时触发，而且如果按住不放的话，会重复触发此事件。
 - keyUp事件：当用户释放键盘上的键时触发。
2. 行级元素的宽度不可设置，块级元素不能同行显示，所以要用到display：block；float:left;
3. 获取随机数事件：Math.random（）；对获取的随机数整事件：Math.floor（）；另外为了获取数组索引所对应的数值，应该Math.random（）*arr.length。
4. 定时器setInterval（），执行之前每次都清空一下。
5. 获取键盘键值的属性：event.keyCode;
6. 设置标志flag，方便判断通过flag的值0或1来判断是第几次按下键盘，从而知道是开始抽奖还是停止抽奖，并且改变flag的状态，方便下次改变状态。另外flag值要声明成全局变量，不能写在函数内部。






