var express = require('express'),
  http = require('http'),
  path = require('path'),
  url = require('url'),
  async =require('async'),
  Twit = require('twit');

var app = express();

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/index1', function (req, res) {
  res.sendFile(__dirname + '/views/index1.html');
});

var server = app.listen(3030, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Twitter client app listening at http://%s:%s', host, port)

});


var T = new Twit({
    consumer_key: 'your_consumer_key',
    consumer_secret: 'your_consumer_secret',
    access_token: 'your_access_token',
    access_token_secret: 'your_access_token_secret'
});

app.get('/search', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	console.log(query.term);
	dataToSend = [];
	T.get('search/tweets', { q: query.term+' since:2015-01-01', count: 10 }, function(err, data, response) {
		console.log("searching tweets");
		tweets = data.statuses;
		if(tweets){
			async.forEach(tweets, function (tweet, callback) {
				dataToSend.push({text:tweet['text'],name:tweet['user']['name'],screenName:tweet['user']['screen_name'],profile_image_url:tweet['user']['profile_image_url']});
	  			callback();
			}, 
			function (err) {
	  			if (err) { throw err; }
	  			res.send(dataToSend);
			});
		}
		else{
			res.send([]);
		}
  		
	});
});

app.get('/followers', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	dataToSend = [];
	T.get('followers/list', { screen_name: query.screen_name,count:50 }, function(err, data, response) {
		console.log("searching followers");
		users = data.users;
		if(users){
			async.forEach(users, function (user, callback) {
				dataToSend.push({text:user['text'],name:user['name'],screenName:user['screen_name'],profile_image_url:user['profile_image_url'],friends_count:user['friends_count'],followers_count:user['followers_count']});
	  			callback();
			}, 
			function (err) {
	  			if (err) { throw err; }
	  			res.send(dataToSend);
			});
		}
		else{
			res.send([]);
		}
	});
});
app.get('/friends', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	dataToSend = [];
	T.get('friends/list', { screen_name: query.screen_name,count:50 }, function(err, data, response) {
		console.log("searching friends");
		users = data.users;
		if(users){
			async.forEach(users, function (user, callback) {
				dataToSend.push({text:user['text'],name:user['name'],screenName:user['screen_name'],profile_image_url:user['profile_image_url'],friends_count:user['friends_count'],followers_count:user['followers_count']});
	  			callback();
			}, 
			function (err) {
	  			if (err) { throw err; }
	  			res.send(dataToSend);
			});
		}
		else{
			res.send([]);
		}
	});
});


app.get('/user_timeline', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	dataToSend = [];
	T.get('statuses/user_timeline', { screen_name: query.screen_name,count:10 }, function(err, data, response) {
		console.log("user_timeline");
		if(data){
			async.forEach(data, function (tweet, callback) {
				dataToSend.push({text:tweet['text'],name:tweet['user']['name'],screenName:tweet['user']['screen_name'],profile_image_url:tweet['user']['profile_image_url']});
	  			callback();
			}, 
			function (err) {
	  			if (err) { throw err; }
	  			res.send(dataToSend);
			});
		}
		else{
			res.send(dataToSend);
		}
		// res.send(data);
	});
});

app.get('/home_timeline', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	dataToSend = [];
	T.get('statuses/home_timeline', { screen_name: query.screen_name,count:10 }, function(err, data, response) {
		console.log("home_timeline");
		if(data){
			async.forEach(data, function (tweet, callback) {
				dataToSend.push({text:tweet['text'],name:tweet['user']['name'],screenName:tweet['user']['screen_name'],profile_image_url:tweet['user']['profile_image_url']});
	  			callback();
			}, 
			function (err) {
	  			if (err) { throw err; }
	  			res.send(dataToSend);
			});
		}
		else{
			res.send([]);
		}
		// res.send(data);
	});
});

app.get('/favorites', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	dataToSend = [];
	T.get('favorites/list', { screen_name: query.screen_name,count:10 }, function(err, data, response) {
		console.log("favorites");
		if(data){
			async.forEach(data, function (tweet, callback) {
				dataToSend.push({text:tweet['text'],name:tweet['user']['name'],screenName:tweet['user']['screen_name'],profile_image_url:tweet['user']['profile_image_url']});
	  			callback();
			}, 
			function (err) {
	  			if (err) { throw err; }
	  			res.send(dataToSend);
			});
		}
		else{
			res.send([]);
		}
	});
});

app.get('/trends', function (req, res) {
	dataToSend = [];
	T.get('trends/place', { id: 23424848 }, function(err, data, response) {
		console.log("trends for india");
		if(data)
			res.send(data[0]['trends']);
		else
			res.send([]);
	});
});
