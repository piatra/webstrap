var download = document.querySelector('#download');

var notify = function (component) {
	$('#description').load('../files/description/' + component + '.html');
}

$('li').on('hover', function (){
	notify($(this).children('input').attr('id'));
});

var downloadWebstrap = function () {
	
	var inputs = document.querySelectorAll('input[type="checkbox"]:checked');
	var params = [];

	[].map.call(inputs, function (input) {
		params.push(input.id);
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
