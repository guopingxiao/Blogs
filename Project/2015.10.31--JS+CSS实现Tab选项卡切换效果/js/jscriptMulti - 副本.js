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
		titles[j].onmouseover = function(){
			clearInterval(timer);
			for(var k =0 ; k < n; k++ ){
				titles[k].className = "";
				divs[k].style.display = "none";
			}
			this.className = "selected";
			divs[this.id].style.display = "block";
		}
		titles[j].onmouseout = function(){
			timer = setInterval(function(){
			index ++;
			if (index >= n) {
				index = 0;
			};
			for(var i = 0; i < n ; i ++){
				titles[i].className = "";
				divs[i].style.display = "none";
			}
			titles[index].className = "selected";
			divs[index].style.display = "block";
			//console.log(index);
			
		},2000);
		}
	}

	//debugger;
	timer = setInterval(function(){
		index ++;
		if (index >= n) {
			index = 0;
		};
		for(var i = 0; i < n ; i ++){
			titles[i].className = "";
			divs[i].style.display = "none";
		}
		titles[index].className = "selected";
		divs[index].style.display = "block";
		//console.log(index);
		
	},2000);
	
}