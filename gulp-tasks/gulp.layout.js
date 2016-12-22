var config = require('../gulp.config.js')();
var gulp = require('gulp');
var concat = require('gulp-concat-util');
var htmlreplace = require('gulp-html-replace');

var appJS = [];
function backSlashes(file) {
    return file.relative.replace(/\\/g, "/")
}

gulp.task('combineLocalFiles', function () {
    return gulp.src(config.js)
        .on('data', function (file) {
            appJS.push(config.root + backSlashes(file));
        })
});

gulp.task('combineLocalFilesModules', function () {
    return gulp.src(config.jsModules)
        .on('data', function (file) {
            appJS.push(config.root + backSlashes(file));
        })
});

gulp.task('insertInHTML', function () {
    return gulp.src('index-template.html')
        .pipe(htmlreplace({'js': appJS}))
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./'));
});

gulp.task('buildLayout', gulp.series(function () {
    return gulp.src('index-template.html')
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./'));
}));

gulp.task('buildLayoutDev', gulp.series(
    'combineLocalFilesModules',
    'combineLocalFiles',
    'removeLayout',
    'insertInHTML'
));