$(window).load(function(){
	$("#loader").fadeOut();
});

// Dancing favicon
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

// Slick slider
$("#slider").slick({
	arrows: false,
	dots: false,
	draggable: true,
	infinite: false,
	initialSlide: 1
});
$("#slider").on("afterChange", function(slick, currentSlide){
	if(currentSlide.currentSlide === 0){
		// play videos
		startGame();
	}
});

// Arrows
$(".dogs").click(function(){
	$("#slider").slick("goTo", 0);
});
$(".splash").click(function(){
	$("#slider").slick("goTo", 1);
	playa.stopVideo();
});
$(".tunes").click(function(){
	$("#slider").slick("goTo", 2);
});

// YouTube dags
var videos,
	vidIndex = 0;
$.ajax({
	url: "lib/videos.php",
	type: "GET",
	dataType: "json"
})
.done(function(data){
	videos = data;
	shuffle(videos);
})
.fail(function(){
	console.log("SHIT");
});

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var playa;
function onYouTubeIframeAPIReady() {
  playa = new YT.Player('playa', {
    height: '100%',
    width: '100%',
    events: {
		'onStateChange': onPlayerStateChange
    }

  });
}
$("#next").click(next);
function onPlayerStateChange(event){
	if (event.data == YT.PlayerState.ENDED) {
		next();
	}
}
function playVideo(){
	console.log("play");
	var video = videos[vidIndex];
	playa.loadVideoById(video.resourceId.videoId, 0, "default");
	$("#canvas").hide();
	vidIndex++;
	if(vidIndex == videos.length){
		vidIndex = 0;
		shuffle(videos);
	}
}
function startGame(){
	console.log("start");
	$("#canvas").show();
	var video = videos[vidIndex];
	setTimeout(playVideo, 500);
}
function next(){
	$("#canvas").show();
	setTimeout(playVideo, 500);
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
