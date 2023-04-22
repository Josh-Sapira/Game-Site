//Initialize Canvas
var canvas = document.getElementById("gameBoard");
var canvas2d = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

//Create Game-State Variables
var gameEnded = false;
var snakeParts = [];
var snakeLength = 1;
var snakeX = 0;
var snakeXOld = 0;
var snakeY = 0;
var snakeYOld = 0;
var directionX = 15;
var directionY = 0;
var food = {
    xPos: Math.round(Math.random()*40)*15,
    yPos: Math.round(Math.random()*40)*15
};

//Function to draw snake
function drawSnake() {
    //Clear Canvas
    canvas2d.clearRect(0, 0, canvas.width, canvas.height);

    //Draw snakein black
    canvas2d.fillStyle = "black";
  
    for (var i = 0; i < snakeParts.length; i++) {
        canvas2d.fillRect(snakeParts[i].x, snakeParts[i].y, 15, 15);
    }
    
    //Draw food in red
    canvas2d.fillStyle = "red";
    canvas2d.fillRect(food.xPos, food.yPos, 15, 15);
}

//Function to move snake
function moveSnake() {
    //Unshift function prepends element, returns length
    snakeParts.unshift({ x: snakeX, y: snakeY });

    //Update velocities
    snakeXOld = snakeX;
    snakeYOld = snakeY;
    snakeX += directionX;
    snakeY += directionY;

    //Remove end of snake
    while(snakeParts.length > snakeLength) {
        snakeParts.pop();
    }
}

//Spawn food
function spawnFood() {
    food.xPos = Math.round(Math.random()*40)*15;
    food.yPos = Math.round(Math.random()*40)*15;
}

//Check for food being eaten
function checkCollisions() {

    //Check if snake eats food
    if(snakeX == food.xPos && snakeY == food.yPos) {
        snakeLength += 1;
        //Create new food
        spawnFood();
    }

    //Check if snake hits border
    if(snakeY < 0 || snakeX < 0 || snakeY > canvas.height || snakeX > canvas.width) {
        gameOver();
    }

    //Check if snake head hits body
    for(let i=1; i<snakeParts.length; i++) {
        if(snakeX == snakeParts[i].x && snakeY == snakeParts[i].y) {
            gameOver();
        }
    }

}

//Game Over
function gameOver() {
    alert("Game over! You had a final score of " + snakeLength);
    gameEnded = true
}

//Sleep function for timeout on keydown event listener
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    });
}


//When key pressed function
document.onkeydown = function(event) {
    //Fix keyCode Variable so it doesn't return undefined
    var keyCode = (window.event) ? event.which : event.keyCode;

    //Change direction variables based on key pressed, assuming not already moving in opposite direction
    //Also do not let move if snake hasn't moved at least one square (i.e.: do not allow to move down if going up and haven't moved right or left)
    switch(keyCode) {
        case 37: //left arrow
            if(directionX != 15 && snakeY != snakeYOld) {
                directionX = -15;
                directionY = 0;
            }
            break;
        case 38: //up arrow
            if(directionY != 15 && snakeX != snakeXOld) {
                directionX = 0;
                directionY = -15;
            }
            break;
        case 39: //right arrow
            if(directionX != -15 && snakeY != snakeYOld) {
                directionX = 15;
                directionY = 0;
            }
            break;
        case 40: //down arrow
            if(directionY != -15 && snakeX != snakeXOld) {
                directionX = 0;
                directionY = 15;
                break;
            }
    }
};

function gameLoop() {
    moveSnake();
    drawSnake();
    checkCollisions();
    if(!gameEnded) {
        setTimeout(gameLoop, 80);
    }
}
gameLoop();