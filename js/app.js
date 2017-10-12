window.onload = init;

let emotions = ['Happy','Sad','Excited','Bored'];
let emotionsL2 = ['Happy','Sad','Excited','Bored','Angry','Proud','Pensive','Tired','Hungry'];
let actualEmotionAnswer = [];
let userEmotionAnswer = [];

let $level = null;
let $windows = null;
let $playAgain = null;
let $answerInstructions = null;
let $welcomeMessage = null;
let $gameOutcome = null;
let $main = null;
let $correct = null;
let $playLevel2 = null;
let $level2windows = null;
let currentLevel;

function init(){
  $level = $('.level');
  $windows = $('.windows');
  $welcomeMessage = $('.welcomeMessage');
  $playAgain = $('.playAgain');
  $answerInstructions = $('.answerInstructions');
  $main = $('main');
  $correct = $('.correct');
  $gameOutcome = $('.gameOutcome');
  $playLevel2 = $('.playLevel2');
  $level2windows = $('.level2w');
  currentLevel = 1;
  $level.html(`Level ${currentLevel}`);
  $playLevel2.hide();
  $playAgain.show(); //change back to hide
  $playAgain.html('Play Again?');
  $windows.removeClass('show-bg');
  $answerInstructions.hide();
  $correct.hide();
  $level2windows.hide();
  assignClick();
}

function assignClick() {
  $windows.on('click', randomEmotion);
}

function randomEmotion(e) {
  if (currentLevel === 1) {
    buildLevel(emotions, e);
  } else if (currentLevel === 2) {
    buildLevel(emotionsL2, e);
  }
}

function buildLevel(emotions, event) {
  const emotionRandom = emotions[Math.floor(emotions.length * Math.random())];
  const emotionRemove = emotions.indexOf(emotionRandom);
  emotions.splice(emotionRemove,1);
  actualEmotionAnswer.push(emotionRandom);
  console.log(actualEmotionAnswer);

  $(event.target).html(`<p class="text-emotion">${emotionRandom}</p>`);
  const newP = $('.text-emotion');
  setTimeout(function () {
    $(newP).fadeOut(1000, function() {
      console.log($(newP));
      $(newP).removeClass();
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
    $windows.addClass('show-bg');
  }
  checkMatch();
  $($windows).addClass('flash');
}

let userClicks = 0;

function checkMatch() {
  $windows.one('click', function() {
    const $clicked = $(this).attr('id');
    if ($clicked === actualEmotionAnswer[userClicks]) {
      $correct.show();
      setTimeout(function () {
        $($correct).fadeOut();
      }, 300);
      userEmotionAnswer.push($clicked);
      userClicks++;

      if (currentLevel === 1 && userEmotionAnswer.length === 4) {
        nextLevel();
      } else if (currentLevel === 2 && userEmotionAnswer.length === 9) {
        nextLevel();
      }
    } else {
      console.log('wrong');
      $answerInstructions.hide();
      $gameOutcome.html('Wrong answer! Have another go!');
      $playAgain.html('Play Again?');
      $playAgain.show();
      $windows.hide();
      $level2windows.hide();
      $level.hide();
      currentLevel = 1;
      $($level).html(`Level ${currentLevel}`);
      $main.addClass('oneWrong');
      $playAgain.one('click', $playGameAgain);
    }
  });
}

function nextLevel() {
  $level.hide();
  $answerInstructions.hide();
  $gameOutcome.html('Boom! You got them all correct!');
  $windows.hide();
  $level2windows.hide();
  $main.addClass('allCorrect');

  if (currentLevel === 1) {
    $playAgain.show();
    $playAgain.html('Play Level 2?');
    setTimeout(function () {
      currentLevel = 2;
      $($level).html(`Level ${currentLevel}`);
    }, 1000);
    $playAgain.one('click', $playGameAgain);
  } else {
    $playAgain.show();
    $playAgain.html('Play Again?');
    currentLevel = 1;
    $($level).html(`Level ${currentLevel}`);
    $level.hide();
    $playAgain.one('click', $playGameAgain);
    $level2windows.hide();
  }
}

function $playGameAgain() {
  $($main).removeClass();
  userClicks = 0;
  $windows.off('click');
  $windows.text('');
  $gameOutcome.text('');
  actualEmotionAnswer = [];
  userEmotionAnswer = [];
  emotions = ['Happy','Sad','Excited','Bored'];
  emotionsL2 = ['Happy','Sad','Excited','Bored','Angry','Proud','Pensive','Tired','Hungry'];
  $windows.show();
  $level2windows.hide();
  $level.show();
  $playAgain.hide();
  $welcomeMessage.show();
  $welcomeMessage.html('Click on each box to reveal an emotion! How many can you remember?');
  $windows.removeClass('selectEmotion');

  if (currentLevel === 2) {
    $windows.css('width', `${400/3}px`);
    $windows.css('height', `${400/3}px`);
    $windows.removeClass('show-bg');
    $level2windows.show();
  }
  else {
    
  }

  setTimeout(() => {
    assignClick();
  }, 1000);
}
