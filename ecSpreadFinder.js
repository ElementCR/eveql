var querystring = require('querystring');
var http = require('http');

var host = 'http://api.eve-central.com/api/marketstat'

var options = {
	host: 'api.eve-central.com',
	port: 80,
	path: '/api/marketstat/json?typeid=34&usessystem=30000142',
	method: 'GET'
}

http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
}).end();
