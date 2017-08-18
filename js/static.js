"use strict";
var c;
var ctx;

document.onLoad= staticBg();
//init
function staticBg(){
	c =  document.getElementById('canvas');
	ctx = c.getContext("2d");
	drawScreen();
}
function drawScreen(){
	ctx.save();
	let imgData = ctx.createImageData(320,240);
	for (let i=0;i<imgData.data.length;i += 4){
		let t = Math.floor(Math.random() * 256);
		imgData.data[i+0]=t;
		imgData.data[i+1]=t;
		imgData.data[i+2]=t;
		imgData.data[i+3]=255;
	}
	ctx.putImageData(imgData, 0, 0, 0, 0,c.width,c.height);
	ctx.restore();
	setTimeout(drawScreen,40); // cause PAL > NTSC
}
