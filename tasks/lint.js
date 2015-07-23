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
	console.log(src);
	createLintTask('lint-'+type, src);	
}


// Lint our source code
// var src = utils.findSourceDirectories(config.scripts.entryPoint, config.srcdir);
// createLintTask('lint-src', src);

// Lint our test code
//createLintTask('lint-spec', [config.spec.src]);

// Lint our test code
//createLintTask('lint-it', [config.it.src]);

//gulp.task('lint', ['lint-src', 'lint-spec', 'lint-it']);
gulp.task('lint', ['lint-src']);