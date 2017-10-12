window.onload = init;

let emotions = ['Happy','Sad','Excited','Bored'];
let emotionsL2 = ['Happy','Sad','Excited','Bored','Angry','Proud','Pensive','Tired','Hungry'];
let actualEmotionAnswer = [];
let userEmotionAnswer = [];

let $level = null;
let $windows = null;
let $playAgain = null;
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
  $main = $('main');
  $correct = $('.correct');
  $gameOutcome = $('.gameOutcome');
  $playLevel2 = $('.playLevel2');
  $level2windows = $('.level2w');
  currentLevel = 1;
  $level.html(`Level ${currentLevel}`);
  $playLevel2.hide();
  $playAgain.hide();
  $playAgain.html('Play Again?');
  $windows.removeClass('show-bg');
  $welcomeMessage.show();
  $correct.hide();
  $level2windows.hide();
  $gameOutcome.hide();
  $windows.addClass('txt-fx1');
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
    $welcomeMessage.html('Can you click on the emotions in the order you saw them?');
    $windows.off('click');
  }
}


function $changeNames() {
  for (var i = 0; i < $windows.length; i++) {
    $($windows[i]).html(`${$($windows[i]).attr('id')}`);
    $($windows).addClass('flash');
    $($windows).addClass('show-bg');
  }
  checkMatch();
}

let userClicks = 0;

function checkMatch() {
  $windows.one('click', function() {
    const $clicked = $($(this)).attr('id');
    console.log($clicked);
    if ($clicked === actualEmotionAnswer[userClicks]) {
      console.log('correct answer');
      $correct.show();
      setTimeout(function () {
        $($correct).fadeOut();
      }, 1000);
      userEmotionAnswer.push($clicked);
      userClicks++;

      if (currentLevel === 1 && userEmotionAnswer.length === 4) {
        $correct.hide();
        nextLevel();
      } else if (currentLevel === 2 && userEmotionAnswer.length === 9) {
        $correct.hide();
        nextLevel();
      }
    } else {
      $welcomeMessage.hide();
      $gameOutcome.show();
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
  $welcomeMessage.hide();
  $windows.hide();
  $level2windows.hide();
  $main.addClass('allCorrect');
  $gameOutcome.show();
  $gameOutcome.html('Boom! You got them all correct!');

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
  $gameOutcome.hide();
  actualEmotionAnswer = [];
  userEmotionAnswer = [];
  emotions = ['Happy','Sad','Excited','Bored'];
  emotionsL2 = ['Happy','Sad','Excited','Bored','Angry','Proud','Pensive','Tired','Hungry'];
  $windows.show();
  $level2windows.hide();
  $level.show();
  $playAgain.hide();
  $welcomeMessage.show();
  $welcomeMessage.html('Click on each box, try to remember the sequence!');

  if (currentLevel === 2) {
    $windows.css('width', `${400/3}px`);
    $windows.css('height', `${400/3}px`);
    $windows.removeClass('show-bg');
    $level2windows.show();
    $windows.removeClass('txt-fx1');
    $windows.addClass('txt-fx2'); //added this !
  } else {
    $windows.css('width', `${400/2}px`);
    $windows.css('height', `${400/2}px`);
    $windows.removeClass('show-bg');
    $windows.addClass('txt-fx1');
    $windows.removeClass('txt-fx2');
  }
  setTimeout(() => {
    assignClick();
  }, 1000);
}
