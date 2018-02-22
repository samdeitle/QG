var main = function(){


//Global variables


var canvas    = document.getElementById("canvas");
var ctx       = canvas.getContext("2d");
var gridDime  = 4;									//Dimensions of the grid (in # of colors): 4x4
var gridScale = 125;								//Variable for scaling individual colors
var gridScalar= 1;									//
var gridDSplay= true;								//Boolean for diagonal vs. grid display: If true, display as grid
canvas.width  = 500;								//Initializes dimensions for the canvas at 500x500
canvas.height = 500;

var globalInterval;									//global for maintaining Interval function
var shiftInterval = 120;


// var rainbow   = ['#ED145B', '#ED1C24', '#F26522', '#F7941D',
// 				 '#FFF200',	'#8DC73F', '#39B54A', '#00A651',
// 				 '#00A99D', '#00AEEF', '#0072BC', '#0054A6',
// 				 '#2E3192', '#662D91', '#92278F', '#EC008C']
//Dope Colors:
// #BB3377
// #3eab95


var rainbow   = ['#FF0077', '#FF0000', '#FF3300', '#FF7700',
 			     '#FFAA00', '#EEDD00', '#BBEE00', '#66DD00',
 			     '#00FF00', '#00DD66', '#00FFAA', '#00FFFF',   
 			     '#0033FF', '#0000FF', '#3300FF', '#7700FF']
// 
// RGB Array of rainbow:
// 
// var rainbow   = [[255,0,119], [255,0,0],   [255,51,0],  [255,119,0],
// 				 [255,170,0], [238,221,0], [197,238,0], [102,221,0],
// 				 [0,255,0],   [0,221,102], [0,255,170], [0,255,255],
// 				 [0,51,187],  [0,0,255],   [51,0,255],  [119,0,255]] 			     

var bluegreen = ['#33FF66',	'#009933', '#00CC66', '#33FF99',
				 '#66FF99',	'#33CC66', '#009966', '#66FFFF',
				 '#66FFCC',	'#33CC99', '#33FFFF', '#33CCCC',
				 '#33FFCC',	'#00FFFF', '#00CCCC', '#009999']

var pink	  = ['#FF3E96', '#EE3A8C', '#CD3278', '#8B2252',
				 '#FF69B4', '#FF6EB4', '#EE6AA7', '#CD6090',
				 '#8B3A62', '#872657', '#FF1493', '#EE1289',
				 '#CD1076', '#8B0A50', '#FF34B3', '#EE30A7']

var random    = []
var cyo 	  = []
var curColor  = null;
var index	  = [0 , 1 , 2 , 3 ,
				 4 , 5 , 6 , 7 ,
				 8 , 9 , 10, 11,
				 12, 13, 14, 15]
var r_index	  = [0 , 1 , 2 , 3 ,
				 4 , 5 , 6 , 7 ,
				 8 , 9 , 10, 11,
				 12, 13, 14, 15]				 


function selectTab(bid){
				$(".tabs button span").removeClass("active");
				$("button#" + bid + " span").addClass("active");
}


function interp(L, Lval, R, Rval, X)
{
	var t = (X - L)/(R - L);
	var newVal = Lval + t*(Rval - Lval);
	return newVal;
}

function RGBtoString(RGB)
{
	var str = "rgb(" + RGB[0] + ", " + RGB[1] + ", " + RGB[2] + ")";
	return str;
}

function rset()
{
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, 500, 500);
	index = r_index.slice();
	if (!$('.CYO').hasClass('active'))
	{
		// console.log($('.CYO').hasClass('active'));
		$('.CYO').addClass('hidden');
	}	

	$('#canvas').removeClass('hidden');	

}

function displayPalette(palette)
{
	// index = r_index;
	var i;
	var j;
	var ind;
	for (i = 0; i < gridDime; i++)
	{
		for (j = 0; j < gridDime; j++)
		{
			if (gridDSplay)
			{
				ind = Math.round((gridDime*i + j)*gridScalar);
			}
			else
			{
				ind = (i + j);
			}
			ctx.fillStyle = palette[index[ind]];
			ctx.fillRect(i*gridScale, j*gridScale, gridScale, gridScale);
			// console.log("i: " + i + " --- j: " + j + " --- ind: " + ind);
			// console.log("");
		}
	}

	curColor = palette;
}



function handleRainbow(){
	rset();
	displayPalette(rainbow);
}
$('#rainbow').click(function(){
	handleRainbow();
});


function handleBlueGreen(){
	rset();
	displayPalette(bluegreen);
}
$('#bluegreen').click(function(){handleBlueGreen();});


function handlePink(){
	rset();
	displayPalette(pink);
}
$('#pink').click(function(){handlePink();});



$('#gradient').click(function createGrade()
{

	$('.CYO').removeClass('hidden');
	// $('#canvas').addClass('hidden');
	
});

function gridDisplay()
{
	if (!gridDSplay){
		gridDSplay = true;
		displayPalette(curColor);
		$('#gd').addClass('active');
		$('#dd').removeClass('active');
	}
};

$('#gd').click(function(){
	gridDisplay();
});

function diagDisplay()
{
	if (gridDSplay){
		gridDSplay = false;
		displayPalette(curColor);
		$('#gd').removeClass('active');
		$('#dd').addClass('active');
	}
};

$('#dd').click(function(){
	diagDisplay();
});

function toggleDisplay(){
	if (gridDSplay){
		diagDisplay();
	}
	else {
		gridDisplay();
	}
}

