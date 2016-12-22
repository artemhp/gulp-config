// Copy fonts from dev environment to assets

var config = require('../gulp.config.js')();
var gulp = require('gulp');

gulp.task('fonts', function () {
    return gulp.src(config.fontsSrc)
        .pipe(gulp.dest(config.assets + '/fonts'))
});