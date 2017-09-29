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
  operator: '',
  current: 'valA',
  valA: '',
  valB: ''
}

// function for performing sum
function equals(a, b) {
  return OPS[calc.operator](Number(a), Number(b));
}

// updater function
function updater(val) {
  calc[calc.current] += val;
  screenVal(calc[calc.current]);
}

function negator(val) {
  if (val.indexOf('-') === -1 && val !== '0') {
    val = '-' + val;
  } else {
    val = val.replace('-', '');
  }
  screenVal(val);
  return val;
}

// screen display function
function screenVal(val) {
  // check length and return reduced value.
  val = length(val);
  $('.screen').text(val);
}

// length check decrease text size
function length(val) {
  if (val.length > 14) {
    // do something
  }
  return val;
}

// rounder function

// commas function


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
  screenVal('0');
  reset('');
});

$('.equals-btn').click(function() {
  var val = equals(calc.valA, calc.valB);
  screenVal(val);
  reset(val);
});
