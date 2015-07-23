var gulp = require('gulp'),
    objectAssign = require('object-assign');

module.exports = function(gulp, config){
    var config = objectAssign(require('./config.js'), config);

    require('require-dir')('./tasks', {
        recurse: true
    });

  	gulp.task('foo', function(){
    	console.log('bar');
	});
};
