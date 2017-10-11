window.onload = init;

let animals = ['Dog','Cat','Rabbit','Horse','Fish','Bird']; //add in gifs here as bonus
let actualAnimalAnswer = [];
let userAnimalAnswer = []; //push id from animal buttons in here
let $level = null;
let $windows = null;
let $playAgain = null;
let $answerInstructions = null;
let $welcomeMessage = null;
let $gameOutcome = null;
let $body = null;
let $correct = null;

function init(){
  $level = $('.level');
  $windows = $('.windows');
  $welcomeMessage = $('.welcomeMessage');
  $playAgain = $('.playAgain');
  $answerInstructions = $('.answerInstructions');
  $body = $('body');
  $correct = $('.correct');
  $gameOutcome = $('.gameOutcome');
  $playAgain.hide();
  $answerInstructions.hide();
  $correct.hide();
  assignClick();
}

function assignClick() {
  console.log('animalAnswer', actualAnimalAnswer, 'userAnswer', userAnimalAnswer);
  $windows.on('click', randomAnimal);
}

function randomAnimal() {
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
    $welcomeMessage.hide();
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
    const $clicked = $(this).attr('id');
    console.log($clicked);
    console.log(actualAnimalAnswer);
    if ($clicked === actualAnimalAnswer[userClicks]) {
      console.log('correct');
      $correct.show();
      setTimeout(function () {
        $($correct).fadeOut();
      }, 1000);
      userAnimalAnswer.push($clicked);
      console.log(userAnimalAnswer);
      userClicks++;
      if(userAnimalAnswer.length === 6) {
        console.log('game over');
        $gameOutcome.html('Well Done! You got them all correct! You would make a great pet owner!');
        $windows.hide();
        $level.hide();
        $body.removeClass('hide-bg');
        $playAgain.show();
      }
    } else {
      console.log('wrong');
      $answerInstructions.show();
      $windows.hide();
      $level.hide();
      $body.removeClass('hide-bg');
      $gameOutcome.html('Uh oh! Wrong answer but nice try! Do you want to play again?');
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
  $gameOutcome.text('');
  actualAnimalAnswer = [];
  userAnimalAnswer = [];
  animals = ['Dog','Cat','Rabbit','Horse','Fish','Bird'];
  $windows.show();
  $level.show();
  $body.addClass('hide-bg');
  $playAgain.hide();
  $answerInstructions.hide();
  $welcomeMessage.show(); 

  setTimeout(() => {
    assignClick();
  }, 1000);
}
