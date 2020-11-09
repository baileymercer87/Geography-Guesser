const keys = [];


const countries = ["Liechtenstein","Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus","Belgium","Bosnia + Herzegovina","Bulgaria","Croatia","Cyprus","Czechia","Denmark","Estonia","Finland","France","Georgia","Germany","Greece","Hungary","Iceland","Ireland","Isreal","Italy","Kazakhstan","Kyrgyzstan","Latvia","Lithuania","Luxembourg","Malta","Monaco","Montenegro","Netherlands","North Macedonia","Norway","Poland","Portugal","Republic of Moldova","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia","Spain","Sweden","Switzerland","Tajikistan","Turkey","Turkmenistan","Ukraine","England","Uzebekistan","Wales","Scotland"];
const cities =["Vaduz","Tirana","Andorra la vella","Yerevan","Vienna","Baku","Minsk","Brussels","Sarajevo","Sofia","Zagreb","Nicosia","Prague","Copenhagen","Tallinn","Helsinki","Paris","Tbilisi","Berlin","Athens","Budapest","Reykjavik","Dublin","Jerusalem","Rome","Nur-Sultan","Bishkek","Riga","Vilnius","Luxembourg City","Valletta","Monaco"," Podgorica","Amsterdam","Skopje","Oslo","Warsaw","Lisbon","Chisinau","Bucharest","Moscow","San Marino","Belgrade","Bratislava","Ljubljana","Madrid","Stockholm","Bern","Dushanbe","Ankara","Ashgabat","Kyiv","London","Tashkent","Cardiff","Edinbrugh£"];

console.log(countries.length);
console.log(cities.length);

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
    console.log(document.getElementById('question').innerHTML);
    const pick = Math.floor(Math.random() * 2);
    console.log(pick);
    const point = Math.floor(Math.random() * 56);
    console.log(point);
    if (pick == 0) {
        console.log("1");
        document.getElementById("question").innerHTML = "Q - What is the capital of " + countries[point] + "?";
    }
    else {
        console.log("2");
        document.getElementById("question").innerHTML = "Q - " + cities[point] + " is the capital of what Country?";
    }
}

function start() {
    var elem = document.getElementById('beginButton');
    elem.parentNode.removeChild(elem);
}