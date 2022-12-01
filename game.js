var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){


  if (!started){

    started = true;
    nextSequence();
    
    $("#level-title").text("level "+level)
  }
})

$(".btn").click(function(){

  var userChosenColour = $(this).attr("id")
  userClickedPattern.push(userChosenColour)

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1)

})

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play()
}

function animatePress(currentColour){
  
    $("#"+currentColour).addClass("pressed");
    
    function remClass(){
      $("#"+currentColour).removeClass("pressed")
      
    }
    setTimeout(remClass, 100)
  }

function nextSequence(){
  userClickedPattern = []

  var randomNumber =  Math.round((Math.random()*3))
  var randomChosenColour= buttonColours[randomNumber]
  gamePattern.push(randomChosenColour);  
  
  $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)

  var name = randomChosenColour
  playSound(name)

  level++
   
  $("#level-title").text("level "+level)
  

} 

function checkAnswer(currentLevel){
  /* var lastIndex = (userClickedPattern.length-1) */
  
  {
    if ( gamePattern[currentLevel] == userClickedPattern[currentLevel]){
      console.log("success")

      if(userClickedPattern.length==gamePattern.length){
        setTimeout(nextSequence,1000)
      }
      
    }
    else{
      var audio = new Audio("sounds/wrong.mp3");
      audio.play()

      $("body").addClass("game-over")

      setTimeout( () => {
        $("body").removeClass("game-over");
      }, 200);
      
     /*                        or alternatively
      function removeWrongClass(){$("body").removeClass("game-over")}
      setTimeout(removeWrongClass,200) */

      $("#level-title").text("Game Over, Press Any Key to Restart")

      startOver();
    }
  }
}

function startOver(){
  level = 0;
  gamePattern=[];
  started = false;
}