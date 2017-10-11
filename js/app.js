window.onload = init;

let animals = ['Dog','Cat','Rabbit','Horse','Fish','Bird']; //add in gifs here as bonus
let actualAnimalAnswer = [];
let userAnimalAnswer = []; //push id from animal buttons in here
let $level = null;
let $windows = null;
let $playAgain = null;
let $answerInstructions = null;
let $message = null;
let $body = null;
let $nextChoice = null;
let $title = null;

function init(){
  $level = $('.level');
  $windows = $('.windows');
  $message = $('.message');
  $playAgain = $('.playAgain');
  $answerInstructions = $('.answerInstructions');
  $body = $('body');
  $title = $('.title');
  $nextChoice = $('.nextChoice');
  $playAgain.hide();
  $answerInstructions.hide();
  $message.hide();
  assignClick();
}

function assignClick() {
  console.log('animalAnswer', actualAnimalAnswer, 'userAnswer', userAnimalAnswer);
  $windows.on('click', randomAnimal);
}

function randomAnimal() {
  $title.hide();
  const animalRandom = animals[Math.floor(animals.length * Math.random())];
  const animalRemove = animals.indexOf(animalRandom);
  animals.splice(animalRemove,1);
  actualAnimalAnswer.push(animalRandom);
  console.log(actualAnimalAnswer);
  ($(this).html(`<p class="text-animal">${animalRandom}</p>`));
  const newP = $('.text-animal');
  setTimeout(function () {
    $(newP).fadeOut(1000, function() {
      $(newP).remove();
    });
  }, 1000);
  if (animals <= 0) {
    setTimeout($changeNames,1000);
    $answerInstructions.show();
    $windows.off('click');
  }
}

function $changeNames() {
  for (var i = 0; i < $windows.length; i++) {
    $($windows[i]).html(`${$($windows[i]).attr('id')}`);
  }
  checkMatch();
}


//text staying at top of box

let userClicks = 0;

function checkMatch() {
  $windows.one('click', function() {
    $title.hide();
    $message.show();
    const $clicked = $(this).attr('id');
    console.log($clicked);
    console.log(actualAnimalAnswer);
    if ($clicked === actualAnimalAnswer[userClicks]) {
      console.log('correct');
      $message.text('Correct! Try the next one!');
      setTimeout(function () {
        $($message).hide();
      }, 1000);
      userAnimalAnswer.push($clicked);
      console.log(userAnimalAnswer);
      userClicks++;
      if(userAnimalAnswer.length === 6) {
        console.log('game over');
        $message.show();
        $message.html('Well Done! You got them all correct! You would make a great pet owner!');
        $nextChoice.hide();
        $windows.hide();
        $level.hide();
        $body.removeClass('hide-bg');
        $playAgain.show();
      }
    } else {
      console.log('wrong');
      $nextChoice.hide();
      $windows.hide();
      $level.hide();
      $body.removeClass('hide-bg');
      $message.show();
      $message.html('Uh oh! Wrong answer but nice try! Do you want to play again?');
      $playAgain.show();
    }
  });

  console.log('I\'m running');
  $playAgain.one('click', $playGameAgain);
}

function $playGameAgain() {
  userClicks = 0;
  $windows.off('click');
  $windows.text('');
  $title.show();
  actualAnimalAnswer = [];
  userAnimalAnswer = [];
  animals = ['Dog','Cat','Rabbit','Horse','Fish','Bird'];
  $windows.show();
  $level.show();
  $body.addClass('hide-bg');
  $nextChoice.show();
  $playAgain.hide();
  // $answerInstructions.hide();
  // $answerInstructions.html('Select the animals in the correct sequence!');


  setTimeout(() => {
    assignClick();
  }, 1000);
}
