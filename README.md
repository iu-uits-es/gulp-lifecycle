# gulp-lifecycle

## Usage

 This project is intended to get IU ESI frontend applications ready for development as quickly as possible.

## Installation

1. Create a `gulpfile.js` in your project root
  * If you are using a multi-module project, the "project root" will refer to the root of the web module.
2. in the gulpfile, add the line `require(gulp-lifecycle)();`
3. From the project root, run `npm init`.
4. in the `package.json` file that was created, add an entry to the `"devDependencies"` section that reads `"gulp-lifecycle: "git+https://github.com/iu-uits-es/gulp-lifecycle.git"` (or alter the url value to use the SSH URL from wherever you got this project).
5. From the project root, run `npm install`.

## Configuration

If you want to configure how tasks are run, configuration options (as seen in config.js) can be overriden by modifying the gulp-lifecycle requirement in `gulpfile.js`.

For example, if you want to change the output name of your processed javascript, you would make the following modification:

```
require(gulp-lifecycle)(
 scripts: {
   outputName: 'myCustomScriptName.js'
 }
);
```

## Tasks

The following tasks are exported by this project (all directories and filenames given are default settings):

* scripts
  * This task will Browserify and uglify your scripts, outputting everything in `.src/main/js/**/*.js` to a single file: `./target/classes/static/js/build/scripts.js`. Additionally, it will create a map for this destination file to your sources for easier debugging.
* spec
  * This task will run Jasmine tests located in `./src/test/js/**/*.js`
  * By default, it will output using a terminal reporter and a JUnit reporter and places the results of the latter in `./target/js-spec-junitresults-<datetime>.xml`
* it
  * This task is similar to spec, but it runs integration tests in `./src/it/js/**/*.js`
* clean
  * This task removes any processed javascript/test/less files.
* less
  * This task will process any less files in `.src/main/less/**/*.less` and output the processed css to `./target/classes/static/css/build/styles.css`
