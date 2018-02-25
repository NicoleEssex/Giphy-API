console.log("hello Word");

//create array of gestures
var gestures = ["Thumbs-up", "Hang-Loose", "Whatever", "Rock-on", "Face-palm"];
// console.log(gestures);
//   for(var i=0; i<gestures.length; i++) {
//       console.log(gestures[i]);


// Function for displaying gesture data
function renderButtons() {

    // Delete the giphy buttons prior to adding new giphy buttons
    $("#giphy-buttons").empty();
    $("giphy-display").empty();
    // Looping through the array of gestures
    for (var i = 0; i < gestures.length; i++) {
        console.log(gestures[i]);

        // Dynamicaly generate buttons for each gesture in array.
        var button = $("<button>");

        // Adding a class
        button.addClass("btn btn-success");

        // Adding a data-attribute with a value of the movie at index i
        button.attr("data-reaction", gestures[i]);

        // Providing the button's text with a value of the movie at index i
        button.text(gestures[i]);

        // Adding the button to the HTML
        $("#giphy-buttons").append(button);
    }
    //   var buttons = $("<button>").text(gestures[i]);
    //   $("container-fluid").append(buttons);
    //   console.log(buttons);
}
renderButtons();
// on click for reactions buttons
$("#giphy-buttons").on("click", "button", function () {
    var reaction = $(this).attr("data-reaction"); // dynamic

    searchGiphy(reaction);
});




function searchGiphy(value) {
    $(".images").remove();
    //var holding my key for Giphy API searches
    var APIKey = "eY02m6Nx4TL79ZmWJswlB4lnc3N68Xs2";

    //var holding the URL needed to query the database
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        value + "&api_key=" + APIKey + "&limit=10";
    console.log(value, queryURL, APIKey);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //store results from response to variable    
        var results = response.data;

        console.log("Data: ", response.data);

        //create for loop to create divs for each image from the results.

        for (var i = 0; i < results.length; i++) {
            var reactionDiv = $("<div class='images'>");
            var p = $("<p>");
            $("p").text("Rating: " + results[i].rating);
            var reactionImg = $("<img>");
            // reactionImg.attr("src", results[i].images.fixed_height.url);
            reactionImg.attr({
                "src": results[i].images.original_still.url,
                "data-state":"still",
                "data-still":results[i].images.original_still.url,
                "data-animated":results[i].images.fixed_height.url
            });
            reactionDiv.append(p);
            reactionDiv.append(reactionImg);
            $("#giphy-display").prepend(reactionDiv);
        }
        // console.log(response.data[0].url);
        // for(var i = 0; i = response.data.length; i++){
        //     var img = $("<img>");
        //     img.addClass("giphy-image");
        //     console.log(img);
        // var ur = response.data[i].url;
        // console.log(ur);
    });
}

// Feature
// Get the input
// Push to that array
// Make an ajax call
$("#go").on("click", function () {

    // ES6
    // let
    // const

    // ES5     
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
    // "src": results[i].images.original_still.url,
    // "data-state":"animated",
    // "data-still":results[i].images.original_still.url,
    // "data-animated":results[i].images.fixed_height.url

    var state = $(this).attr("data-state");
    var still = $(this).attr("data-still"); 
    var animated = $(this).attr("data-animated"); 

    if(state == "still"){
        $(this).attr({
            "src": animated,
            "data-state": "animated"
        });
        // TODO
        // Change to animated
        // src
        // state = animated
    } else{
        $(this).attr({
            "src": still,
            "data-state": "still"
        });
        // TODO
        // change it to still
        // src
        // state = still
    }
    console.log(state);
});