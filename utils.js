var browserify = require('browserify'),
    transform = require('vinyl-transform'),
    babelify = require('babelify'),
    fs = require('fs'),
    path = require('path'),
    rename = require('gulp-rename'),
    es2015 = require('babel-preset-es2015'),
    react = require('babel-preset-react'),
    through2 = require('through2');


module.exports = {
	browserify: through2.obj(function(file, enc, next) {
		browserify(file.path)
		    .transform(babelify.configure({ignore: ['node_modules'], presets: [es2015, react]}))
		.bundle(function (err, result) {
		    file.contents = result;
		    next(null, file);
		})
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
