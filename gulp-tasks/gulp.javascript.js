// Concatenate and optimize JavaScript

var config = require('../gulp.config.js')();
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat-util');
var templateCache = require('gulp-angular-templatecache');

// All libraries in one file
gulp.task('jsLibs', function () {
    return gulp.src(config.jsLib)
        .pipe(concat('jsLib.js'))
        .pipe(gulp.dest(config.assets + '/js'))
});

gulp.task('angularTemplates', function () {
    return gulp.src("./Content/**/*.html")
        .pipe(templateCache('templates.js', {
            standalone: false,
            module: "PayDayOnlineV1",
            transformUrl: function (url) {
                return url.replace(/journeys/, 'Content/journeys');
            }
        }))
        .pipe(gulp.dest('./public/js'));
});

//config.jsModules
gulp.task('jsModules', function () {
    return gulp.src(config.jsModules)
        .pipe(concat('jsModules.js'))
        .pipe(gulp.dest(config.assets + '/js'))
});

//public/js/templates.js
gulp.task('jsConfig', function () {
    return gulp.src(config.config)
        .pipe(concat('config.js'))
        .pipe(gulp.dest(config.assets + '/js'))
});
//config.js
gulp.task('jsAll', function () {
    return gulp.src(config.js)
        .pipe(concat('js.js'))
        .pipe(gulp.dest(config.assets + '/js'))
});


// Concat application files.
// For AngularJS applications first we need to include modules and just then controllers and services
gulp.task('jsApp', function () {
    return gulp.src([
        config.assets + '/js/jsModules.js',
        // config.assets + '/js/config.js',
        config.assets + '/js/templates.js',
        config.assets + '/js/js.js',
    ])
        .pipe(concat('jsApp.js'))
        .pipe(gulp.dest(config.assets + '/js'))
});


// Task for all JS files in the project
gulp.task('js', gulp.series(
    'jsModules',
    'angularTemplates',
    'jsConfig',
    'jsAll',
    'jsApp',
    'jsLibs'
));