var gulp = require('gulp'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    babelify = require('babelify'),
    $ = require('gulp-load-plugins')();

gulp.task('scripts', ['clean-scripts'], function() {
    //// vinyl-transform https://medium.com/@sogko/gulp-browserify-the-gulp-y-way-bb359b3f9623
    var browserified = transform(function(filename) {
        var browsifyInstance = browserify(config.src);
        browsifyInstance.transform(babelify.configure({ignore: 'node_modules'}))
        return browsifyInstance.bundle();
    });

    return gulp.src(config.src)
        .pipe(browserified)
        .pipe($.rename(config.outputName))
        .pipe($.sourcemaps.init({loadMaps: true})) // loads map from browserify file;
        .pipe($.uglify({ mangle: false }))
        .pipe($.sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest(config.dest));
});
