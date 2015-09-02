var gulp = require('gulp'),
	MochaReport = require('mochareport'),
	npm = require('npm');

gulp.task('nodeDeps', function() {
	npm.load({}, function() {
		var start = new Date();
		npm.commands.outdated(function(err, results) {
			var report = new MochaReport(start, new Date());
			results.forEach(function(row) {
				var pkg = row[1],
					current = row[2],
					wanted = row[3],
					latest = row[4],
					location = row[5];
				report.addFailure(pkg, 'Current: ' + current + ', Wanted: ' + wanted + 
					', Latest: ' + latest + ', Location: ' + location);
			});
			report.write();
		});	
	});
});