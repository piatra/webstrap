
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	, fPaths = {
		  'h5bp' : 'http://localhost:3000/request/index.html'
		, 'jquery' : 'http://code.jquery.com/jquery-latest.min.js'
		, 'bootstrap' : 'http://localhost:3000/request/bootstrap.css'
		, 'requirejs' : 'http://requirejs.org/docs/release/2.0.6/minified/require.js'
		, 'backbone' : 'http://backbonejs.org/backbone-min.js'
		, 'glyphicons-halflings' : 'http://localhost:3000/request/glyphicons-halflings.png'
		, 'glyphicons-halflings-white' : 'http://localhost:3000/request/glyphicons-halflings-white.png'
	}
	, fNames = {
		  'h5bp' : 'index.html'
		, 'jquery' : '/js/libs/jquery.min.js'
		, 'bootstrap' : '/css/bootstrap.css'
		, 'requirejs' : '/js/libs/require.js'
		, 'backbone' : '/js/libs/backbone-min.js'
		, 'glyphicons-halflings' : '/imgs/glyphicons-halflings.png'
		, 'glyphicons-halflings-white' : '/imgs/glyphicons-halflings-white.png'
	} 
	, request = require('request')
	, zip = require('node-native-zip')
	, cheerio = require('cheerio')
	;

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/request/:filename', routes.request);

app.post('/download', function (req, res) {
	
	var params = JSON.parse(req.body.params);
	params.push('glyphicons-halflings');
	params.push('glyphicons-halflings-white');
	
	var archive = new zip();

	archive.add('/js/scripts.js', new Buffer('// scripts.js'));
	archive.add('/js/plugins.js', new Buffer('// plugins.js'));
	archive.add('/css/style.css', new Buffer('// style.css'));
	
	var length = params.length;

	[].forEach.call(params, function(param) {
		request(fPaths[param], function (error, response, body) {
			if (!error && response.statusCode == 200) {
				if(param === 'h5bp') {
					$ = cheerio.load(body);
					if(params.indexOf('bootstrap') > -1) {
						$('bootstrap').replaceWith('<link rel="stylesheet" href="css/bootstrap.css">')
					}
					if(params.indexOf('requirejs') > -1) {
						$('requirejs').replaceWith('<script src="js/libs/require.js"></script>')
					}
					if(params.indexOf('backbone') > -1) {
						$('backbone').replaceWith('<script src="js/libs/backbone-min.js"></script>')
					}
					body = $.html();
				}
				archive.add(fNames[param], new Buffer(body));
				if(--length == 0) {
					res.attachment('webstrap.zip');
					res.send(archive.toBuffer());
				}
			}
		})
	});

}); 

http.createServer(app).listen(3000);
