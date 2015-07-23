var gulp = require('gulp');

module.exports = function(gulp, config){
    var config = Object.assign(require('config.js'), config);

    require('require-dir')('./tasks', {
        recurse: true
    });

  	gulp.task('foo', function(){
    	console.log('bar');
	});
};
