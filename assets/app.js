// Toggle Options
$(".optionsButton").on("click", function () {
  var state = $(this).attr("data-state");
  if (state == "off") {
    $(".options").css("display", "block");
    $(this).attr("data-state", "on");
    $(".songList").css("display", "none");
    $(".songsButton").attr("data-state", "off");
  } else {
    $(".options").css("display", "none");
    $(this).attr("data-state", "off");
    $(".songList").css("display", "none");
    $(".songsButton").attr("data-state", "off");
  }
  console.log("Options toggled")
});

// Toggle Song List
$(".songsButton").on("click", function () {
  var state = $(this).attr("data-state");
  if (state == "off") {
    $(".songList").css("display", "block");
    $(this).attr("data-state", "on")
    $(".options").css("display", "none");
    $(".optionsButton").attr("data-state", "off");
  } else {
    $(".songList").css("display", "none");
    $(this).attr("data-state", "off");
    $(".options").css("display", "none");
    $(".optionsButton").attr("data-state", "off");
  }
  console.log("Song List toggled")
});


// Toggle Twitter
$("#twitterButton").on("click", function () {
  var title = $(".title").text();
  var state = $(this).attr("data-state");
  if (state == "off") {
    $(this).attr("data-state", "on");
    $("#twitterIdDiv").css("display", "block");
  } else {
    $(this).attr("data-state", "off");
    $("#twitterIdDiv").css("display", "none");
  }

  console.log("Twitter Toggle: " + title);
});

// Toggle Lyrics
$("#lyricsButton").on("click", function () {
  var title;
  var state = $(this).attr("data-state");
  if (state == "off") {
    $("#lyricsDiv").css("display", "block");
    $(this).attr("data-state", "on");
  } else {
    $("#lyricsDiv").css("display", "none");
    $(this).attr("data-state", "off");
  }
  console.log("Lyrics Toggle");

});


// $(".song").on("click", function () {
//   // Get Artist
//   var artist = $(this).attr("data-artist");
//   // Create Query URL
//   var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";​
//   $.ajax

//   QueryURL,
//   method: "GET"
// }).then(function (response) {
//   ​
//   // Printing the entire object to console
//   console.log(response);​
//   var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
//   var Events = $("<h2>").text(response.upcoming_event_count + " upcoming events");
//   var artistUrl = $("<a>").attr("href", response.url).text("See Tour Dates");​
//   // Empty the contents of the artist-div, append the new artist content
//   $("#bit-div").empty();
//   $("#bit-div").append(trackerCount, Events, artistUrl);
// });

// // Lyrics
// var api_key = "746b28bfaf3ac7835a5bb56a481773a5";
// var trackName;
// var artistName;
// var queryURL =
//   "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" +
//   trackName +
//   "&q_artist=" +
//   artistName +
//   "&apikey=" +
//   api_key;​
// $(".song").on("click", function () {
//   trackName = $(this).attr('data-name');
//   artistName = $(this).attr('data-author').replace("by ", "");
//   //add to div underhere
// });​
// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function (response) {
//   // console.log(queryURL);
//   ​
//   var data = response.replace("callback(", "").replace(");", "");
//   data = JSON.parse(data);​
//   console.log(data);
//   //change the console.log to print into HTML
//   console.log(data.message.body.lyrics.lyrics_body);
// });