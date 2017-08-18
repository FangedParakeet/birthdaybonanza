var colours = ["pink", "red", "yellow", "green", "purple", "blue", "orange"],
	$lights = $(".light"),
	lightsOn = [];
setInterval(function(){
	for(var i=0;i<$lights.length;i++){
		var light = $lights[i];
		var $light = $(light);
		var classes = $light.attr("class").split(" ");
		for(var j=0;j<classes.length;j++){
			var oldClass = classes[j];
			if(colours.indexOf(oldClass) !== -1){
				$light.removeClass(oldClass);
			}
		}
		var randIndex = Math.floor(Math.random() * colours.length);
		var newClass = colours[randIndex];
		$light.addClass(newClass);
		var thisLight = $light;
			thisLight.fadeIn(200);
		lightsOn.push(thisLight);
		setTimeout(function(){
			var lightOff = lightsOn.pop();
				lightOff.fadeOut();
		}, 200);
	}
}, 750);