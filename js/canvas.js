var main = function(){

var canvas    = document.getElementById("canvas");
var ctx       = canvas.getContext("2d");
var gridSize  = 4;
var gridScalar= 1;
var gridDSplay= true;
canvas.width  = 500;
canvas.height = 500;

var rainbow   = ['#ED1C24', '#F26522', '#F7941D', '#FFF200',
			     '#8DC73F', '#39B54A', '#00A651', '#00A99D', 
			     '#00AEEF', '#0072BC', '#0054A6', '#2E3192',
			     '#662D91', '#92278F', '#EC008C', '#ED145B']

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


function rset()
{
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, 500, 500);
	index = r_index.slice();
	if (!$('.CYO').hasClass('hidden'))
	{
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
	for (i = 0; i < gridSize; i++)
	{
		for (j = 0; j < gridSize; j++)
		{
			if (gridDSplay)
			{
				ind = Math.round((gridSize*i + j)*gridScalar);
			}
			else
			{
				ind = (i + j);
			}
			ctx.fillStyle = palette[index[ind]];
			ctx.fillRect(i*125, j*125, 125, 125);
			// console.log("i: " + i + " --- j: " + j + " --- ind: " + ind);
			// console.log("");
		}
	}

	curColor = palette;
}

$('#rainbow').click(function handleRainbow(){
	rset();
	displayPalette(rainbow);
});

$('#bluegreen').click(function handleBlueGreen(){
	rset();
	displayPalette(bluegreen);
});

$('#pink').click(function handlePink(){
	rset();
	displayPalette(pink);
});

$('#gradient').click(function createGrade()
{

	$('.CYO').removeClass('hidden');
	$('#canvas').addClass('hidden');
	
});

$('#gd').click(function(){
	if (!gridDSplay){
		gridDSplay = true;
		displayPalette(curColor);
		$('#gd').addClass('active');
		$('#dd').removeClass('active');
	}
});

$('#dd').click(function(){
	if (gridDSplay){
		gridDSplay = false;
		displayPalette(curColor);
		$('#gd').removeClass('active');
		$('#dd').addClass('active');
	}
});

function createYourOwn(r1, g1, b1, r2, g2, b2){

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

	$('.CYO').addClass('hidden');
	$('#canvas').removeClass('hidden');
	

});

function setSize(){
	var g = $("#gSize").val();
	
	if (g != (null||gridSize)) {
		gridSize = g;
	
		canvas.height = gridSize*125;
		canvas.width  = gridSize*125;
	// var tmp = [];
	// for (i = 0; i < gridSize*gridSize; i++)
	// {
	// 	tmp.push(i);
	// }
	// index   = tmp;
	// r_index = tmp;
		gridScalar = 15/(gridSize*gridSize - 1);
		displayPalette(curColor);
	}
};
$('#submit').click( function(){setSize();} );

$('#random').click(function randGrid()
{
	index = r_index.slice();
	random = []
	var i;
	var j;
	for (i = 0; i < gridSize; i++)
	{
		for (j = 0; j < gridSize; j++)
		{
			var x = (Math.floor(Math.random()*256));
			var y = (Math.floor(Math.random()*256));
			var z = (Math.floor(Math.random()*256));
			var color = "rgb(" + x +", "+ y +", "+ z +")";
			ctx.fillStyle = color;
			ctx.fillRect(i*125, j*125, 125, 125);
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

$('#shift').click(function shift()
{
	var tmp = index.shift();
	index.push(tmp);
	displayPalette(curColor);
});


$(document).keypress(function(event) {

	if (event.which == 13){
		setSize();	
	}

});

};

$('document').ready(main);