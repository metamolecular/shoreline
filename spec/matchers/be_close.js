jasmine.Matchers.prototype.toBeClose = function(expected) {
  return Math.abs(expected - this.actual) <= 0.000001;
};