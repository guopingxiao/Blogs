
var expand = document.getElementById("expand");
var slideup = document.getElementById("slideup");
var commentDom = document.getElementById("commentbox");
var divDoms = commentDom.getElementsByTagName("div");
timer = null;
var i = 0;
var delay = 200;
var len = divDoms.length;
expand.onclick = function(){
	i=0;
	timer = setInterval(function(){
		//console.log(divDoms);
		divDoms[i].className="show";
		i++;
		if (i == len) {
			clearInterval(timer);
			timer= null;
		};
	},delay);
}

timer = null;
slideup.onclick = function(){
	i = len -1;
	timer = setInterval(function(){
		divDoms[i].className="hide";
		i--;
		if (i < 0) {
			clearInterval(timer);
			timer= null;
		};
	},delay);
}