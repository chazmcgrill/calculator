var equals = require('../assets/js/index').equals;

describe("Function: equals", function() {
  
  it("performs basic sum", function() {
    expect(equals(2,"plus",3)).toBe(5);
  });

  it("handles floats", function() {
    expect(equals(0.1, "plus", 0.2)).toBe(0.3);
  });

});