function createYourOwn(r1, g1, b1, r2, g2, b2){

	if (r1 > 255){r1 = 255};
	if (r1 < 0)  {r1 = 0};
	if (g1 > 255){g1 = 255};
	if (g1 < 0)  {g1 = 0};
	if (b1 > 255){b1 = 255};
	if (b1 < 0)  {b1 = 0};
	if (r2 > 255){r2 = 255};
	if (r2 < 0)  {r2 = 0};
	if (g2 > 255){g2 = 255};
	if (g2 < 0)  {g2 = 0};
	if (b2 > 255){b2 = 255};
	if (b2 < 0)  {b2 = 0};

	var r_diff = r2 - r1;
	var g_diff = g2 - g1;
	var b_diff = b2 - b1;


	var r_step = Math.round(r_diff/16);
	var g_step = Math.round(g_diff/16);
	var b_step = Math.round(b_diff/16);

	var r_new;
	var g_new;
	var b_new;


	for (var i = 0; i < 16; i++)
	{
		r_new = Number(r1) + Number(r_step * i);
		g_new = Number(g1) + Number(g_step * i);
		b_new = Number(b1) + Number(b_step * i);

		toPush = "rgb(" + r_new + ", " + g_new + ", " + b_new + ")";
		cyo.push(toPush);

	}
	console.log(cyo);
	rset();
	console.log("rset'd");
	displayPalette(cyo);
};

$('#create').click(function() {
	var r1 = $("#r1").val();
	var b1 = $("#b1").val();
	var g1 = $("#g1").val();
	var r2 = $("#r2").val();
	var b2 = $("#b2").val();
	var g2 = $("#g2").val();

	console.log(r1, g1, b1, r2, g2, b2);
	
	cyo = [];
	createYourOwn(r1, g1, b1, r2, g2, b2);

	// $('.CYO').addClass('hidden');
	// $('#canvas').removeClass('hidden');
	

});

$('#addBreakpoint').click(function() {
	document.getElementById("breakpoints").innerHTML += "<div class='breakpoint'><span><p>R2: </p><input id='r2' type='int'></span><span><p>G2: </p><input id='g2' type='int'></span><span><p>B2: </p><input id='b2' type='int'></span></div>";
});

function setSize(){
	var g = $("#gSize");


	if ((g.val() != "") && (g.val() != gridDime)) {
		gridDime = g.val();
	
		canvas.height = gridDime*gridScale;
		canvas.width  = gridDime*gridScale;
	// var tmp = [];
	// for (i = 0; i < gridSize*gridSize; i++)
	// {
	// 	tmp.push(i);
	// }
	// index   = tmp;
	// r_index = tmp;
		gridScalar = 15/(gridDime*gridDime - 1);
		displayPalette(curColor);
	};
};
$('#submit').click( function(){ setSize(); });

$('#random').click( function randGrid()
{
	index = r_index.slice();
	random = []
	var i;
	var j;
	for (i = 0; i < gridDime; i++)
	{
		for (j = 0; j < gridDime; j++)
		{
			var x = (Math.floor(Math.random()*256));
			var y = (Math.floor(Math.random()*256));
			var z = (Math.floor(Math.random()*256));
			var color = "rgb(" + x +", "+ y +", "+ z +")";
			ctx.fillStyle = color;
			ctx.fillRect(i*gridScale, j*gridScale, gridScale, gridScale);
			random.push(color);

		}
	}
	curColor = random;
});


$('#scramble').click(function scramble()
{
	var i;
	var j;
	var color = [];
	var ind   = index;

	for (i = 0; i < 16; i++)
	{
		color.push(ind.splice(Math.floor(Math.random()*(16 - i)), 1)[0]);
	}

	// for (i = 0; i < gridSize; i++)
	// {
	// 	for (j = 0; j < gridSize; j++)
	// 	{
	// 		color.push(curColor[(Math.floor(Math.random()*16))]);
	// 	}
	// }

	index = color;
	displayPalette(curColor);
});

function Shift()
{
	var tmp = index.shift();
	index.push(tmp);
	displayPalette(curColor);
};

function Unshift()
{
	var tmp = index.pop();
	index.unshift(tmp);
	displayPalette(curColor);
}

$('#shift').click(function()
{
	Shift();
});

// function fullRotation()
// {
// 	// for (var i = 0; i < curColor.length; i++) {
// 		// function(){console.log(i);}
		
// 		globalInterval = setInterval(function(){Shift();}, shiftInterval);

// 	// };
// };


// ###########
// # Keypress Handler:
// #
// # enter - setSize
// # z     - Shift
// # space - Unshift
// # d     - handleRainbow
// # q	   - toggleDisplay
// # /	   - AnimateShift
// # ?     - Stops AnimateShift
// # -     - decrease intervalSpeed
// # =     - increase intervalSpeed
// # 
// # 
// # 
// ##########


$(document).keypress(function(event) {

	console.log(event.which);

	if (event.which == 13){
		setSize();	
	}
	else if (event.which == 122){ 		
		Shift();
	}
	else if (event.which == 120){
		Unshift();
	}
	else if (event.which == 113){
		toggleDisplay();
	}
	else if (event.which == 100){
		handleRainbow();
	}
	else if (event.which == 47){
		if (globalInterval == null){
			globalInterval = setInterval(function(){Shift();}, shiftInterval);
		}
	}
	else if (event.which == 63){
		if (globalInterval != null){
			clearInterval(globalInterval);
			globalInterval = null;
		}
	}
	else if (event.which == 61){
		shiftInterval += 10;
		console.log(shiftInterval);
		clearInterval(globalInterval);
		globalInterval = setInterval(function(){Shift();}, shiftInterval);
	}
	else if (event.which == 45){
		shiftInterval -= 10;
		console.log(shiftInterval);
		clearInterval(globalInterval);
	    globalInterval = setInterval(function(){Shift();}, shiftInterval);
	}
});

displayPalette(rainbow);
};

$('document').ready(main);