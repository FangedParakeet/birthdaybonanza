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
	draggable: false,
	infinite: false,
	initialSlide: 1
});
$("#slider").on("afterChange", function(slick, currentSlide){
	if(currentSlide.currentSlide === 0){
		// play videos
		next();
	}
});

// Arrows
$(".dogs").click(function(){
	$("#slider").slick("goTo", 0);
});
$(".splash").click(function(){
	$("#slider").slick("goTo", 1);
	playa.stopVideo();
	controls.pause();
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

var playa,
	audio = new Audio("lib/static.mp3");
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
	var video = videos[vidIndex];
	playa.loadVideoById(video.resourceId.videoId, 0, "default");
	$("#canvas").hide();
	vidIndex++;
	if(vidIndex == videos.length){
		vidIndex = 0;
		shuffle(videos);
	}
}
function next(){
	$("#canvas").show();
	audio.play();
	setTimeout(function(){
		audio.pause();
		audio.load();
		playVideo();
	}, 500);
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


// iTunes Player
var itunes = new Audio("audio/birthday.mp3");

var controls = {};
	controls.index = 0;
	controls.tracks = [
		{
			time: 0,
			song: "Let Me Be Me",
			artist: "Nite-Funk"
		},
		{
			time: 267,
			song: "Hot Property",
			artist: "Jamiroquai"
		},
		{
			time: 534,
			song: "юность",
			artist: "эхопрокуренныхподъездов"
		},
		{
			time: 661,
			song: "Wash My Hands Shorty",
			artist: "The I.L.Y's"
		},
		{
			time: 847,
			song: "Love Like Mine",
			artist: "Miami Horror"
		},
		{
			time: 1175,
			song: "Kelly",
			artist: "Amason"
		},
		{
			time: 1387,
			song: "Goodbye Soleil",
			artist: "Phoenix"
		},
		{
			time: 1693,
			song: "Touch-Tone Telephone",
			artist: "Lemon Demon"
		},
		{
			time: 2070,
			song: "For You",
			artist: "TV Girl"
		},
		{
			time: 2362,
			song: "Jimmy Mack",
			artist: "Animal Collective"
		}
	];
	controls.resetIndex = function(){
		if(itunes.currentTime < 267){
			this.index = 0;
		} else if(itunes.currentTime < 534){
			this.index = 1;
		} else if(itunes.currentTime < 661){
			this.index = 2;
		} else if(itunes.currentTime < 847){
			this.index = 3;
		} else if(itunes.currentTime < 1175){
			this.index = 4;
		} else if(itunes.currentTime < 1387){
			this.index = 5;
		} else if(itunes.currentTime < 1693){
			this.index = 6;
		} else if(itunes.currentTime < 2070){
			this.index = 7
		} else if(itunes.currentTime < 2362){
			this.index = 8;
		} else {
			this.index = 9;
		}
	}
	controls.play = function(){
		itunes.play();
		$("#play").hide();
		$("#pause").show();
	}
	controls.pause = function(){
		itunes.pause();
		$("#pause").hide();
		$("#play").show();
	}
	controls.downloadTrack = function(){
		var file = "lib/download.php?type=1&track=" + this.index;
		window.open(file);
	}
	controls.downloadMix = function(){
		window.open("lib/download.php?type=2");
	}
	controls.updateTitles = function(){
		var elapsed = formatTime(itunes.currentTime);
		var remaining = formatTime(itunes.duration - itunes.currentTime);
		$("#elapsed").html(elapsed);
		$("#remaining").html(remaining);

		var track = this.tracks[this.index];
		$("#choons .title h3").html(track.song);
		$("#choons .title p").html(track.artist);

		var album = document.getElementById("album");
		album.src = "img/art/" + this.index + ".jpg";
	}
	controls.next = function(){
		if(this.index < 9){
			this.index++;
			var track = this.tracks[this.index];
			itunes.currentTime = track.time;
			this.updateTitles();
		}
	}
	controls.previous = function(){
		if(this.index > 0){
			this.index--;
			var track = this.tracks[this.index];
			itunes.currentTime = track.time;
			this.updateTitles();
		}
	}

itunes.addEventListener("timeupdate", function(){
	var elapsed = formatTime(this.currentTime),
		remaining = formatTime(this.duration - this.currentTime),
		progress = (this.currentTime / this.duration) * 100;
	$("#elapsed").html(elapsed);
	$("#remaining").html(remaining);
	$("#bottom .duration .complete").css("width", progress + "%");
	controls.resetIndex();
	controls.updateTitles();
});

$("#track").click(function(){
	controls.downloadTrack();
});
$("#prev").click(function(){
	controls.previous();
});
$("#play").click(function(){
	controls.play();
});
$("#pause").click(function(){
	controls.pause();
});
$("#forward").click(function(){
	controls.next();
});
$("#mix").click(function(){
	controls.downloadMix();
});
$(".duration").click(function(e){
	var position = e.pageX / $(this).width();
	var seek = position * itunes.duration;
	itunes.currentTime = seek;
	controls.resetIndex();
	controls.updateTitles();
});

function formatTime(seconds){
	var date = new Date(null);
		date.setSeconds(parseInt(seconds));
	return date.toISOString().substr(14, 5);
}