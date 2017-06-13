$(document).ready(function() {
  var opObj = { '−': '-', '×': '*', '÷': '/', '+': '+'},
      current = '0',
      stored = [],
      tempFlag = false,
      decimalFlag = false;

  // SCREEN SIZE LIMIT DECIMALS - 14
  // Refactor using closures

  // clear button
  $('.ac-btn').click(function(){
    var acStatus = $('.ac-btn').text();
    if (acStatus === 'C') {
      console.log('clear button clicked');
      current = '0';
      $('.ac-btn').text('AC');
    } else {
      console.log('all-clear button clicked');
      stored = [];
    }
    screen(current);
    console.log(stored);
  });

  // negate button
  $('.negate-btn').click(function(){
    if (current.indexOf('-') === -1 && current !== '0') {
      current = '-' + current;
    } else {
      current = current.replace('-', '');
    }
    screen(current);
  });

  // percent button
  $('.percent-btn').click(function(){
    var len = stored.length;
    if (len < 2) {
      current = current / 100;
    } else {
      current = (stored[len - 2] / 100) * current;
    }
    screen(current);
  });

  // equals button
  $('.equals-btn').click(function(){
    console.log('equals button clicked');
    stored.push(current);
    var result = stored.join(' ');
    current = String(eval(result));
    tempFlag = true;
    console.log(result + ' = ' + current);
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
      console.log(element + " button clicked");
      // stop if length limit is reached
      if (current.length < 15) {
        current += element;
        screen(current);
        $('.ac-btn').text('C');
      } else {
        console.log('maximum characters reached');
      }
      console.log(Number(current));
    });
  });

  // decimal button
  $('.decimal-btn').click(function(){
    if (current.indexOf('.') === -1) {
      current += '.';
      screen(current);
      decimalFlag = true;
    }
  });

  // operator buttons
  $('.basic-ops').each(function() {
    $(this).click(function() {
      var op = $(this).text(),
          tempCurrent;

      op = opObj[op];
      console.log(op + ' button clicked');
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
      console.log(stored);

    });
  });

  // // function that finalises screen value
  // function screen(val) {
  //   console.log('val = ' + val);
  //   if (val.length > 3) {
  //     console.log('over 3 characters');
  //     val = comma(val);
  //   }
  //   // screen overflow
  //   if (val.length > 16) {
  //     y = 13 - val.length
  //     val = val.slice(0, y);
  //     val += 'e+' + Math.abs(y);
  //   }
  //   if (val.length > 16 && decimalFlag) {
  //     console.log('hello');
  //   }
  //   $('.screen').text(val);
  // }
  //
  // // add commas for every 3rd characters
  // function comma(x) {
  //   var int = x.split('.');
  //   if (int[0].length > 3) {
  //     int[0] = int[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  //   }
  //   return int.join('.');
  // }

  // // decimal rounder
  // function decimal(num) {
  //   var int = num.split('.'),
  //       dif = 15 - int[0].length,
  //       val = Number(num);
  //   num = String(val.toFixed(dif));
  //   console.log("num = " + num);
  //   return num;
  // }

  function screen(value) {
    console.log('pre screen value = ' + value);
    var int = value.split('.'),
        len = int[0].length;
    // int[0] = comma(int[0]);
    if (int[1] && value.length > 13) {
      value = int.join('.');
      value = rounder(value, len);
    } else {
      value = int.join('.');
    }
    console.log(int);
    $('.screen').text(value);
  }

  function comma(val) {
    val = val.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    return val;
  }

  function rounder(val, len) {
    console.log('hello');
    val = Number(val);
    val = val.toFixed(14 - len);
    console.log('rounded val = ' + val);
    return val;
  }

});
