var socket = io();

socket.on('connect', function() {
	console.log('connected on client!');
});

$(document).ready(function() {
	socket.on('tweets', function(tweet) {
		var $tweetText = $('<p></p>').text(tweet.text);
		var $tweetImg = $('<img>').attr('src', tweet.user_profile_image);
		var $tweetContainer = $('<div class="well"</div>').append($tweetText).append($tweetImg);
		$('#tweets').prepend($tweetContainer);
	});
});