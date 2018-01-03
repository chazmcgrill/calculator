/* Operations and decimal points */
const DECIMALS = 12;
const OPS = {
  plus(a, b) {
    return a + b;
  },
  minus(a, b) {
    return a - b;
  },
  multiply(a, b) {
    return a * b;
  },
  divide(a, b) {
    return a / b;
  }
}

/* main data variables */
let calc = {
  operator: 'plus',
  current: 'valA',
  valA: '0',
  valB: '0',
  equalsVal: 0,
  lengthLimit: false
};

/* Function to handle floating point numbers
whether exponential or standard notation */
function rounder(value) {
  if (String(value).indexOf('e') !== -1) {
    return value.toPrecision(1 + 12);
  } else {
    return Number(Math.round(value + 'e' + DECIMALS) + 'e-' + DECIMALS);
  }
}

/* Equals function for performing sum using
values and operator method selected. */
function equals(a, b) {
  console.log(`a: ${a}, b: ${b}`);
  let sum = OPS[calc.operator](Number(a), Number(b));
  console.log(sum);
  return String(sum).indexOf('.') === -1 ? sum : rounder(sum);
}

/* Decided how to handle the equals
request. */
function equalsVal() {
  if (calc.equalsVal) {
    return equals(calc.valA, calc.equalsVal);
  } else {
    calc.equalsVal = calc.valB;
    return equals(calc.valA, calc.valB);
  }
}

/* Equals varibles reset */
function equalsReset() {
  calc[calc.current] = '0';
  calc.equalsVal = 0;
}

/* screen updater */
function updater(val) {

  // if equals value present remove
  if (calc.equalsVal) equalsReset();

  // filter to handle proceding zeros before updating screen
  if (calc[calc.current] === '0' && val === '.') {
    calc[calc.current] = '0.';
  } else if (calc[calc.current] === '0' && val !== '0') {
    calc[calc.current] = val;
  } else {
    calc[calc.current] += val
  }

  screenVal(calc[calc.current]);
}

/* Handles the negator button logic */
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

/* Triggers screen limit message */
function limiter(check) {
  calc.lengthLimit = check;
  if (check) {
    $('.screen-message').removeClass('handle');
  } else {
    $('.screen-message').addClass('handle');
  }
}

/* Adjusts font size if value is large */
function lengthEdit(len) {
  if (len > 12) {
    if (len > 20) limiter(true);
    $('.screen').addClass('resize');
  } else {
    $('.screen').removeClass('resize');
  }
}

/* Length filter */
function lengthFilter(val) {
  let len = val.length;
  lengthEdit(len);
  return len > 3 ? commas(val) : val;
}

/* Clear button logic */
function clear() {
  $('.ac-btn').text('AC');
  calc.valB ? calc.valB = '' : reset('0');
  screenVal('0');
}

/* Add commas to screen value using regular
expressions. */
function commas(val) {
  let regex = /(\d)(?=(\d{3})+$)/g,
      parts = val.split('.');

  parts[0] = parts[0].replace(regex, '$1,');
  return parts.join('.');
}

/* Percentage if valB is not populated simply
divides by a hundred else calculates the valB's
percentage of valA */
function percent(val) {
  calc[calc.current] = !calc.valB ? val / 100 : (calc.valA / 100) * val;
  screenVal(calc[calc.current]);
}

/* Reset values */
function reset(valA) {
  calc.valA = valA;
  calc.valB = '0';
  calc.current = 'valA';
  limiter(false);
}

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
  let val = equalsVal();
  screenVal(String(val));
  reset(val);
});
