/**
 * Gulp tool to create the min css file bundle
 */
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const importCss = require('gulp-import-css');
const concatCss = require('gulp-concat-css');
gulp.task('default', function() {
    return gulp.src([
        'node_modules/pace-progress/themes/black/pace-theme-flash.css',
        'node_modules/font-awesome/css/font-awesome.min.css',
        'node_modules/ionicons/dist/css/ionicons.css',
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/gitgraph.js/build/gitgraph.css',
   /*     'angular-demo/AdminLTE.min.css',*/
    ])
        .pipe(importCss())
        .pipe(concatCss("bundle.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./angular-demo/'))
});
gulp.start('default')