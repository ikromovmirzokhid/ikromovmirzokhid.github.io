(function dict ()
{

    var displaydefinition = function (data)
    {
        $( "div" ).remove();
        var strresult = "";
        for (i=0; i < data.length; i++)
        {
            var wordtype = data[i].wordtype;
            var definition = data[i].definition;
            strresult+= "<div class = 'wordtype'> ";
            strresult+= "<h2>word type: </h2> " ;
            strresult+= wordtype;
            strresult+="</div>";

            strresult+= "<div class = 'definition'> ";
            strresult+= "<h2>definition: </h2> " ;
            strresult+= definition;
            strresult+="</div>";
        }

        $("body").append(strresult);
       // $("body").append("definition"); // append the data returned
    };

    var btnLookup_Click = function()
{
    //harvest word from page
    var word = $("#word").val();
    var obj = {"word": word};
    $.post("/search",obj)
        .done(displaydefinition)
        .fail(function () {alert ('Connection Error');});
};

var hookevents = function()
{
    $("#btnLookup").click(btnLookup_Click);
};




$(document).ready(hookevents);


})();