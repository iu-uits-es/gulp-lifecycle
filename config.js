var srcroot = './src/main/js',
    srcdest = './target/classes/static/js/build',
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
    clean: {
        scripts: srcdest,
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
