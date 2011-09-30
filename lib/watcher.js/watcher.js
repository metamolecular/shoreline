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

var crypto = require('crypto');
var fs = require('fs');

var Hasher = function(root) {
  this.root = root;
  this.paths = [];
};

Hasher.prototype.hash = function() {
  this.paths = [];
  var sha1 = crypto.createHash('SHA1');
  
  this.walk();
  sha1.update(this.paths.join());
  
  return sha1.digest('hex');
};

Hasher.prototype.walk = function(opt_dir) {
  var path = (opt_dir || this.root);
  var entries = fs.readdirSync(path);
  
  for (var i = 0; i < entries.length; i++) {
    var newPath = path + '/' + entries[i];
    var stat = fs.statSync(newPath);
    
    if (stat && stat.isDirectory()) {
      this.paths.push(stat.ctime);
      this.walk(newPath);
    } else {
      this.paths.push(stat.ctime);
    }
  }
};

exports.watch = function(root, onChange) {
  var hasher = new Hasher(root);
  var last = hasher.hash();

  setInterval(function() {
    var next = hasher.hash();
    
    if (next !== last) {
      onChange();
    }
    
    last = next;
  }, 500);
};
