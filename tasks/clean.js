var del = require('del'),
	config = global.config.clean;

module.exports = function(gulp) {
    gulp.task('clean-scripts', function(cb) {
        del(config.scripts, cb);
    });

    gulp.task('clean-test', function(cb) {
        del(config.spec, cb);
    });

    gulp.task('clean-less', function(cb) {
        del(config.less, cb);
    });
}
