/* Object containing methods for basic
operations. These a called on pressing
equals button. */
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

/* Object to hold all the main data
variables */
var calc = {
  operator: 'plus',
  current: 'valA',
  valA: '',
  valB: '',
  equalsVal: 0,
  lengthLimit: false
}

// FUNCTIONS

/* Equals function for performing sum using
values and operator method selected. */
function equals(a, b) {
  return OPS[calc.operator](Number(a), Number(b));
}

/* Equals value */
function equalsVal() {
  if (calc.equalsVal) {
    return equals(calc.valA, calc.equalsVal);
  } else {
    calc.equalsVal = calc.valB;
    return equals(calc.valA, calc.valB);
  }
}

/* Equals reset */
function equalsReset() {
  calc[calc.current] = '';
  calc.equalsVal = 0;
}

/* Updater */
function updater(val) {
  if (!calc[calc.current] && val === '.') {
    val = '0.';
  }
  if (calc.equalsVal) {
    equalsReset();
  }
  if (calc[calc.current] !== '0') {
    calc[calc.current] += val;
  }
  screenVal(calc[calc.current]);
}

/* Negator */
function negator(val) {
  if (val !== '0' && val !== '') {
    val = val.indexOf('-') === -1 ? '-' + val : val.replace('-', '');
    screenVal(val);
  }
  return val;
}

/* Screen display updater */
function screenVal(val) {
  val = lengthFilter(val);
  $('.screen').text(val);
}

function limiter(check) {
  calc.lengthLimit = check;
  if (check) {
    $('.screen-message').removeClass('handle');
  } else {
    $('.screen-message').addClass('handle');
  }
}

function lengthEdit(len) {
  console.log(len);

  if (len > 12) {
    if (len > 19) limiter(true);
    $('.screen').addClass('resize');
  } else {
    $('.screen').removeClass('resize');
  }
}

/* Length filter */
function lengthFilter(val) {
  var len = val.length;
  lengthEdit(len);
  return len > 3 ? commas(val) : val;
}

/* Clear button logic */
function clear() {
  $('.ac-btn').text('AC');
  calc.valB ? calc.valB = '' : reset('');
  screenVal('0');
}

/* Add commas to screen value using regular
expression replace method. */
function commas(val) {
  var regex = /(\d)(?=(\d{3})+$)/g,
      parts = val.split('.');

  parts[0] = parts[0].replace(regex, '$1,');
  return parts.join('.');
}

/* Percentage if valB is not populated simply
divides by a hundred else calculates the valB's
percentage of valA */
function percent(val) {
  calc[calc.current] = !calc.valB ? val / 100
    : (calc.valA / 100) * val;
  screenVal(calc[calc.current]);
}

/* Reset values */
function reset(valA) {
  calc.valA = valA;
  calc.valB = '';
  calc.current = 'valA';
  limiter(false);
}

// CLICK EVENTS

/* Basic operations */
$('.basic-ops').click(function(event) {
  calc.operator = event.target.id;
  calc.current = 'valB';
  limiter(false);
});

/* Numpad */
$('.num-pad').click(function(event) {
  if (!calc.lengthLimit) {
    $('.ac-btn').text('C');
    updater(event.target.innerText);
  }
});

/* Negate button */
$('.negate-btn').click(function() {
  calc[calc.current] = negator(String(calc[calc.current]));
});

/* Percent */
$('.percent-btn').click(function() {
  percent(calc[calc.current]);
});

/* Decimal */
$('.decimal-btn').click(function() {
  if (calc[calc.current].indexOf('.') === -1) {
    updater('.');
  }
});

/* Clear button */
$('.ac-btn').click(function() {
  clear();
});

/* Equals button */
$('.equals-btn').click(function() {
  var val = equalsVal();
  screenVal(String(val));
  reset(val);
});
