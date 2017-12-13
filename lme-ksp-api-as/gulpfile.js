const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('default', () =>
    gulp.src(['index.js', 'node_modules/**'], { follow: true })
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('dist'))
);