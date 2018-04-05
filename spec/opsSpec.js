describe("OPS functions:", () => {

  it("plus function works", () => {
    expect(OPS.plus(2, 3)).toBe(5);
  });

  it("minus function works", () => {
    expect(OPS.minus(5, 3)).toBe(2);
  });

  it("multiply function works", () => {
    expect(OPS.times(2, 3)).toBe(6);
  });

  it("divide function works", () => {
    expect(OPS.divide(6, 3)).toBe(2);
  });

  it("negate function works", () => {
    expect(OPS.negate(6)).toBe(-6);
  });

});