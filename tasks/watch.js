var gulp = require('gulp'),
    config = global.config;

module.exports = function(gulp) {
    gulp.task('watch', function() {
        gulp.watch(config.scripts.watch, ['scripts']);
        gulp.watch(config.spec.watch, ['spec']);
    	gulp.watch(config.it.watch, ['it']);
    	gulp.watch(config.less.watch, ['less']);
    });
}
