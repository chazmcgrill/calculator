$(document).ready(function() {
  var current = '0',
      stored = [],
      tempValue = false;

  // DECIMAL VALUE FIX // Duplicating decimals
  // SCREEN SIZE
  // sum needs to show after basic ops used then another basic ops used

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
    if(len < 2) {
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
    tempValue = true;
    console.log(result + ' = ' + current);
    screen(current);
    stored = [];
  });

  // number pad
  $('.num-pad').each(function() {
    var element = $(this).text();
    $(this).click(function(){
      if(current === '0' || tempValue){
        current = '';
        tempValue = false;
      }
      console.log(element + " button clicked");
      current += element;
      screen(current);
      $('.ac-btn').text('C');
      console.log(Number(current));
    });
  });

  // operator buttons
  $('.basic-ops').each(function() {
    var op = $(this).text();
    $(this).click(function() {
      var opObj = { '−': '-', '×': '*', '÷': '/' },
          tempCurrent;
      if (op === '−' || op === '×' || op === '÷') {
        op = opObj[op];
      }
      console.log(op + ' button clicked');
      stored.push(current);
      stored.push(op);
      tempCurrent = current;
      current = '0';
      console.log(tempCurrent);
      screen(tempCurrent);
      console.log(stored);
    });
  });

  // function that finalises screen value
  function screen(val) {
    console.log('val = ' + val);
    if(val.length > 3) {
      console.log('over 3 characters');
      val = comma(val);
    }
    $('.screen').text(val);
  }

  // add commas for evry 3rd characters
  function comma(x) {
    var int = x.split('.');
    if (int[0].length > 3) {
      int[0] = int[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return int.join('.');
  }

});
