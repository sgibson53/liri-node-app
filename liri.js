var keys = require('./keys');

console.log('\n\n Welcome to Liri! The lame version of Siri.\n\n');

// API resources
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var params = {screen_name: 'sethg4thdown'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

    tweets.forEach(function(tweet) {
        console.log(tweet.created_at);
        console.log(tweet.text);
    });
  } else {
      console.log(error);
  }
});
