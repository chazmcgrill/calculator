describe("OPS functions:", function() {

  it("plus function works", function() {
    expect(OPS.plus(2, 3)).toBe(5);
  });

  it("minus function works", function() {
    expect(OPS.minus(5, 3)).toBe(2);
  });

  it("multiply function works", function() {
    expect(OPS.times(2, 3)).toBe(6);
  });

  it("divide function works", function() {
    expect(OPS.divide(6, 3)).toBe(2);
  });

  it("negate function works", function() {
    expect(OPS.negate(6)).toBe(-6);
  });

});