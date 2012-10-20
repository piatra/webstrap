var td = document.querySelectorAll('tr td');
[].forEach.call(td, function(el){
	'use strict';
	if(el.innerHTML[0] === '[') {
		var data = JSON.parse(el.innerHTML);
		var content = [];
		for (var i = data.length - 1; i >= 0; i--) {
			if(typeof data[i] === 'object') {
				content.push(data[i].component);
			} else {
				content.push(data[i]);
			}
		}
		el.innerHTML = content.join(', ');
	}
});