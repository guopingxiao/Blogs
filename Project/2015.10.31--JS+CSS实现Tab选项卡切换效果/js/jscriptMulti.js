;

function $(id){
	return typeof id ==="string"? document.getElementById(id):id;
}

window.onload = function(){
	var index = 0;
	var titles = $('notice-title').getElementsByTagName('li');
	var divs = $('notice-contents').getElementsByTagName('div');
	var n = titles.length;
	var timer = null;
	
	if(titles.length!=divs.length) return;
	
	for(var j = 0; j <n ; j++){
		titles[j].id = j;
		//鼠标滑入 清除定时器 显示滑入的效果
		titles[j].onmouseover = function(){
			clearInterval(timer);
			itemShow(this.id);
		}

		//鼠标移出,重启定时器，找到当前的index值。鼠标停哪里，currentIndex就指向哪里，但是与之前的currentIndex
		//不是一致的，所以这里要重新设置，currentIndex值。
		titles[j].onmouseout = function(){
			timer = setInterval(autoPlay,2000);
		}
	}

	if(timer){
		clearInterval(timer);
		timer = null;
	}
	// 添加定时器，改变当前高亮的索引
	timer = setInterval(autoPlay,2000);
	function autoPlay(){
				index ++;
				if (index >= n) {
					index = 0;
				};
				itemShow(index);			
			}

	function itemShow(currentIndex){
		//console.log(currentIndex);
		for(var i = 0; i < n ; i ++){
				titles[i].className = "";
				divs[i].style.display = "none";
			}
		titles[currentIndex].className = "selected";
		divs[currentIndex].style.display = "block";
		index = currentIndex; //关键的一步，记住上一步的currentIndex
	}
	
}