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
  this.clr = false;
}

let ds = new Data();

function equals(a, op, b) {
  let sum = Number(OPS[op](Number(a), Number(b)));
  return Number(sum >= 100 ? sum.toFixed(2) : sum.toFixed(12));
}

// chaining events
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
const clrBtn = document.getElementById('clear');

function handleClear() {
  if (ds.cur === 1 && !ds.clr) {
    ds.clr = true;
    ds.vals[ds.cur] = 0;
  } else {
    ds = new Data();
  }
}

function handleNegate() {
  if (ds.eqls.flag) {
    ds.eqls.total = OPS.negate(Number(ds.eqls.total));
  } else {
    ds.vals[ds.cur] = OPS.negate(Number(ds.vals[ds.cur]));
  }
}

function handlePercent() {
  if (ds.eqls.flag) {
    ds.eqls.total = ds.eqls.total / 100;
  } else {
    ds.vals[ds.cur] = ds.cur === 0 ? ds.vals[0] / 100 : (ds.vals[1] / 100) * ds.vals[0];
  }
}

function handleDecimal() {
  ds.dec = true;
  ds.vals[ds.cur] += '.';
}

function handleEquals() {
  if (ds.eqls.flag && !ds.op) eqlsChaining();
  if (ds.op) {
    const eqls = {
      flag: true,
      total: equals(ds.vals[0], ds.op, ds.vals[1]),
      val: ds.vals[1],
      op: ds.op
    }
    ds = new Data();
    ds.eqls = eqls;
  }
}

function handleBasicOps(op) {
  if (ds.cur === 1 || ds.eqls.flag) opsChaining();
  ds.op = op;
  ds.cur = 1;
  ds.dec = false;
}

// screen updator
const screen = document.getElementById('screen');

function screenUpdate(val) {
  const num = Number(val);
  screen.classList = String(val).length > 13 ? 'resize' : '';
  screen.innerText = num > 999 ? addCommas(num) : num;
}

function addCommas(val) {
  let parts = String(val).split('.');
  parts[0] = parts[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  return parts.join('.');
}

// click events
const numBtn = document.querySelectorAll('.num-pad');
const opsBtn = document.querySelectorAll('.ops-pad');

function numberEventHandler(num) {
  clrBtn.innerText = 'C';
  if (ds.eqls.flag) ds.eqls.flag = false;
  ds.vals[ds.cur] += num;
  screenUpdate(ds.vals[ds.cur]);
}

Array.from(numBtn).forEach(n => {
  n.addEventListener('click', (e) => {
    numberEventHandler(e.target.innerText);
  });
});

function opsEventHandler(opsId) {
  let tempScreen = null; 
  switch (opsId) {
    case "clear":
      handleClear();
      clrBtn.innerText = 'AC';
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
      tempScreen = ds.vals[ds.cur];
      handleBasicOps(opsId);
      break;
  }

  // basic ops require previous value shown
  tempScreen = tempScreen ? tempScreen : ds.vals[ds.cur];

  screenUpdate(ds.eqls.flag ? ds.eqls.total : tempScreen);
}

Array.from(opsBtn).forEach(b => {
  b.addEventListener('click', (e) => {
    opsEventHandler(e.target.id)
  });
});

window.addEventListener("keydown", keyEvents, false);

function convertKeyCode(code) {
  switch (code) {
    case "-":
      return "minus";
    case "+":
      return "plus";
    case "*":
      return "times";
    case "/":
      return "divide";
    case "%":
      return "percent";
    case ".":
      return "decimal";
    case "=":
      return "equals";
    case "Backspace":
      return "clear";
  }
}

function keyEvents(event) {
  event.preventDefault();
  if (event.key.match(/[\+-\/.*%=]/) || event.keyCode === 8) {
    opsEventHandler(convertKeyCode(event.key));
  } else if (event.keyCode >= 48 && event.keyCode <= 57) {
    numberEventHandler(event.key);
  }
}