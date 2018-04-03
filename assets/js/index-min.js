/* operation functions */
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
};

/* data structure */
const data = {
  values: [0, 0],
  decimal: false,
  operator: false,
};

function equals(a, op, b) {
  return Number(OPS[op](a, b).toFixed(2));
}

/* click events */
var numBtn = document.querySelectorAll('.num-pad');

Array.from(numBtn).forEach(n => {
  n.addEventListener('click', (e) => {
    console.log(e.target.innerText);
  });
});

var opsBtn = document.querySelectorAll('.ops-pad');

Array.from(opsBtn).forEach(b => {
  b.addEventListener('click', (e) => {
    console.log(e.target.id);
  });
});

/* export for testing */
module.exports = {
  OPS: OPS,
  equals: equals
};