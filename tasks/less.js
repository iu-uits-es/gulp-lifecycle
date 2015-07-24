var gulp = require('gulp'),
	csswring = require('csswring'),
    $ = require('gulp-load-plugins')(),
    utils = require('../utils'),
    config = global.config.less;

gulp.task('less', ['clean-less'], function() {
    var src = utils.findSourceDirectories(config.entryPoint, config.srcdir);
    return gulp.src(src)
        .pipe(utils.moduleAwareRename(config.srcdir, config.outputName))
        .pipe($.less())
        .pipe($.sourcemaps.init())
        .pipe($.if('**/*.css', $.postcss([csswring])))
        .pipe($.sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest(config.dest));
});
