/*
 * ####################################
 * #                                  #
 * #  ~~~   Minesweeper script   ~~~  #
 * #  Author: Th3Fanbus               #
 * #                                  #
 * #  ~~~ IMPORTANT! PLEASE READ ~~~  #
 * #                                  #
 * #  init() should be called after   #
 * #  body has fully loaded. Failure  #
 * #  to do so will result in errors  #
 * #  when loading the canvas.        #
 * #                                  #
 * #  Add this to your "<body>" tag:  #
 * #                                  #
 * #         onload="init()"          #
 * #                                  #
 * #     It must look like this:      #
 * #                                  #
 * #     <body onload="init()">       #
 * #                                  #
 * ####################################
 */
var initobj = new Object();

function init() {
	"use strict";
	window.addEventListener("keydown", kDown, false);
	window.addEventListener("keyup", kUp, false);

	/*var imagenames = ["cell"];
	for (var i = 1; i < 9; i++) {
		imagenames[i] = ("num" + i);
	}
	imagenames = imagenames.concat(["mine", "hole", "flag", "cred", "hred"]);
	var images = [];
	for (var i = 0; i < imagenames.length; i++) {
		images[i] = new Image();
		images[i].src = imagenames[i];
	}*/

	var cell = new Image();
	var num1 = new Image();
	var num2 = new Image();
	var num3 = new Image();
	var num4 = new Image();
	var num5 = new Image();
	var num6 = new Image();
	var num7 = new Image();
	var num8 = new Image();
	var mine = new Image();
	var hole = new Image();
	var flag = new Image();
	var cred = new Image();
	var hred = new Image();

	var cellon = [false,false,false,false,false,false,false,false,false,false,false,false,false,false];
	var loadani = false;
	var loaded = false;

	var mobile = /Mobi/.test(navigator.userAgent);
	var fclick = false;
	var running = true;
	var fullscreen = false;
	var lsize = [1920, 1080];
	var browserx = window.innerWidth;
	var browsery = window.innerHeight;

	var mx = 0;
	var my = 0;
	var offsetx = $('#canvas').offset().left;
	var offsety = $('#canvas').offset().top;

	var lvl;

	var fade = 0;
	var colour = 0;

	var nbuttons = 4;
	var menux = 640;
	var menuy = 480;

	var canvas = document.getElementsByTagName('canvas')[0];
	var ctx = canvas.getContext('2d');

	var width = canvas.width;
	var height = canvas.height;

	var username = null;
	var dead = false;
	var win = false;
	var unsolved = 0;

	var menu = [(width - menux) / 2,(height / 2) - (menuy / 2),menux,menuy];
	var menupadx = 20;
	var menupady = 20;
	var menuheight = (menuy - 4 * menupady) / nbuttons;

	var button1 = [,,,,];
	var button2 = [,,,,];
	var button3 = [,,,,];
	var button4 = [,,,,];
	var buttons = [button1,button2,button3,button4];

	var errored = false;
	var errorcode = 0;
	var errorlist = ["Undefined error!"];

	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame	   || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame	|| 
			window.oRequestAnimationFrame	  || 
			window.msRequestAnimationFrame	 || 
		function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 120);
		};
	})();

	function animate() {
		requestAnimFrame(animate);
	tick();
	}

	$(document).mousemove(function(e) {
		mx = e.pageX - offsetx;
		my = e.pageY - offsety;
	});
	
	$(window).resize(function() {
		resize();
		updmenu();
	});
	
	function allTrue(arr) {
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] !== true)	return false;
		}
		return true;
	}
	
	function cellf(l, x, y) {   // [minecount, uncovered, flagged, red, chordable]
		if (l) {
			if (fclick) {
				if (lvl[x][y][2]) return;
				if (lvl[x][y][1]) {
					checksurrounding(x, y);
					if (lvl[x][y][4]) clearsurrounding(x, y);
				} else {
					lvl[x][y][1] = true;
					if (lvl[x][y][0] == 0 || lvl[x][y][0] == -1) clearsurrounding(x, y);
					if (lvl[x][y][0] == 9) {
						lvl[x][y][3] = true;
						dead = true;
						alert("BOOM!");
					}
				}
			} else {
				if (lvl[x][y][2] || lvl[x][y][1]) return;
				for (var i = -1; i < 2; i++) {
					for (var j = -1; j < 2; j++) {
						if (!(x+i < 0 || x+i > 15 || y+j < 0 || y+j > 15)) relocmine(x+i, y+j);
					}
				}
				for (var i = -1; i < 2; i++) {
					for (var j = -1; j < 2; j++) {
						if (!(x+i < 0 || x+i > 15 || y+j < 0 || y+j > 15) && lvl[x+i][y+j][0] == -1) lvl[x+i][y+j][0] = 0;
					}
				}
				for (var i = 0; i < 16; i++) {
					for (var j = 0; j < 16; j++) {
						fillnumbers(i, j);
					}
				}
				fclick = true;
				cellf(l, x, y);
			}
		} else {
			if (lvl[x][y][1] == false) {
				lvl[x][y][2] = !lvl[x][y][2];
			}
		}
	}
	
	function checkboundaries(a, b, c, d, x, y, w, h) {
		return (x + w >= a && x <= a + c && y + h >= b && y <= b + d);
	}
	
	function checkerr() {
		return 0;
	}
	
	function checkmouse(a, b, c, d) {
		return (mx >= a && mx <= a + c && my >= b && my <= b + d);
	}
	
	function checksurrounding(x, y) {
		var flags = 0;
		//if (lvl[x][y][0] == 9) return;
		for (var i = -1; i < 2; i++) {
			for (var j = -1; j < 2; j++) {
				if (x+i < 0 || x+i > 15 || y+j < 0 || y+j > 15) continue;
				if (lvl[x+i][y+j][2]) flags++;
			}
		}
		if (flags == lvl[x][y][0]) lvl[x][y][4] = true; else lvl[x][y][4] = false;
	}
	
	function clamp(num, min, max) {
	  if (num < min) return min;
	  if (max < num) return max;
	  return num;
	}
	
	function clearsurrounding(x, y) {
		for (var i = -1; i < 2; i++) {
			for (var j = -1; j < 2; j++) {
				if (x+i < 0 || x+i > 15 || y+j < 0 || y+j > 15) continue;
				if (lvl[x+i][y+j][1] == false) cellf(true, x+i, y+j);
			}
		}
	}
	
	function clicker(l) {   // [minecount, uncovered, flagged, red, chordable]
		if (mx < 0 || my < 0 || mx > width || my > height) return;
		if (running && loaded && !dead && !win) {
			var x = Math.trunc(mx / 40);
			var y = Math.trunc(my / 40);
			cellf(l, x, y);
		}
	}
	
	initobj.click = clicker;
	
	function cyclethrough(arr,func) {
		for(var i = 0; i < arr.length; i++) {
			func(arr[i]);
		}
	}
	
	function drawboard() {
		for (var i = 0; i < 16; i++) {
			for (var j = 0; j < 16; j++) {
				drawtile(lvl[i][j], i, j);
				if (lvl[i][j][0] != 9 && !lvl[i][j][1] && !lvl[i][j][2]) unsolved++;
			}
		}
	}
	
	function drawtile(box, a, b) {
		var x = a * 40;
		var y = b * 40;
		if (box[1]) {
			if (box[3]) {
				ctx.drawImage(hred, x, y);
			} else {
				ctx.drawImage(hole, x, y);
			}
			switch(box[0]) {
				case 1:
					ctx.drawImage(num1, x + 4, y + 4);
				break;
				case 2:
					ctx.drawImage(num2, x + 4, y + 4);
				break;
				case 3:
					ctx.drawImage(num3, x + 4, y + 4);
				break;
				case 4:
					ctx.drawImage(num4, x + 4, y + 4);
				break;
				case 5:
					ctx.drawImage(num5, x + 4, y + 4);
				break;
				case 6:
					ctx.drawImage(num6, x + 4, y + 4);
				break;
				case 7:
					ctx.drawImage(num7, x + 4, y + 4);
				break;
				case 8:
					ctx.drawImage(num8, x + 4, y + 4);
				break;
			}
			if (box[0] == 9) ctx.drawImage(mine, x + 4, y + 4);
		} else if (box[0] < 10) {
			if (box[3] || (box[0] != 9 && box[2] && dead)) {
				ctx.drawImage(cred, x, y);
			} else {
				ctx.drawImage(cell, x, y);
			}
			if (box[2]) ctx.drawImage(flag, x + 4, y + 4);
			if (win == true && !box[2]) ctx.drawImage(flag, x + 4, y + 4);
			if (box[0] == 9 && dead && !box[2]) ctx.drawImage(mine, x + 4, y + 4);
			if (box[0] == -1) ctx.drawImage(cred, x, y);
			if (box[0] == 9) ctx.drawImage(mine, x + 4, y + 4);
		}
	}
	
	function fillnumbers(x, y) {
		if (lvl[x][y][0] == 9) return;
		for (var i = -1; i < 2; i++) {
			for (var j = -1; j < 2; j++) {
				if (x+i < 0 || x+i > 15 || y+j < 0 || y+j > 15) continue;
				if (lvl[x+i][y+j][0] == 9) lvl[x][y][0]++;
			}
		}
	}
	
	function init2d(x, y, m) {
		lvl = [];
		for (var i = 0; i < x; i++) {
			lvl[i] = [];
			for (var j = 0; j < y; j++) {
				lvl[i][j] = [0, false, false, false, false]; // [minecount, uncovered, flagged, red, chordable]
			}
		}
		for (var i = 0; i < m; i++) {
			lvl[Math.round(rnd(0, x - 1))][Math.round(rnd(0, y - 1))][0] = 9;
		}
		for (var i = 0; i < x; i++) {
			for (var j = 0; j < y; j++) {
				fillnumbers(i, j);
			}
		}
	}
	
	function pause() {
		running = !running;
	}
	
	function relocmine(x, y) {
		if (lvl[x][y][0] == 9) {
			lvl[x][y][0] = -1;
			for (var b = 0; b < lvl.length; b++) {
				for (var a = 0; a < lvl[x].length; a++) {
					if (lvl[a][b][0] != 9 && lvl[a][b][0] != -1) {
						lvl[a][b][0] = 9;
						return;
					}
				}   
			}
			alert("Mines lost!");
		}
	}
	
	function resize() {
		offsetx = $('#canvas').offset().left;
		offsety = $('#canvas').offset().top;
		browserx = window.innerWidth;
		browsery = window.innerHeight;
		updmenu();
	}
	
	function rnd(min, max) {
		return Math.random() * (max - min) + min;
	}
	
	function updfullscreen(fullscreen) {
		browserx = window.innerWidth;
		browsery = window.innerHeight;
		if (fullscreen == true) {
			canvas.width = browserx;
			canvas.height = browsery;
			offsetx = $('#canvas').offset().left;
			offsety = $('#canvas').offset().top;
			$("body").css("overflow", "hidden");
		} else {
			canvas.width = 640;
			canvas.height = 640;
			offsetx = $('#canvas').offset().left;
			offsety = $('#canvas').offset().top;
			$("body").css("overflow", "auto");
		}
		width = canvas.width;
		height = canvas.height;
		updmenu();
	}
	
	function updmenu() {
		menu = [(width - menux) / 2,(height - menuy) / 2,menux,menuy];
		menuheight = (menuy - 4 * menupady) / nbuttons;
		button1 = [menu[0] + 2 * menupadx,menu[1] + 2 * menupady + 0 * menuheight,menux - 4 * menupadx,(menuy - 4 * menupady) / nbuttons,"PAUSED"];
		button2 = [menu[0] + 2 * menupadx,menu[1] + 2 * menupady + 1 * menuheight,menux - 4 * menupadx,(menuy - 4 * menupady) / nbuttons,"Continue"];
		button3 = [menu[0] + 2 * menupadx,menu[1] + 2 * menupady + 2 * menuheight,menux - 4 * menupadx,(menuy - 4 * menupady) / nbuttons,"Restart"];
		button4 = [menu[0] + 2 * menupadx,menu[1] + 2 * menupady + 3 * menuheight,menux - 4 * menupadx,(menuy - 4 * menupady) / nbuttons,"Exit"];
		buttons = [button1,button2,button3,button4];
	}
	
	function tick() {
		"use strict";
		if (errored) {
			ctx.fillStyle = "black";
			ctx.fillRect(0,0,width,height);
			ctx.textAlign = "center";
			ctx.fillStyle = "red";
			ctx.font = "bold 150px Arial";
			ctx.fillText("ERRORED!",width / 2,height / 4);
			ctx.font = "50px Arial";
			ctx.fillText("["+errorcode+"] "+errorlist[errorcode],width / 2,height * (3 / 4));
			return;
		} else if (running && loaded && !dead && !win) {   // [minecount, uncovered, flagged, red, chordable]
			"use strict";
			errored = true;
			unsolved = 0;
			ctx.clearRect(0,0,width,height);
			
			drawboard();
			
			ctx.font = "bold 18px Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "left";
			
			errorcode = checkerr();
			if (errorcode == 0) errored = false;
			if (unsolved == 0) {
				win = true;
				drawboard();
				alert("You won!");
			}
			
		} else if (!running) {
			updmenu();
			ctx.fillStyle = "black";
			ctx.fillRect(0,0,width,height);
			ctx.fillStyle = "grey";
			ctx.fillRect(menu[0] + menupadx,menu[1] + menupady,menu[2] - 2 * menupadx,menu[3] - 2 * menupady);
			if (checkboundaries(button1[0],button1[1],button1[2],button1[3],mx + offsetx,my + offsety,0,0)) {
				ctx.fillStyle = "green"
			} else {
				ctx.fillStyle = "red";
			}
			ctx.fillRect(button1[0],button1[1],button1[2],button1[3]);
			if (checkboundaries(button2[0],button2[1],button2[2],button2[3],mx + offsetx,my + offsety,0,0)) {
				ctx.fillStyle = "green"
			} else {
				ctx.fillStyle = "red";
			}
			ctx.fillRect(button2[0],button2[1],button2[2],button2[3]);
			if (checkboundaries(button3[0],button3[1],button3[2],button3[3],mx + offsetx,my + offsety,0,0)) {
				ctx.fillStyle = "green"
			} else {
				ctx.fillStyle = "red";
			}
			ctx.fillRect(button3[0],button3[1],button3[2],button3[3]);
			if (checkboundaries(button4[0],button4[1],button4[2],button4[3],mx + offsetx,my + offsety,0,0)) {
				ctx.fillStyle = "green"
			} else {
				ctx.fillStyle = "red";
			}
			ctx.fillRect(button4[0],button4[1],button4[2],button4[3]);	
			ctx.textAlign = "center";
			ctx.fillStyle = "white";
			ctx.font = "bold 80px Arial";
			ctx.fillText(button1[4],width / 2,button1[1] + 78);
			ctx.fillText(button2[4],width / 2,button2[1] + 78);
			ctx.fillText(button3[4],width / 2,button3[1] + 78);
			ctx.fillText(button4[4],width / 2,button4[1] + 78);
		} else if (!win && !dead && !loadani) {
			ctx.fillStyle = "black";
			ctx.fillRect(0,0,width,height);
			ctx.textAlign = "center";
			ctx.fillStyle = "white";
			ctx.font = "bold 100px Arial";
			ctx.fillText("LOADING...",width / 2,height / 2);
			if (allTrue(cellon)) loadani = true;
		} else if (loadani) {
			ctx.fillStyle = "black"
			ctx.fillRect(0,0,width,height);
			colour = "rgb("+(255-fade)+","+(255-fade)+","+(255-fade)+")";
			ctx.fillStyle = colour;
			ctx.textAlign = "center";
			ctx.font = "bold 100px Arial";
			ctx.fillText("LOADING...",width / 2,height / 2);
			if (fade < 255) {
				fade = fade + 5;
			} else {
				loadani = false;
				loaded = true;
				fade = 0;
			}
		} else if (dead) {
			drawboard();
			/*ctx.textAlign = "center";
			colour = "rgb("+fade+","+fade+","+fade+")";
			ctx.fillStyle = colour;
			ctx.font = "bold 100px Arial";
			ctx.fillText("YOU DIED",width / 2,height / 4);
			ctx.fillText(username,width / 2,height * (3 / 4));
			if (fade < 255) fade++;*/
		} else if (win) {
			drawboard();
		} else {
			ctx.fillStyle = "black";
			ctx.fillRect(0,0,width,height);
			ctx.textAlign = "center";
			ctx.fillStyle = "white";
			ctx.font = "bold 100px Arial";
			ctx.fillText("UNSPECIFIED",width / 2,height / 4);
			ctx.fillText(username,width / 2,height * (3 / 4));
		}
	}
	
	function setup() {
		"use strict"; 
		
		cell.onload = function() {cellon[0] = true;};
		num1.onload = function() {cellon[1] = true;};
		num2.onload = function() {cellon[2] = true;};
		num3.onload = function() {cellon[3] = true;};
		num4.onload = function() {cellon[4] = true;};
		num5.onload = function() {cellon[5] = true;};
		num6.onload = function() {cellon[6] = true;};
		num7.onload = function() {cellon[7] = true;};
		num8.onload = function() {cellon[8] = true;};
		mine.onload = function() {cellon[9] = true;};
		hole.onload = function() {cellon[10] = true;};
		flag.onload = function() {cellon[11] = true;};
		cred.onload = function() {cellon[12] = true;};
		hred.onload = function() {cellon[13] = true;};
		
		cell.src = 'src/cell.png';
		num1.src = 'src/num1.png';
		num2.src = 'src/num2.png';
		num3.src = 'src/num3.png';
		num4.src = 'src/num4.png';
		num5.src = 'src/num5.png';
		num6.src = 'src/num6.png';
		num7.src = 'src/num7.png';
		num8.src = 'src/num8.png';
		mine.src = 'src/mine.png';
		hole.src = 'src/hole.png';
		flag.src = 'src/flag.png';
		cred.src = 'src/cred.png';
		hred.src = 'src/hred.png';
		
		//username = prompt("Please enter your name");
		username = "Th3Fanbus"
		updfullscreen(fullscreen);
	}
	
	updmenu();
	init2d(16, 16, 40);
	setup();
	animate();
		
	function kDown(e) {
		switch(e.keyCode) {
			case 13:
				// return key pressed
			break; 
			case 37:
				// left key pressed
			break;
			case 38:
				// up key pressed
			break;
			case 39:
				// right key pressed
			break;
			case 40:
				// down key pressed
			break; 
			case 70:
				// f key pressed
			break; 
			case 75:
				// k key pressed
				if (fullscreen == true) {
					fullscreen = false;
				} else {
					fullscreen = true;
				}
				updfullscreen(fullscreen);
			break;  
			case 80:
				// p key pressed
				pause();
			break;   
			case 82:
				// r key pressed
			break;  
			case 122:
				// F11 key pressed
				resize();
				updmenu();
			break; 
		}
	}
	
	function kUp(e) {
		switch(e.keyCode) {
			case 37:
				// left key pressed
			break;
			case 38:
				// up key pressed
			break;
			case 39:
				// right key pressed
			break;
			case 40:
				// down key pressed
			break; 
			case 70:
				// f key pressed
			break; 
			case 80:
				// p key pressed
			break;  
			case 122:
				// F11 key pressed
				resize();
			break; 
		}   
	}
}

function clickpre(n) {
	initobj.click(n);
}
