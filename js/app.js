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
  $level.html('Level 1');
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
  if ($level.html() === 'Level 1') {
    const animalRandom = animals[Math.floor(animals.length * Math.random())];
    const animalRemove = animals.indexOf(animalRandom);
    animals.splice(animalRemove,1);
    actualAnimalAnswer.push(animalRandom);
    console.log(actualAnimalAnswer);
    console.log('level one random animal working');
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
  }else if ($level.html() === 'Level 2') {
    $welcomeMessage.html('This time choose 12 animals!');
    const animalRandomL2 = animalsL2[Math.floor(animalsL2.length * Math.random())];
    const animalRemoveL2 = animalsL2.indexOf(animalRandomL2);
    animalsL2.splice(animalRemoveL2,1);
    actualAnimalAnswer.push(animalRandomL2);
    console.log(actualAnimalAnswer);
    console.log('level two random animal working');
    ($(this).html(`<p class="text-animal">${animalRandomL2}</p>`));
    const newP = $('.text-animal');
    setTimeout(function () {
      $(newP).fadeOut(1000, function() {
        $(newP).remove();
      });
    }, 1000);
    if (animalsL2 <= 0) {
      setTimeout($changeNames,1000);
      $answerInstructions.show();
      $windows.off('click');
      $welcomeMessage.hide();
    }
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
      if ($level.html() ==='Level 1' && userAnimalAnswer.length === 6); {
      nextLevel();
    } else if ($level.html() ==='Level 2' && userAnimalAnswer.length === 12) {
    nextLevel();
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
  if ($level.html() === 'Level 1') {
    console.log('game one over');
    $playAgain.show();
    $playAgain.html('Play Level 2?');
    setTimeout(function () {
      $($level).html('Level 2');
    }, 1000);
    $playAgain.one('click', $playGameAgain);
  }else {
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
