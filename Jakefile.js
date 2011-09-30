/**
 * Requires
 */
var child_process = require('child_process');
var path = require('path');
var fs = require('fs');
var exec = child_process.exec;

/**
 * Project settings.
 */

var project = 'shoreline';
var libraryPaths = [
  // insert project source paths, for example:
  // 'foolib.js/src', 'barlib.js/src'
];

/**
 * Directories and files.
 */
 
var build = 'build';
var compiler = 'lib/compiler.java/compiler.jar';

/**
 * System Commands
 */

var rmrf = function(dir) {
  try {
    if (!path.existsSync(dir)) {
      fs.rmdirSync(dir);
    }
  } catch (err) {
    console.log(err);
  }
};

var mkdir = function(dir) {
  try {
    if (!path.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  } catch (err) {
    console.log(err);
  }
};

var system = function(command) {
  exec(command, function(error, stdout, stderr) {
    if (error) {
      console.info(error);
      console.info(error.message);
    } else {
      console.info('[SUCCESS]');
    }
    
    if (stdout) {
      console.info(stdout);
    }
  });
};

/**
 * Utility functions
 */

var getPathArguments = function() {
  var result = '--path lib/closure.js/closure --path src ';
  
  for (var i = 0; i < libraryPaths.length; i++) {
    result = result + '--path lib/' + libraryPaths[i] + ' ';
  }
  
  return result;
};

desc('Removes build directory.');
task('clean', [], function(params) {
  rmrf(build);
}, true);

desc('Creates build directory.');
task('prebuild', [], function(params) {
  mkdir(build);
});

desc('Calculates dependencies and writes build/deps.js.');
task('default', ['prebuild'], function(params) {
  var command =
    'python lib/closure.js/closure/bin/calcdeps.py ' +
    getPathArguments() +
    '--output_mode deps ' +
    '> ' + build + '/deps.js';
  system(command, true);
}, true);

desc('Compiles a single .js file using advanced optimizations');
task('compile', ['prebuild'], function(params) {
  mkdir(build);
  
  var command =
    'python lib/closure.js/closure/bin/calcdeps.py ' +
    getPathArguments() +
    '--compiler_jar ' + compiler + ' ' +
    '--output_mode compiled ' +
    '--input src/exports.js ' +
    '--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ' +
    '--compiler_flags="--output_wrapper=' + '(function(){%output%})();" ' +
    '> ' + build + '/' + project + '.js';

    system(command, true);
}, true);