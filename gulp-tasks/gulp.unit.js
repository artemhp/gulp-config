var config = require('../gulp.config.js')();
var gulp = require('gulp');
var concat = require('gulp-concat-util');
var htmlreplace = require('gulp-html-replace');
var del = require('del');

// ------------------------------------------------------------
// JavaScript Unit Testing
// ------------------------------------------------------------

gulp.task('jsTestSpec', function () {
    return gulp.src(config.z.js.src.spec)
        .pipe(concat(config.z.js.dest.spec))
        .pipe(gulp.dest(config.dest.js))
});

gulp.task('jsTestApp', function () {
    return gulp.src(config.z.js.src.appTest)
        .pipe(concat(config.z.js.dest.appTest))
        .pipe(uglify())
        .pipe(gulp.dest(config.dest.js))
});

// ------------------------------------------------------------
// SpecRunner Generation (Development)
// ------------------------------------------------------------


gulp.task('combineLocalFilesTest', function () {
    return gulp.src(config.z.js.src.appTest)
        .on('data', function (file) {
            config.jsApp.push('../app/' + file.relative.replace(/\\/g, "/"));
        })
});

gulp.task('combineLocalFilesTestSpec', function () {
    return gulp.src(config.z.js.src.spec)
        .on('data', function (file) {
            config.appTestSpec.push('../app/' + file.relative.replace(/\\/g, "/"));
        })
});

gulp.task('buildSpecHTML', gulp.series('combineLocalFilesTest', 'combineLocalFilesTestSpec', function removeLayout() {
    return del(config.src.specRunner + 'SpecRunner.html', {force: true});
}, function insertInHTML() {
    return gulp.src(config.src.specRunner + 'SpecRunner-template.html')
        .pipe(htmlreplace({
            'js': config.jsApp,
            'spec': config.appTestSpec
        }))
        .pipe(concat('SpecRunner.html'))
        .pipe(gulp.dest(config.src.specRunner));
}));