var express = require('express'),
  http = require('http'),
  path = require('path'),
  url = require('url'),
  Twit = require('twit');

var app = express();

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

var server = app.listen(3030, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Twitter client app listening at http://%s:%s', host, port)

});


var T = new Twit({
    consumer_key: '03Ut9mzraEM45AAAZBth1iokw'
  , consumer_secret: '065BqxDDNj6zsqQd6X2xcqrEypaau5XlftoSUvnF3JZPNJHx0V'
  , access_token: '476108266-oFg94PdI88TKtWOXg80dGyIzuW3RKfUrt4bC2kEU'
  , access_token_secret: 'fbTTszyKI3XasImhiXXJFItheGcjzSW6CF4k9Hsz5D9Zb'
})

app.get('/search', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	console.log(query.term);
	T.get('search/tweets', { q: query.term+' since:2015-01-01', count: 10 }, function(err, data, response) {
		console.log("searching tweets");
  		res.send(data);
	});
});
