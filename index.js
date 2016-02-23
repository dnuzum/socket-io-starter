var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var http  = require('http').Server(app);
var io = require('socket.io')(http);
var Twit = require('twit');
var port = process.env.PORT || 3000;

var twitter = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

io.on('connect', function(socket) {
  var stream = twitter.stream('statuses/filter', { track: 'javascript' });

  stream.on('tweet', function(tweet) {
    var data = {};
    data.name = tweet.user.name;
    data.screen_name = tweet.user.screen_name;
    data.text = tweet.text;
    data.user_profile_image = tweet.user.profile_image_url;
    socket.emit('tweets', data);
  });
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('index');
});

http.listen(port);
