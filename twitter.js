var keys = require('./keys');
var fs = require('fs');
// API resources
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var params = {screen_name: 'sethg4thdown', count: 5};

function getTweets(callback) {
    var s = '';
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            s += '\n'+"Here are you last 5 tweets:"+'\n';
            tweets.forEach(function(tweet) {
                s += '\nDate tweeted: ' + tweet.created_at
                s += '\nTweet text: ' + tweet.text;
            });

            console.log(s)
            log('\n\nmy-tweets\n', s);

            callback();
        } else {
            console.log(error);
        }
    });
}

function log(command, data) {

    var s = command + '\n' + data;

    fs.appendFile('./log.txt', s, function(err) {
        if (err) console.log(err);
    });

}

module.exports = getTweets;