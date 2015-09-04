var gulp = require('gulp'),
    jasmine = require('gulp-jasmine-phantom'),
    utils = require('../utils'),
    config = global.config.spec;

module.exports = function(gulp) {
    gulp.task('spec', ['clean-test'], function() {
        var src = utils.findSourceDirectories(config.entryPoint, config.srcdir);

        return gulp.src(src, { base: process.cwd() })
            .pipe(utils.browserify)
            .pipe(utils.moduleAwareRename(config.srcdir, config.outputName))
            .pipe(gulp.dest(config.dest))
            .pipe(jasmine(config.jasmineConfig));
    });
}
