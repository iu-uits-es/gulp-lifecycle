var gulp = require('gulp'),
    jasmine = require('iu-gulp-jasmine-phantom'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    es2015 = require('babel-preset-es2015'),
    react = require('babel-preset-react'),
    stage0 = require('babel-preset-stage-0'),
    through2 = require('through2'),
    utils = require('../utils'),
    config = global.config.spec;

module.exports = function(gulp) {
    gulp.task('spec', ['clean-test'], function() {
        var src = utils.findSourceDirectories(config.entryPoint, config.srcdir);

        return gulp.src(src, { base: process.cwd() })
            .pipe(through2.obj(function(file, enc, next) {
                browserify(file.path)
                    .transform(babelify.configure({ignore: 'node_modules', presets: [es2015, react, stage0]}))
                  .bundle(function (err, result) {
                      if(err) {
                          console.error(err.message);
                          file.contents = null;
                          next(null, file);
                      } else {
                          file.contents = result;
                          next(null, file);
                      }
                  })
            }))
            .pipe(utils.moduleAwareRename(config.srcdir, config.outputName))
            .pipe(gulp.dest(config.dest))
            .pipe(jasmine(config.jasmineConfig));
    });
}
