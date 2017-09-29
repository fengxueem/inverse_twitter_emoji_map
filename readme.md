# Twitter Emoji Map

+ **Intro**
	- This is a nodejs project using express as framework and mongodb as data storage. As any other express project, it contains a server and a client.
	- Server observes the newest twitts people sending over the world and seperate them into different groups based on the geo location, in other words, their countries. Note that, it only collects twitts with emojis as the name suggests. After forming groups, it performs a simple statistics on the emotion. It counts the ratio of twitts with negative emojis against positive emojis. And show it on a map that is based on [**a third party public project**](http://echarts.baidu.com/).
	- And using the client on local browser, you can choose to see different ratios during some time interval that goes from 24 hours ago till the current time.
+ **How to run under Linux**
 	1.  Pre-install: [**mongodb community edition**](https://docs.mongodb.com/manual/administration/install-community/) + [**Nodejs**](https://nodejs.org/en/)
	2.  Clone/fork/download this project from [**github**](https://github.com/fengxueem/inverse_twitter_emoji_map) to your local storage. And we say the path of local storage is 'path_to_project'.
	3.  Open terminal -> cd path_to_project -> sudo npm install -> sudo service mongod start -> sudo npm start
+ **How to use**<br>
Make sure you have internet access to twitter first, because data is retrived from twitter. Open a browser and go to '127.0.0.1:3000'. Once a world map is present, you can select a time interval by a slider on the bottom left and click confirm button to start counting twitts.
+ **Others**
	- All the old data inside mongodb will be cleared once the program starts. Don't worry about your storage space.
	- Give some time for the server to collect twitts before you see meaningful statistics.
---
+ **简介**<br>
这是一款收集实时twitts的nodejs系统，我们是在express架构上编写，利用mongodb作为数据存储的工具。它能实时的收集最新的带有emoji的twitts，并且根据发送国家的不同进行分组，它的最终目的是统计最近每个国家人们发送twitts的情绪。当然，我们设定说它只处理最多到24小时前的数据，同时可以指定查看24小时内某一个时间段的数据。实际上,每个国家的数据是通过计算收集到负面情绪twitts的数量除以正面情绪的数量。
+ **Linux下如何运行** 
 	1.  预安装: [**mongodb community edition**](https://docs.mongodb.com/manual/administration/install-community/) + [**Nodejs**](https://nodejs.org/en/)
	2.  从 [**github**](https://github.com/fengxueem/inverse_twitter_emoji_map)中将项目下载到本地。假设本地存储项目的路径叫A。
	3.  打开终端 -> cd A -> sudo npm install -> sudo service mongod start -> sudo npm start
+ **如何使用** <br>
首先确保mongodb数据库运转正常，我们可以通过在终端中输入‘service mongod status
’去查看。然后打开浏览器，网址栏输入'127.0.0.1:3000'。一开始会出现一张空白的世界地图，在页面的左下角有一个时间滑动条和一个确认按钮，先滑动时间条确定要处理的数据来自哪个时间段，然后按确认按钮，等待片刻，数据结果就会出现。
+ **备注**
	- 在项目开启是会将所有老旧数据清空，所以不用担心硬盘被占用满。
	- 推荐在项目开启后一段时间再查看统计数据，这样会收集到更多的样本数据，统计更有意义。
	- 地图是来源于百度的echarts项目，这里是[**网址**](http://echarts.baidu.com/)。
+ **讨论**<br>
	十分欢迎来邮件讨论： fengxueem@gmail.com