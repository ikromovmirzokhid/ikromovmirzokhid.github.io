"use strict";

/* 	Chris Jimenez
	CSE 154
	Homework 8
	This file injects a sliding puzzle into fifteen.html and allows the user to 
	shuffle, and solve the puzzle.
*/

(function() {
	//Four variables, they keep track of the puzzle size (useful for changing puzzle size in option features
	// Pixel width of the pieces (targeted toward extra features)
	//Empty_x which keeps track of the x coordinate for the empty square
	//empty_y which keeps track of the y coordinate for the empty square.
	var PUZZLE_SIZE = 4;
	var PIXEL = 100;
	var EMPTY_X = 3;
	var EMPTY_Y = 3;

	//Starts setup(), findMoveabelSquares(), and assigns onclick event handlers onto
	//each puzzle piece, and the shuffle button.
	function pageLoad() {
		setup();
		findMoveableSquares();
		var squares = document.querySelectorAll(".piece");
		for (var i = 0; i < squares.length ; i++) {
			squares[i].onclick = moveSquare;
		}
		var shuffleButton = document.getElementById("shufflebutton");
		shuffleButton.onclick = shuffle;
	}

	//Builds the puzzle in the HTML page. It creates 15 divs, gives each one a number, and specifies
	//which part of the background each one gets. It also gives each one an initial ID of what their
	//row, column position is.
	function setup() {
		var xoffset = 0;
		var yoffset = 0;
		var puzzleArea = document.getElementById("puzzlearea");
		for (var i = 1; i < PUZZLE_SIZE * PUZZLE_SIZE; i++) {
			var puzzleName = document.createElement("div");
			puzzleName.classList.add("piece");
			puzzleName.id = 'square_' + xoffset / PIXEL + '_' + yoffset / PIXEL;
			puzzleName.innerHTML = i;
			puzzleName.style.top = yoffset + 'px';
			puzzleName.style.left = xoffset + 'px';
			puzzleName.style.backgroundPosition = "-" + xoffset + "px -" + yoffset + "px";
			puzzleArea.appendChild(puzzleName);
			if (xoffset < PUZZLE_SIZE * PIXEL - PIXEL) {
				xoffset += PIXEL;
			} else {
				xoffset = 0;
				yoffset += PIXEL;
			}
		}
	}

	//Used for the event when a square is clicked. If the square that is clicked is eligble to move,
	// it then ReallyMovesIt.
	function moveSquare() {
		if(this.classList.contains('canmove')) {
			reallyMoveSquare(this);
		}
	}

	//The purpose of the distinction between moveSquare and reallyMoveSquare 
	//is because for my shuffle algorithm to work, the moveSquare needs to be passed a parameter.
	//The onclick does not need a parameter, so I just have moveSquare run reallyMoveSquare(this). 
	//At the end of moving the square, after the new x and y of the empty square is established,
	//the moveable squares are recalculated.
	function reallyMoveSquare(square) {
		var oldX = parseInt(square.style.left) / PIXEL;
		var oldY = parseInt(square.style.top) / PIXEL;
		square.id = ('square_' + EMPTY_X + '_' + EMPTY_Y);
		square.style.top = EMPTY_Y * PIXEL + 'px';
		square.style.left = EMPTY_X * PIXEL + 'px';
		EMPTY_X = oldX;
		EMPTY_Y = oldY;
		findMoveableSquares();
	}

	//This finds the squares that are able to move. A square is able to move
	//if it is next to the empty square.
	function findMoveableSquares() {
		var moveAble = document.querySelectorAll('.canmove');
		for (var i = 0; i < moveAble.length; i++) {	
			moveAble[i].classList.remove('canmove');
		}
		var eligibleX = [EMPTY_X, EMPTY_X + 1, EMPTY_X - 1];
		var eligibleY = [EMPTY_Y, EMPTY_Y + 1, EMPTY_Y - 1];
		for (var i = 0; i < eligibleX.length; i++) {
			var row = eligibleX[i];
			if(row >= 0 && row <= 3) {
				for(var j = 0; j < eligibleY.length; j++) {
					var col = eligibleY[j];
					if((col >= 0 && col <= 3) && (col == EMPTY_Y && row != EMPTY_X || col != EMPTY_Y && row == EMPTY_X)) {
						var eligiblePiece = "square_" + row + "_" + col;
						document.getElementById(eligiblePiece).classList.add('canmove');
					}
				}
			}
		} 
	}
		
	//The shuffle() is called when the shuffle button is pressed. It shuffles the puzzle to make it fun.
	//The algorithm takes all the squares that are able to move, and randomly selects one to move.
	//When one is selected, reallyMoveSquare(square) is called. square is the puzzle piece that is being moved.
	//This is repeated 1000 times.
	function shuffle() {
		for (var i = 0; i < 1000; i++) {
			var neighbors = document.querySelectorAll('.canmove');
			var squares = neighbors.length;
			var indexToChoose = parseInt(Math.random() * squares);
			var square = neighbors[indexToChoose];
			reallyMoveSquare(square);
		}
	}

	window.onload = pageLoad;

})();