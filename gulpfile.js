let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let concat = require('gulp-concat');
let uglify = require ('gulp-uglify-es').default;

// CSS minifying function from css/styles.css to dist/css/styles.css 
gulp.task('minify-css', () => {
    return gulp.src('css/styles.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist/css/'));
});

// CSS watcher
gulp.task('css-min-watcher', ()=> {
    return gulp.watch('css/*.css', gulp.task('minify-css'));
})

// JavaScript combining and minifying task moves from js/ to dist/js/
gulp.task('js-min', () => {
    return gulp.src('js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
})

// JavaScript watcher
gulp.task('js-min-watcher', ()=> {
    return gulp.watch('js/*.js', gulp.task('js-min'));
})

// default gulp task for on-demand compilation
gulp.task('default', gulp.parallel('css-min-watcher'));

// watch task to turn on the watcher to automate compilation when changes are made
gulp.task('watch',gulp.parallel('css-min-watcher','js-min-watcher'));