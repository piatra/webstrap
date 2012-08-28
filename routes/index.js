
/*
 * GET home page.
 */

 var fs = require('fs')
 	, path = require('path')
 	;

exports.index = function(req, res){
	res.render('index', { title: 'Webstrap' });
};

exports.request = function(req, res){
	var   file = req.params.filename
		, rStream = fs.createReadStream(path.join(__dirname, '../', 'public/files/' + file))
		;
	rStream.on('error', function (err) {
		console.log(err);
		res.end();
	})

	rStream.pipe(res);
};