var socket = io();

socket.on('connect', function() {
  console.log('Connected!');
});

$(function() {
  socket.on('tweets', function(tweet) {
    var $tweetName = $('<h2></h2>').text(tweet.text);
    var $tweetAuthor = $('<p></p>').text(tweet.screen_name);
    var $tweetContainer = $('<div class="well"></div>').append($tweetName).append($tweetAuthor);
    $('#tweet-container').prepend($tweetContainer);
  });
});
