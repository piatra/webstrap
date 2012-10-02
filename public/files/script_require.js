define(function () {
	var Webstrap = function () {
		var sayHello = function () {
			return 'Hello from Webstrap';
		};

		return {
			hello: sayHello
		};
	};

	return Webstrap;
});