goog.provide('shoreline.Example');

goog.require('goog.ui.Component');

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

shoreline.Example.prototype.createDom = function() {
  this.element_ = goog.dom.createDom('h1', {'class': 'example'});
};

shoreline.Example.prototype.enterDocument = function() {
  this.getElement().innerText = 'Welcome to Closure';
};

shoreline.Example.prototype.compute = function(first, second) {
  return first / second;
};

