window.onload = init;

const animals = ['Dog','Cat','Rabbit','Horse','Fish','Bird']; //add in gifs here as bonus
let actualAnimalAnswer = [];
// const actualActionAnswer = [];
let userAnimalAnswer = []; //push id from animal buttons in here
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
  // $playWithMe.hide();
  $playAgain.hide();
  $answerInstructions.hide();
  $windows.on('click', randomAnimal);
}

function randomAnimal(e) {
  $title.hide();
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
  }, 2000);
  console.log(animalRandom);
  if (animals <= 0) {
    setTimeout($assignNames,2000);
    $message.hide();
    $answerInstructions.show();
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
  console.log('Got to this point');
  $($windows).off('click');
  $dog.html('Dog');
  // $dog.on('click', push);
  $cat.html('Cat');
  // $cat.on('click', push);
  $fish.html('Fish');
  // $fish.on('click', push);
  $bird.html('Bird');
  // $bird.on('click', push);
  $horse.html('Horse');
  // $horse.on('click', push);
  $rabbit.html('Rabbit');
  // $rabbit.on('click', push);
  checkMatch();
}



// function push(e) {
//   userAnimalAnswer.push(e.target.id);
//   console.log(e.target.id);
//   if (userAnimalAnswer.length === 6) {
//     winner();
//   }
// }

// function winner() {
//   $answerInstructions.hide();
//   $level.hide();
//   $windows.hide();
//   $nextChoice.hide();
//   $title.hide();
//   $body.removeClass('hide-bg');

//win logic not working
//text staying at top of box

let userClicks = 0;


function checkMatch() {
  $windows.one('click', function(e) {
    $title.hide();
    $message.show();
    const $clicked = $(e.target).attr('id');
    if ($clicked === actualAnimalAnswer[userClicks]) {
      console.log('correct');
      $message.text('correct!');
      userAnimalAnswer.push($clicked);
      userClicks++;
      if(userAnimalAnswer.length === 6) {
        console.log('game over');
        $answerInstructions.hide();
        $nextChoice.hide();
        $windows.hide();
        $level.hide();
        $body.removeClass('hide-bg');
        $message.html('Well Done! You got them all correct! You would make a great pet owner!');
        $playAgain.show();
      }
    } else {
      console.log('wrong');
      $answerInstructions.hide();
      $nextChoice.hide();
      $windows.hide();
      $level.hide();
      $body.removeClass('hide-bg');
      $message.text('Uh oh! Wrong answer but nice try! Do you want to play again?');
      $playAgain.show();
    }
  });
  $playAgain.one('click', $playGameAgain);
}
//try to get the correct button to pulse every time answer is correct 
function $playGameAgain() {
  const clear = $windows.text;
  $(clear).remove();
  $title.show();
  $message.hide();
  actualAnimalAnswer = [];
  userAnimalAnswer = [];
  animals.push['Dog','Cat','Rabbit','Horse','Fish','Bird'];
  $windows.show();
  $level.show();
  $body.addClass('hide-bg');
  $nextChoice.show();
  init();
}
