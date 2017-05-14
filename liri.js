var getTweets = require('./twitter');

var userFinished = false;

/* Inquirer Setup */
var inquirer = require("inquirer");
/* End Inquirer Setup */

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

        switch(value[0]) {
            case ('my-tweets'):
                console.log('\n');
                getTweets(function() {
                    goAgain();
                });
                break;
            case ('movie-this'):
                console.log("Performing movie-this");
                goAgain();
                break;
        }
    });




    
}

function goAgain() {
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

// process.exit();

// getTweets();
