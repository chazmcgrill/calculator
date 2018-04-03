/* Operations and decimal points */
const DECIMALS = 12;
const OPS = {
  plus(a, b) {
    return a + b;
  },
  minus(a, b) {
    return a - b;
  },
  times(a, b) {
    return a * b;
  },
  divide(a, b) {
    return a / b;
  },
  negate(x) {
    return x * -1;
  }
}

const data = {
  values: [0, 0],
  decimal: false,
  operator: false,
};

function equals(a, op, b) {
  return Number(OPS[op](a, b).toFixed(2));
}

module.exports = {
  OPS: OPS,
  equals: equals
};