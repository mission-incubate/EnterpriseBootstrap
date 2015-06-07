var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    //minifyCSS = require('gulp-minify-css'),
    //rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    http = require('http'),
    st = require('st'),
    livereload = require('gulp-livereload');

var Log = require('log'),
    log = new Log('info');

var gulpPaths = {
    sass: './bootstrap-sass/assets/stylesheets/',
    cssDist: './build/'
}

gulp.task('sassCompile', function () {
    //gulp.src(gulpPaths.sass + '**/*.scss')
    log.info(gulpPaths.sass);
    gulp.src([
        gulpPaths.sass + 'bootstrap.scss', 
        gulpPaths.sass + 'enterprise.scss'
    ])
    .pipe(sass())
    .pipe(gulp.dest(gulpPaths.cssDist))
    //.pipe(concat(gulpPaths.cssDist + 'main.css'))
    //.pipe(gulp.dest('./'))
    //.pipe(minifyCSS())
    //.pipe(rename('main.min.css'))
    //.pipe(gulp.dest(gulpPaths.cssDist))
    .pipe(livereload());
});

gulp.task('watch', ['server'], function () {
    livereload.listen({ start: true });
    gulp.watch(['./bootstrap-sass/assets/stylesheets/**/*.scss'], ['sassCompile']);
    //gulp.watch(['*.html'], []);
});

gulp.task('server', function (done) {
    http.createServer(
        st({ path: __dirname + '/', index: 'index.html', cache: false })
    ).listen(8090, done);
});

gulp.task('default', ['sassCompile']);