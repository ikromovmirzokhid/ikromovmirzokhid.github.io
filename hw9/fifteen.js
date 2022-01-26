/**B.**/
/**
 * Created by mohamed on 8/9/15.
 */

(function fifteen()
{
    var pos = [];

    var  init = function() {
        //alert("init");
        var puzzleArea = document.getElementById('puzzlearea');
        var divs = puzzleArea.getElementsByTagName("div");
       // var divs = shuffle(divs);
        // initialize each piece
        for (var i=0; i< divs.length; i++) {
            var div = divs[i];

            // calculate x and y for this piece
            var x = ((i % 4) * 100) ;
            var y = (Math.floor(i / 4) * 100) ;

            // set basic style and background
            div.className = "puzzlepiece";
            //alert("puzzlepiece");
            div.style.left = x + 'px';
            div.style.top = y + 'px';
            div.style.backgroundImage = 'url("background.jpg")';
            div.style.backgroundPosition = -x + 'px ' + (-y) + 'px';

            // store x and y for later
            div.x = x;
            div.y = y;
            var point = {x:x, y:y , bgP:div.style.backgroundPosition };
            pos.push(point);
        }
    };

    var shuffleArray =function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    var shuffle  = function () {
        alert ('shuffle');
        var divs =  $("#puzzlearea").children('div');
    
        //var shuffled = shuffleArray( $("#puzzlearea").children('div'));
        $("#puzzlearea").children('div').each(function () {$(this).detach();});
        //$("#puzzlearea").appendChild()

        var posshuff = shuffleArray(pos);
        for (var i=0; i< divs.length; i++) {
            var div = divs[i];
            
            div.x = posshuff[i].x;
            div.y = posshuff[i].y;
            div.style.left = div.x + 'px';
            div.style.top  = div.y + 'px';
            div.style.backgroundPosition = div.bgP;
            $("#puzzlearea").append(div);
        }
        //APPEND ANOTHER EMPTY PIECE


    };

    $(document).ready(function () {

        init();
        //shuffle();
        $("#shufflebutton").click(shuffle);
        //function () {alert('shuffle');}
        //$("#shufflebutton").click(shuffle);

    });




})();

