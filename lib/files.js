var port = process.env.PORT || 3000;

var paths = {
		  'index.html' : 'http://webstrap.herokuapps.com/request/index.html'
		, 'jquery' : {
			min : 'http://code.jquery.com/jquery-1.8.3.min.js',
			dev : 'http://code.jquery.com/jquery-1.8.3.js'
		}
		, 'bootstrap' : {
			min : 'http://webstrap.herokuapps.com/request/bootstrap.min.css',
			dev : 'http://webstrap.herokuapps.com/request/bootstrap.css'
		}
		, 'bootstrap-responsive' : {
			min : 'http://webstrap.herokuapps.com/request/bootstrap-responsive.min.css',
			dev : 'http://webstrap.herokuapps.com/request/bootstrap-responsive.css'
		}
		, 'requirejs' : {
			min : 'http://requirejs.org/docs/release/2.1.2/minified/require.js',
			dev : 'http://requirejs.org/docs/release/2.1.2/comments/require.js'
		}
		, 'backbone' : {
			min : 'http://backbonejs.org/backbone-min.js',
			dev: 'http://backbonejs.org/backbone.js'
		}
		, 'glyphicons-halflings' : 'http://webstrap.herokuapps.com/request/glyphicons-halflings.png'
		, 'glyphicons-halflings-white' : 'http://webstrap.herokuapps.com/request/glyphicons-halflings-white.png'
		, 'modernizr' : 'http://webstrap.herokuapps.com/request/modernizr-2.6.1.min.js'
		, 'start' : 'http://webstrap.herokuapps.com/request/start.sh'
		, 'script.js' : 'http://webstrap.herokuapps.com/request/script.js'
		, 'plugins.js' : 'http://webstrap.herokuapps.com/request/plugins.js'
		, 'main.css' : 'http://webstrap.herokuapps.com/request/main.css'
		, '404.html' : 'http://webstrap.herokuapps.com/request/404.html'
		, 'robots.txt' : 'http://webstrap.herokuapps.com/request/robots.txt'
		, 'humans.txt' : 'http://webstrap.herokuapps.com/request/humans.txt'
		, 'main.js' : 'http://webstrap.herokuapps.com/request/main.js'
		, 'normalize' : 'http://webstrap.herokuapps.com/request/normalize.css'
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