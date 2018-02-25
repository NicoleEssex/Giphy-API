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
$("#giphy-buttons").on("click", "button", function(){
//var holding my key for Giphy API searches
var APIKey = "eY02m6Nx4TL79ZmWJswlB4lnc3N68Xs2";
var reaction = $(this).attr("data-reaction");
//var holding the URL needed to query the database
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        reaction + "&api_key=" + APIKey + "&limit=10";
console.log(reaction, queryURL, APIKey);
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
//store results from response to variable    
    var results = response.data;

//create for loop to create divs for each image from the results.
    for(var i = 0; i<results.length; i++){
    var reactionDiv = $("<div>");
    var p = $("<p>");
    $("p").text("Rating: " + results[i].rating);
    var reactionImg = $("<img>");
    reactionImg.attr("src", results[i].images.fixed_height.url);
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
});



