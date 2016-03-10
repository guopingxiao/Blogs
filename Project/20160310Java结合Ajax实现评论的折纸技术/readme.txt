程序员开发做最重要的是：（敲）代码
java javascript html5/css3 
数据库--大型数据库，非关系型数据库

项目：Ajax实现评论折纸技术

前端：css3+javascript
后端：java+mysql+jsp

开发工具：Sublime 谷歌浏览器

核心技术：Ajax+css3

步骤：
      1、建立一个comment.html
	  2、实现评论折叠
	  3、新建javaweb程序xgp_comment
	  4、新建数据 comment表
	  5、通过Ajax数据评论查询到表中
	  

	  
技术要点
1、background与background-color？
   background包含background-color，它是背景的主要写法，当然如果你要写得详细一点，骚包一点，
   也可以用background-color来定义颜色~一般的话直接用background就可以了，两者在定义颜色的时候功能完全一样
2、/*margin:20px auto; ，这个就表示上的距离值和父容器是20px，而左右就是自动适应，也就是我们常说的自动居中。*/
3、header取个背景色， .header .imgbox{} 这么写样式，可以让里面的样式 宽高撑开外面的，这样就不用重复写了
4、文本段落缩进text-indent:2em   行高Line Height属性
5、内容的部分挤掉了评论部分。--问题1，把内同的高度去掉。
6、commentbox加绝对定位  css3旋转特性。 精深--视图--

    <div class="commentbox"><!--景深600-800为好-->
    	<h1>我这里是评论哦！！！</h1>
    	<div style="transform: rotateX(45deg);"><!--视点-->
    		<span>内容一</span><!--看到的内同-->
    		<div style="transform: rotateX(-90deg);">
	    		<span>内容二</span>
	    		<div style="transform: rotateX(90deg);">
		    		<span>内容三</span>
		    		<div style="transform: rotateX(-90deg);">
			    		<span>内容四</span>
			    	</div>
		    	</div>
	    	</div>

    	</div>
7、让评论的窗口隐藏在标题的后面？

8.<a href="javascript:void(0)" id="expand">展开</a>让超链接失效
2. a href="javascript:void(0);" onclick="js_method()"

这种方法是很多网站最常用的方法，也是最周全的方法，onclick方法负责执行js函数，而void是一个操作符，void(0)返回undefined，地址不发生跳转。而且这种方法不会像第一种方法一样直接将js方法暴露在浏览器的状态栏。

3.a href="javascript:;" onclick="js_method()"

这种方法跟跟2种类似，区别只是执行了一条空的js代码。

4.a href="#" onclick="js_method()"

这种方法也是网上很常见的代码，#是标签内置的一个方法，代表top的作用。所以用这种方法点击后网页后返回到页面的最顶端。

5.a href="#" onclick="js_method();return false;"

这种方法点击执行了js函数后return false，页面不发生跳转，执行后还是在页面的当前位置。

我看了下taobao的主页，他们采用的是第2种方法，而alibaba的主页是采用的第1种方法，和我们的区别是每个href里的javascript方法都用try、catch包围。

综合上述，在a中调用js函数最适当的方法推荐使用：
a href="javascript:void(0);" onclick="js_method()"
a href="javascript:;" onclick="js_method()"
a href="#" onclick="js_method();return false;"


9、相对定位是相对于自己原来的位子进行偏移的！！