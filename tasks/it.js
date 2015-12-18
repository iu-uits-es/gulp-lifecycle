var jasmine = require('iu-gulp-jasmine-phantom'),
    utils = require('../utils'),
    config = global.config.it;

module.exports = function(gulp) {
    gulp.task('it', ['clean-test'], function() {
        var src = utils.findSourceDirectories(config.entryPoint, config.srcdir);

        return gulp.src(src, { base: process.cwd() })
            .pipe(utils.browserify)
            .pipe(utils.moduleAwareRename(config.srcdir, config.outputName))
            .pipe(gulp.dest(config.dest))
            .pipe(jasmine(config.jasmineConfig));
    });
}
