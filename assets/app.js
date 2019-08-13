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
  var repeat;
  if (state == "off") {
    $(this).attr("data-state", "on");
    $("#twitterIdDiv").css("display", "block");
    repeat = setInterval(ScrollDiv, 50, "twitterIdDiv", true);
  } else {
    $(this).attr("data-state", "off");
    $("#twitterIdDiv").css("display", "none");
    clearInterval(repeat);
  }
  console.log("Twitter Toggle: " + title);
});

// Toggle Lyrics
$("#lyricsButton").on("click", function () {
  var state = $(this).attr("data-state");
  var repeat;
  if (state == "off") {
    $("#lyricsDiv").css("display", "block");
    $(this).attr("data-state", "on");
    document.getElementById("lyricsDiv").scrollTop = 0;
    repeat = setInterval(ScrollDiv, 100, "lyricsDiv", false);
  } else {
    $("#lyricsDiv").css("display", "none");
    $(this).attr("data-state", "off");
    clearInterval(repeat);
  }
  console.log("Lyrics Toggle");
});

// Toggle BandCamp
$("#bandButton").on("click", function () {
  var state = $(this).attr("data-state");
  if (state == "off") {
    $("#bandDiv").css("display", "block");
    $(this).attr("data-state", "on");
  } else {
    $("#bandDiv").css("display", "none");
    $(this).attr("data-state", "off");
  }
  console.log("Band Toggle");
});

// Toggle Title
$("#titleButton").on("click", function () {
  var state = $(this).attr("data-state");
  if (state == "off") {
    $(".titleInput").css("display", "block");
    $(this).attr("data-state", "on");
  } else {
    $(".titleInput").css("display", "none");
    $(this).attr("data-state", "off");
  }
  console.log("Title Toggle");
});

// Toggle Music Display
$("#musicButton").on("click", function () {
  var state = $(this).attr("data-state");
  if (state == "off") {
    $(".music").css("display", "block");
    $(this).attr("data-state", "on");
  } else {
    $(".music").css("display", "none");
    $(this).attr("data-state", "off");
  }
  console.log("Music Toggle");
});

// Toggle Audio
$("#controlsButton").on("click", function () {
  var state = $(this).attr("data-state");
  if (state == "off") {
    $("#audio").css("display", "table");
    $(this).attr("data-state", "on");
  } else {
    $("#audio").css("display", "none");
    $(this).attr("data-state", "off");
  }
  console.log("Audio Controls Toggle");
});

// Title Form
$('.titleInput').keypress(function (event) {
  if (event.keyCode == 13 || event.which == 13) {
    var input = $("#event").val();
    $(".eventTitle").text(input);
    $("#event").val('');
    event.preventDefault();
  }
});

// Auto-Scroll
function ScrollDiv(div, repeat) {
  var x = document.getElementById(div);
  if (x.scrollTop < (x.scrollHeight - x.offsetHeight)) {
    x.scrollTop = x.scrollTop + 1;
  } else if (repeat == true) {
    x.scrollTop = 0;
  }
}