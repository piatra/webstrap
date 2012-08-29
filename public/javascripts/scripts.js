var download = document.querySelector('#download');

var downloadWebstrap = function () {
	
	var inputs = document.querySelectorAll('input[type="checkbox"]:checked');
	var params = [];
	var value = false;
	
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

	$.ajax({
		  type: 'POST'
		, url : '/download'
		, dataType : 'jsonpi'
		, params : {
			params : JSON.stringify(params)
		}
	})
}

download.addEventListener('click', downloadWebstrap, false);
