var $ = require('gulp-load-plugins')(),
    browserify = require('browserify'),
    babelify = require('babelify'),
    es2015 = require('babel-preset-es2015'),
    react = require('babel-preset-react'),
    stage0 = require('babel-preset-stage-0'),
    through2 = require('through2'),
    utils = require('../utils'),
    config = global.config.scripts;

module.exports = function(gulp) {
    gulp.task('scripts', ['clean-scripts'], function() {
        var src = utils.findSourceDirectories(config.entryPoint, config.srcdir);

        return gulp.src(src, { base: process.cwd() })
            .pipe(through2.obj(function(file, enc, next) {
                browserify(file.path)
                    .transform(babelify.configure({ignore: 'node_modules', presets: [es2015, react, stage0]}))
                    .bundle(function (err, result) {
                      if(err) {
                          console.error(err.message);
                          file.contents = null;
                          next(null, files);
                      } else {
                          file.contents = result;
                          next(null, file);
                      }
                  })
            }))
            .pipe(utils.moduleAwareRename(config.srcdir, config.outputName))
            .pipe($.sourcemaps.init({loadMaps: true})) // loads map from browserify file;
            .pipe($.uglify({ mangle: false }))
            .pipe($.sourcemaps.write('./')) // writes .map file
            .pipe(gulp.dest(config.dest));
    });
}
