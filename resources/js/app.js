$(document).ready(function(){
  console.log('**document ready**');

  // stored value
  var current = "",
      stored = 0;

  // event listeners

  // top buttons
  $('.ac-btn').click(function(){
    console.log('clear button clicked');
    current = "0";
    $('.screen').text(current);
  });

  $('.negate-btn').click(function(){
    console.log('negate button clicked');
    if(current.indexOf('-') === -1 && current !== "0"){
      current = '-' + current;
      $('.screen').text(current);
    } else {
      // REMOVE NEGATE SYMBOL
      console.log(current.indexOf('-'));
    }
  });

  $('.percent-btn').click(function(){
    console.log('percent button clicked');
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

});
