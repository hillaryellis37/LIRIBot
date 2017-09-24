var keys = require("./keys.js");
var arg1 = process.argv[2];
var keysArray = [];
var songName; 


// accessing ALL key elements (Twitter & Spotify) from keys.js with for loop and throwing each key into the keysArray:

for (var key in keys) {
  keysArray.push(keys[key]);
}

// Twitter section:
 
if (arg1 === "my-tweets") {

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
}

else if (arg1 === "spotify-this-song") {

	var Spotify = require('node-spotify-api');
	 
	var spotify = new Spotify({
	  id: keysArray[4],
	  secret: keysArray[5]
	});

	if (process.argv.length >= 4) {

		songName = process.argv[3];
	
	} else {
		
		songName = "Ace of Base - The Sign";
	}

		spotify.search({ type: 'track', query: songName }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }

			var artistArray = data.tracks.items[0].artists;
			var artists = '';
		// creating a 4-loop here to capture all artists and concatenate them to a string in artists variable:
			for (var i = 0; i < artistArray.length; i++) {
				artists = artists + " " + data.tracks.items[0].artists[0].name;
			}

			var song = data.tracks.items[0].name;
			var previewURL = data.tracks.items[0].preview_url;
			var album = data.tracks.items[0].album.name;

			console.log(
				"Artist(S): ", artists,
				"\nSong Title: ", song,
				"\nPreview Link: ", previewURL,
				"\nAlbum; ", album);
		});
	
}
// spotify-this-song section



// movie-this

// do-what-it-says