用开源框架wechaty以及wechaty-puppet-padpro实现一个猜数字机器人

猜数字流程：
某一个用户在一个和机器人同在的群A里面发消息：【猜数字】，机器人便回复：【猜数字游戏开始】
之后进入猜数字状态：
任意一个用户在群里说出一个数字，机器人会告诉这个人是大了还是小了
如果用户说的不是数字，则不响应

当用户猜对了数字的时候，恭喜用户，并且公布所有人猜词的次数

示例对话如下：在群X中：

小A：猜数字
机器人：猜数字游戏开始
小B：20
机器人：@小B 小了
小A：50
机器人：@小A 小了
小C：100
机器人：@小C 大了
小A：75
机器人：@小A 大了
小B：66
机器人：恭喜小B，猜对了，就是66
以下是大家的猜词统计：
小A：猜词2次
小B：猜词2次
小C：猜词1次

完成代码后请上传到自己的github上面，然后将github的链接地址发给我们，我们这边会有相关的技术同学审核查看。
