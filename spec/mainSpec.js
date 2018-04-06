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
		it("converts current val to a percentage of 100", () => {
			ds = { ...ds, cur: 0, vals: [50, 0] };
			handlePercent();
			expect(ds.vals[ds.cur]).toBe(0.5);
		});

		it("converts current val to a percentage of stored val", () => {
			ds = { ...ds, cur: 1, vals: [50, 10] };
			handlePercent();
			expect(ds.vals[ds.cur]).toBe(5);
		});
	});

	describe("negate", () => {
		it("negates current val", () => {
			ds = { ...ds, cur: 0, vals: [50, 0] };
			handleNegate();
			expect(ds.vals[ds.cur]).toBe(-50);
		});

		it("negates equals val", () => {
			ds = { ...ds, eqls: { flag: true, op: "times", total: 50, val: 4 } };
			handleNegate();
			expect(ds.eqls.total).toBe(-50);
		});
	});

	describe("equals", () => {
		it("performs basic operations", () => {
			ds = { ...ds, cur: 1, vals: [3, 4], op: "times" };
			handleEquals();
			expect(ds.eqls.total).toBe(12);
		});

		it("chains previous operations", () => {
			ds = { ...ds, eqls: { flag: true, op: "times", total: 12, val: 4 } };
			handleEquals();
			expect(ds.eqls.total).toBe(48);
		});

	});
});