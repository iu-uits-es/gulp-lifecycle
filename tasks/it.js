var jasmine = require('iu-gulp-jasmine-phantom'),
    utils = require('../utils'),
    config = global.config.it;

module.exports = function(gulp) {
    gulp.task('it', ['clean-test'], function() {
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
