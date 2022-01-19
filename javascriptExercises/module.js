"use strict";

window.onload = function(){
	var rudyTimer = (function(){
		var timer = null
		function rudy() { // called each time the timer goes off
			document.getElementById("text").innerHTML += " Rudy!";
		}
		return function() {
				if (timer === null) {
					timer = setInterval(rudy, 1000);
				} else {
					clearInterval(timer);
					timer = null;
				}
			}
	})();

	var btn = document.getElementById("btn")
	btn.onclick = rudyTimer
}


