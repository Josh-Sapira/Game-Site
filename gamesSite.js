//Get items from HTML
var scrollWindow = document.getElementsByClassName("scrollWindow")[0];

//Variables
var buttons = [];

//Create Buttons
//Checkers
const checkersButton = document.createElement('button');
checkersButton.setAttribute('class', 'gameButton');
checkersButton.setAttribute('id', 'checkersButton');
checkersButton.onclick = function () {
    location.href='./Checkers/checkers.html';
}
buttons.unshift(checkersButton);

//Tic Tac Toe
const tttButton = document.createElement('button');
tttButton.setAttribute('class', 'gameButton');
tttButton.setAttribute('id', 'ticTacToeButton');
tttButton.onclick = function () {
    location.href='./TicTacToe/TicTacToe.html';
}
buttons.unshift(tttButton);

//Snake
const snakeButton = document.createElement('button');
snakeButton.setAttribute('class', 'gameButton');
snakeButton.setAttribute('id', 'snakeButton');
snakeButton.onclick = function () {
    location.href='./Snake/snake.html';
}
buttons.unshift(snakeButton);

//Add buttons to HTML doc
for(let i=0; i<buttons.length; i++) {
    scrollWindow.appendChild(buttons[i]);
}

while(true) {
    // for(let i=0; i<buttons.length; i++) {
    //     let button = buttons[i];
    //     let xPos = button.offsetLeft;
        
    //     let distanceFromCenter = Math.abs(window.innerWidth - xPos);
    //     let percentToCenter = distanceFromCenter/(window.innerWidth/2)
    //     console.log(percentToCenter);
    // }
    let button = buttons[0];
    let xPos = button.offsetLeft;
        
    let distanceFromCenter = Math.abs(window.innerWidth - xPos);
    let percentToCenter = distanceFromCenter/(window.innerWidth/2)
    console.log(percentToCenter);
}
