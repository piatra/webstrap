'use strict';

var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	, fPaths = require('./lib/files').paths
	, fNames = require('./lib/files').names
	, request = require('request')
	, zip = require('node-native-zip')
	, cheerio = require('cheerio')
	, app = express()
	, less = require('less')
	, parser = new(less.Parser)
	, formidable = require('formidable')
	;

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.locals.pretty = true;
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

var findInObjs = function (ps, t) {
	var r = ps.filter(function (p) { return p.component === t; });
	return r.length;
};

app.get('/', routes.index);

app.get('/request/:filename', routes.request);

app.post('/css', function (req, res){
	var css = req.body.css;
	parser.parse(css, function (e, tree) {
		res.end(tree.toCSS({ compress: true }));
	});
});

app.post('/download', function (req, res) {
	
	var params = JSON.parse(req.body.params);
	var folderStructure = JSON.parse(req.body.folderStructure);

	// rename any files and folders if necesarry
	for(var i in folderStructure) {
		for(var j in fNames) {
			fNames[j] = fNames[j].replace('/'+i, '/' + folderStructure[i]);
		}
	}

	// standard files that get included
	['modernizr', 'start', 'script.js', 'plugins.js', 'main.css'].forEach(function (entry) {
		params.push(entry);
	});

	var archive = new zip();
	var length = params.length;
	var location;

	if(findInObjs(params, 'requirejs') && params.indexOf('main.js') == -1) {
		params.push('main.js');
		fPaths['script.js'] = 'http://localhost:3000/request/script_require.js';
		length += 1;
	}

	if(!findInObjs(params, 'bootstrap') && params.indexOf('normalize') == -1) {
		params.push('normalize');
		length++;
	} else {
		params.push('glyphicons-halflings');
		params.push('glyphicons-halflings-white');
		length += 2;
	}

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

		// request and download all the files
		request(location, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				if(param === 'main.js') {
					body = body.replace('/js/script.js', '/js/' + folderStructure['script.js']);
				}
				if(param === 'h5bp') {
					var $ = cheerio.load(body);
					
					if(findInObjs(params, 'bootstrap')) {
						var bootcss = '<link rel="stylesheet" href="'+fNames['bootstrap']+'">';
						var content = '<div class="container"><div class="hero-unit"><h1>Hello from Webstrap</h1></div></div>';
						$('bootstrap').replaceWith(bootcss);
						$('p').replaceWith(content);
					} else {
						$('bootstrap').replaceWith('<link rel="stylesheet" href="'+fNames.normalize+'">');
					}
					if(findInObjs(params, 'bootstrap-responsive')) {
						$('bootstrap-responsive').replaceWith('<link rel="stylesheet" href="'+fNames['bootstrap-responsive']+'">');
					} else {
						$('bootstrap-responsive').remove();
					}
					if(findInObjs(params, 'requirejs')) {
						$('requirejs').replaceWith('<script data-main="'+fNames['main.js']+'" src="'+fNames.requirejs+'"></script>');
						$('genericscripts').remove();
					} else {
						$('requirejs').remove();
						$('genericscripts')
							.replaceWith('<script src="'+fNames['script.js']+'"></script><script src="'+fNames['plugins.js']+'"></script>');
					}
					if(findInObjs(params, 'backbone')) {
						$('backbone').replaceWith('<script src="'+fNames.backbone+'"></script>');
					} else {
						$('backbone').remove();
					}
					$('maincss')
						.replaceWith('<link rel="stylesheet" href="'+fNames['main.css']+'">');
					if(params.indexOf('modernizr') !== -1) {
						$('modernizr')
							.replaceWith('<script src="'+fNames.modernizr+'"></script>');
					} else {
						$('modernizr').remove();
					}
					body = $.html();
				}
				param = (param.component) ? param.component : param;
				var name = fNames[param] || param;
				console.log(name);
				archive.add(name, new Buffer(body));
				
				if(--length === 0) {
					res.attachment('webstrap.zip');
					res.send(archive.toBuffer());
				}
			} else {
				console.log(error, location);
			}
		});
	});

});

http.createServer(app).listen(3000);