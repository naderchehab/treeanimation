"use strict";

 // shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

var treeanimation = {};
var canvas, ctx, width, fillColor, strokeColor;
var num = 0;
var duration = 0;

treeanimation.main = function() {

	var run = function() {
		canvas = document.getElementById("treeanimation-canvas");
		ctx = canvas.getContext("2d");
		ctx.strokeStyle = "#003300";
		ctx.font = '40px Arial';
		ctx.textBaseline = 'bottom';
		ctx.lineWidth = 1;
		animate();
	}
	
	var animate = function() {
		if (num > 180) {
			ctx.fillText("Angle: 180 degrees", 10, 50);
			return;
		}
			
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		switch(num) {
			case 10:
				ctx.fillText("Angle: 10 degrees", 10, 50);
				duration = 1500;
				break;
			case 60:
				ctx.fillText("Angle: 60 degrees", 10, 50);
				duration = 1500;
				break;
			case 90:
				ctx.fillText("Angle: 90 degrees", 10, 50);
				duration = 1500;
				break;
			case 120:
				ctx.fillText("Angle: 120 degrees", 10, 50);
				duration = 1500;
			break;
			default:
				duration = 80;
		}
		recurse(11, 450, 500, 90, num);
		setTimeout(function() { window.requestAnimFrame(animate); }, duration);
		num++;
	}
	
	var recurse = function(depth, x, y, angle, delta) {
		
		if (depth <= 0)
			return;
		
		var dx = 0, dy = 0;
		ctx.beginPath();
		for (var i = 0; i < 20; i++) {
			dx += 2*Math.cos(rad(angle));		
			dy -= 2*Math.sin(rad(angle));
			ctx.lineTo(x+dx, y+dy);
		}
		ctx.stroke();
		recurse(depth-1, x+dx, y+dy, angle-delta, delta);
		recurse(depth-1, x+dx, y+dy, angle+delta, delta);	
	}
	
	var rad = function(deg) {
		return deg * Math.PI / 180;
	}

	return {
		run: run
	}
}();