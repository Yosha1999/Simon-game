var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var start = false;
var level = 0;
$(document).keydown(function(){
    if(!start){
        $('#level-title').text("Level 0");
        nextSequence();
        start = true;
    }
   
});

$('.btn').click(function(e){    
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

    playAudio(userChosenColour);
    $('#'+userChosenColour).addClass('pressed');

    setTimeout(function(){
        $('#'+userChosenColour).removeClass('pressed');
    },100);
    
});

function nextSequence(){
    level++;
    $('#level-title').text("Level "+level);

    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#'+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColour);
}

function playAudio(color){
    var audio = new Audio('sounds/' + color + '.mp3');
    audio.play();
}

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        playAudio('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);

        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }        
}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    start = false;
}