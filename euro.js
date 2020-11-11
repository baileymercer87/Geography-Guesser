const keys = [];


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


function submit() {

    document.getElementById("resultsText").innerHTML = " ";

    const answer = document.getElementById("answerForm").value;

    const background = document.getElementById("body");

    if (which == true) {
        var comparedAnswer = countries[pointList[pointList.length-1]];
    }
    else {
        var comparedAnswer = cities[pointList[pointList.length-1]];
    }

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
        if (which == true) {
            var correctAnswer = "INCORRECT - The correct answer was " + countries[pointList[pointList.length-1]] + "!";
        }
        else {
            var correctAnswer = "INCORRECT - The correct answer was " + cities[pointList[pointList.length-1]] + "!";
        }
        document.getElementById("resultsText").innerHTML = correctAnswer;
    }

    document.getElementById("numOfCorrect").innerHTML = "Correct Answers: " + correctAnswers;
    const pick = Math.floor(Math.random() * 2);
    const point = Math.floor(Math.random() * 56);

    pointList.push(point);
    
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

function endGame() {
    document.getElementById("question").innerHTML = 'Time is up! You scored ' + correctAnswers + ' points!';
    highscore = checkHighscore(correctAnswers);
    if (highscore) {
        document.getElementById("question").innerHTML = 'HIGHSCORE! With ' + correctAnswers + ' points!';
    }
    time = -1;
    correctAnswers = 0;
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

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function results() {
    // Get the modal
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    // Get the modal
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    // Get the modal
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
  }
}