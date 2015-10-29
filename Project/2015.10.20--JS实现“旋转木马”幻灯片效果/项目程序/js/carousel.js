;//方便js合并
(function($){
	//建立一个Carousel类
	var Carousel = function(poster){
		//console.log(poster.attr("data-settings"));//Jquery取得节点属性 attr属性
		var self = this;
		this.poster = poster;
		this.posterItemMain =poster.find("ul.poster-list");
		this.nextBnt =poster.find("div.poster-next-bnt");
		this.prevBnt =poster.find("div.poster-prev-bnt");
		//this.posterFirstItem = this.posterItemMain.find("li").eq(0);//首帧
		this.posterItems =this.poster.find("li.poster-item");

		//解决偶数张的兼容问题
		if(this.posterItems.size()%2==0){
			this.posterItemMain.append(this.posterItems.eq(0).clone());
			this.posterItems = this.posterItemMain.children();
		}
		this.posterFirstItem = this.posterItems.first();//首帧
		this.posterLastItem = this.posterItems.last();//尾帧

	//配置默认参数
		this.settings ={
					"width":800, //幻灯片的宽度
					"height":270,  //幻灯片的高度
					"posterWidth":640, //首帧宽度
					"posterHeight":270, //首帧高度
					"verticalAlign":"middle",  //对其方式
					"scale":0.9,  //显示递减系数
					"speed":501,  //切换速度
					"autoPlay":false,
					"intervalTime":3000
					};
		//若是配置，则覆盖默认参数,没有则追加
		$.extend(this.settings, this.getSettings());
		//console.log(this.getSettings());

		//设置默认参数值
		this.setSettings();
		this.setPosterPosition();


		//设置右旋转
		this.rotateFlag = true;
		this.nextBnt.click(function(){
			/*this.carouselRotation(); 此处this已经漂移到 nextBnt,故事先要保存*/
			if(self.rotateFlag){
				self.rotateFlag = false;
				self.carouselRotation("right");
			}
		});

		//设置左旋转
		this.prevBnt.click(function(){
			/*this.carouselRotation(); 此处this已经漂移到 nextBnt,故事先要保存*/
			if(self.rotateFlag){
				self.rotateFlag = false;
				self.carouselRotation("left");
			}
		});

		//设置是否自动播放
		if (this.settings.autoPlay){
			this.autoPlay();
			//鼠标捕获自动轮播，移入暂停，移出继续
			this.poster.hover(function(){
				window.clearInterval(self.timer);
			},function(){
				self.autoPlay();
			});
		}
	};

	//
	Carousel.prototype ={

		//设置幻灯片自动播放
		autoPlay:function(){
			var self = this;
			this.timer = window.setInterval(function(){
				self.prevBnt.click();
			},this.settings.intervalTime);
		},

		//设置幻灯片旋转
		carouselRotation:function(direction){
			var _this_ = this;
			var zIndexArr = [];
			if(direction ==="left"){
				
				this.posterItems.each(function(){
					var self = $(this),//保存当前帧
						next = self.next().get(0)? self.next():_this_.posterFirstItem,//上一帧
						width = next.width(),
						height = next.height(),
						zIndex = next.css("zIndex"),
						opacity = next.css("opacity"),
						left = next.css("left"),
						top = next.css("top");
					zIndexArr.push(zIndex);
					self.animate({
						width:width,
						height:height,
						//zIndex:zIndex,zIndex假如在这里设置，则会遇到先过渡在显示，效果略差。
						//如果不过滤css里的zIndex，对否可以？好像也不行--self.css("zIndex",zIndex).animate();
						opacity:opacity,
						left:left,
						top: top
					}, _this_.settings.speed, function(){
						_this_.rotateFlag = true;
					});

				});

				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);//这里是先显示，在过渡。
				});

			}else if(direction === "right")
			{
				
				this.posterItems.each(function(){
					var self = $(this),//保存当前帧
						prev = self.prev().get(0)? self.prev():_this_.posterLastItem,//上一帧
						width = prev.width(),
						height = prev.height(),
						zIndex = prev.css("zIndex"),
						opacity = prev.css("opacity"),
						left = prev.css("left"),
						top = prev.css("top");
					zIndexArr.push(zIndex);
					self.animate({
						width:width,
						height:height,
						//zIndex:zIndex,
						opacity:opacity,
						left:left,
						top: top
					}, _this_.settings.speed, function(){
						_this_.rotateFlag = true;
					});

				});

				this.posterItems.each(function(i){
					$(this).css("zIndex",zIndexArr[i]);//这里是先显示，在过渡。
				});
			}
		},
		
		//设置不同的对齐方式
		setVerticalAlign:function(itemheight){
			var verticalAlignType = this.settings.verticalAlign;
			if(verticalAlignType ==="top"){
				return 0;
			}else if(verticalAlignType ==="middle"){
				return (this.settings.height - itemheight)/2;
			}else if(verticalAlignType ==="bottom"){
				return this.settings.height - itemheight;
			}else{
				return 0;
			}

		},

		//设置剩余帧的位置关系
		setPosterPosition:function(){
			var self = this;
			var sliceItems = this.posterItems.slice(1),
				sliceSize = sliceItems.size()/2,
				rightSlice = sliceItems.slice(0,sliceSize),
				leftSlice = sliceItems.slice(sliceSize),
				level = Math.floor(sliceItems.size()/2),
				itemWidth = this.settings.posterWidth,
				itemHeight = this.settings.posterHeight,
				itemGap = (this.settings.width - this.settings.posterWidth)/(this.posterItems.size()-1),
				firstItemLeft = (this.settings.width - this.settings.posterWidth)/2;
				

				//设置右边帧的位置关系
				rightSlice.each(function(i){
					level--;
					itemWidth = itemWidth * self.settings.scale;
					itemHeight = itemHeight * self.settings.scale;
					var j = i;
					++i;
					$(this).css({
						zIndex:level,
						width:itemWidth,
						height:itemHeight,
						opacity:1/(++i),
						left:(firstItemLeft + self.settings.posterWidth + itemGap*(++j) - itemWidth) , 
						top:self.setVerticalAlign(itemHeight)
					});
				});

				//设置左边帧的位置关系
				var itemWidth2 =rightSlice.last().width(),
					itemHeight2 = rightSlice.last().height();

				leftSlice.each(function(i){
					
					var j = i;
					++i;
					$(this).css({
						zIndex:j,
						width:itemWidth2,
						height:itemHeight2,
						opacity:1/(++i),
						left:itemGap*(j), 
						top:self.setVerticalAlign(itemHeight2)
					});
					itemWidth2 = itemWidth2 / self.settings.scale;
					itemHeight2 = itemHeight2 / self.settings.scale;
				});
		},


		//设置基本配置参数去控制幻灯片
		setSettings:function(){
			this.poster.css({
				width:this.settings.width,
				height:this.settings.height
			});
			this.posterItemMain.css({
				width:this.settings.width,
				height:this.settings.height
			});

			//计算左右切换按钮的宽度
			var bntWidth =(this.settings.width - this.settings.posterWidth)/2;
			this.nextBnt.css({
				width:bntWidth,
				height:this.settings.height,
				zIndex:Math.ceil(this.posterItems.size()/2)
			});
			this.prevBnt.css({
				width:bntWidth,
				height:this.settings.height,
				zIndex:Math.ceil(this.posterItems.size()/2)
			});
			this.posterFirstItem.css({
				width:this.settings.posterWidth,
				height:this.settings.posterHeight,
				left:bntWidth,
				zIndex:Math.floor(this.posterItems.size()/2)
			});
		},

		//获取人工配置的默认配置
		getSettings:function(){
			var settings = this.poster.attr("data-settings");
			//转换成JSON对象
			if (settings && settings !="") {
				return $.parseJSON(settings);
			}else{
				return {};
			}
		}

	};

	//初始化函数,实例化得到一个Carousel 对象
	Carousel.init = function(poster){
		var _this_ = this; //this--> 指向Carousel
		poster.each(function(){
			console.log($(this));
			new _this_($(this))
			console.log(new _this_($(this)));  //===>new Carousel($(".J_Carousel"));
		});
	};
	//windows事件注册
	window["Carousel"] = Carousel;

})(jQuery);