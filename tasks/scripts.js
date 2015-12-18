var $ = require('gulp-load-plugins')(),
    utils = require('../utils'),
    config = global.config.scripts;

module.exports = function(gulp) {
    gulp.task('scripts', [], function() {
        var src = utils.findSourceDirectories(config.entryPoint, config.srcdir);

        return gulp.src(src, { base: process.cwd() })
            .pipe(utils.browserify)
            .pipe(utils.moduleAwareRename(config.srcdir, config.outputName))
            .pipe($.sourcemaps.init({loadMaps: true})) // loads map from browserify file;
            .pipe($.uglify({ mangle: false }))
            .pipe($.sourcemaps.write('./')) // writes .map file
            .pipe(gulp.dest(config.dest));
    });
}
