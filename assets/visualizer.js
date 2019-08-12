 $(document).ready(function () {

     // Button Variables
     var buttonContainer = $("<div>");
     var bar = $("<div>").attr("id", "bar").text(" BAR ");
     var circle = $("<div>").attr("id", "circle").text(" CIRCLE ");
     var round = $("<div>").attr("id", "round").text(" SPEAKER ");
     buttonContainer.append(bar, circle, round);
     $("#buttonContainer").append(buttonContainer);

     // Canvas Variables
     var canvas = $("<canvas id='visualizer'><canvas>");
     $("#visualizerContainer").append(canvas);
     canvas = document.getElementById("visualizer");
     var canvasContext = canvas.getContext("2d");
     canvas.width = document.getElementById("visualizerContainer").offsetWidth;
     canvas.height = document.getElementById("visualizerContainer").offsetHeight;
     var height = canvas.height;
     var width = canvas.width;
     console.log("Width: " + canvas.width + " Height: " + canvas.height);
     //  fillStyle = document.getElementById("visualizerContainer").style.background;
     fillStyle = "black";
     // Audio Variables
     var audio = document.getElementById("audio");
     audio.crossOrigin = "anonymous";
     audio.load();

     //  var audioContext = new AudioContext();
     var audioContext = new(window.AudioContext || window.webkitAudioContext)();
     var src = audioContext.createMediaElementSource(audio);
     console.log("Audio: " + audio.src);

     // Analyzer Variables
     var id;
     var analyzer = audioContext.createAnalyser();
     var freqArray = new Uint8Array(analyzer.frequencyBinCount);
     src.connect(analyzer);
     analyzer.connect(audioContext.destination);
     analyzer.fftSize = 2048;

     // Visualizer Variables
     var barHeight = 5;
     var barWidth = (canvas.width / analyzer.frequencyBinCount) * 2.5;
     var x, y, x2, y2;
     var g, b;
     var r = 0;

     // Create Bar Default
     clearCanvas();
     renderBarVisualizer();
     audio.play();

     if (typeof AudioContext != "undefined" || typeof webkitAudioContext != "undefined") {
         var resumeAudio = function () {
             if (typeof g_WebAudioContext == "undefined" || g_WebAudioContext == null) return;
             if (g_WebAudioContext.state == "suspended") g_WebAudioContext.resume();
             document.removeEventListener("click", resumeAudio);
         };
         document.addEventListener("click", resumeAudio);
     }


     //  Song Changer
     $(".song").on("click", function () {
         audio.src = $(this).attr("data-src");
         var title = $(this).attr("data-name");
         var author = $(this).attr("data-author");
         $(".title").text(title);
         $(".author").text(author);
         $("#audio").attr("src", audio.src);
         audio.play();
         console.log("song clicked: " + title + " " + author);


         //  TWITTER FUNCTIONS
         if (title == "Bad Guy") {
             $("#twitterId1").css("display", "none");
             $("#twitterId2").css("display", "block");
             $("#twitterId3").css("display", "none");
         } else if (title == "Press") {
             $("#twitterId1").css("display", "block");
             $("#twitterId2").css("display", "none");
             $("#twitterId3").css("display", "none");
         } else if (title == "POP/STARS") {
             $("#twitterId1").css("display", "none");
             $("#twitterId2").css("display", "none");
             $("#twitterId3").css("display", "block");
         }

         if (title == "POP/STARS") {
             title = "POP-STARS";
             author = "K-DA-2";
         } else {}

         // LYRICS FUNCTIONS
         var api_key = "746b28bfaf3ac7835a5bb56a481773a5";
         var queryURL =
             "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" +
             title +
             "&q_artist=" +
             author +
             "&apikey=" +
             api_key;


         $.ajax({
             url: queryURL,
             method: "GET"
         }).then(function (response) {
             // console.log(queryURL);

             var data = response.replace("callback(", "").replace(");", "");
             data = JSON.parse(data);
             console.log(data);
             //change the console.log to print into HTML'
             console.log(data.message.body.lyrics.lyrics_body);
             $("#lyricsDiv").text(data.message.body.lyrics.lyrics_body);
         });

         //  BANDSinTOWN FUNCTIONS

         // Get Artist
         var artist = author.replace("By ","");
         // Create Query URL
         var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
         console.log(queryURL);

         $.ajax({
             url: queryURL,
             method: "GET"
         }).then(function (response) {
            
             // Printing the entire object to console
             console.log(response);
             var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
             var Events = $("<h2>").text(response.upcoming_event_count + " upcoming events");
             var artistUrl = $("<a>").attr("href", response.url).text("See Tour Dates");
             // Empty the contents of the artist-div, append the new artist content
             $("#bandDiv").empty();
             $("#bandDiv").append(trackerCount, Events, artistUrl);
         });

     });

     // Choose Bar Visualizer
     $("#bar").on("click", function () {
         clearCanvas();
         renderBarVisualizer();
         console.log("Bar Visualizer Activated");
     });

     $("#circle").on("click", function () {
         clearCanvas();
         renderCircleVisualizer();
         console.log("Circle Visualizer Activated");
     });

     $("#round").on("click", function () {
         clearCanvas();
         renderRoundVisualizer();
         console.log("Round Visualizer Activated");
     });

     //Bar Visualizer
     function renderBarVisualizer() {

         id = requestAnimationFrame(renderBarVisualizer);
         analyzer.getByteFrequencyData(freqArray);

         drawBaseCanvas();

         x = canvas.width / 2;
         x2 = x;

         for (var i = 0; i < analyzer.frequencyBinCount; i++) {
             barHeight = freqArray[i] + 5;

             setCanvasColor(i,barHeight);
             canvasContext.fillRect(x, (canvas.height - barHeight * 2.5) / 2, barWidth, barHeight * 2.5);
             canvasContext.fillRect(x2, (canvas.height - barHeight * 2.5) / 2, barWidth, barHeight * 2.5);

             x += barWidth + 1;
             x2 -= barWidth + 1;
         }

     }

     //Circle Visualizer
     function renderCircleVisualizer() {

         id = requestAnimationFrame(renderCircleVisualizer);
         analyzer.getByteFrequencyData(freqArray);

         var center_x = canvas.width / 2;
         var center_y = canvas.height / 2;
         var radius = 400;
         var bars = 200;
         var rads;

         drawBaseCanvas();

         for (var i = 0; i < bars; i++) {
             rads = Math.PI * 2 / bars;
             barHeight = freqArray[i] / 2 + 5;

             x = center_x + Math.cos(rads * i) * (radius - barHeight);
             y = center_y + Math.sin(rads * i) * (radius - barHeight);
             x2 = center_x + Math.cos(rads * i) * (radius + barHeight);
             y2 = center_y + Math.sin(rads * i) * (radius + barHeight);

             setCanvasColor(i,barHeight);
             canvasContext.lineWidth = barWidth;
             drawBar(x,y,x2,y2);
         }

         bars = bars * 2;
         for (var i = 0; i < bars; i++) {
             radius = 800
             rads = Math.PI * 2 / bars;
             barHeight = freqArray[i];

             x = center_x + Math.cos(rads * i) * (radius - barHeight);
             y = center_y + Math.sin(rads * i) * (radius - barHeight);
             x2 = center_x + Math.cos(rads * i) * (radius + barHeight);
             y2 = center_y + Math.sin(rads * i) * (radius + barHeight);

             setCanvasColor(i,barHeight);
             canvasContext.lineWidth = barWidth;
             drawBar(x,y,x2,y2);

         }
     }

     //Round Visualizer
     function renderRoundVisualizer() {

         id = requestAnimationFrame(renderRoundVisualizer);
         analyzer.getByteFrequencyData(freqArray);

         var center_x = canvas.width / 2;
         var center_y = canvas.height / 2;
         var radius = 1;
         var circles = 50;

         drawBaseCanvas();
         drawArc(center_x, center_y, radius, 0, 2 * Math.PI);

         for (var i = 0; i < circles; i++) {
             rads = Math.PI * 2 / circles;
             barHeight = freqArray[i];
             radius = freqArray[i];

             setCanvasColor(i,barHeight);
             canvasContext.lineWidth = barWidth;
             drawArc(center_x, center_y, radius + i * 20, i, 2 * Math.PI - i);


         }
     }

     // Clear Canvas for new visualizer
     function clearCanvas() {
         canvasContext.clearRect(0, 0, width, height);
         cancelAnimationFrame(id);
         console.log("Canvas Cleared");
     }

    //  Draw Base Canvas
     function drawBaseCanvas(){
        canvasContext.fillStyle = fillStyle;
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
     }

    //  Set Canvas color
     function setCanvasColor(i,barHeight){
        b = barHeight + (25 * (i / analyzer.frequencyBinCount)) + 50;
        g = 250 * (i / analyzer.frequencyBinCount);
        canvasContext.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        canvasContext.strokeStyle="rgb(" + r + "," + g + "," + b + ")";
     }

    //  Draw Arc
     function drawArc(x,y,radius,start,end){
        canvasContext.beginPath();
        canvasContext.arc(x,y,radius,start,end);
        canvasContext.stroke();
     }

    //  Draw line/bar
     function drawBar(x,y,x2,y2){
        canvasContext.beginPath();
        canvasContext.moveTo(x, y);
        canvasContext.lineTo(x2, y2);
        canvasContext.stroke();
     }

 });

 //  //  Spotify
 //  window.onSpotifyWebPlaybackSDKReady = () => {
 //      const token = 'BQCxEhsMhNqlUI8vTv0LzBkcjq298B70Q9hdYTHZu3nrZEimR6FphK6tBouDw-bdlWpnMsod_Z78DbyguTlGpaIbv1nMjcyPWnJOBbaDpId3AFzr7cae87IdpQ-80_De7ted6rEF7avWdeo1BjDSUeDX-eF3aDFdcg';
 //      const player = new Spotify.Player({
 //          name: 'Web Playback SDK Quick Start Player',
 //          getOAuthToken: cb => {
 //              cb(token);
 //          }
 //      });

 //      // Error handling
 //      player.addListener('initialization_error', ({
 //          message
 //      }) => {
 //          console.error(message);
 //      });
 //      player.addListener('authentication_error', ({
 //          message
 //      }) => {
 //          console.error(message);
 //      });
 //      player.addListener('account_error', ({
 //          message
 //      }) => {
 //          console.error(message);
 //      });
 //      player.addListener('playback_error', ({
 //          message
 //      }) => {
 //          console.error(message);
 //      });

 //      // Playback status updates
 //      player.addListener('player_state_changed', state => {
 //          console.log(state);
 //      });

 //      // Ready
 //      player.addListener('ready', ({
 //          device_id
 //      }) => {
 //          console.log('Ready with Device ID', device_id);
 //      });

 //      // Not Ready
 //      player.addListener('not_ready', ({
 //          device_id
 //      }) => {
 //          console.log('Device ID has gone offline', device_id);
 //      });

 //      // Connect to the player!
 //      player.connect();
 //  };