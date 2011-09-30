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

goog.provide('shoreline.Example');

goog.require('goog.ui.Component');

/**
 * @constructor
 */
shoreline.Example = function() {
  goog.base(this);
};

goog.inherits(shoreline.Example, goog.ui.Component);
goog.addSingletonGetter(shoreline.Example);

shoreline.Example.init = function() {
  var instance = shoreline.Example.getInstance();
  var element = document.getElementById('shoreline');
  
  instance.render(element);
};

/**
 * @inheritDoc
 */
shoreline.Example.prototype.createDom = function() {
  this.element_ = goog.dom.createDom('h1', {'class': 'example'});
};

/**
 * @inheritDoc
 */
shoreline.Example.prototype.enterDocument = function() {
  this.getElement().innerText = 'Welcome to Closure';
};

/**
 * A silly function for testing.
 *
 * @param {number} first the numerator
 * @param {number} second the denomenator
 * @return {number} the quotient of first and second
 */
shoreline.Example.prototype.compute = function(first, second) {
  return first / second;
};