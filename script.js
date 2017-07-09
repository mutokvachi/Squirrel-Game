var squirrel = $('.squirrel');
var squirrelPosX = 0; 
var bgLeft = $('.background').offset().left;
var bgRight = Math.floor($('.background').outerWidth());

var squirrelLeft = 0;
var squirelRight = 0;
var squirrelHeight = 0;

var acornLeft = 0;
var acornBot = 0; 
var acornCounter = 0;

var rotator = 0;
var acornAddSpeed = 1300;

var clearAcornAdd = null;
var clearAcornFall = null;



$('.background').mousemove(function(ev){
	squirrelPosX = ev.pageX;
	
	if(squirrelPosX < bgLeft+75)
		squirrel.css('left', 0);
	else if(squirrelPosX > bgRight+45)
		squirrel.css('right', 0);
	else
		squirrel.css('left', ev.pageX-90);

	squirrelLeft = squirrel.offset().left-10;
	squirelRight = squirrel.offset().left + 30;
	squirrelHeight = squirrel.offset().top;
	
});

function acornAdd(){
	$('.acorn_div').append("<div class='acorn'><img src='img/rko.png'></div>");
	var random = Math.floor(Math.random() * (bgRight-100));
	
	$('.acorn:last-child').css({width: '20px', height: '20px',position: 'absolute',left: random});
}


function acornRotate(){
	rotator += 15;
	$('.acorn img').css({transform: "rotate("+rotator+"deg)"});
	if(rotator > 360){
		rotator = 0;
	}
}

setInterval(acornRotate, 100);

function bowlAddAcorn(){
	if(acornCounter == 1)
		$('.squirrel').html('<img src="img/squirrel1.png">');
	if(acornCounter == 2)
		$('.squirrel').html('<img src="img/squirrel2.png">');
	if(acornCounter == 3)
		$('.squirrel').html('<img src="img/squirrel3.png">');
	if(acornCounter == 4)
		$('.squirrel').html('<img src="img/squirrel4.png">');
}

function acornFall(){
	$('.acorn').css({'margin-top':'+=10px'});
	
	if($('.acorn').length != 0){
		acornLeft = $('.acorn:first-child').offset().left;
		acornBot = $('.acorn:first-child').offset().top+20;
		
		if($('.acorn:first-child').offset().top >= $('.background').height()-20){
			$('.acorn:first-child').remove();
		}
	}
	acornCatch();
}

	
var once = true;
function acornCatch(){
	if(acornLeft >= squirrelLeft && acornLeft <= squirelRight && acornBot == squirrelHeight+30){
		acornCounter++;
		$('.scoreboard').html(acornCounter);
		$('.acorn:first-child').remove();
		if(acornCounter%5==0 && !(acornAddSpeed <= 500) ){
			if(acornAddSpeed <= 900)
				acornAddSpeed = acornAddSpeed-20;	
			else
				acornAddSpeed = acornAddSpeed-50;
			
			clearInterval(clearAcornAdd);
			clearAcornAdd = setInterval(acornAdd, acornAddSpeed)
		}
	}else if(acornBot == squirrelHeight+50){
		$('.game_over').fadeIn(700);
		clearInterval(clearAcornAdd);
		clearInterval(clearAcornFall);
	}
	bowlAddAcorn();
}


$('#start').click(function(){
	
	$('.start_game').slideUp(500);
	$('.background').slideDown(500);

	setTimeout(play, 700);
});

function play(){
	clearAcornAdd = setInterval(acornAdd, acornAddSpeed);
	clearAcornFall = setInterval(acornFall, 50);
}
		
function playAgain(){
	acornCounter = 0;
	$('.game_over').fadeOut();
	$('.acorn_div').empty();
	$('.scoreboard').html(0);
	$('.squirrel').html('<img src="img/squirrel.png">');
	acornBot = 0;
	setTimeout(play, 700);
}
$('.game_over').click(playAgain);