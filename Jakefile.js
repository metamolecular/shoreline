/**
 * Shoreline: A Template for Google Closure Projects
 * Copyright (c) 2011 Metamolecular, LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Requires
 */
var child_process = require('child_process');
var path = require('path');
var fs = require('fs');
var exec = child_process.exec;
var watcher = require('./lib/watcher.js/watcher.js');

/**
 * Project settings.
 */

var project = 'shoreline';
var browser = 'Safari';
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

var rmrf = function(dir, done) {
  system('rm -rf ' + dir, done);
};

var mkdir = function(dir) {
  system('mkdir -p ' + dir);
};

var system = function(command) {
  console.log(command);
  
  exec(command, function(error, stdout, stderr) {
    if (error) {
      console.log(error);
      console.log(error.message);
    } else {
      console.info('[SUCCESS]');
    }
    
    complete();
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
}, true);

desc('Calculates dependencies and writes build/deps.js.');
task('default', ['prebuild'], function(params) {
  var command =
    'python lib/closure.js/closure/bin/calcdeps.py ' +
    getPathArguments() +
    '--output_mode deps ' +
    '> ' + build + '/deps.js';
  system(command);
});

desc('Compiles a single .js file using advanced optimizations');
task('compile', ['prebuild'], function(params) {
  var command =
    'python lib/closure.js/closure/bin/calcdeps.py ' +
    getPathArguments() +
    '--compiler_jar ' + compiler + ' ' +
    '--output_mode compiled ' +
    '--input src/Exports.js ' +
    '--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ' +
    '--compiler_flags="--output_wrapper=' + '(function(){%output%})();" ' +
    '> ' + build + '/' + project + '.js';

    system(command);
});

desc('Refreshes browser whenever a project file changes. OS X only due to AppleScript.');
task('autotest', [], function(params) {
  console.log('Watching for changes...');
  watcher.watch('.', function() {
    var cmd = 
      'osascript -e \'' +
      'tell application "' + browser + '"\n' +
      '  do JavaScript "window.location.reload()" in front document\n' +
      'end tell\n' +
      '\'';
    
    system(cmd);
  });
});