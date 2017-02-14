### scrollTop###

1. 设置两个一模一样的ul元素，之后拼接起来作为新闻内容元素，之所以拼接一个相同的ul,是因为如果实现无缝滚动，那么卷曲上去的新闻，需要实现从下边出现的效果，这时候就用上了第二个ul。

2. 当满足条件Con.scrollTop >= Li1.scrollHeight的时候，实则已经滚动了一个新闻列表的高度，这时候正好第二个ul元素与Con的顶端重合，这时候将Con.scrollTop = 0就不会有跳跃感，感觉是很自然的接着向上滚动了。

3. 鼠标hover上去的时候，停止定时器，即停止滚动，鼠标移开则继续滚动。

   ![scrollTop](C:\Users\acer\Desktop\LearningNote\s_006信息条无缝滚动\scrollTop.gif)