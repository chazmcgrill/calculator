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
  currentOp: '',
  currentVal: 'valA',
  valA: '',
  valB: ''
  // reset: [ currentOp, valA, valB ]
}

// function for performing sum
function equals(a, b) {
  return OPS[calc.currentOp](Number(a), Number(b));
}

// screen display function
function screenVal(val) {
  $('.screen').text(val);
}

// reset values
function reset(valA) {
  calc.valA = valA;
  calc.valB = '';
  calc.currentVal = 'valA';
}





// ==============
// CLICK EVENTS
// ==============

$('.num-pad').click(function(event) {
  calc[calc.currentVal] += event.target.innerText;
  screenVal(calc[calc.currentVal]);
});

$('.basic-ops').click(function(event) {
  calc.currentOp = event.target.id;
  calc.currentVal = 'valB';
});

// negate

// percent

// decimal

$('.ac-btn').click(function() {
  // reset logic goes here
  screenVal('0');
  reset('');
});

$('.equals-btn').click(function() {
  var val = equals(calc.valA, calc.valB);
  screenVal(val);
  reset(val);
});
