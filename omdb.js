var keys = require('./keys');
var request = require('request');
var fs = require('fs');

function getMovieInfo(title, callback) {

    request('http://www.omdbapi.com/?i=tt3896198&apikey='+keys.twitterKeys.omdb+'&t='+title, function(error, response, body) {
        if (error) console.log(error);
        body = JSON.parse(body);
        var s = '';
        s += '\nTitle: ' + body.Title +
            '\nYear: ' + body.Year +
            '\nIMDB Rating: ' + body.Rated +
            '\nProduced in: ' + body.Country +
            '\nLanguage: ' + body.Language +
            '\nActors: ' + body.Actors +
            '\n Rotten Tomatoes URL: ' + body.Website;
        
        console.log(s)
        log('\n\nmovie-this', s);
        callback();
    });
}

function log(command, data) {

    var s = command + '\n' + data;

    fs.appendFile('./log.txt', s, function(err) {
        if (err) console.log(err);
    });

}

module.exports = getMovieInfo;