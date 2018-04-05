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
  return Number(OPS[op](Number(a), Number(b)).toFixed(2));
}

function opsChaining() {
  if (ds.cur === 1) {
    ds.vals[0] = equals(ds.vals[0], ds.op, ds.vals[1]);
    ds.vals[1] = 0;
  } else if (ds.eqls.flag) {
    ds.vals[0] = ds.eqls.total;
    ds.vals[1] = 0;
  }
}

function eqlsChaining() {
  ds.vals[0] = ds.eqls.total;
  ds.op = ds.eqls.op;
  ds.vals[1] = ds.eqls.val;
}

// click handler functions
function handleClear() {
  ds = new Data();
}

function handleNegate() {
  ds.vals[ds.cur] = OPS.negate(Number(ds.vals[ds.cur]));
}

function handlePercent() {
  ds.vals[ds.cur] = ds.cur === 0 ? ds.vals[0] / 100
    : (ds.vals[1] / 100) * ds.vals[0];
}

function handleDecimal() {
  ds.dec = true;
  ds.vals[ds.cur] += '.';
}

function handleEquals() {
  if (ds.eqls.flag && !ds.op) eqlsChaining();
  const eqls = {
    flag: true,
    total: equals(ds.vals[0], ds.op, ds.vals[1]),
    val: ds.vals[1],
    op: ds.op
  }
  ds = new Data();
  ds.eqls = eqls;
}

function handleBasicOps(op) {
  if (ds.cur === 1 || ds.eqls.flag) opsChaining();
  ds.op = op;
  ds.cur = 1;
  ds.dec = false;
}

// screen updator
const screen = document.querySelector('.screen');

function screenUpdate(val) {
  screen.innerText = Number(val);
}

// click events
const numBtn = document.querySelectorAll('.num-pad');
const opsBtn = document.querySelectorAll('.ops-pad');

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
    const opsId = e.target.id;

    switch (opsId) {
      case "clear":
        handleClear();
        break;
      case "negate":
        handleNegate();
        break;
      case "percent":
        handlePercent();
        break;
      case "decimal":
        if (!ds.dec) handleDecimal();
        break;
      case "equals":
        handleEquals();
        break;
      default:
        handleBasicOps(opsId);
        break;
    }
    
    console.log(ds.eqls);
    screenUpdate(ds.eqls.flag ? ds.eqls.total : ds.vals[ds.cur]);
  });
});