var jasmineReporters = require('jasmine-reporters'),
    srcroot = './src/main/js',
    srcdest = './target/classes/static/js/build',

    testroot = './src/test/js',
    testdest = './target/test-classes/static/js/build',

    itroot = './src/it/js',
    itdest = testdest,

    lessroot = './src/main/less',
    lessdest = './target/classes/static/css/build'

module.exports = {
    scripts: {
        entryPoint: 'index.js',     // Entry point file name for browserify
        srcdir: srcroot,            // Root directory of sources
        watch: srcroot+'/**/*.js',  // Source globs to watch
        dest: srcdest,              // Output directory of transpiled code
        outputName: 'scripts.js'       // Base name of output file for transpiled code
    },
    spec: {
        entryPoint: 'spec.js',
        srcdir: testroot,
        watch: testroot+'/**/*.js',
        dest: testdest,
        outputName: 'spec-tests.js',
        jasmineConfig: {
            reporters: [
                new jasmineReporters.JUnitXmlReporter({
                    savePath: './target',
                    filePrefix: 'js-spec-junitresults-',
                    consolidateAll: true
                })
            ]
        }
    },
    it: {
        entryPoint: 'it.js',
        srcdir: itroot,
        watch: itroot + '/**/*.js',
        dest: itdest,
        outputName: 'spec-it.js',
        jasmineConfig: {
            reporters: [
                new jasmineReporters.JUnitXmlReporter({
                    savePath: './target',
                    filePrefix: 'js-it-junitresults-',
                    consolidateAll: true
                })
            ],
            integration: true
        }
    },
    clean: {
        scripts: srcdest,
        spec: testdest,
        less: lessdest
    },
    less: {
        entryPoint: 'styles.less',     
        srcdir: lessroot,            
        watch: lessroot+'/**/*.less',  
        dest: lessdest,              
        outputName: 'styles.css'       
    },
};
