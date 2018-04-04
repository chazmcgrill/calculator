var equals = require('../assets/js/index').equals;

describe("Function: equals", function() {
  var equalsSpy;
  beforeEach(function() {
    equalsSpy = spyOn(window, 'equals');
  });

  it("is called", function() {
    expect(equalsSpy).toHaveBeenCalled();
  });

  it("performs basic sum", function() {
    expect(equalsSpy(2,"plus",3)).toBe(5);
  });

  it("handles floats", function() {
    expect(equalsSpy(0.1, "plus", 0.2)).toBe(0.3);
  });

});