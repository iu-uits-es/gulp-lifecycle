var gulp = require('gulp'),
    jasmine = require('iu-gulp-jasmine-phantom'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    babelify = require('babelify'),
    path = require('path'),
    rename = require('gulp-rename'),
    es2015 = require('babel-preset-es2015'),
    react = require('babel-preset-react'),
    through2 = require('through2'),
    utils = require('../utils'),
    config = global.config.spec;

module.exports = function(gulp) {
    gulp.task('spec', ['clean-test'], function() {
        var src = utils.findSourceDirectories(config.entryPoint, config.srcdir);

        return gulp.src(src, { base: process.cwd() })
            .pipe(through2.obj(function(file, enc, next) {
                browserify(file.path)
                  .transform(babelify.configure({ignore: 'node_modules', presets: [es2015, react]}))
                  .bundle(function (err, result) {
                      file.contents = result;
                      next(null, file);
                  })
            }))
            .pipe(utils.moduleAwareRename(config.srcdir, config.outputName))
            .pipe(gulp.dest(config.dest))
            .pipe(jasmine(config.jasmineConfig));
    });
}
