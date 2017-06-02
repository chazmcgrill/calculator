$(document).ready(function() {
  var current = "0",
      stored = [],
      tempValue = false;

  // top buttons
  $('.ac-btn').click(function(){
    console.log('clear button clicked');
    current = "0";
    $('.screen').text(current);
    stored = [];
    console.log(stored);
  });

  $('.negate-btn').click(function(){
    if(current.indexOf('-') === -1 && current !== "0"){
      current = '-' + current;
    } else {
      current = current.replace('-', '');
    }
    $('.screen').text(current);
  });

  $('.percent-btn').click(function(){
    console.log('percent button clicked');
  });

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
      if(current === "0" || tempValue){
        current = "";
        tempValue = false;
      }
      console.log(element + " button clicked");
      current += element;
      $('.screen').text(current);
      console.log(Number(current));
    });
  });

  // operator buttons
  $('.basic-ops').each(function() {
    var op = $(this).text();
    $(this).click(function() {
      var opObj = { "−": "-", "×": "*", "÷": '/'}
      if (op === "−" || op === "×" || op === "÷") {
        op = opObj[op];
        console.log(op);
      }
      console.log(op + " button clicked");
      stored.push(current);
      stored.push(op);
      current = "0";
      $('.screen').text(current);
      console.log(stored);
    });
  });

});
