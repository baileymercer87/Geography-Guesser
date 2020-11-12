const keys = [];

//Setting variables
const countries = ["Liechtenstein","Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus","Belgium","Bosnia + Herzegovina","Bulgaria","Croatia","Cyprus","Czechia","Denmark","Estonia","Finland","France","Georgia","Germany","Greece","Hungary","Iceland","Ireland","Isreal","Italy","Kazakhstan","Kyrgyzstan","Latvia","Lithuania","Luxembourg","Malta","Monaco","Montenegro","Netherlands","North Macedonia","Norway","Poland","Portugal","Republic of Moldova","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia","Spain","Sweden","Switzerland","Tajikistan","Turkey","Turkmenistan","Ukraine","England","Uzebekistan","Wales","Scotland"];
const cities =["Vaduz","Tirana","Andorra la vella","Yerevan","Vienna","Baku","Minsk","Brussels","Sarajevo","Sofia","Zagreb","Nicosia","Prague","Copenhagen","Tallinn","Helsinki","Paris","Tbilisi","Berlin","Athens","Budapest","Reykjavik","Dublin","Jerusalem","Rome","Nur-Sultan","Bishkek","Riga","Vilnius","Luxembourg City","Valletta","Monaco"," Podgorica","Amsterdam","Skopje","Oslo","Warsaw","Lisbon","Chisinau","Bucharest","Moscow","San Marino","Belgrade","Bratislava","Ljubljana","Madrid","Stockholm","Bern","Dushanbe","Ankara","Ashgabat","Kyiv","London","Tashkent","Cardiff","Edinbrugh"];

let pointList = [];

var correctAnswers = 0;
var which = true;
let time = 60;
let alreadyInterval = false;
window.addEventListener('keydown', keysPressed);
window.addEventListener('keyup', keysReleased);

// Adding Functions for key being pressed
function keysPressed(e) {
    // Adding key to the list
    keys[e.keyCode] = true;

    if (keys[13]) {
        submit();
    }
}

function keysReleased(e) {
    // Removing pressed key from array
    keys[e.keyCode] = false;
}

//Function for submitting an answer
function submit() {

    document.getElementById("resultsText").innerHTML = " ";
    //Fetching answer
    const answer = document.getElementById("answerForm").value;

    const background = document.getElementById("body");
    
    //Finding the answer from the list
    if (which == true) {
        var comparedAnswer = countries[pointList[pointList.length-1]];
    }
    else {
        var comparedAnswer = cities[pointList[pointList.length-1]];
    }

    //Comparing user answer to actual answer and adding point / changing background if correct or incorrect
    if (countries[pointList[pointList.length-1]] == undefined) {
        console.log("Started");
    }
    else if (answer.toUpperCase() == comparedAnswer.toUpperCase()) {
        console.log("Correct")
        correctAnswers = correctAnswers + 1;
        background.style.background = 'linear-gradient(to bottom right, #66ff99 0%, #33cc33 100%)';
    }
    else {
        console.log("Incorrect");
        background.style.background = 'linear-gradient(to bottom right, #ff6666 0%, #ff0000 100%)';
        //Displaying the correct answer
        if (which == true) {
            var correctAnswer = "INCORRECT - The correct answer was " + countries[pointList[pointList.length-1]] + "!";
        }
        else {
            var correctAnswer = "INCORRECT - The correct answer was " + cities[pointList[pointList.length-1]] + "!";
        }
        document.getElementById("resultsText").innerHTML = correctAnswer;
    }

    //Displaying current score
    document.getElementById("numOfCorrect").innerHTML = "Correct Answers: " + correctAnswers;

    //Generating 2 random numbers, one for cities or countries and one for a point in the list
    const pick = Math.floor(Math.random() * 2);
    const point = Math.floor(Math.random() * 56);

    pointList.push(point);
    
    //Generating question based on the random numbers
    if (pick == 0) {
        which = false;
        document.getElementById("question").innerHTML = "Q - What is the capital of " + countries[point] + "?";
    }
    else {
        which = true;
        document.getElementById("question").innerHTML = "Q - " + cities[point] + " is the capital of what Country?";
    }

    document.getElementById("answerForm").value = "";
    document.getElementById("answerForm").focus();
}

//Function to start the quiz and set all correct variables to begin
function start() {
    console.log("START");
    var elem = document.getElementById('beginButton');
    elem.parentNode.removeChild(elem);
    correctAnswers = 0;
    time = 60;
    pointList = [];
    if (alreadyInterval == false) {
        setInterval(updateCountdown,1250);
        alreadyInterval = true;
    }
    submit();
}

//Function for the countdown
function updateCountdown() {
    if (time == 0) {
        endGame();
    }
    else if (time == -1){
        timer.innerHTML = "0";
    }
    else {
        time--;
    }
    const timer = document.getElementById("timer");
    timer.innerHTML = `${time}`;
}

//Function for ending the game, changing text and preparing for another game
function endGame() {
    document.getElementById("question").innerHTML = 'Time is up! You scored ' + correctAnswers + ' points!';
    //Checking wether to display highscore text
    highscore = checkHighscore(correctAnswers);
    if (highscore) {
        document.getElementById("question").innerHTML = 'HIGHSCORE! With ' + correctAnswers + ' points!';
    }

    //Stopping time icrement and resetting correct answers
    time = -1;
    correctAnswers = 0;

    //Adding a button to start again
    var area = document.getElementById("buttonArea");
    var text = document.createElement("H3");
    text.innerHTML = "Click below to try again!";
    text.id = "againText";
    area.appendChild(text);
    var button = document.createElement("INPUT");
    button.setAttribute("type", "button");
    button.value = "Start";
    button.onclick =  function() { 
        x = document.getElementById("againText");
        x.parentNode.removeChild(x);
        start(); 
    };
    button.id = "beginButton";
    button.style.marginRight = "40vw";
    area.appendChild(button);
}


//Function for finding if user score is a highscore and storing it if so
function checkHighscore(num) {
    var highest = window.localStorage.getItem('highest');
    if (highest == undefined) {
        window.localStorage.setItem('highest', num);
        return true;
    }
    else if (num > highest) {
        window.localStorage.setItem('highest', num);
        return true;
    }
    else { 
        console.log("No high score");
        return false;
    }
}


//POP UP JS

// Get buttons
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, pop up
function results() {
    //show pop up and fetch highest score from local storage
    var modal = document.getElementById("myModal");
    var high = window.localStorage.getItem('highest');
    modal.style.display = "block";
    document.getElementById("highscore").innerHTML = "Your current highscore is: " + high + "!"
}

// Close pop up
span.onclick = function() {
    // Get the modal
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the pop up, close
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
  }
}