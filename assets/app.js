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

// Toggle BandCamp
$("#bandButton").on("click", function () {
  var state = $(this).attr("data-state");
  if (state == "off") {
    $("#bandDiv").css("display", "block");
    $("#bandButton").attr("data-state", "on");
  } else {
    $("#bandDiv").css("display", "none");
    $("#bandButton").attr("data-state", "off");
  }
  console.log("Band Toggle");
});

// Title Form
$('.titleInput').keypress(function(event) {
    if (event.keyCode == 13 || event.which == 13) {
        var input = $("#event").val();
        $(".eventTitle").text(input);
        $("#event").val('');
        event.preventDefault();
    }
});