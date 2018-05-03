console.log("hello Word");

// Create array of gestures
var gestures = ["Thumbs-up", "Hang-Loose", "Whatever", "Rock-on", "Face-palm"];

// Function for displaying gesture data
function renderButtons() {

    // Delete the giphy buttons prior to adding new giphy buttons
    $("#giphy-buttons").empty();
    
    // Delete giphy results before displaying next selection
    $("#giphy-display").empty();
    
    // Looping through the array of gestures
    for (var i = 0; i < gestures.length; i++) {
        console.log(gestures[i]);

        // Dynamicaly generate buttons for each gesture in array.
        var button = $("<button>");

        // Adding a class for bootstrap styling
        button.addClass("btn btn-success");

        // Adding a data-attribute with a value of the gesture at index i
        button.attr("data-reaction", gestures[i]);

        // Providing the button's text with a value of the gesture at index i
        button.text(gestures[i]);

        // Adding the button to the HTML
        $("#giphy-buttons").append(button);
    }
    
}
renderButtons();

// On click listener to create new gesture button with matching attribute
$("#giphy-buttons").on("click", "button", function () {
    var reaction = $(this).attr("data-reaction"); // dynamic

    searchGiphy(reaction);
});




function searchGiphy(value) {
    $(".images").remove();
    // Var holding my key for Giphy API searches
    var APIKey = "eY02m6Nx4TL79ZmWJswlB4lnc3N68Xs2";

    // Var holding the URL needed to query the database
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        value + "&api_key=" + APIKey + "&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        
        // Store results from response to variable    
        var results = response.data;

        console.log("Data: ", response.data);

        // Create for loop to create divs for each image from the results.

        for (var i = 0; i < results.length; i++) {
            var reactionDiv = $("<div class='images'>");
            var p = $("<p>");
            $("p").text("Rating: " + results[i].rating);
            var reactionImg = $("<img>");
            // reactionImg.attr("src", results[i].images.fixed_height.url);
            reactionImg.attr({
                "src": results[i].images.fixed_width_still.url,
                "data-state":"still",
                "data-still": results[i].images.fixed_width_still.url,
                "data-animated": results[i].images.fixed_width.url,
            });

            reactionDiv.append(p);
            reactionDiv.append(reactionImg);
            $("#giphy-display").prepend(reactionDiv);
        }
    });
}

// Get the input
// Push to that array
// Make an ajax call
$("#go").on("click", function () {
    var search = $("#search").val();
    gestures.push(search);
    renderButtons();
    searchGiphy(search);
    $("#search").val("");
    // TODO
    console.log("Gestures: ", gestures);
    console.log("Search: ", search);

});    


// Event Delegation
$(document).on("click", "img",  function(){
    var state = $(this).attr("data-state");
    var still = $(this).attr("data-still"); 
    var animated = $(this).attr("data-animated"); 

    // Change to animated
    if(state == "still"){
        $(this).attr({
            "src": animated,
            "data-state": "animated"
        });
    // Change to still    
    } else{
        $(this).attr({
            "src": still,
            "data-state": "still"
        });
        
    }
    console.log(state);
});