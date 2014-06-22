var express = require('express'),
fs = require('fs'),
buf = require('buffer');

var tictactoe = require('./tictactoe.js'),
port = 3000;

var app = express();
var server = require('http').createServer(app);

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

var getfile = function (filepath) {
	var filebuf = new fs.readFileSync(filepath);
	return filebuf.toString('utf8', 0, filebuf.length);
};

var indextxt = getfile('tictactoe.html');

tictactoe(server);
console.log('Tictactoe');

// simple logger
app.use(function (req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

// respond
app.use(function (req, res, next) {
	if (req.method === 'GET') {
		if (req.url === '/') {
			//res.writeHead(200, {'Content-Type': 'text/plain'});
			res.send(indextxt);	
			//res.end('hello, i know nodejitsu\n');
		}
	}
});