var config = require('../gulp.config.js')();
var gulp = require('gulp');
var replace = require('gulp-replace');
var concat = require('gulp-concat-util');

// Generate config.js with URL from development environment like:
// http://adelantos-srv1.kiev.zoral.com.ua:8280
// Will be used in devConfig task

function createConfig(env, index) {
    console.log(new RegExp(config.configPattern['regex'][index], "g"));
    console.log(config.configPattern['value'][env][index]);
    return replace(
        new RegExp(config.configPattern['regex'][index], "g"),
        config.configPattern['value'][env][index]
    )
}

gulp.task('createConfigForDev', function () {
    return gulp.src([config.config])
        .pipe(createConfig('dev', 0))
        .pipe(gulp.dest('./public/js'));
});

// Generate config.js with URL from local environment like:
// http://localhost:1092

gulp.task('createConfigForLocal', function () {
    return gulp.src([config.config])
        .pipe(createConfig('local', 0))
        .pipe(gulp.dest('./public/js'));
});

// Put generated file in layout (index.html)

gulp.task('replaceConfigToDev', gulp.series(function insertInHTML() {
    return gulp.src('index.html')
        .pipe(replace(/app\/config\.js/g, 'public/js/config.js'))
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./'));
}));

// Generate config with tasks
gulp.task('devConfig', gulp.series('createConfigForDev', 'replaceConfigToDev'));
gulp.task('localConfig', gulp.series('createConfigForLocal', 'replaceConfigToDev'));