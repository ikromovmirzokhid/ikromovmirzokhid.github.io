var timer = null;

window.onload = function()
{
    document.getElementById('biggerBtn').onclick = decorate;
    document.getElementById('chkBling').onchange = addBling;
};



function decorate() {
    var txtDeco = document.getElementById("textArea");
	var fontsized = parseInt(txtDeco.style.fontSize);

	if (isNaN(fontsized))
	{
		fontsized = 12;
	}
	txtDeco.style.fontSize = (fontsized +2) +"pt";
}

function addBling() {
    if (timer == null) {
        timer = setInterval(decorate, 500);
    } else {
        clearInterval(timer);
        timer = null;
    }

    var chkbling = document.getElementById('chkBling');
	var txtDeco = document.getElementById('textArea');

	if (chkbling.checked = true)
	{
			txtDeco.style.color =  "#00FF00";
			txtDeco.style.textDecoration = "underline";
			document.body.style.backgroundImage = "url('http://online.cs.mum.edu/images/sakai.png')";
	} else {
	    document.getElementById('chkBling').checked = false;
	    txtDeco.style.color = "#000";
	    txtDeco.style.textDecoration = "none";
	    document.body.style.backgroundImage = "";
	}
}
