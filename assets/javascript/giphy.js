// Create array of gesture buttons
var gestures = ["Thumbs-up", "Hang-Loose", "Whatever", "Rock-on", "Face-palm"];

// Function for creating buttons along with classes, attributes and text to correlate with the gestures array above when the page loads.
function renderButtons() {
    $("#giphy-buttons").empty();    
    $("#giphy-display").empty();    
    for (var i = 0; i < gestures.length; i++) {
        var button = $("<button>");
        button.addClass("btn btn-default");
        button.attr("data-reaction", gestures[i]);
        button.text(gestures[i]);
        $("#giphy-buttons").append(button);
    }    
}
renderButtons();

// Function creating variable for giphy search parameter.
$("#giphy-buttons").on("click", "button", function () {
    var reaction = $(this).attr("data-reaction"); 
    searchGiphy(reaction);
});

// Search Giphy API with data-reaction attribute, store results in an array and create div's and an object for each result to then display to the HTML.
function searchGiphy(value) {
    $(".images").remove();
    var APIKey = "eY02m6Nx4TL79ZmWJswlB4lnc3N68Xs2";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        value + "&api_key=" + APIKey + "&limit=12";    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {   
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var reactionDiv = $("<div class='images'>");
            var reactionImg = $("<img>");
            reactionImg.attr({
                "src": results[i].images.fixed_width_still.url,
                "data-state":"still",
                "data-still": results[i].images.fixed_width_still.url,
                "data-animated": results[i].images.fixed_width.url,
            });            
            reactionDiv.append(reactionImg);
            $("#giphy-display").prepend(reactionDiv);
        }
    });
}

// Function to gather user input, add to array of existing gestures, create a button and perform ajax call 
$("#go").on("click", function () {
    var search = $("#search").val();
    gestures.push(search);
    renderButtons();
    searchGiphy(search);
    $("#search").val("");
});    


// Event Delegation for object created for each result returned and the ability to toggle between different properties.
$(document).on("click", "img",  function(){
    var state = $(this).attr("data-state");
    var still = $(this).attr("data-still"); 
    var animated = $(this).attr("data-animated"); 
    if(state == "still"){
        $(this).attr({
            "src": animated,
            "data-state": "animated"
        });   
    } else {
        $(this).attr({
            "src": still,
            "data-state": "still"
        });    
    }
});