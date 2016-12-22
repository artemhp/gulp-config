// Generate styles with LESS preprocessor

var config = require('../gulp.config.js')();
var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('styles', function () {
    return gulp.src(config.less)
        .pipe(less())
        .pipe(gulp.dest(config.assets + '/css'))
});
//
gulp.task('stylesProject', function () {
    return gulp.src(config.less[0])
        .pipe(less())
        .pipe(gulp.dest(config.assets + '/css'))
});