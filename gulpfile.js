//Plugins Require
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var minifyHTML = require("gulp-minify-html-2");
var sass = require('gulp-sass');

//Convert SCSS into CSS
gulp.task('convert-scss', function () {
    return gulp.src('./source/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

//Minify CSS Converted Files
gulp.task('minify-css', ['convert-scss'], function () {
    return gulp.src('./dist/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'));
});

//Minify HTML
gulp.task('minify-html', function () {
    var opts = {comments: true, spare: true};
    return gulp.src('./source/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./dist'));
});

//Watch function
gulp.task('background', function () {
    gulp.watch('./source/scss/*.scss', ['minify-css']);
    gulp.watch('./source/*.html', ['minify-html']);
});