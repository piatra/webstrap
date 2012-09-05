
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
			min : 'http://code.jquery.com/jquery-1.8.1.min.js',
			dev : 'http://code.jquery.com/jquery-1.8.1.js'
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
		, 'script.js' : 'http://localhost:3000/request/script.js'
		, 'plugins.js' : 'http://localhost:3000/request/plugins.js'
		, 'main.css' : 'http://localhost:3000/request/main.css'
	}
	, fNames = {
		  'h5bp' : '/index.html'
		, 'jquery' : '/js/vendor/jquery.js'
		, 'bootstrap' : '/css/bootstrap.css'
		, 'bootstrap-responsive' : '/css/bootstrap-responsive.css'
		, 'requirejs' : '/js/libs/require.js'
		, 'backbone' : '/js/libs/backbone.js'
		, 'glyphicons-halflings' : '/imgs/glyphicons-halflings.png'
		, 'glyphicons-halflings-white' : '/imgs/glyphicons-halflings-white.png'
		, 'modernizr' : '/js/vendor/modernizr-2.6.1.js'
		, 'start' : '/start.sh'
		, 'script.js' : '/js/script.js'
		, 'plugins.js' : '/js/plugins.js'
		, 'main.css' : '/css/main.css'
		, 'normalize' : '/css/normalize.css'
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

var findInObjs = function (ps, t) {
	var r = ps.filter(function (p) { return p.component === t });
	return r.length;
}

app.get('/', routes.index);

app.get('/request/:filename', routes.request);

app.post('/download', function (req, res) {
	
	var params = JSON.parse(req.body.params);
	var folderStructure = JSON.parse(req.body.folderStructure);

	for(var i in folderStructure) {
		for(var j in fNames) {
			fNames[j] = fNames[j].replace('/'+i, '/' + folderStructure[i]);
		}
	}
	['glyphicons-halflings', 'glyphicons-halflings-white', 'modernizr', 'start', 'script.js', 'plugins.js', 'main.css'].forEach(function (entry) {
		params.push(entry);
	});

	var archive = new zip();
	var length = params.length;
	var location;

	[].forEach.call(params, function(param) {
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
						var bootcss = '<link rel="stylesheet" href="'+fNames['bootstrap']+'"><link rel="stylesheet" href="'+fNames['bootstrap-responsive']+'">'
						var content = '<div class="container"><div class="hero-unit"><h1>Hello from Webstrap</h1></div></div>'
						$('bootstrap').replaceWith(bootcss);
						$('div').replaceWith(content);
					} else {
						$('bootstrap').replaceWith('<link rel="stylesheet" href="'+fNames['normalize']+'">');
					}
					if(findInObjs(params, 'requirejs')) {
						$('requirejs').replaceWith('<script src="'+fNames['requirejs']+'"></script>')
					} else {
						$('requirejs').remove();
					}
					if(findInObjs(params, 'backbone')) {
						$('backbone').replaceWith('<script src="'+fNames['backbone']+'"></script>')
					} else {
						$('backbone').remove();
					}
					$('genericscripts')
						.replaceWith('<script src="'+fNames['script.js']+'"></script><script src="'+fNames['plugins.js']+'"></script>');
					$('maincss')
						.replaceWith('<link rel="stylesheet" href="'+fNames['main.css']+'">');
					$('modernizr')
						.replaceWith('<script src="'+fNames['modernizr']+'"></script>');
					body = $.html();
				}
				param = (param.component) ? param.component : param;
				
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