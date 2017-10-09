window.onload = init;

// dom hasn't loaded.
// const domElement = $('.hello');
// domElement === null
const animals = ['dog','cat','rabbit','horse','fish','parrot']; //add in gifs here as bonus
const actualAnimalAnswer = [];
const actualActionAnswer = [];
const userAnimalAnswer = []; //push id from animal buttons in here
const userActionAnswer = []; //push id from action buttons in here
let $level = null;
let $windows = null;
let $playWithMe = null;
let $animalAnswer = null;
let $actionAnswer = null;
let $playAgain = null;


function init(){
  $level = $('.level');
  $windows = $('.windows');
  $playWithMe = $('#playWithMe');
  $animalAnswer = $('.animalAnswer');
  $actionAnswer = $('.actionAnswer');
  $playAgain = $('.playAgain');
  $animalAnswer.hide();
  $actionAnswer.hide();
  $playAgain.hide();
  $playWithMe.hide();
  $windows.on('click', randomAnimal);
}

function randomAnimal() {
  const animalRandom = animals[Math.floor(animals.length * Math.random())];
  actualAnimalAnswer.push(animalRandom);
  ($(this).text(animalRandom));
  console.log(animalRandom);
  const animalRemove = animals.indexOf(animalRandom);
  animals.splice(animalRemove,1);
  console.log(animals);
  $playWithMe.show();
  console.log($playWithMe);
  $playWithMe.on('click',chooseAction);
}


function chooseAction() {
  $actionAnswer.show();
  $actionAnswer.on('click',logAction);
  function logAction(e) {
    const actionAnswers = e.target.id;
    actualActionAnswer.push(actionAnswers);
    console.log(actionAnswers);
  }
}
// getAnswer();


//
// function getAnswer() {
//
//   $answers.show();
//   $answers.on('click', gettingAnswer);
//   function gettingAnswer() {
//     if ($(this) === userAnimalAnswer) {
//       userAnimalAnswer.push($(this).val());
//     } else {
//       userActionAnswer.push($(this).val());
//     }
//   }
// }
//
//
// function gameOver() {
//   $windows.off('click');
//   $level.html('Game Over');
// }
