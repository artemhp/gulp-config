/// <binding BeforeBuild='build' />

var gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('./gulp-tasks');

// Shared Tasks
gulp.task('common', gulp.series('clean', 'styles', 'fonts'));
gulp.task('jsDev', gulp.series('jsLibs', 'buildLayoutDev', 'devConfig'));

// Tasks
gulp.task('default', gulp.series('common', 'js', 'buildLayout'));
gulp.task('build', gulp.series('common', 'jsDev', 'localConfig'));
gulp.task('dev', gulp.series('common', 'jsDev', 'devConfig'));
gulp.task('local', gulp.series('common', 'jsDev', 'localConfig'));

// Watchers
// gulp.task('watch:z', function () {return gulp.watch('./less/**/*.less', gulp.series('styles'));});
 gulp.task('watch:css', function () {return gulp.watch('./Content/less/**/*.less', gulp.series('stylesProject'));});
// gulp.task('watch:html', function () {return gulp.watch('./index-template.html', gulp.series('buildLayoutDev'));});