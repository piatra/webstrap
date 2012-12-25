var port = process.env.PORT || '3000';

var paths = {
		  'index.html' : 'http://localhost:'+port+'/request/index.html'
		, 'jquery' : {
			min : 'http://code.jquery.com/jquery-1.8.3.min.js',
			dev : 'http://code.jquery.com/jquery-1.8.3.js'
		}
		, 'bootstrap' : {
			min : 'http://localhost:'+port+'/request/bootstrap.min.css',
			dev : 'http://localhost:'+port+'/request/bootstrap.css'
		}
		, 'bootstrap-responsive' : {
			min : 'http://localhost:'+port+'/request/bootstrap-responsive.min.css',
			dev : 'http://localhost:'+port+'/request/bootstrap-responsive.css'
		}
		, 'requirejs' : {
			min : 'http://requirejs.org/docs/release/2.1.2/minified/require.js',
			dev : 'http://requirejs.org/docs/release/2.1.2/comments/require.js'
		}
		, 'backbone' : {
			min : 'http://backbonejs.org/backbone-min.js',
			dev: 'http://backbonejs.org/backbone.js'
		}
		, 'glyphicons-halflings' : 'http://localhost:'+port+'/request/glyphicons-halflings.png'
		, 'glyphicons-halflings-white' : 'http://localhost:'+port+'/request/glyphicons-halflings-white.png'
		, 'modernizr' : 'http://localhost:'+port+'/request/modernizr-2.6.1.min.js'
		, 'start' : 'http://localhost:'+port+'/request/start.sh'
		, 'script.js' : 'http://localhost:'+port+'/request/script.js'
		, 'plugins.js' : 'http://localhost:'+port+'/request/plugins.js'
		, 'main.css' : 'http://localhost:'+port+'/request/main.css'
		, '404.html' : 'http://localhost:'+port+'/request/404.html'
		, 'robots.txt' : 'http://localhost:'+port+'/request/robots.txt'
		, 'humans.txt' : 'http://localhost:'+port+'/request/humans.txt'
		, 'main.js' : 'http://localhost:'+port+'/request/main.js'
		, 'normalize' : 'http://localhost:'+port+'/request/normalize.css'
	};

var names = {
		  'index.html' : 'index.html'
		, 'jquery' : 'js/vendor/jquery.js'
		, 'bootstrap' : 'css/bootstrap.css'
		, 'bootstrap-responsive' : 'css/bootstrap-responsive.css'
		, 'requirejs' : 'js/libs/require.js'
		, 'backbone' : 'js/libs/backbone.js'
		, 'glyphicons-halflings' : 'imgs/glyphicons-halflings.png'
		, 'glyphicons-halflings-white' : 'imgs/glyphicons-halflings-white.png'
		, 'modernizr' : 'js/vendor/modernizr-2.6.1.js'
		, 'start' : 'start.sh'
		, 'script.js' : 'js/script.js'
		, 'plugins.js' : 'js/plugins.js'
		, 'main.css' : 'css/main.css'
		, 'normalize' : 'css/normalize.css'
		, '404.html' : '404.html'
		, 'robots.txt' : 'robots.txt'
		, 'humans.txt' : 'humans.txt'
		, 'main.js' : 'js/main.js'
	};

module.exports.names = names;
module.exports.paths = paths;
module.exports.port  = port;