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
}

function createGrade()
{
	rset();
	
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
}

$('#rainbow').click(function handleRainbow(){
	rset();
	displayPalette(rainbow);
	curColor = rainbow;
});

$('#bluegreen').click(function handleBlueGreen(){
	rset();
	displayPalette(bluegreen);
	curColor = bluegreen;
});

$('#pink').click(function handlePink(){
	rset();
	displayPalette(pink);
	curColor = pink;
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

function createYourOwn(){};

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
	console.log(event.which);
	if (event.which == 13){
		setSize();	
	}

});

};

$('document').ready(main);