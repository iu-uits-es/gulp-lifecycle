var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    utils = require('../utils'),
    config = global.config;

// Send a notification when JSRC fails,
// so that you know your changes didn't build
function jscsNotify(file) {
    if (!file.jscs) { return; }
    return file.jscs.success ? false : 'JSRC failed';
}

function createLintTask(taskName, files) {
    gulp.task(taskName, function() {
        return gulp.src(files)
            .pipe($.plumber())
            .pipe($.eslint())
            .pipe($.eslint.format())
            .pipe($.eslint.failOnError())
             //.pipe($.jsxcs())
             //.pipe($.notify(jscsNotify));
    });
}


var types = ['scripts', 'spec', 'it'];
for (var i = 0; i < types.length; i++) {
	var type = types[i];
	var src = utils.findSourceDirectories(config[type].entryPoint, config[type].srcdir);
	createLintTask('lint-' + type, src);
}

gulp.task('lint', ['lint-scripts', 'lint-spec', 'lint-it']);
