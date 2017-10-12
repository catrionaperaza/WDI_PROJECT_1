window.onload = init;

let emotions = ['Dog','Cat','Rabbit','Horse','Fish','Bird']; //add in gifs here as bonus
let emotionsL2 = ['Dog','Cat','Rabbit','Horse','Fish','Bird','Dog','Cat','Rabbit','Horse','Fish','Bird'];
let actualEmotionAnswer = [];
let userEmotionAnswer = [];

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
  $windows.removeClass('hide-bg');
  $answerInstructions.hide();
  $correct.hide();
  assignClick();
}

function assignClick() {
  $windows.on('click', randomEmotion);
}

function randomEmotion(e) {
  console.log($level.html());
  if (currentLevel === 'Level 1') {
    buildLevel(emotions, e);
  } else if (currentLevel === 'Level 2') {
    console.log('randomEmotion - Level 2');
    buildLevel(emotionsL2, e);
  }
}

function buildLevel(emotions, event) {
  const emotionRandom = emotions[Math.floor(emotions.length * Math.random())];
  const emotionRemove = emotions.indexOf(emotionRandom);
  emotions.splice(emotionRemove,1);
  actualEmotionAnswer.push(emotionRandom);
  $(event.target).html(`<p class="text-emotion">${emotionRandom}</p>`);
  const newP = $('.text-emotion');

  setTimeout(function () {
    $(newP).fadeOut(1000, function() {
      $(newP).remove();
    });
  }, 1000);
  if (emotions <= 0) {
    setTimeout($changeNames,1000);
    $answerInstructions.show();
    $windows.off('click');
    $welcomeMessage.hide();
  }
}


function $changeNames() {
  for (var i = 0; i < $windows.length; i++) {
    $($windows[i]).html(`${$($windows[i]).attr('id')}`);
    $windows.addClass('selectEmotion');
    $windows.addClass('hide-bg');
  }
  checkMatch();
}

let userClicks = 0;

function checkMatch() {
  $windows.one('click', function() {
    const $clicked = $(this).attr('id');
    if ($clicked === actualEmotionAnswer[userClicks]) {
      console.log('correct');
      $correct.show();
      setTimeout(function () {
        $($correct).fadeOut();
      }, 300);
      userEmotionAnswer.push($clicked);
      userClicks++;

      console.log(userEmotionAnswer);
      console.log(currentLevel);
      if (currentLevel === 'Level 1' && userEmotionAnswer.length === 6) {
        nextLevel();
      } else if ($level.html() === 'Level 2' && userEmotionAnswer.length === 12) {
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
  animalsL2 = ['Dog','Cat','Rabbit','Horse','Fish','Bird','Dog','Cat','Rabbit','Horse','Fish','Bird'];
  $windows.show();
  $level.show();
  $body.addClass('hide-bg');
  $playAgain.hide();
  $welcomeMessage.show();
  $welcomeMessage.html('Click on each box to reveal an animal! How many can you remember?');
  $windows.removeClass('selectEmotion');
  $windows.removeClass('hide-bg');

  setTimeout(() => {
    assignClick();
  }, 1000);
}
