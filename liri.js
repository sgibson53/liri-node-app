var getTweets = require('./twitter');
var getMovieInfo = require('./omdb');
var getSong = require('./spotify');
var fs = require('fs');

var userFinished = false;

/* Inquirer Setup */
var inquirer = require("inquirer");

// Read in random.txt
fs.readFile('./random.txt', 'utf8', function(err, data) {
    if (err) return console.log(err);
    random = data.split(',');
});

console.log('\n\nWelcome to Liri! The lame version of Siri.\n\n');
console.log("There are four available commands you can use. See descriptions below:\n");
console.log('my-tweets: This will display your last 20 tweets.')
console.log('movie-this <movie name here>: This will output information about your movie.')
console.log('spotify-this-song <song name here>: This will output information about your song.')
console.log('do-what-it-says: Only use this if you\'re feeling lucky.\n\n')

console.log('Hi, I\'m Liri, I\'ll take your request now.\n');

processRequest();

function processRequest() {
    
    console.log('\n')

    inquirer.prompt({
        type: 'input',
        name: 'query',
        message: 'What is your request?: ',
        validate: function(value) {
            var pass = value.match(/(spotify-this-song|my-tweets|movie-this|do-what-it-says).*/g);

            if (pass) {
                    return true;
            }

            return "That's not a valid command!";
            
        }
    }).then(function(value) {

        value = value.query.split(' ');
        phrase = value.slice(0);
        phrase.shift();

        switch(value[0]) {
            case ('my-tweets'):
                getTweets(function() {
                    goAgain();
                });
                break;
            case ('movie-this'):
                var title = (phrase.length == 0) ? "mr+nobody" : phrase.join('+');
                getMovieInfo(title, function() {
                    goAgain();
                })
                break;
            case ('spotify-this-song'):
                getSong(phrase.join(' '), function(err, data) {
                    if (err) console.log(err);
                    goAgain();
                })
                break;
            case ('do-what-it-says'):
                random[1] = random[1].slice(1, random[1].length-2);  // take out quotes
                if (random[0] == 'spotify-this-song') {
                    getSong(random[1], function(err, data) {
                        if (err) console.log(err);
                        goAgain();
                    })
                }
                break;
        }

        
    });




    
}

function goAgain() {
    console.log('\n');
    inquirer.prompt({
        type: 'confirm',
        name: 'enterAnotherQuery',
        message: 'Would you like to use Liri again?',
        default: false
    }).then(function(answers) {
        userFinished = answers.enterAnotherQuery;
        if (answers.enterAnotherQuery) {
            processRequest();
        }
    });
}

