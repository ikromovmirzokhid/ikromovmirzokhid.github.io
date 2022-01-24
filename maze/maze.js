$(document).ready(function(){

	var gameStart = false;
	var lost = false;

	function lose(){
		if(!gameStart) return "";
		lost = true;
		$(".hoverError").css("background-color","#f44256");
		$("#status").text("you lost, try again by click on 'S'");
	}

	$("#start").click(function(){
		gameStart=true;
		lost=false;
		$(".hoverError").removeAttr("style");

		$("#status").text("Game start");
		$(".boundary").addClass("hoverError");
	});

	$(".boundary").hover( lose);
	$("#maze").mouseleave(lose);

	$("#end").hover(function(){

		if (!gameStart || lost) return "";

		$(".hoverError").css("background-color","#42f477");
		$("#status").text("you Win :)");

		gameStart=false;
	})

});