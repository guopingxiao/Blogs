;

function $(id){
	return typeof id ==="string"? document.getElementById(id):id;
}

window.onload = function(){
	var titles = $('notice-title').getElementsByTagName('li');
	var divs = $('notice-contents').getElementsByTagName('div');
	if(titles.length!=divs.length) return;

	//便利所有的title 设置相应的时间
	for(var i = 0 , n = titles.length; i < n ; i += 1){
		//debugger;
		titles[i].id = i;//思考？这里是否可以放在onmouseover函数里面===》this.id = i;???

		titles[i].onmouseover = function(){
			//清除其他的class= selected
			for(var j = 0;j <n; j +=1){
				titles[j].className = "";
				divs[j].style.display ="none";
			}
			this.className = "selected";
			divs[this.id].style.display ="block";//思考：为什么这里要用this.id? 如果直接用i可以吗？为什么？
			
		}
	}
}