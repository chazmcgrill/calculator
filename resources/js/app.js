$(document).ready(function(){
  console.log('**document ready**');

  // stored value
  var current = "0",
      stored = [];

  // event listeners

  // top buttons
  $('.ac-btn').click(function(){
    console.log('clear button clicked');
    current = "0";
    $('.screen').text(current);
    stored = [];
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
    console.log(result);
    current = eval(result);
    $('.screen').text(current);
  });

  // number pad
  $('.num-pad').each(function() {
    console.log($(this).text());
    var element = $(this).text();
    $(this).click(function(){
      if(current === "0"){
        current = "";
      }
      console.log(element + " button clicked");
      current += element;
      $('.screen').text(current);
      console.log(Number(current));
    });
  });

  // operator buttons
  $('.basic-ops').each(function() {
    console.log($(this).text());
    var op = $(this).text();
    $(this).click(function() {
      var opObj = { "−": "-", "×": "*", "÷": '/'}
      if (op === "−" || op === "×" || op === "÷") {
        op = opObj[op];
        console.log(op);
      }
      stored.push(current);
      stored.push(op);
      current = "0";
      $('.screen').text(current);
      console.log(stored);
    });
  });

});
