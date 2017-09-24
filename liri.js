var keys = require("./keys.js");
var arg1 = process.argv[2];
var keysArray = [];


// my-tweets:

// accessing key elements from keys.js:

for (var key in keys) {
  keysArray.push(keys[key]);
}


var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: keysArray[0],
  consumer_secret: keysArray[1],
  access_token_key: keysArray[2],
  access_token_secret: keysArray[3]
});
 
var params = {screen_name: 'HillZillary'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

  	for (var i = 0; i < tweets.length; i++) {
  		console.log(tweets[i].text);
  	}
  
  }
});

// spotify-this-song

// movie-this

// do-what-it-says