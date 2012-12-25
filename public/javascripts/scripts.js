'use strict';

var download = document.querySelector('#download');
var fileInputs = document.querySelectorAll('span[contentEditable]');
var minify = document.querySelectorAll('.minify');

[].forEach.call(fileInputs, function(input){
	input.addEventListener('keydown', function(e) {
		if(e.keyCode === 13) {
			e.preventDefault();
			return false;
		}
	}, false);
});


var createModal = function (css, min, name) {
	var modal = $('<div>').addClass('modal').appendTo('body');
	var blob = new Blob([min], {type: 'text/css'});
    

	modal.append('<div class="modal-header"><h2>Minified output <a href="" download="'+name+'.min.css" class="btn btn-info">Download</a></h2></div>');
	modal.append('<div class="modal-body"><div class="container"></div></div>');
    
    document.querySelector('.modal-header a').href = window.URL.createObjectURL(blob);

	var container = $('.container', modal);
	container.append('<div class="span6"><pre><code>'+css+'</code></pre></div>');
	container.append('<div class="span6"><pre><code>'+min+'</code></pre></div>');
};


[].forEach.call(minify, function(el){
	el.addEventListener('change', readSingleFile, false);
});

function readSingleFile(evt) {
	var f = evt.target.files[0];
	var button = this;
	console.log('change');
	if (f) {
		var r = new FileReader();
		r.onload = function(e) {
			var contents = e.target.result;
			var path = button.dataset.file;
			var jqxhr = $.post('/' + path, { file: contents },function() {
				console.log('sent');
			}).success(function(data){
				createModal(contents, data, f.name.split('.')[0]);
			}).error(function(data){
				console.error(data);
			});
		};
		r.readAsText(f);
	} else {
		console.error('Failed to load file');
	}
}

var downloadWebstrap = function () {
	
	var inputs = document.querySelectorAll('input[type="checkbox"]:checked');
	var folderStructure = document.querySelectorAll('span[contentEditable]');


	var params = [];
	var value = false;
	var newStructure = {};

	[].map.call(folderStructure, function (entry) {
		if(entry.id !== entry.innerHTML.trim()) {
			var value = entry.innerHTML.trim();
			value = value.replace('<br>', '');
			console.log(value);
			newStructure[entry.id] = value;
		}
	});
	
	[].map.call(inputs, function (input) {
		if(input.id) {
			var min = $(input).parents('li').find('.extra input');
			if(min.length) {
				value = min.is(':checked');
				params.push({component : input.id, minified : value});
			} else {
				params.push(input.id);
			}
		}
	});
	console.log(newStructure);
	$.ajax({
		  type: 'POST'
		, url : '/download'
		, dataType : 'jsonpi'
		, params : {
			params : JSON.stringify(params),
			folderStructure : JSON.stringify(newStructure)
		}
	});
};

download.addEventListener('click', downloadWebstrap, false);