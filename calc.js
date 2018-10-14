"use strict";

var base = 10;

function operate(operation) {
	"use strict";
	var x = parseFloat(document.getElementById('l1').value,base);
	var y = parseFloat(document.getElementById('l2').value,base);
	var z = 0;
	
	switch(operation){
		case '+':
			z = x + y;
		break;
		case '-':
			z = x - y;
		break;
		case '*':
			z = x * y;
		break;
		case '/':
			z = x / y;
		break;
	}
	
	if (document.getElementById('l2').value === "") z = x;
	if (document.getElementById('l1').value === "") z = y;
	if (document.getElementById('l1').value === "" && document.getElementById('l2').value === "") z = "";
	
	document.getElementById('result').value = z.toString(base);
	if (document.getElementById('result').value === "NaN") document.getElementById('result').value = "Error!";
}

function newbase(nbase) {
	"use strict";
	var z = parseFloat(document.getElementById('result').value,base);
	switch(nbase){
		case 2:
			document.getElementById('bodh').innerHTML = "b";
		break;
		case 8:
			document.getElementById('bodh').innerHTML = "o";
		break;
		case 10:
			document.getElementById('bodh').innerHTML = "d";
		break;
		case 16:
			document.getElementById('bodh').innerHTML = "h";
		break;
	}
	base = nbase;
	if (document.getElementById('result').value != "") document.getElementById('result').value = z.toString(base);
	if (document.getElementById('result').value === "NaN") document.getElementById('result').value = "Error!";
}

function erase(n) {
	"use strict";
	if (n == 0 || n == 1) document.getElementById('l1').value = "";
	if (n == 0 || n == 2) document.getElementById('l2').value = "";
	if (n == 0 || n == 3) document.getElementById('result').value = "";
}

function ans(n) {
	"use strict";
	if (n == 1) document.getElementById('l1').value = document.getElementById('result').value;
	if (n == 2) document.getElementById('l2').value = document.getElementById('result').value;
}
