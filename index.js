var gulp = require('gulp'),
    deepMerge = require('deepmerge');

module.exports = function(gulp, config) {
    global.config = deepMerge(require('./config.js'), config || {});

    require('require-dir')('./tasks', {
        recurse: true
    });

  	gulp.task('foo', function(){
    	console.log('bar');
	});
};
