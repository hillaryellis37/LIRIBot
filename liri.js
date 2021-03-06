var keys = require("./keys.js");
var arg1 = process.argv[2];
var keysArray = [];
var songName; 


// accessing ALL key elements (Twitter & Spotify) from keys.js with for loop and throwing each key into the keysArray:

for (var key in keys) {
  keysArray.push(keys[key]);
}


function myTweets() {
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

function spotify(song) {
	var Spotify = require('node-spotify-api');
	 
	var spotify = new Spotify({
	  id: keysArray[4],
	  secret: keysArray[5]
	});

	if (process.argv.length >= 4) {
		songName = process.argv[3];
	} 
	else if (song != 1) {
		songName = song;

	} else {	
		songName = "Ace of Base - The Sign";
	}

	

	spotify.search({ type: 'track', query: songName }, function(err, data) {
		if (err) {
		    return console.log('Error occurred: ' + err);
		}

		var artistsArray = data.tracks.items[0].artists;
		var artists = '';
		// creating a 4-loop here to capture all artists and concatenate them to a string in artists variable:
		for (var i = 0; i < artistsArray.length; i++) {
			if (artists.length > 1) {
				artists = artists + ", " + data.tracks.items[0].artists[i].name;
			} else {
				artists = data.tracks.items[0].artists[0].name
			}
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

function movie(movietitle) {
	var title;

	if (process.argv.length >= 4) {

		title = process.argv[3];
	}

	else if (movietitle != 1) {
		title = movietitle;

	} else {
		
		title = 'Mr. Nobody';	
	}

	var dataRequest = 'http://www.omdbapi.com/?t=' + title + '&y=&plot=short&apikey=' + keysArray[6];
	console.log(dataRequest);
	var request = require('request');
	
	request(dataRequest, function (error, response, body) {
	  	// console.log('error:', error); // Print the error if one occurred
	  	// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

	  	var obj = JSON.parse(body);

	  	var title = obj.Title; 
        var year = obj.Year;
        var IMDB_Rating = obj.Ratings[0].Value;
       	var RT_Rating = obj.Ratings[1].Value;
        var country = obj.Country;
       	var language = obj.Language;
        var plot = obj.Plot;
        var actors = obj.Actors;

        console.log(
        "Title: ", title,
        "\nYear Released: ", year,
       	"\nIMDB Rating: ", IMDB_Rating,
       	"\nRotten Tomatoes Rating: ", RT_Rating, 
        "\nCountry produced: ", country,
       	"\nLanguage: ", language,
       	"\nPlot: ", plot,
       	"\nActors: ", actors,);
	});
}

function doIt() {
	var fs = require("fs");
  
  	fs.readFile("random.txt", "utf8", function(error, data) {

 	if (error) {
    	return console.log(error);
  	}
  
  	var dataArr = data.split(",");

  	var argument = dataArr[0];
  	var content = dataArr[1];

  	if (argument === "my-tweets") {
	myTweets();	
	}
	else if (argument === "spotify-this-song") {
		spotify(content);	
	}
	else if (argument === 'movie-this') {
		movie(content);
	} else {
		console.log("There seems to be a typo within the random.txt file. Please check it out.")
	}

  });

}

 
if (arg1 === "my-tweets") {
	myTweets();	
}

else if (arg1 === "spotify-this-song") {
	spotify(1);	
}

else if (arg1 === 'movie-this') {
	movie(1);
}
// do what is says section: 
else if (arg1 === 'do-what-it-says') {
	doIt();
}

