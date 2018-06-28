
var wordHolder = document.getElementById("wh");
var winNumber = document.getElementById("wN");
var guessHolder = document.getElementById("gH");
var lettersGuessed = document.getElementById("lG");
var audio = document.getElementById("audio");
//remaining Guesses
var wins = 0;
var remainingGuesses = 10;
guessHolder.innerHTML = remainingGuesses;
//currentGuess current Guesses
var currentGuess = [];
//allAnswers all Answers
var allAnswers = [/* here is where our words go */"pikachu", "tychus", "link", "samus", "mario", "sonic", "donkey kong"];

//var audio = new Audio('audio_file.mp3');
// audio.play();

var successNoises = {
    "pikachu":"assets/sounds/pikSuccess.mp3",
    "tychus":"assets/sounds/TychusSuccess.mp3",
    "link":"assets/sounds/LinkSuccess.mp3",
    "samus":"assets/sounds/SamusSuccess.mp3",
    "mario":"assets/sounds/MarioSuccess.mp3",
    "sonic":"assets/sounds/SonicSuccess.mp3",
    "donkey kong":"assets/sounds/DKSuccess.mp3"
}
var failNoises = {
    "pikachu":"assets/sounds/PikachuFail.mp3",
    "tychus":"assets/sounds/TychusFail.mp3",
    "link":"assets/sounds/LinkFail.mp3",
    "samus":"assets/sounds/SamusFail.mp3",
    "mario":"assets/sounds/MarioFail.mp3",
    "sonic":"assets/sounds/SonicFail.mp3",
    "donkey kong":"assets/sounds/DKFailure.mp3"
}
//current Answer
var currentAnswer = allAnswers[Math.floor(Math.random() * allAnswers.length)];
revealLetters();


function startNewGame()
{
    wordHolder.style.color ="black";
    currentAnswer = allAnswers[Math.floor(Math.random() * allAnswers.length)];
    
    currentGuess=[];
    remainingGuesses = 10; 
    
    revealGuesses();
    revealLetters();
}

document.onkeyup = function (e) 
{
    key = e.key.toLowerCase();
    if(remainingGuesses>0)
    {
        //this checks if our current key hasn't been pressed yet and if it is a letter.
        if ((currentGuess.indexOf(key) < 0) && (isLetter(e.which)))
        {
            currentGuess.push(key);
            if (currentAnswer.includes(key)) 
            {
                revealLetters()
            }
            else
            {
                remainingGuesses--;
                revealGuesses()
            }
        }
    }
    else
    {
        failure();

    }
}
function won()
{
    console.log("wonderful");
    wordHolder.style.color = "blue";
    audio.src=successNoises[currentAnswer];
    audio.play();
    wins++
}

function failure(){
    wordHolder.style.color ="red";
    var word = "";
    
    for(var i =0;i<currentAnswer.length;i++)
    {
        if(currentAnswer.charAt(i)!==" ")
        {
            word += currentAnswer.charAt(i).toUpperCase();
        } 
        else
        { 
            word += "&nbsp";
        }
        word +="&nbsp"
    }
    wordHolder.innerHTML = word;
    audio.src = failNoises[currentAnswer];
    audio.play();
}



function revealGuesses(){
    var str = "";
    for(var i =0; i< currentGuess.length;i++)
    {
        if(!currentAnswer.includes(currentGuess[i]))
        {
            str += currentGuess[i].toUpperCase() + "  ";  
        }
    }
    lettersGuessed.innerHTML=str;
    guessHolder.innerHTML=remainingGuesses;
}



function revealLetters(){
    //rN= revealed Name
    var rN = "";
    for(var i=0;i<currentAnswer.length; i++)
    {
        if(remainingGuesses>-1)
        if(currentGuess.includes(currentAnswer.charAt(i)) || currentAnswer.charAt(i)===" ")
        {
            if(currentAnswer.charAt(i) == " ")
            {
                rN += "&nbsp"
            }
            console.log("rn", currentAnswer.charAt(i));
            rN += currentAnswer.charAt(i).toUpperCase();
        }
        else
        {
            rN+= "_";
        }
        rN+="&nbsp";
    }
    
    if(checkAllLetters(rN))
    {
      won()
    }
    wordHolder.innerHTML = rN;
}






function checkAllLetters(n)
{
    for(var i = 0; i<currentAnswer.length;i++)
    {
        if(!currentGuess.includes(currentAnswer.charAt(i)))
        {
            return false;
        }
    }
    return true;
}



function isLetter(key) {
    console.log(typeof key)
    if (key >= 65 && key <= 90) {
        console.log("it sure is")
        return true;
    }
    else {
        console.log("nope nope nope")
        return false;
    }
}