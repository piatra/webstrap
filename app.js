
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	, fPaths = {
		  'h5bp' : 'http://localhost:3000/request/index.html'
		, 'jquery' : {
			min : 'http://code.jquery.com/jquery-latest.min.js',
			dev : 'http://code.jquery.com/jquery-latest.js'
		}
		, 'bootstrap' : {
			min : 'http://localhost:3000/request/bootstrap.min.css',
			dev : 'http://localhost:3000/request/bootstrap.css'
		}
		, 'bootstrap-responsive' : {
			min : 'http://localhost:3000/request/bootstrap-responsive.min.css',
			dev : 'http://localhost:3000/request/bootstrap-responsive.css'
		}
		, 'requirejs' : {
			min : 'http://requirejs.org/docs/release/2.0.6/minified/require.js',
			dev : 'http://requirejs.org/docs/release/2.0.6/comments/require.js'
		}
		, 'backbone' : {
			min : 'http://backbonejs.org/backbone-min.js',
			dev: 'http://backbonejs.org/backbone.js'
		}
		, 'glyphicons-halflings' : 'http://localhost:3000/request/glyphicons-halflings.png'
		, 'glyphicons-halflings-white' : 'http://localhost:3000/request/glyphicons-halflings-white.png'
		, 'modernizr' : 'http://localhost:3000/request/modernizr-2.6.1.min.js'
		, 'start' : 'http://localhost:3000/request/start.sh'
	}
	, fNames = {
		  'h5bp' : 'index.html'
		, 'jquery' : '/js/vendor/jquery.js'
		, 'bootstrap' : '/css/bootstrap.css'
		, 'bootstrap-responsive' : '/css/bootstrap-responsive.css'
		, 'requirejs' : '/js/libs/require.js'
		, 'backbone' : '/js/libs/backbone.js'
		, 'glyphicons-halflings' : '/imgs/glyphicons-halflings.png'
		, 'glyphicons-halflings-white' : '/imgs/glyphicons-halflings-white.png'
		, 'modernizr' : '/js/vendor/modernizr-2.6.1.js'
		, 'start' : 'start.sh'
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

var findInObjs = function (arr, t) {
	var value = false;
	arr.map(function(a){
		if(a.component === t) value = true;
		else console.log(a.component, '!==', t);
	})
	return value;
}

app.get('/', routes.index);

app.get('/request/:filename', routes.request);

app.post('/download', function (req, res) {
	
	var params = JSON.parse(req.body.params);
	params.push('glyphicons-halflings');
	params.push('glyphicons-halflings-white');
	params.push('modernizr');
	params.push('start');
	
	var archive = new zip();

	archive.add('/js/script.js', new Buffer('// script.js'));
	archive.add('/js/plugins.js', new Buffer('// plugins.js'));
	archive.add('/css/main.css', new Buffer('// style.css'));
	
	var length = params.length;

	[].forEach.call(params, function(param) {
		var location;
		if(typeof param !== 'string') {
			if(param.minified) {
				location = fPaths[param.component].min;
			} else {
				location = fPaths[param.component].dev;
			}
		} else {
			location = fPaths[param];
		}

		request(location, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				if(param === 'h5bp') {
					$ = cheerio.load(body);
					if(findInObjs(params, 'bootstrap')) {
						$('bootstrap').replaceWith('<link rel="stylesheet" href="css/bootstrap.css">')
						var content = '<div class="container"><div class="hero-unit"><h1>Hello from Webstrap</h1></div></div>'
						$('div').replaceWith(content);
					} else {
						$('bootstrap').replaceWith('<link rel="stylesheet" href="css/normalize.css">');
					}
					if(findInObjs(params, 'requirejs')) {
						$('requirejs').replaceWith('<script src="js/libs/require.js"></script>')
					} else {
						$('requirejs').remove();
					}
					if(findInObjs(params, 'backbone')) {
						console.log('replaceing backbone');
						$('backbone').replaceWith('<script src="js/libs/backbone.js"></script>')
						console.log($.html());
					} else {
						$('backbone').remove();
					}
					body = $.html();
				}
				param = (param.component) ? param.component : param;
				console.log(fNames[param], param);
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
