var gulp = require('gulp'),
    deepMerge = require('deepmerge');

module.exports = function(gulp, config) {
    global.config = deepMerge(require('./config.js'), config || {});

    require('./tasks/build')(gulp);
    require('./tasks/clean')(gulp);
    require('./tasks/default')(gulp);
    require('./tasks/it')(gulp);
    require('./tasks/less')(gulp);
    require('./tasks/lint')(gulp);
    require('./tasks/nodeDeps')(gulp);
    require('./tasks/scripts')(gulp);
    require('./tasks/spec')(gulp);
    require('./tasks/watch')(gulp);
    
};
