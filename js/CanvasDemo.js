var canvas    = document.getElementById("canvas");
console.log(canvas)
var ctx       = canvas.getContext("2d");
var gridSize  = 4;
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



// var main = function()
// {
// 	canvas.width  = 500;
// 	canvas.height = 500;
// 	document.body.appendChild(canvas);
// 	$("button").on("click", function(event){
// 		if (!($("div.CanvasDemo").hasClass("hidden")))
// 		{
// 			randGrid();
// 		}	
// 		else
// 		{
// 			reset();
// 		}
// 	});
// }

function reset()
{
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, 500, 500);	
}

function displayPalette(palette)
{
	var i;
	for (i = 0; i < gridSize*100; i+=50)
	{

	}
}


function randGrid()
{
	console.log(canvas)
	var i;
	var j;
	for (i = 0; i < 500; i+= 50)
	{
		for (j = 0; j < 500; j += 50)
		{
			var x = (Math.floor(Math.random()*256));
			var y = (Math.floor(Math.random()*256));
			var z = (Math.floor(Math.random()*256));
			var color = "rgb(" + x +", "+ y +", "+ z +")";
			// console.log(color);
			ctx.fillStyle = color;
			ctx.fillRect(i, j, 50, 50);
		}
	}
}

// $(document).ready(main);