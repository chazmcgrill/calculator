// operation functions
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

// data constructor
function Data() {
  this.vals = [0, 0];
  this.cur = 0;
  this.dec = false;
  this.op = false;
}

let ds = new Data();

function equals(a, op, b) {
  return Number(OPS[op](a, b).toFixed(2));
}

function basicOps(op) {
  ds.op = op;
  ds.cur = 1;
  ds.dec = false;
}

// screen updator
var screen = document.querySelector('.screen');

function screenUpdate(val) {
  screen.innerText = Number(val);
}

// click events
var numBtn = document.querySelectorAll('.num-pad');
var opsBtn = document.querySelectorAll('.ops-pad');

Array.from(numBtn).forEach(n => {
  n.addEventListener('click', (e) => {
    ds.vals[ds.cur] += e.target.innerText;
    console.log(Number(ds.vals[ds.cur]));
    screenUpdate(ds.vals[ds.cur]);
  });
});

Array.from(opsBtn).forEach(b => {
  b.addEventListener('click', (e) => {
    console.log(e.target.id);

    switch (e.target.id) {
      case "clear":
        ds = new data();
        console.log(ds);
        break;
      case "negate":
        ds.vals[ds.cur] = OPS.negate(Number(ds.vals[ds.cur]));
        console.log(ds.vals[ds.cur]);
        break;
      // case "percent":
      //   break;
      case "decimal":
        if (!ds.dec) {
          ds.dec = true;
          ds.vals[ds.cur] += '.';
        }
        console.log(ds.vals[ds.cur]);
        break;
      case "equals":
        console.log(equals(Number(ds.vals[0]), ds.op, Number(ds.vals[1])));
        break;
      default:
        basicOps(e.target.id);
        break;
    }

    screenUpdate(ds.vals[ds.cur]);
  });
});

/* export for testing */
module.exports = {
  OPS: OPS,
  equals: equals
};