$(document).ready(function() {
  var opObj = { '−': '-', '×': '*', '÷': '/', '+': '+'},
      tempFlag = false,
      current = '0',
      stored = [];

  // clear button
  $('.ac-btn').click(function(){
    var acStatus = $('.ac-btn').text();
    if (acStatus === 'C') {
      current = '0';
      $('.ac-btn').text('AC');
    } else {
      stored = [];
    }
    screen(current);
  });

  // negate button
  $('.negate-btn').click(function() {
    if (current.indexOf('-') === -1 && current !== '0') {
      current = '-' + current;
    } else {
      current = current.replace('-', '');
    }
    screen(current);
  });

  // percent button
  $('.percent-btn').click(function() {
    var len = stored.length;
    if (len < 2) {
      current = current / 100;
    } else {
      current = String((stored[len - 2] / 100) * current);
    }
    screen(current);
  });

  // equals button
  $('.equals-btn').click(function() {
    stored.push(current);
    var result = stored.join(' ');
    current = String(eval(result));
    tempFlag = true;
    screen(current);
    stored = [];
  });

  // number pad
  $('.num-pad').each(function() {
    var element = $(this).text();
    $(this).click(function(){
      if (current === '0' || tempFlag) {
        current = '';
        tempFlag = false;
      }
      // stop if length limit is reached
      if (current.length < 15) {
        current += element;
        screen(current);
        $('.ac-btn').text('C');
      } else {
        console.log('maximum characters reached'); // ADD SCREEN DISPLAY
      }
    });
  });

  // decimal button (apply if not present)
  $('.decimal-btn').click(function(){
    if (current.indexOf('.') === -1) {
      current += '.';
      screen(current);
    }
  });

  // operator buttons
  $('.basic-ops').each(function() {
    $(this).click(function() {
      var op = $(this).text(),
          tempCurrent;
      op = opObj[op];
      stored.push(current);
      if (stored.length > 2) {
        var result = stored.join(' ');
        tempCurrent = String(eval(result));
      } else {
        tempCurrent = current;
      }
      stored.push(op);
      current = '0';
      screen(tempCurrent);
    });
  });

  // function to deal with screen output
  function screen(value) {
    if ((value.indexOf('e') === -1)) {
      var int = value.split('.'),
      len = int[0].length;
      // if decimal exceeds length round down
      if (int[1] && int[1].length > 2 && value.length > 14) {
        value = int.join('.');
        value = rounder(value, len);
      } else {
        value = int.join('.');
      }
      value = comma(value);
    }
    $('.screen').text(value);
  }

  // function to round down numbers if length exceeds screen size
  function rounder(value, len) {
    var decimals = 14 - len; // double check if number higher between 0-20 *********
    value = Number(Math.round(value +'e'+ decimals) + 'e-' + decimals);
    return String(value);
  }

  // function to add commas for large number visibility
  function comma(val) {
    var int = val.split('.');
    if (int[0].length > 3) {
      int[0] = int[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    val = int.join('.');
    return val;
  }

});
