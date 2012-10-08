var paths = {
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
			min : 'http://localhost:3000/request/require.min.js',
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
		, '404.html' : 'http://localhost:3000/request/404.html'
		, 'robots.txt' : 'http://localhost:3000/request/robots.txt'
		, 'humans.txt' : 'http://localhost:3000/request/humans.txt'
		, 'main.js' : 'http://localhost:3000/request/main.js'
		, 'normalize' : 'http://localhost:3000/request/normalize.css'
	};

var names = {
		  'h5bp' : 'index.html'
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