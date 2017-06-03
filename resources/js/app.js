$(document).ready(function() {
  var current = '0',
      stored = [],
      tempValue = false;

  // DECIMAL VALUE FIX
  // SCREEN SIZE
  // UNIT SEPERATORS

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
    $('.screen').text(current);
    console.log(stored);
  });

  // negate button
  $('.negate-btn').click(function(){
    if (current.indexOf('-') === -1 && current !== '0') {
      current = '-' + current;
    } else {
      current = current.replace('-', '');
    }
    $('.screen').text(current);
  });

  // percent button
  $('.percent-btn').click(function(){
    var len = stored.length;
    if(len < 2) {
      current = current / 100;
    } else {
      current = (stored[len - 2] / 100) * current;
    }
    $('.screen').text(current);
  });

  // equals button
  $('.equals-btn').click(function(){
    console.log('equals button clicked');
    stored.push(current);
    var result = stored.join(' ');
    current = eval(result);
    tempValue = true;
    console.log(result + ' = ' + current);
    $('.screen').text(current);
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
      $('.screen').text(current);
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
      $('.screen').text(tempCurrent);
      console.log(stored);
    });
  });

});
