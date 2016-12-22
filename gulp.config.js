module.exports = function () {
    var bower = "./bower_components/";
    var styles = "./less/";
    return {
        root: 'app/',
        assets: 'public',
        index: 'index.html',
        fontsSrc: 'app/fonts/*.*',
        configPattern: {
            'regex': [
                "(PublicApi:) \'#\{PublicApiEndpoint\}\'"
            ],
            'value': {
                'dev': [
                    "$1\'http://google.com:3000\'",
                ],
                'local': [
                    "$1\'http://localhost:1092\'"
                ]
            }
        },
        jsModules: ['Content/journeys/PayDayOnlineV1/PayDayOnlineV1.js'],
        js: ['app/**/*.js', '!app/module.js', '!app/config.js'],
        jsLib: [
            bower + "angular/angular.js",
            bower + "angular-sanitize/angular-sanitize.js",
            bower + "angular-resource/angular-resource.js",
            bower + "angular-cookies/angular-cookies.js",
            bower + "angular-bootstrap/ui-bootstrap.js",
            bower + "angular-bootstrap/ui-bootstrap-tpls.js",
            bower + "angularjs-slider/dist/rzslider.js",
            bower + "angular-ui-mask/dist/mask.js",
            bower + "angular-translate/angular-translate.js",
            bower + "angular-translate-storage-cookie/angular-translate-storage-cookie.js",
            bower + "angular-recaptcha/release/angular-recaptcha.js",
            bower + "angular-local-storage/dist/angular-local-storage.js",
            bower + "logToServer.js/logToServer.js",
            bower + "jquery/dist/jquery.js"
        ],
        config: 'app/config.js',
        less: [
            'less/app.less'
        ]
    };
};