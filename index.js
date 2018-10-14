/*
 * ####################################
 * #                                  #
 * #  ~~~ Platformer game script ~~~  #
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
	var lastLoop = new Date;
	
	var platform0 = new Image();
	var platform1 = new Image();
	var platform2 = new Image();
	var rulerx = new Image();
	var catld = new Image();
	var catrd = new Image();
	var catl = new Image();
	var catr = new Image();
	var bg0 = new Image();
	var bg1 = new Image();
	var bg2 = new Image();
	var bg3 = new Image();
	var heart = new Image();
	var bcoin = new Image();
	var rcoin = new Image();
	var ycoin = new Image();
    var platformid = 0;
	var bgid = 0;
	
	var rulerxon = false;
	var hearton = false;
	var platformon = [false,false,false];
	var caton = [false,false,false,false];
	var bgon = [false,false,false,false];
	var coinson = [false,false,false];
	var loadani = false;
	var loaded = false;
	
	var rightDown = false;
	var leftDown = false;
	var upDown = false;
	var downDown = false;
	
	var mobile = /Mobi/.test(navigator.userAgent);
	
	var direction = "r";
    var crouch = false;
    var side = 0;
    var p = 8;
	var ground = false;
	var platformx = false;
	
	var bulb = false;
	var running = true;
	var fullscreen = true;
	var fpsen = false;
	var rulerxen = false;
	var lsize = [1920, 1080];
	var fps = 0;
	var fpsoffset = 30;
	var coinoffset = 0;
	var browserx = window.innerWidth;
	var browsery = window.innerHeight;
	
	var x = 0;
	var y = 0;
	var w = 0;
	var h = 0;
	var dx = 0;
	var dy = 0;
	var rx = 0;
	var ry = 0;
	var mx = 0;
	var my = 0;
	var offsetx = $('#canvas').offset().left;
	var offsety = $('#canvas').offset().top;
	
	var scrollx = 0;
	var scrolly = 0;

	var fade = 0;
	var colour = 0;

	var nbuttons = 4;
	var menux = 640;
	var menuy = 480;
	
            // [x, y, w, h, dx, dy, static?, following?];
	var box1 = [150, 980, 150, 30, 5, 3, false, true];
	var box2 = [1650, 880, 150, 30, 5, 3, true, false];
	var box3 = [1250, 780, 150, 30, -5, 3, false, false];
	var box4 = [550, 680, 150, 30, -5, 3, true, false];
	var box5 = [750, 580, 150, 30, 5, 3, false, false];
	var box6 = [100, 480, 150, 30, -5, 3, true, false];
	var box7 = [1000, 380, 150, 30, 5, 3, false, false];
	var box8 = [1600, 280, 150, 30, -5, 3, true, false];
	var box9 = [400, 180, 150, 30, 5, 3, false, false];
	var box10 = [200, 80, 150, 30, -5, 3, true, false];
	var box = [box1,box2,box3,box4,box5,box6,box7,box8,box9,box10];
	
             // [colour, x, y, w, h, draw?];
	var coin1 = ["r", 600, 640, 24, 32, true];
	var coin2 = ["b", 1600, 700, 24, 32, true];
	var coin3 = ["y", 140, 320, 24, 32, true];
	var coin4 = ["r", 1130, 850, 24, 32, true];
	var coin5 = ["b", 700, 200, 24, 32, true];
	var coin6 = ["y", 840, 120, 24, 32, true];
	var coin7 = ["r", 1800, 240, 24, 32, true];
	var coin8 = ["b", 250, 540, 24, 32, true];
	var coin9 = ["y", 1440, 450, 24, 32, true];
	var coin10 = ["r", 790, 900, 24, 32, true];
	var coin11 = ["b", 1250, 50, 24, 32, true];
	var coin12 = ["y", 1560, 770, 24, 32, true];
	var coin = [coin1,coin2,coin3,coin4,coin5,coin6,coin7,coin8,coin9,coin10,coin11,coin12];
    var coins = 0;

	var canvas = document.getElementsByTagName('canvas')[0];
	var ctx = canvas.getContext('2d');
	
	var graph = document.getElementsByTagName('canvas')[1];
	var gph = graph.getContext('2d');
	
	var width = canvas.width;
	var height = canvas.height;
	
	var tracerx = 0;
	var tracery = 0;
	
	var following = false;
	
	var heartsmax = 10;
	var hearts = heartsmax;
	var username = null;
	var dead = false;
	
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
	var errorlist = ["Undefined error!","Too many lives!","Moved too quickly!"];
    
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       || 
                window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame    || 
                window.oRequestAnimationFrame      || 
                window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 120);
        };
    })();
    
    function animate() {
        requestAnimFrame(animate);
        tick();
    }
    
	updmenu();
	
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
    
    function checkboundaries(a, b, c, d, x, y, w, h) {
        return (x + w >= a && x <= a + c && y + h >= b && y <= b + d);
    }
	
	function checkerr() {
		if (hearts > heartsmax) return 1;
		if (dy < -30) return 2;
		
		return 0;
	}
	
	function clicker() {
		if (mx < 0 || my < 0 || mx > width || my > height) return;
	}
	
	initobj.click = clicker;
	
	function confbox(box) {
		if (box[4] >= 0) {
			box[4] = box[4] + 2.5;
		} else {
			box[4] = box[4] - 2.5;
		}
		
		if (box[6] == true) {
			box[6] = false;
		} else {
			box[6] = true;
		}
	}
    
    function confcoin(coin) {
        coin[1] = rnd(coin[3], lsize[0] - coin[3]);
        coin[2] = rnd(coin[4], box1[1] - coin[4]);
        coin[5] = true;
    }
    
	function cyclethrough(arr,func) {
    	for(var i = 0; i < arr.length; i++) {
			func(arr[i]);
    	}
	}
	
	function drawbox(box) {
		switch(platformid) {
            case 0:
                ctx.drawImage(platform0, box[0] - scrollx, box[1] - scrolly);
            break;
            case 1:
                ctx.drawImage(platform1, box[0] - scrollx, box[1] - scrolly);
            break;
            case 2:
                ctx.drawImage(platform2, box[0] - scrollx, box[1] - scrolly);
            break;
        }
	}
	
	function drawcoin(coin) {
        if (coin[5]) {
            switch(coin[0]) {
                case "y":
                    ctx.drawImage(ycoin,coin[1] - scrollx,coin[2] - scrolly);
                    break;
                case "r":
                    ctx.drawImage(rcoin,coin[1] - scrollx,coin[2] - scrolly);
                    break;
                case "b":
                    ctx.drawImage(bcoin,coin[1] - scrollx,coin[2] - scrolly);
				break;
            }
		}
	}
	
	function nextlvl() {
		following = true;
        dy = dy / 1.5;
		y = lsize[1] - h - box1[2];
		cyclethrough(box,confbox);
		cyclethrough(coin,confcoin);
		if (bgid >= 3) {
			bgid = 0;
		} else {
			bgid++;
		}
	}
	
    function pause() {
        if (running == false) {
            running = true;
        } else {
            running = false;
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
    
    function setbox(box) {
		switch(platformid) {
            case 0:
                box[2] = platform0.width;
                box[3] = platform0.height;
            break;
            case 1:
                box[2] = platform1.width;
                box[3] = platform1.height;
            break;
            case 2:
                box[2] = platform2.width;
                box[3] = platform2.height;
            break;
        }
    }
                            // [x, y, w, h, dx, dy, static?, following?];
	/*function tickbox(box) {
		if (checkboundaries(box[0], box[1], box[2], box[3], x, y, w, h) && !(checkboundaries(box[0] - 8, box[1] + 8, 8, box[3] - 8, x, y, w, h) || checkboundaries(box[0] + box[2], box[1] + 8, 8, box[3] - 8, x, y, w, h))) {
            if (dy >= 0) {
                dy = 0;
                y = box[1] - h;
                ground = true;
                following = false;
                if (box[6] == false && side == 0) {
                    platformx = true;
                    dx = box[4];
                }
            } else {													//coming from underneath
                dy = 1;													//Don't allow movement upwards
                y = box[1] + box[3];
            }
            return true;
		}
        
        if (checkboundaries(box[0] - 8, box[1] + 8, 8, box[3] - 8, x, y, w, h) && checkboundaries(box[0], box[1], box[2], box[3], x, y, w, h)) {
            side = -1;
            if (box[6] == false) {
                dx = box[4];
            } else {
                dx = 0;
            }
            return true;
        }
        
        if (checkboundaries(box[0] + box[2], box[1] + 8, 8, box[3] - 8,x, y, w, h) && checkboundaries(box[0], box[1], box[2], box[3], x, y, w, h)) {
            side = 1;
            if (box[6] == false) {
                dx = box[4];
            } else {
                dx = 0;
            }
            return true;
        }
	}*/
    
    
                            // [x, y, w, h, dx, dy, static?, following?];
	function tickbox(box) {        
        if ((side != 1 || side != -1) && checkboundaries(box[0], box[1], box[2], box[3], x, y, w, h) && checkboundaries(box[0], box[1] - 8, box[2], 8, x, y, w, h)) {
            // collision with top side
            if (dy > 0) dy = 0;
            if (y + h > box[1]) y = box[1] - h;
            if (box[6] == false) platformx = true;
            if (box[6] == false) x = x + box[4];
            ground = true;
            following = false;
            side = -2;
            return;
        }
        if ((side != 1 || side != -1) && checkboundaries(box[0], box[1], box[2], box[3], x, y, w, h) && checkboundaries(box[0], box[1] + box[3], box[2], 8, x, y, w, h)) {
            // collision with bottom side
            if (dy < 0) dy = -1;
            side = 2;
            return;
        }
		if (checkboundaries(box[0], box[1], box[2], box[3], x, y, w, h) && checkboundaries(box[0] - 8, box[1], 8, box[3], x, y, w, h)) {
            // collision with left side
            if (dx > 0 && box[6] == true) dx = 0;
            if (x + w > box[0]) x = box[0] - w;
            side = -1;
            return;
        }
        
        if (checkboundaries(box[0], box[1], box[2], box[3], x, y, w, h) && checkboundaries(box[0] + box[2], box[1], 8, box[3], x, y, w, h)) {
            // collision with right side
            if (dx < 0 && box[6] == true) dx = 0;
            if (x < box[0] + box[2]) x = box[0] + box[2];
            side = 1;
            return;
        }
	}
    
    function tickboxmove(box) {
        if (box[6] == false) {
			box[0] = box[0] + box[4];
			if (box[0] <= 0 || box[0] + box[2] >= lsize[0]) {
				box[4] = -box[4];
			}
		}
        
		if (box[7] == true && following == true) {
			box[0] = x + (w / 2) - (box[2] / 2);
		}
    }
    
    function tickcoin(coin) {
        if (coin[5] && checkboundaries(coin[1], coin[2], coin[3], coin[4], x, y, w, h)) {
            coin[5] = false;
            switch(coin[0]) {
                case "y":
                    coins = coins + 1;
                    break;
                case "r":
                    coins = coins + 2;
                    break;
                case "b":
                    coins = coins + 5;
				break;
            }
            if (coins >= 100) {
                coins = coins - 100;
                if (hearts < heartsmax) {
                    hearts++;
                }
            }
        }
    }
    
    function updfullscreen(fullscreen) {
        browserx = window.innerWidth;
        browsery = window.innerHeight;
        if (fullscreen == true) {
            canvas.width = browserx;
            canvas.height = browsery;
            offsetx = $('#canvas').offset().left;
            offsety = $('#canvas').offset().top;
            vars.hidden = true;
            $("body").css("overflow", "hidden");
        } else {
            canvas.width = 800;
            canvas.height = 600;
            offsetx = $('#canvas').offset().left;
            offsety = $('#canvas').offset().top;
            vars.hidden = false;
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
        } else if (running && loaded && hearts > 0) {
            "use strict";
            errored = true;
            var thisLoop = new Date;
            if (!ground)	dy = dy + 1;
            if (!platformx)	dx = dx / 1.25;
            ground = false;
            ctx.clearRect(0,0,width,height);
            scrollx = x - width / 2;
            scrolly = y - height / 2;
            side = 0;
            cyclethrough(box,tickboxmove);
            cyclethrough(coin,tickcoin);
            cyclethrough(box,tickbox)
            
            /*if (y + h >= lsize[1]) {
                x = box1[0] + (box1[2] / 2) - (w / 2);
                y = box1[1] - h;
                if (username != "Th3Fanbus") hearts--;
                if (hearts <= 0) dead = true;
            }*/
            if (y >= lsize[1] - h) {
                y = lsize[1] - h;
                ground = true;
                dy = 0;
            }
            
            if (downDown != crouch) {                                   //downkey
                crouch = downDown;
                y = y + h;
                if (downDown) {
                    w = catld.width;
                    h = catld.height;
                } else {
                    w = catl.width;
                    h = catl.height;
                }
                y = y - h;
            }
            if (rightDown && side != -1) {                              //rightkey
                if (!platformx) {
                    dx = dx + 1.75;
                } else {
                    x = x + 7;
                    direction = "r";
                }
            }
            if (leftDown && side != 1) {                                //leftkey
                if (!platformx) {
                    dx = dx - 1.75;
                } else {
                    x = x - 7;
                    direction = "l";
                }
            }

            if (upDown && ground) {					                    //upkey
                dy = -20;
                ground = false;
            }
            
            if (x < 0) x = 0;
            if (y < 0 && dy < -15) nextlvl();
            if (x > lsize[0] - w) x = lsize[0] - w;
            if (dy > 20) dy = 20;            
            if (dx < 0 && !platformx) direction = "l";
            if (dx > 0 && !platformx) direction = "r";
            
            /*if (dy > 0) {
                for (var i = 0; i < dy; i++) {
                    dy++;
                    if (cyclethrough(box,tickbox)) break;
                }
            } else {
                for (var i = dy; i < 0; i++) {
                    dy++;
                    if (cyclethrough(box,tickbox)) break;
                }
            }*/
            
            
            if (x > lsize[0] - width / 2) scrollx = lsize[0] - width;
            if (x < width / 2) scrollx = 0;
            if (y > lsize[1] - height / 2) scrolly = lsize[1] - height;
            if (y < height / 2) scrolly = 0;
            x = x + dx;
            y = y + dy;
            rx = x - scrollx;
            ry = y - scrolly;

            fps = 1000 / (thisLoop - lastLoop);
            lastLoop = thisLoop;
            
            document.getElementById('xy').innerHTML = "x = "+x+", y = "+y;
            document.getElementById('wh').innerHTML = "w = "+w+", h = "+h;
            document.getElementById('dxdy').innerHTML = "dx = "+dx+", dy = "+dy;
            document.getElementById('gp').innerHTML = "ground = "+ground+", platformx = "+platformx;
            document.getElementById('rxry').innerHTML = "rx = "+rx+", ry = "+ry;
            document.getElementById('scrollx').innerHTML = "scrollx = "+scrollx;
            document.getElementById('scrolly').innerHTML = "scrolly = "+scrolly;
            document.getElementById('mxmy').innerHTML = "mx = "+mx+", my = "+my;
            document.getElementById('test').innerHTML = "sum1 = "+w+", sum2 = "+window.innerHeight;
            document.getElementById('fps').innerHTML = "fps = "+fps+", fpsen = "+fpsen;
            
            if (bgon) {
                switch(bgid) {
                    case 0:
                        ctx.drawImage(bg0,- scrollx, - scrolly);
                    break;
                    case 1:
                        ctx.drawImage(bg1,- scrollx, - scrolly);
                    break;
                    case 2:
                        ctx.drawImage(bg2,- scrollx, - scrolly);
                    break;
                    case 3:
                        ctx.drawImage(bg3,- scrollx, - scrolly);
                    break; box[1] + box[3]
                }   
            }
            
            ctx.textAlign = "right";
            ctx.font = "bold 18px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("Coins: "+side, width - 5, 20 + coinoffset);
            ctx.textAlign = "left";
            
            if (fpsen) ctx.fillText("FPS: "+fps,5, 20 + fpsoffset);
            if (rulerxon && rulerxen) ctx.drawImage(rulerx, - scrollx,0);
            
            cyclethrough(box,drawbox);
            cyclethrough(coin,drawcoin);				
            
            gph.fillStyle = 0;
            tracery = dy + 270;
            
            if (crouch) {
                if (direction == "l") ctx.drawImage(catld,rx,ry);
                if (direction == "r") ctx.drawImage(catrd,rx,ry);
            } else {
                if (direction == "l") ctx.drawImage(catl,rx,ry);
                if (direction == "r") ctx.drawImage(catr,rx,ry);
            }
            
            for(var i = 1; i <= heartsmax; i++) {
                if (hearts >= i) ctx.drawImage(heart,(heart.width * (i - 1)),0)	;
            }
            
            gph.fillRect(tracerx, tracery, 1, 1);
            
            tracerx++;
            if (tracerx >= 540) {tracerx = 0; gph.clearRect(0,0,540,540)}
            
            platformx = false;
            
            errorcode = checkerr();
            if (errorcode == 0) errored = false;
            
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
        } else if (!dead && !loadani) {
            ctx.fillStyle = "black";
            ctx.fillRect(0,0,width,height);
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.font = "bold 100px Arial";
            ctx.fillText("LOADING...",width / 2,height / 2);
            if (allTrue(bgon) && allTrue(caton) && allTrue(coinson) && hearton && allTrue(platformon)) loadani = true;
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
            ctx.fillStyle = "black"
            ctx.fillRect(0,0,width,height);
            ctx.textAlign = "center";
            colour = "rgb("+fade+","+fade+","+fade+")";
            ctx.fillStyle = colour;
            ctx.font = "bold 100px Arial";
            ctx.fillText("YOU DIED",width / 2,height / 4);
            ctx.fillText(username,width / 2,height * (3 / 4));
            if (fade < 255) fade++;
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
		document.getElementById('eof').onclick = "";
		
		rulerx.onload = function() {
			rulerxon = true;
		};
		
		platform0.onload = function() {
			platformon[0] = true;
            if (platformid == 0) cyclethrough(box,setbox);
		};
		
		platform1.onload = function() {
			platformon[1] = true;
            if (platformid == 1) cyclethrough(box,setbox);
		};
        		
		platform2.onload = function() {
			platformon[2] = true;
            if (platformid == 2) cyclethrough(box,setbox);
		};
        
		catld.onload = function() {
			caton[0] = true;
		};
        
		catrd.onload = function() {
			caton[1] = true;
		};

		catl.onload = function() {
			caton[2] = true;
			w = catl.width;
			h = catl.height;
		};
		
		catr.onload = function() {
			caton[3] = true;
		};
		
		bg0.onload = function() {
			bgon[0] = true;
		};
		
		bg1.onload = function() {
			bgon[1] = true;
		};
		
		bg2.onload = function() {
			bgon[2] = true;
		};
		
		bg3.onload = function() {
			bgon[3] = true;
		};
		
		heart.onload = function() {
			hearton = true;
		};
		
		bcoin.onload = function() {
			coinson[0] = true;
		};
		
		rcoin.onload = function() {
			coinson[1] = true;
		};
		
		ycoin.onload = function() {
			coinson[2] = true;
		};
		
		rulerx.src = 'src/ruler.gif';
		catld.src = 'src/catld.png';
		catrd.src = 'src/catrd.png';
		catl.src = 'src/catl.png';
		catr.src = 'src/catr.png';
		platform0.src = 'src/platform0.gif';
		platform1.src = 'src/platform1.png';
		platform2.src = 'src/platform2.png';
		bg0.src = 'src/bg.png';
		bg1.src = 'src/bg1.jpg';
		bg2.src = 'src/bg2.jpg';
		bg3.src = 'src/bg3.jpg';
		//bg3.src = 'http://www.gemini.edu/images/pio/wallpaper/20100106_background_1920x1080.jpg';
		heart.src = 'src/heart.png';
		bcoin.src = 'src/bcoin.png';
		rcoin.src = 'src/rcoin.png';
		ycoin.src = 'src/ycoin.png';
		
		x = box1[0] + (box1[2] / 2) - (w / 2);
		y = box1[1] - h;
		
		//username = prompt("Please enter your name");
		username = "NotTh3Fanbus"
        updfullscreen(fullscreen);
	}
    
	setup();
    animate();
	    
	function kDown(e) {
		switch(e.keyCode) {
			case 13:
				// return key pressed
                nextlvl();
			break; 
			case 37:
				// left key pressed
				leftDown = true;
			break;
			case 38:
				// up key pressed
				upDown = true;
			break;
			case 39:
				// right key pressed
				rightDown = true;
			break;
			case 40:
				// down key pressed
                downDown = true;
			break; 
			case 70:
				// f key pressed
				if (fpsen == true) {
					fpsen = false;
				} else {
					fpsen = true;
				}
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
				if (rulerxen == true) {
					rulerxen = false;
					fpsoffset = 30;
					coinoffset = 0;
				} else {
					rulerxen = true;
					fpsoffset = 100;
					coinoffset = 100;
				}
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
				leftDown = false;
			break;
			case 38:
				// up key pressed
				upDown = false;
			break;
			case 39:
				// right key pressed
				rightDown = false;
			break;
			case 40:
				// down key pressed
                downDown = false;
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

function clickpre() {
	initobj.click();
}
