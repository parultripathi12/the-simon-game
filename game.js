
var gamePattern=[];
var userGamePattern=[];
var buttonColors = ["red", "yellow", "blue", "green"];

var started=false;
var level=0;

$(".start").click(function(){
    if(!started){
        $(".startButton").hide();
        $("h1").text("Level "+level);
        $(".rules").hide();
        nextSequence();
        started=true;
    }  
})



$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userGamePattern.push(userChosenColor);
    checkPattern(userGamePattern.length-1);   
})





function nextSequence()
{
    userGamePattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor((Math.random()*3));
    var randomChosenColor = buttonColors[randomNumber];
    $("#"+randomChosenColor).fadeIn().fadeOut().fadeIn();
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    gamePattern.push(randomChosenColor);
}

function playSound(name)
{
    switch(name)
    {
        case "red":
           var redSound = new Audio('sounds/red.mp3');
           redSound.play();
           break;
        case "blue":
           var blueSound = new Audio('sounds/blue.mp3')
           blueSound.play();
           break;
        case "green":
            var greenSound = new Audio('sounds/green.mp3')
            greenSound.play();
            break;
        case "yellow":
           var yellowSound = new Audio('sounds/yellow.mp3')
           yellowSound.play();
           break;      
   }
}

function animatePress(currentColor)
{
    $("."+currentColor).addClass("pressed");
       setTimeout(function(){$("."+currentColor).removeClass("pressed");}, 100);
}

function checkPattern(currentLevel)
    {
        if (gamePattern[currentLevel]==userGamePattern[currentLevel])
           {
                console.log("Success!");
                if (gamePattern.length==userGamePattern.length)
                {
                    setTimeout(function(){nextSequence();}, 1000);
                }
           }
        else
           {
                console.log("wrong");
                $("h1").text("Game Over. Start Again.");
                $(".startButton").show();
                
                var gameOverSound=new Audio('sounds/wrong.mp3');
                gameOverSound.play();
                $("body").addClass("game-over");
                setTimeout(function(){$("body").removeClass("game-over");}, 100)
                startOver();
            }
        }

        function startOver()
        {
          level=0;
          gamePattern=[];
          userGamePattern=[];
          started=false;
        }

