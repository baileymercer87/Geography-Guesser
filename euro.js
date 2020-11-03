const keys = [];


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
    console.log(document.getElementById('answerForm').value);
}