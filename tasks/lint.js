var $ = require('gulp-load-plugins')(),
    utils = require('../utils'),
    config = global.config;


// Send a notification when JSRC fails,
// so that you know your changes didn't build
function jscsNotify(file) {
    if (!file.jscs) { return; }
    return file.jscs.success ? false : 'JSRC failed';
}

function createLintTask(gulp, taskName, files) {
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

module.exports = function(gulp) {
    var types = ['scripts'];
    var all = [];
    for (var i = 0; i < types.length; i++) {
    	var type = types[i],
    		src = config[type].srcdir + '/**/*.js',
    		taskname = 'lint-'+type;
    	createLintTask(gulp, taskname, src);
    	all.push(taskname)
    }
    //// lint all
    gulp.task('lint', all);
}
