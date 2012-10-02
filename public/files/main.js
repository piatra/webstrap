require.config({
    paths: {},
    shim: {}
});

require([
    '/js/script.js'
], function (Webstrap) {
    var app = new Webstrap();
    console.log(app.hello());
});
