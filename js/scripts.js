$(window).load(function(){
	$("#loader").fadeOut();
});

var favInd = true;
setInterval(function(){
	var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
	link.type = 'image/x-icon';
	link.rel = 'shortcut icon';
	var index = favInd ? 1:2;
	favInd = !favInd;
	link.href = 'img/favicon' + index + '.ico';
	document.getElementsByTagName('head')[0].appendChild(link);
}, 500);