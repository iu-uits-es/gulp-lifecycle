var gulp = require('gulp'),
    deepMerge = require('deepmerge');

module.exports = function(config) {
    global.config = deepMerge(require('./config.js'), config || {});

    require('require-dir')('./tasks', {
        recurse: true
    });
};
