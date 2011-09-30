goog.require('shoreline.Example');

describe("Example", function() {
  var example;
  beforeEach(function() {
    example = new shoreline.Example();
  });
  describe("#compute", function() {
    it("returns the quotient of first argument and second", function() {
      expect(example.compute(12, 43)).toBeClose(12/43);
    });
  });
});