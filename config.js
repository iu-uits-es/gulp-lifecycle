var srcroot = './src/main/js',
    srcdest = './target/classes/static/js/build',

    testroot = './src/test/js',
    testdest = './target/test-classes/static/js/build',

    itroot = './src/it/js',
    itdest = testdest;

module.exports = {
    scripts: {
        watch: srcroot+'/**/*.js',
        src: srcroot+'/index.js',
        dest: srcdest,
        outputName: 'scripts.js'
    },
    clean: {
        scripts: srcdest,
        spec: testdest
    },
    spec: {
        watch: testroot+'/**/*.js',
        src: testroot+'/spec.js',
        dest: testdest,
        reporter: {
            verbosity: 3
        },
        outputName: 'spec-tests.js'
    },
    it: {
        watch: itroot+'/**/*.js',
        src: itroot+'/it.js',
        dest: itdest,
        reporter: {
            verbosity: 3
        },
        outputName: 'spec-it.js'
    }
};
