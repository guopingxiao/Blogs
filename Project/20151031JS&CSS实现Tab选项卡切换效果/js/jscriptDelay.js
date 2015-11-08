;

function $(id){
	return typeof id ==="string"? document.getElementById(id):id;
}

window.onload = function(){
	//设置延迟的定时器；
	var timer = null;
	var titles = $('notice-title').getElementsByTagName('li');
	var divs = $('notice-contents').getElementsByTagName('div');
	if(titles.length!=divs.length) return;

	
	for(var i = 0 , n = titles.length; i < n ; i += 1){
		
		titles[i].id = i;

		titles[i].onmouseover = function(){
			var that = this;
			
			if (timer) {
				//如果有延迟的定时器存在，则清除
				clearTimeout(timer);
				timer = null;
			};
			timer = setTimeout(function(){
				for(var j = 0;j <n; j +=1){
					titles[j].className = "";
					divs[j].style.display ="none";
				}
				/*this.className = "selected";
				divs[this.id].style.display ="block";思考：为什么这里不能用this.id ,这里的this指向谁？*/
				that.className = "selected";
				divs[that.id].style.display ="block";
			},500);
			
			
		}
	}
}