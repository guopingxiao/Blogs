;

window.onload = function(){
	//获得容器对象
	var box = document.getElementById("container");

	var imgs = document.getElementsByTagName("img");

	var exposeWidth = 180;

	var imgWidth = imgs[0].offsetWidth;

	var boxWidth = imgWidth + (imgs.length - 1) * exposeWidth + imgs.length;
	box.style.width = boxWidth + "px";

	function setImgPos(){
		for(var i = 1, len = imgs.length; i < len; i++){
			imgs[i].style.left = imgWidth + (i - 1) *exposeWidth + "px";
		}
	}
	setImgPos();
	var transLength = imgWidth - exposeWidth;

	for(var i =0, len = imgs.length; i< len; i++){
		(function(i){
			imgs[i].onmouseover = function(){
				setImgPos();
				for(var j = 1; j <=i; j++ ){
					imgs[j].style.left = j*exposeWidth +"px";
				}
			};
			imgs[i].onmouseout = function(){
				setImgPos();
			}
		})(i);
	}
};