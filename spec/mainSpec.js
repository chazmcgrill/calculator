describe("Equals function:", () => {

  it("performs basic sum", () => {
    expect(equals(2,"plus",3)).toBe(5);
  });

  it("rounds 0.1 + 0.3 to 1 decimal place", () => {
    expect(equals(0.1, "plus", 0.2)).toBe(0.3);
  });

  it("returns 12 decimal places max", () => {
    expect(equals(1, "divide", 3)).toBe(0.333333333333);
  });
  
  it("large numbers have 2 decimal places", () => {
    expect(equals(10000, "divide", 3)).toBe(3333.33);
  });

});