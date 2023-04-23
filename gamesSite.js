//Get items from HTML
var scrollWindow = document.getElementsByClassName("scrollWindow")[0];
var middleContainer = document.getElementById("middle");
var leftSmallContainer = document.getElementById("leftSmall");
var leftMediumContainer = document.getElementById("leftMedium");
var rightSmallContainer = document.getElementById("rightSmall");
var rightMediumContainer = document.getElementById("rightMedium");
var rightArrow = document.getElementById("rightArrow");
var leftArrow = document.getElementById("leftArrow");

//Variables
var buttons = [];
var middle = 5;

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

//Create Test buttons
for(let i=0; i<3; i++) {
    const testButton = document.createElement('button');
    testButton.setAttribute('class', 'gameButton');
    testButton.style.backgroundColor = 'yellow';
    testButton.innerHTML = i;
    buttons.unshift(testButton);
}
loadButtons(middle);

//modular arithmetic function because js % operator returns negative values for -n mod m
function mod(n, m) {
    return ((n % m) + m) % m;
}


//Load Buttons Function
function loadButtons(middleIndex) {
    middleContainer.replaceChildren(buttons[middleIndex]);
    leftSmallContainer.replaceChildren(buttons[mod(middleIndex - 2, buttons.length)]); //Modular arithmetic to loop back around to beginning
    leftMediumContainer.replaceChildren(buttons[mod(middleIndex - 1, buttons.length)]);
    rightSmallContainer.replaceChildren(buttons[mod(middleIndex + 2, buttons.length)]); 
    rightMediumContainer.replaceChildren(buttons[mod(middleIndex + 1, buttons.length)]);
}

//Add event listeners to arrows
leftArrow.addEventListener("click", function() {
    middle -= 1;
    if(middle < 0) {
        middle = buttons.length-1;
    }
    loadButtons(middle);
});
rightArrow.addEventListener("click", function() {
    middle += 1;
    if(middle >= buttons.length) {
        middle = 0;
    }
    loadButtons(middle);
});
