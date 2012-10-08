'use strict';

var download = document.querySelector('#download');
var fileInputs = document.querySelectorAll('span[contentEditable]');

[].forEach.call(fileInputs, function(input){
	input.addEventListener('keydown', function(e) {
		if(e.keyCode === 13) {
			e.preventDefault();
			return false;
		}
	}, false);
});

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
			newStructure[entry.id] = value
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

	// $.ajax({
	// 	  type: 'POST'
	// 	, url : '/download'
	// 	, dataType : 'jsonpi'
	// 	, params : {
	// 		params : JSON.stringify(params),
	// 		folderStructure : JSON.stringify(newStructure)
	// 	}
	// });
};

download.addEventListener('click', downloadWebstrap, false);