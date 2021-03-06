var path = require('path');
// var Q = require('q');
// var es = require('event-stream');

var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
// var zip = require('gulp-zip');


var paths = {
    ext: [
        'ext/bluebird.min.js',
        'ext/FileSaver.min.js',
        'ext/pngcrush.min.fixed.js',
        'ext/require.min.nw.js',
        'ext/requirejs-text.node.min.js',
        'ext/web-animations.min.js',

        'ext/dustjs-linkedin/dist/dust-full.min.js',
        'ext/fire-core/core.min.js',
        'ext/fire-editor-ui/**/*',
        'ext/fontawesome/css/font-awesome.css',
        'ext/fontawesome/fonts/fontawesome-webfont.woff',
        'ext/jszip/dist/jszip.min.js',
        'ext/mousetrap/mousetrap.min.js',
        'ext/paper/dist/paper-core.min.js',
        'ext/platform/platform.js',
        'ext/polymer/layout.html',
        'ext/polymer/polymer.html',
        'ext/polymer/polymer.js',
    ],
    exporter: 'exporters/**/*',
    bin: [
        'bin/**/*',
        '!bin/app/*.js',
        '!bin/app/elements/',
        '!bin/app/elements/**/*',
    ],
    as: [
        'main.js',
        'index.html',
        'package.json',
    ],
    nw: [
        'index.html',
        'package.json',
    ],
    web: [
        'index.html',
        'favicon.ico',
    ],

    output: 'publish/',
    output_as: 'publish/as',
    output_nw: 'publish/nw',
    output_web: 'publish/web',
};

// clean
gulp.task('clean', function() {
    return gulp.src(paths.output + '*', {read: false})
           .pipe(clean())
           ;
});

// publish
gulp.task('build-nw', function () {
    var src = [].concat(
        paths.ext,
        paths.exporter,
        paths.bin,
        paths.nw
    );
    return gulp.src(src, { base: './'})
           .pipe(gulp.dest(paths.output_nw))
           ;
    //return gulp.src('src/*')
    //.pipe(zip('archive.zip'));
});

gulp.task('build-as', function () {
    var src = [].concat(
        paths.ext,
        paths.exporter,
        paths.bin,
        paths.as
    );
    return gulp.src(src, { base: './'})
           .pipe(gulp.dest(paths.output_as))
           ;
});

gulp.task('build-web', function () {
    var src = [].concat(
        paths.ext,
        paths.exporter,
        paths.bin,
        paths.web
    );
    return gulp.src(src, { base: './'})
           .pipe(gulp.dest(paths.output_web))
           ;
});

/////////////////////////////////////////////////////////////////////////////
// tasks
/////////////////////////////////////////////////////////////////////////////

// short commands
gulp.task('default', ['build-as', 'build-web' ] );
