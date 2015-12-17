var browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	gutil = require('gulp-util'),
	buffer = require('vinyl-buffer'),
	babelify = require('babelify'),
	fs = require('fs'),
	through2 = require('through2'),
	path = require('path'),
	rename = require('gulp-rename');


module.exports = {
	browserify: through2.obj(function (file, enc, cb) {
		  console.log('file', file.path);
		  browserify(file.path)
				.transform(babelify, { presets: ["react", "es2015",  'stage-0'] })
				.bundle(function(err, res){
					console.log('bundling', cb, err);
					// assumes file.contents is a Buffer
					file.contents = res;
					cb(null, file);
			});



			//.on('error', function(e) {
			//	gutil.log(e);
			//})
			//.pipe(source('bundle.js'));
			//console.log('chunk', chunk.path); // this should log now
			//cb(null, chunk);
		})



		//console.log(stream);
		//return stream;

		//var browserified =  browserify(filename)
		//	//.transform(babelify.configure({ignore: 'node_modules'}))
		//	.transform("babelify", {presets: ["es2015", "react"]});
		//return  browserified.bundle().pipe(source('tmp.js'))
		//	.pipe(buffer());
	,
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
