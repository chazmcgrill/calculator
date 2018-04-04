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
  this.eqls = { flag: false, total: 0, val: 0 }
  this.dec = false;
  this.op = false;
}

let ds = new Data();

function equals(a, op, b) {
  return Number(OPS[op](a, b).toFixed(2));
}

function opsChaining() {
  if (ds.cur === 1) {
    ds.vals[0] = equals(Number(ds.vals[0]), ds.op, Number(ds.vals[1]));
    ds.vals[1] = 0;
  } else if (ds.eqls.flag) {
    ds.vals[0] = ds.eqls.total;
    ds.vals[1] = 0;
  }
}

function handleBasicOps(op) {
  opsChaining();
  ds.op = op;
  ds.cur = 1;
  ds.dec = false;
}

function handleEquals() {
  const eqls = {
    flag: true,
    total: equals(Number(ds.vals[0]), ds.op, Number(ds.vals[1])),
    val: ds.vals[1]
  }
  ds = new Data();
  ds.eqls = eqls;
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
    ds.eqls.flag = ds.eqls.flag ? true : false; 
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
        ds = new Data();
        break;
      case "negate":
        ds.vals[ds.cur] = OPS.negate(Number(ds.vals[ds.cur]));
        console.log(ds.vals[ds.cur]);
        break;
      case "decimal":
        if (!ds.dec) {
          ds.dec = true;
          ds.vals[ds.cur] += '.';
        }
        console.log(ds.vals[ds.cur]);
        break;
      case "equals":
        handleEquals();
        break;
      default:
        handleBasicOps(e.target.id);
        break;
    }
    
    console.log(ds);
    screenUpdate(ds.eqls.flag ? ds.eqls.total : ds.vals[ds.cur]);
  });
});

/* export for testing */
module.exports = {
  OPS: OPS,
  equals: equals
};