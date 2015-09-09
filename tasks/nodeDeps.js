var MochaReport = require('mochareport'),
	npm = require('npm');

module.exports = function(gulp) {
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
					if (current !== wanted) {
						report.addFailure(pkg, 'Current: ' + current + ', Wanted: ' + wanted +
							', Latest: ' + latest + ', Location: ' + location);
					} else {
						report.addPassing(pkg, 'Current: ' + current + ', Wanted: ' + wanted +
							', Latest: ' + latest + ', Location: ' + location);
					}
					// Check current against latest to make sure we're not a major version behind.  Add a skip if necessary.
					if(latest === 'git') {
						report.addSkipped(pkg, 'Package ' + pkg + ' is a git dependency, consider publishing and switch to a published version.');
					} else if(current !== latest) {
						report.addSkipped(pkg, 'Package ' + pkg + ' has a new major version available, consider updating.  Current: ' + current + ', Latest: ' + latest);
					}

				});
				if(report.getReport().stats.tests === 0) {
					report.addPassing('all-modules', 'All modules are up-to-date');
				}
				report.write();
			});
		});
	});
}
