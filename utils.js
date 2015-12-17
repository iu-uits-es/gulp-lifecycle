var browserify = require('browserify'),
    transform = require('vinyl-transform'),
    babelify = require('babelify'),
	fs = require('fs'),
	path = require('path'),
	rename = require('gulp-rename');

module.exports = {
	browserify: transform(function(filename) {
	        return browserify(filename)
		               .transform(babelify.configure({ presets: ['es2015', 'react', 'stage-0'] }))
		        	   .bundle();
	}),
	findSourceDirectories: function(entryPoint, sourceRoot) {
		var src = path.join(sourceRoot, entryPoint);
		if(!fs.existsSync(src)) {
		    if(fs.existsSync(sourceRoot)) {
		        src = [];
		        var fileNames = fs.readdirSync(sourceRoot);
		        fileNames.map(function(fileName) {
		            var file = fs.statSync(path.join(sourceRoot, fileName));
		            if(file.isDirectory()) {
		                var srcFileName = path.join(sourceRoot, fileName, entryPoint);
		                if(fs.existsSync(srcFileName)) {
		                    src.push(srcFileName);
		                }
		            }
		        });
		    }
		}
		return src;
	},
	moduleAwareRename: function(sourceRoot, outputName) {
		return rename(function(filePath) {
        	var basename = path.basename(filePath.dirname);
        	if(basename === path.basename(sourceRoot)) {
            	filePath.dirname = '.';
        	} else {
            	filePath.dirname = basename;
        	}
        	var parts = outputName.split('.');
        	filePath.basename = parts[0];
        	filePath.extname = '.' + parts[1];
    	});
	}
};
