var keys = require("./keys.js");
var arg1 = process.argv[2];
var keysArray = [];


// my-tweets:

// accessing key elements from keys.js:

for (var key in keys) {
  keysArray.push(keys[key]);
}

console.log(keysArray);

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: keysArray[0],
  consumer_secret: keysArray[1],
  access_token_key: keysArray[2],
  access_token_secret: keysArray[3]
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

// spotify-this-song

// movie-this

// do-what-it-says