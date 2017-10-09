window.onload = init;

function init(){
  Grab all JQuery elements here and call functions, examples:
  $squares     = $('li');
  $button.on('click', reset);
}

actionAnswer etc lis .hide()

example of how you can hide a button and save it in a const to be referred to again within this function
$('li').on('click', function() {
  const $element = $(this);
  $element.hide('slow', 'swing', () => {
    setTimeout(function(){
      $element.show();
    }, 1000);
  });
});

var myObj (animalValues) = {
  key: value
  dog: img
  cat: img
};

const

functions
