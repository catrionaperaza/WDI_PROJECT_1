window.onload = init;

console.log('dom has not loaded');

// dom hasn't loaded.
// const domElement = $('.hello');
// domElement === null
const animals = ['dog','cat','rabbit','horse','fish']; //add in gifs here as bonus
const actions = ['Pet It','Feed It','Love It','Sing To It','Wash It']; //add in gifs here as bonus
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
  console.log('dom has loaded');
  const $level = $('.level');
  const $windows = $('.windows');
  const $playWithMe = $('.playWithMe');
  const $animalAnswer = $('.animalAnswer');
  const $actionAnswer = $('.actionAnswer');
  const $playAgain = $('.playAgain');
  const $answers = $('.answers');

  $windows.on('click', randomAnimal);
  $answers.hide();
  $playAgain.hide();
}

function randomAnimal() {
  const animalRandom = animals[Math.floor(animals.length * Math.random())];
  actualAnimalAnswer.push(animalRandom);
  ($(this).text(animalRandom));
  console.log(animalRandom);
  animals.splice(animals.indexOf(animalRandom));
  $playWithMe.show();
  $playWithMe.on('click', randomAction);
}

function randomAction() {
  const actionRandom = actions[Math.floor(actions.length * Math.random())];
  actualActionAnswer.push(actionRandom);
  ($(this).text(actionRandom));
  console.log(actionRandom);
  getAnswer();
}


function getAnswer() {
  $answers.show();

}





//
// actionAnswer etc lis .hide()
//
// example of how you can hide a button and save it in a const to be referred to again within this function
// $('li').on('click', function() {
//   const $element = $(this);
//   $element.hide('slow', 'swing', () => {
//     setTimeout(function(){
//       $element.show();
//     }, 1000);
//   });
// });
//
// var myObj (animalValues) = {
//   key: value
//   dog: img
//   cat: img
// }; (try this way first as need these to be in an array to randomly pull one out-or could I have these in html as images and pull them out as jQuery then show them on the e-target? Ask if not working)
//
// const
//
// functions
//
// const lis = document.querySelectorAll('li'); (for playing audio)
//   for (var i = 0; i < lis.length; i++) {
//     lis[i].addEventListener('click', e => {
//       new Audio(`../sounds/${e.target.id}.wav`).play();
//     });
//   }
// };
//
// function gameOver() {
//   $submit.off('click');
//   $display.html('Game Over');
//   $input.val('');
