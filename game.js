//pre-requisites

let gamepattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let gameOver = false;

function restartGame() {
  gamepattern = [];
  userClickedPattern = [];
  buttonColours = ["red", "blue", "green", "yellow"];
  level = 0;
  gameOver = false;
  nextSequence();
}
// Event listener

$("html").click(function (e) {
  if (gameOver && !$(e.target).hasClass("btn")) {
    restartGame();
  }
});

$(".btn").click(function (e) {
  if (gameOver) {
    wrongAnswer();
  } else {
    userChosenColour = e.currentTarget.id;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);

    checkAnswer();
  }
});
//Logic
function nextSequence() {
  $("h1").text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  setTimeout(function () {
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    gamepattern.push(randomChosenColour);
    level++;
  }, 1000);
}

function playSound(name) {
  const myAudio = new Audio("sounds/" + name + ".mp3");
  myAudio.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  let check = false;
  for (let i = 0; i < userClickedPattern.length; i++) {
    if (gamepattern[i] === userClickedPattern[i]) {
      check = true;
    } else {
      check = false;
    }
  }
  if (!check) {
    wrongAnswer();
  } else if (check && gamepattern.length === userClickedPattern.length) {
    nextSequence();
    userClickedPattern = [];
    console.log("succes");
  }
}

function wrongAnswer() {
  console.log("fail");
  $("h1").text(`Game Over, Press Any Key to Restart`);
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
  gameOver = true;
}

$(document).keypress(function () {
  restartGame();
});
