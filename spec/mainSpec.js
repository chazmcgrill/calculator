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

describe("Handler functions:", () => {
	beforeEach(() => {
		ds = new Data();
	});
	
	describe("percent", () => {
		it("val[0] becomes a percentage of 100", () => {
			ds.vals[ds.cur] = 50;
			handlePercent();
			expect(ds.vals[ds.cur]).toBe(0.5);
		});

		it("val[1] becomes a percentage of val[0]", () => {
			ds.cur = 1
			ds.vals[ds.cur] = 10;
			handlePercent();
			expect(ds.vals[ds.cur]).toBe(0.05);
		});
	});

});