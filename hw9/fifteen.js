(function () {
   "use strict";

   let NUM = 4; //the number of rows/cols in the puzzle
   let spaceRow = 3; 
   let spaceColumn = 3; 
   let WIDTH = 100; // the pixel width/height of each tile

   // gets everything set when the window has loaded
   window.onload = function () {
      setSize();
      document.getElementById("select").onchange = changeSize;
      document.getElementById("shufflebutton").onclick = shuffle;
      createSquares();

   };

   // add a drop-down list to select difficulty level
   function setSize() {
      var select = document.createElement("select");
      select.id = "select";
      for (var i = 3; i < 7; i++) {
         var option = document.createElement("option");
         option.innerHTML = i + " * " + i;
         option.value = i;
         option.id = "option" + i;
         select.appendChild(option);
      }
      document.getElementById("controls").appendChild(select);
      document.getElementById("option4").selected = "selected";
   }


   function changeSize() {
      NUM = this.value;
      spaceRow = this.value - 1;
      spaceColumn = this.value - 1;
      WIDTH = parseInt(400 / this.value);
      var puzzlearea = document.getElementById("puzzlearea");
      while (puzzlearea.contains(document.querySelector(".puzzletile"))) {
         puzzlearea.removeChild(document.querySelector(".puzzletile"));
      }
      createSquares();
   }

   // creates 15 puzzle tiles and sets them to their initial position
   function createSquares() {
      for (var i = 1; i < NUM * NUM; i++) {
         var div = document.createElement("div");
         div.className = "puzzletile";
         div.innerHTML = i;
         var row = Math.floor((i - 1) / NUM);
         var column = (i - 1) % NUM;
         var x = column * -1 * WIDTH + "px";
         var y = row * -1 * WIDTH + "px";

        
         div.style.height = WIDTH - 10 + "px";
         div.style.width = div.style.height;
         
         div.style.backgroundPosition = x + " " + y;
        
         div.id = "square_" + row + "_" + column;
       
         div.style.top = row * WIDTH + "px";
         div.style.left = column * WIDTH + "px";
         setEvents(div);
         document.getElementById("puzzlearea").appendChild(div);
      }
   }

   // shuffles puzzle tiles for 1000 times
   function shuffle() {
      
      for (let j = 0; j < 1000; j++) {
         let neigbors = [];
        
         let allPuzzles = document.getElementsByClassName("puzzletile");
         
         for (let i = 0; i < allPuzzles.length; i++) {
           
            if (moveable(allPuzzles[i]))
               neigbors.push(allPuzzles[i]);
            }
         
         let ranNum = getRandomIntInclusive(0, neigbors.length - 1);
        
         let tempTop = neigbors[ranNum].style.top;
         let tempLeft = neigbors[ranNum].style.left;
        
         neigbors[ranNum].style.top = spaceRow * WIDTH + "px";
         neigbors[ranNum].style.left = spaceColumn * WIDTH + "px";
         neigbors[ranNum].id = "square_" + spaceRow + "_" + spaceColumn;
         
         spaceRow = parseInt(tempTop) / WIDTH;
         spaceColumn = parseInt(tempLeft) / WIDTH;
      }


   }

   
   function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
   }

   // sets up events for all puzzle tiles
   function setEvents(div) {
      div.onmouseover = function () {
         if (moveable(this)) {
            this.classList.add("highlight"); // when mouse over, adds class "highlight"
         }
      };
      div.onmouseout = function () {
         // when mouse out, removes class "highlight"
         if (moveable(this)) {
            this.classList.remove("highlight"); // when mouse out, remove class "highlight"
         }
      };
      div.onclick = helper;
   }

   // a helper function for function "makeAMove"
   // displays "congratulations" if the player wins
   function helper() {
      if (moveable(this)) {
         makeAMove(this);
         if (win()) {
            document.getElementById("output").innerHTML = "Congratulations! You win!";
         } else {
            document.getElementById("output").innerHTML = "";
         }
      }
   }

   // make one move for the given tile
   function makeAMove(div) {

      div.id = "square_" + spaceRow + "_" + spaceColumn;
      var divRow = parseInt(div.style.top) / WIDTH;
      var divColumn = parseInt(div.style.left) / WIDTH;

      div.style.top = spaceRow * WIDTH + "px";
      div.style.left = spaceColumn * WIDTH + "px";
      spaceRow = divRow;
      spaceColumn = divColumn;

   }

   // return true if the given tile is moveable
   function moveable(div) {

      var divRow = parseInt(div.style.top) / WIDTH;
      var divColumn = parseInt(div.style.left) / WIDTH;
      if (spaceRow == divRow) {
         return Math.abs(spaceColumn - divColumn) == 1;
      }
      else if (spaceColumn == divColumn) {
         return Math.abs(spaceRow - divRow) == 1;
      }
      else {
         return false;
      }
   }

   // return true if all tiles are at their original positions
   function win() {
      var tiles = document.querySelectorAll(".puzzletile");
      for (var i = 0; i < tiles.length; i++) {
         var row = Math.floor(i / NUM);
         var column = i % NUM;
         if (tiles[i].id != "square_" + row + "_" + column) {
            console.log(tiles[i].id);
            return false;
         }
      }
      return true;
   }
})();