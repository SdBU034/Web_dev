var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var bs = require('browser-sync').create();
var sass = require('gulp-sass');

var path = {
    'css': './src/css/**/',
    'js': './src/js/',
    'images': './src/images/',
    'css_dist': './dist/css/',
    'js_dist': './dist/js/',
    'images_dist': './dist/images/',
    'html': './templates/**/'
};


gulp.task('css', function (done) {
    gulp.src(path.css + '*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(rename({'suffix': '.min'}))
        .pipe(gulp.dest(path.css_dist));
    done();
});

gulp.task('js', function (done) {
    gulp.src(path.js + '*.js')
        .pipe(uglify())
        .pipe(rename({'suffix': '.min'}))
        .pipe(gulp.dest(path.js_dist));
    done();
});

gulp.task('images', function (done) {
   gulp.src(path.images + '*.*')
       .pipe(imagemin())
       .pipe(gulp.dest(path.images_dist));
   done();
});

gulp.task('html', function (done) {
    gulp.src(path.html + '*.html');
    done();
});

gulp.task('reload', function(done){
    bs.reload();
    done();
});

gulp.task('default', function(done) {
    bs.init({
        port:3000,
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(path.css + '*.scss',gulp.series('css','reload'));
    gulp.watch(path.js + '*.js',gulp.series('js','reload'));
    gulp.watch(path.images + '*.*',gulp.series('images','reload'));
    gulp.watch(path.html + '*.html',gulp.series('html','reload'));
    done();
});
