var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean-css');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var url = require('url');
var { readFileSync } = require('fs');
var path = require('path')
    // var data = require('./src/data/data.json')
gulp.task('sass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
})

gulp.task('server', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 8080,
            // middleware: (req, res, next) => {
            //     var pathname = url.parse(req.url).pathname;
            //     if (pathname === '/favicon.ico') {
            //         res.end('')
            //     }
            //     if (pathname === 'info/list') {
            //         pathname = pathname === '/' ? 'index.html' : pathname
            //         res.end({ code: 1, data: data })
            //     } else {
            //         res.end(readFileSync(path.join(__dirname, 'src', pathname)))
            //     }
            // }
        }))
})

gulp.task('dev', gulp.series('sass', 'server', 'watch'))


gulp.task('coyJS', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('coyCss', function() {
    return gulp.src('./src/css/**/*.css')
        .pipe(clean())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('build', gulp.parallel('coyJS', 'coyCss'))