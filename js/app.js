window.onload = init;

// dom hasn't loaded.
// const domElement = $('.hello');
// domElement === null
const animals = ['dog','cat','rabbit','horse','fish','parrot']; //add in gifs here as bonus
const actions = ['Pet It','Feed It','Love It','Sing To It','Wash It','Bring It For Walk']; //add in gifs here as bonus
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
let $answers = null;


function init(){
  $level = $('.level');
  $windows = $('.windows');
  $playWithMe = $('#playWithMe');
  $animalAnswer = $('.animalAnswer');
  $actionAnswer = $('.actionAnswer');
  $playAgain = $('.playAgain');
  $answers = $('.answers');
  $answers.hide();
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
  console.log(animalRemove);
  animals.splice(animalRemove,1);
  console.log(animals);
  $playWithMe.show();
  $playWithMe.on('click', randomAction);
}


function randomAction() {
  const actionRandom = actions[Math.floor(actions.length * Math.random())];
  actualActionAnswer.push(actionRandom);
  ($(this).text(actionRandom));
  console.log(actionRandom);
  const actionRemove = actions.indexOf(actionRandom);
  console.log(actionRemove);
  actions.splice(actionRemove,1);
  console.log(actions);
  if (actions.length>=7) {
    getAnswer();
  }       getAnswer();
}


function getAnswer() {

  $answers.show();
  $answers.on('click', gettingAnswer);
  function gettingAnswer() {
    if ($(this) === userAnimalAnswer) {
      userAnimalAnswer.push($(this).val());
    } else {
      userActionAnswer.push($(this).val());
    }
  }
}


function gameOver() {
  $windows.off('click');
  $level.html('Game Over');
}
