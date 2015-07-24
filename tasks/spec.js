var gulp = require('gulp'),
    jasmine = require('gulp-jasmine-phantom'),
    utils = require('../utils'),
    config = global.config.spec;

gulp.task('spec', ['clean-test'], function() {
    var src = utils.findSourceDirectories(config.entryPoint, config.srcdir);

    return gulp.src(src)
        .pipe(utils.browserify)
        .pipe(utils.moduleAwareRename(config.srcdir, config.outputName))
        .pipe(gulp.dest(config.dest))
        .pipe(jasmine(config.jasmineConfig));
});
