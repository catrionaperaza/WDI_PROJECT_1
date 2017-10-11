window.onload = init;

let animals = ['Dog','Cat','Rabbit','Horse','Fish','Bird']; //add in gifs here as bonus
let animalsL2 = ['Dog','Cat','Rabbit','Horse','Fish','Bird', 'Dog','Cat','Rabbit','Horse','Fish','Bird'];
let actualAnimalAnswer = [];
let userAnimalAnswer = [];

let $level = null;
let $windows = null;
let $playAgain = null;
let $answerInstructions = null;
let $welcomeMessage = null;
let $gameOutcome = null;
let $body = null;
let $correct = null;
let $playLevel2 = null;
let currentLevel;

function init(){
  $level = $('.level');
  $windows = $('.windows');
  $welcomeMessage = $('.welcomeMessage');
  $playAgain = $('.playAgain');
  $answerInstructions = $('.answerInstructions');
  $body = $('body');
  $correct = $('.correct');
  $gameOutcome = $('.gameOutcome');
  $playLevel2 = $('.playLevel2');
  currentLevel = 'Level 1';
  $level.html(currentLevel);
  $playLevel2.hide();
  $playAgain.hide();
  $answerInstructions.hide();
  $correct.hide();
  assignClick();
}

function assignClick() {
  $windows.on('click', randomAnimal);
}

function randomAnimal() {
console.log($level.html());
  if (currentLevel === 'Level 1') {
    buildLevel(animals)
  } else if (currentLevel === 'Level 2') {
console.log('randomAnimal - Level 2')
    buildLevel(animalsL2)
  }
}

function buildLevel(animals) {
  const animalRandom = animals[Math.floor(animals.length * Math.random())];
  const animalRemove = animals.indexOf(animalRandom);
  animals.splice(animalRemove,1);
  actualAnimalAnswer.push(animalRandom);
console.log(actualAnimalAnswer);
console.log(`${currentLevel} random animal working`);
console.log($(this))
  $(this).html(`<p class="text-animal">${animalRandom}</p>`);
console.log('AFTER', $(this))
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
    $windows.addClass('selectAnimal');
  }
  checkMatch();
}

let userClicks = 0;

function checkMatch() {
  $windows.one('click', function() {
    const $clicked = $(this).attr('id');
    if ($clicked === actualAnimalAnswer[userClicks]) {
console.log('correct');
      $correct.show();
      setTimeout(function () {
        $($correct).fadeOut();
      }, 300);
      userAnimalAnswer.push($clicked);
      userClicks++;

console.log(userAnimalAnswer);
console.log(currentLevel)
      if (currentLevel === 'Level 1' && userAnimalAnswer.length === 6) {
        nextLevel();
      } else if ($level.html() === 'Level 2' && userAnimalAnswer.length === 12) {
        nextLevel();
      } else {
        console.log('Correct, keep playing...');
      }
    } else {
      console.log('wrong');
      $answerInstructions.hide();
      $gameOutcome.html('Uh oh! Wrong answer but nice try! Do you want to play again?');
      $playAgain.html('Play Again?');
      $playAgain.show();
      $windows.hide();
      $level.hide();
      $level.html('Level 1');
      $body.removeClass('hide-bg');
      $playAgain.one('click', $playGameAgain);
    }
  });
}

function nextLevel() {
  console.log('at next level');
  $level.hide();
  $answerInstructions.hide();
  $gameOutcome.html('Well Done! You got them all correct! You would make a great pet owner!');
  $windows.hide();
  $body.removeClass('hide-bg');

  if (currentLevel === 'Level 1') {
console.log('game one over');
    $playAgain.show();
    $playAgain.html('Play Level 2?');
    setTimeout(function () {
      currentLevel = 'Level 2';
      $($level).html(currentLevel);
    }, 1000);
    $playAgain.one('click', $playGameAgain);
  } else {
console.log('game two over');
    $playAgain.show();
    $playAgain.html('Play Again?');
console.log('level2');
    $level.hide();
    $playAgain.one('click', $playGameAgain);
  }
}

function $playGameAgain() {
  userClicks = 0;
  $windows.off('click');
  $windows.text('');
  $gameOutcome.text('');
  actualAnimalAnswer = [];
  userAnimalAnswer = [];
  animals = ['Dog','Cat','Rabbit','Horse','Fish','Bird'];
  animalsL2 = ['Dog','Cat','Rabbit','Horse','Fish','Bird', 'Dog','Cat','Rabbit','Horse','Fish','Bird'];
  $windows.show();
  $level.show();
  $body.addClass('hide-bg');
  $playAgain.hide();
  $welcomeMessage.show();
  $welcomeMessage.html('Click on each box to reveal an animal! How many can you remember?');
  $windows.removeClass('selectAnimal');

  setTimeout(() => {
    assignClick();
  }, 1000);
}
