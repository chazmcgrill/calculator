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
let data = {
  vals: [0, 0],
  cur: 0,
  dec: false,
  op: false,
};

function equals(a, op, b) {
  return Number(OPS[op](a, b).toFixed(2));
}

function basicOps(op) {
  data.op = op;
  data.cur = 1;
  data.dec = false;
}

/* click events */
var numBtn = document.querySelectorAll('.num-pad');
var opsBtn = document.querySelectorAll('.ops-pad');

Array.from(numBtn).forEach(n => {
  n.addEventListener('click', (e) => {
    data.vals[data.cur] += e.target.innerText;
    console.log(Number(data.vals[data.cur]));
  });
});

Array.from(opsBtn).forEach(b => {
  b.addEventListener('click', (e) => {
    console.log(e.target.id);

    switch (e.target.id) {
      // case "clear":
      case "negate":
        data.vals[data.cur] = OPS.negate(Number(data.vals[data.cur]));
        console.log(data.vals[data.cur]);
        break;
      // case "percent":
      case "decimal":
        if (!data.dec) {
          data.dec = true;
          data.vals[data.cur] += '.';
        }
        console.log(data.vals[data.cur]);
        break;
      case "equals":
        console.log(equals(Number(data.vals[0]), data.op, Number(data.vals[1])));
        break;
      default:
        basicOps(e.target.id);
        break;
    }
  });
});

/* export for testing */
module.exports = {
  OPS: OPS,
  equals: equals
};