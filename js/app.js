window.onload = init;

const animals = ['Dog','Cat','Rabbit','Horse','Fish','Bird']; //add in gifs here as bonus
const actualAnimalAnswer = [];
// const actualActionAnswer = [];
const userAnimalAnswer = []; //push id from animal buttons in here
// const userActionAnswer = []; //push id from action buttons in here
let $level = null;
let $windows = null;
// let $playWithMe = null;
// let $actionAnswer = null;
let $playAgain = null;
let $dog = null;
let $cat = null;
let $horse = null;
let $fish = null;
let $bird = null;
let $rabbit = null;
let $answerInstructions = null;
let $message = null;
let $body = null;
let $nextChoice = null;
let $title = null;

function init(){
  $level = $('.level');
  $windows = $('.windows');
  // $playWithMe = $('button.playWithMe');
  // $actionAnswer = $('.actionAnswer');
  $dog = $('#Dog');
  $cat = $('#Cat');
  $rabbit = $('#Rabbit');
  $dog = $('#Dog');
  $bird = $('#Bird');
  $fish = $('#Fish');
  $horse = $('#Horse');
  $message = $('.message');
  $playAgain = $('.playAgain');
  $answerInstructions = $('.answerInstructions');
  $body = $('body');
  $title = $('.title');
  $nextChoice = $('.nextChoice');
  // $actionAnswer.hide();
  $playAgain.hide();
  // $playWithMe.hide();
  $answerInstructions.hide();
  $windows.on('click', randomAnimal);
}

function randomAnimal() {
  const animalRandom = animals[Math.floor(animals.length * Math.random())];
  actualAnimalAnswer.push(animalRandom);
  const animalRemove = animals.indexOf(animalRandom);
  animals.splice(animalRemove,1);
  console.log(animals);
  ($(this).html(`<p class="text-animal">${animalRandom}</p>`));
  const newP = $('.text-animal');
  setTimeout(function () {
    $(newP).fadeOut();
  }, 1000);
  setTimeout(function () {
    $(newP).remove();
  }, 1000);
  console.log(animalRandom);
  if (animals <= 0) {
    getAnswer();
  }
}

// $playWithMe.show();
// $playWithMe.on('click',chooseAction);

// function chooseAction() {
//   $actionAnswer.show();
//   $actionAnswer.on('click',logAction);
//   function logAction(e) {
//     const actionAnswers = e.target.id;
//     actualActionAnswer.push(actionAnswers);
//     console.log(actualActionAnswer);
//   }
// }

function $assignNames() {
  $($windows).off('click');
  $dog.html('Dog');
  $dog.on('click', push);
  $cat.html('Cat');
  $cat.on('click', push);
  $fish.html('Fish');
  $fish.on('click', push);
  $bird.html('Bird');
  $bird.on('click', push);
  $horse.html('Horse');
  $horse.on('click', push);
  $rabbit.html('Rabbit');
  $rabbit.on('click', push);
}

function getAnswer() {
  console.log('Got to this point');
  $answerInstructions.show();
  setTimeout(function () {
    $($assignNames()).fadeIn();
  }, 1000);
}

function push(e) {
  $nextChoice.text('Thanks! Now choose the next animal!');
  userAnimalAnswer.push(e.target.id);
  console.log(e.target.id);
  if (userAnimalAnswer.length === 6) {
    winner();
    console.log('Okay 6');
    console.log(actualAnimalAnswer, userAnimalAnswer);
  }
}

function winner() {
  $answerInstructions.hide();
  $level.hide();
  $windows.hide();
  $nextChoice.hide();
  $title.hide();
  $body.removeClass('hide-bg');

  let toWin = true;

  for (var i = 0; i < userAnimalAnswer.length; i++) {
    if (actualAnimalAnswer[i].indexOf(userAnimalAnswer[i]) !== -1) {
      toWin = false;
      $message.html('Well Done! You would make a great pet owner!');
    } else {
      toWin = true;
      $message.html('Unlucky! I\'m sure you would still make a great pet owner!');
    }
  }
}

//   if ($actualAnimalAnswer === $userAnimalAnswer) {
//     console.log('yes');
//     $message.html('Well Done! You would make a great pet owner!');
//   } else {
//     console.log('no');
//     $message.html('Unlucky! I\'m sure you would still make a great pet owner!');
//   }
// }
