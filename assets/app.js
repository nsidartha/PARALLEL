// $(document).ready(function () {
// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems);
// });

// Initialize collapsible (uncomment the lines below if you use the dropdown variation)
// var collapsibleElem = document.querySelector('.collapsible');
// var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

// Or with jQuery
M.AutoInit();

$('.button-collapse').sideNav({
  menuWidth: 300, // Default is 300
  edge: 'right', // Choose the horizontal origin
  closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
  draggable: true, // Choose whether you can drag to open on touch screens,
  onOpen: function (el) {
    /* Do Stuff */
  }, // A function to be called when sideNav is opened
  onClose: function (el) {
    /* Do Stuff */
  }, // A function to be called when sideNav is closed
});


// // var instance = M.Sidenav.getInstance();
// instance.open();
// instance.close();
/* jQuery Method Calls
  You can still use the old jQuery plugin method calls.
  But you won't be able to access instance properties.

  $('.sidenav').sidenav('methodName');
  $('.sidenav').sidenav('methodName', paramName);
*/
// Twitter JS
// var twitterDiv = $("<div>");
// twitterDiv.attr("class", "twitter-timeline");
// twitterDiv.attr("href", "");
// $("#twitterDiv").append(twitterDiv);​
// $(".song").on("click", function () {
//   console.log("song list choice");
//   var twitter = $(this).attr("data-twitter");
//   console.log(twitter);
//   $('.twitter-timeline').attr("href", twitter);
// })
// });

// $(".song").on("click", function () {
//   console.log("a button clicked");
//   var twitter = $(this).attr("data-twitter");
//   console.log(twitter);
//   $(".twitter-timeline").attr("href", twitter);
// })


$(".song").on("click", function () {
// Get Artist
var artist = $(this).attr("data-artist");
// Create Query URL
var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";​
$.ajax

QueryURL,
method: "GET"
}).then(function (response) {
​
// Printing the entire object to console
console.log(response);​
var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
var Events = $("<h2>").text(response.upcoming_event_count + " upcoming events");
var artistUrl = $("<a>").attr("href", response.url).text("See Tour Dates");​
// Empty the contents of the artist-div, append the new artist content
$("#bit-div").empty();
$("#bit-div").append(trackerCount, Events, artistUrl);
});

})