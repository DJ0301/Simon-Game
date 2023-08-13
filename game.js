let  buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let highScore = 0;
$(document).ready(function () {
  highScore = localStorage.getItem("highScore");
  if (highScore !== null) {
      $("#high-score").text("High Score: " + highScore);
  } else {
      $("#high-score").text("High Score: 0");
  }
});

const nextSequence = () =>
{
    userClickedPattern = [];
    ++level;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    buttonAnimation(randomChosenColour);
    playSound(randomChosenColour);

}
$(document).on('keypress',function()
    {
        
        if(!started)
        {
            $("h1").text("Level " + level);
            nextSequence();
            started = true ;
        }
    });

$('.btn').on('click',function()
{
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    buttonAnimation(userChosenColour);
    checkSequence(userClickedPattern.length-1)
})
function checkSequence(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        
          if (level > localStorage.getItem("highScore")) {
              localStorage.setItem("highScore", level);
              $("#high-score").text("High Score: " + level);
          }
          setTimeout(function () {
              nextSequence();
          }, 1000);
        startOver();
      }
}
function playSound(currentcolor)
{
  let audio =  new Audio("sounds/" + currentcolor + ".mp3");
  audio.play();
}
function buttonAnimation(currentcolor) {
   console.log(currentcolor);
    var activeButton = $("." + currentcolor);
  
    activeButton.addClass("pressed");
  
    setTimeout(function() {
      activeButton.removeClass("pressed");
    }, 100);
  
  }

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
