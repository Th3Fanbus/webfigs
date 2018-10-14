var enabled = false;
function main() {
	function loop() {
		if (enabled) {
			x = document.getElementById("x").value;
			y = document.getElementById("y").value;
			z = 1/(10*Math.sqrt(x*y));
			ctx.moveTo((canvas.width/2)*(Math.sin(i*x)+1), (canvas.height/2)*(Math.cos(i*y)+1));
			i = i + z;
			ctx.lineTo((canvas.width/2)*(Math.sin(i*x)+1), (canvas.height/2)*(Math.cos(i*y)+1));
			ctx.stroke();	
		} else {
			i = 0;
		}
	}
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var i = 0;
	var x = 1;
	var y = 1;
    var z = 1;
	setInterval(loop, 0.001);
}

function toggle() {
	if (enabled) {
		enabled = false;
		//console.log("false");
	} else {
		enabled = true;
		//console.log("true");
	}
}
