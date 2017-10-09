// const  object for operations methods
const OPS = {
  plus: function(a, b) {
    return a + b;
  },
  minus: function(a, b) {
    return a - b;
  },
  multiply: function(a, b) {
    return a * b;
  },
  divide: function(a, b) {
    return a / b;
  }
}

// variable object for input values
var calc = {
  operator: 'plus',
  current: 'valA',
  valA: '',
  valB: '',
  equalsVal: 0
}

// function for performing sum
function equals(a, b) {
  return OPS[calc.operator](Number(a), Number(b));
}

// updater function
function updater(val) {
  if (!calc[calc.current] && val === '.') val = '0.';
  console.log(calc[calc.current]);
  calc[calc.current] += val;
  screenVal(calc[calc.current]);
}

function negator(val) {
  if (val !== '0' && val !== '') {
    val = val.indexOf('-') === -1 ? '-' + val : val.replace('-', '');
    screenVal(val);
  }
  return val;
}

// screen display function
function screenVal(val) {
  val = lengthCheck(val);
  $('.screen').text(val);
}

// length check decrease text size
function lengthCheck(val) {
  if (val.length > 3) {
    val = commas(val);
  }
  return val;
}

// clear button
function clear() {
  $('.ac-btn').text('AC');
  calc.valB ? calc.valB = '' : reset('');
  screenVal('0');
}

// condenser function

// commas function
function commas(val) {
  var regex = /(\d)(?=(\d{3})+$)/g,
      parts = val.split('.');

  parts[0] = parts[0].replace(regex, '$1,');
  return parts.join('.');
}

/* PERCENTAGE if valB is not populate simply divide by a
hundred else calculate the valB's percentage of valA */
function percent(val) {
  calc[calc.current] = !calc.valB ? val / 100
    : (calc.valA / 100) * val;
  screenVal(calc[calc.current]);
}

// reset values
function reset(valA) {
  calc.valA = valA;
  calc.valB = '';
  calc.current = 'valA';
}

// ==============
// CLICK EVENTS
// ==============

$('.basic-ops').click(function(event) {
  calc.operator = event.target.id;
  calc.current = 'valB';
});

$('.num-pad').click(function(event) {
  $('.ac-btn').text('C'); // better place ?
  updater(event.target.innerText);
});

// negate
$('.negate-btn').click(function() {
  calc[calc.current] = negator(String(calc[calc.current]));
});

// percent
$('.percent-btn').click(function() {
  percent(calc[calc.current]);
});

// decimal
$('.decimal-btn').click(function() {
  if (calc[calc.current].indexOf('.') === -1) {
    updater('.');
  }
});

$('.ac-btn').click(function() {
  clear();
});

$('.equals-btn').click(function() {
  var val;
  if (calc.equalsVal) {
    val = equals(calc.valA, calc.equalsVal);
  } else {
    val = equals(calc.valA, calc.valB);
    calc.equalsVal = calc.valB;
  }
  screenVal(String(val));
  reset(val);
});
