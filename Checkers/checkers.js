//Initialize Game State in constant where numbers represent square ids
const board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
];

//HTML Elements
const squares = document.querySelectorAll("td");
let redPieces = document.querySelectorAll(".red-piece");
let blackPieces = document.querySelectorAll(".black-piece");
const redTurnText = document.querySelectorAll(".red-turn-text");
const blackTurnText = document.querySelectorAll(".black-turn-text");

//Game State Variables
let redTurn = true;
let redTally = 12;
let blackTally = 12;
let playerPieces;

//Create dynamic variable for selected piece
let selectedPiece = {
    pieceId: -1,
    pieceIndex: -1,
    isKing: false,
    seven: false,
    nine: false,
    fourteen: false,
    eighteen: false,
    minusSeven: false,
    minusNine: false,
    minusFourteen: false,
    minusEighteen: false
}

//Listening Events
function addListeningEvents() {
    if(redTurn) {
        for(let i=0; i < redPieces.length; i++) {
            redPieces[i].addEventListener("click", getPlayerPieces);
        }
    }
    else {
        for(let i=0; i < blackPieces.length; i++) {
            blackPieces[i].addEventListener("click", getPlayerPieces);
        }
    }
}

function getPlayerPieces() {
    //Updates pieces remaining
    if(redTurn) {
        playerPieces = redPieces;
    }
    else {
        playerPieces = blackPieces;
    }
    //Remove event listener from squares when clicked
    removeSquareWhenClicked();
    //deselect piece if player picks another piece
    deselect();
}

function removeSquareWhenClicked() {
    //Remove event listener from squares when clicked
    for(let i=0; i<squares.length; i++) {
        squares[i].removeAttribute("onclick");
    }
}

function deselect() {
    //deselect piece if player picks another piece
    for(let i=0; i<playerPieces.length; i++) {
        playerPieces[i].style.border = "0px";
    }
    resetSelectedPiece();
    setSelectedPiece();
}

function resetSelectedPiece() {
    //Reset dynamic variable to default state
    selectedPiece.pieceId = -1;
    selectedPiece.pieceIndex = -1;
    selectedPiece.isKing = false;
    selectedPiece.seven = false;
    selectedPiece.nine = false;
    selectedPiece.fourteen = false;
    selectedPiece.eighteen = false;
    selectedPiece.minusSeven = false;
    selectedPiece.minusNine = false;
    selectedPiece.minusFourteen = false;
    selectedPiece.minusEighteen = false;
}

function setSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id);
    if((redTurn && selectedPiece.pieceId >= 12) || (!redTurn && selectedPiece.pieceId < 12)) {
        selectedPiece.pieceIndex = findSquare(selectedPiece.pieceId);
        isKing();
    }
}

function findSquare(num) {
    let val = parseInt(num);
    return board.indexOf(val);
}

function isKing() {
    selectedPiece.isKing = document.getElementById(selectedPiece.pieceId).classList.contains("king");
    getValidMoves();
}

function getValidMoves() {
    if(redTurn) {
        if(board[selectedPiece.pieceIndex - 7] === null &&
            squares[selectedPiece.pieceIndex - 7].classList.contains("noPieces") !== true) {
                selectedPiece.minusSeven = true;
        }
        if(board[selectedPiece.pieceIndex -  9] === null &&
            squares[selectedPiece.pieceIndex - 9].classList.contains("noPieces") !== true) {
                selectedPiece.minusNine = true;
        }
        if(selectedPiece.isKing) {
            if(board[selectedPiece.pieceIndex +  7] === null &&
                squares[selectedPiece.pieceIndex + 7].classList.contains("noPieces") !== true) {
                    selectedPiece.seven = true;
            }
            if(board[selectedPiece.pieceIndex +  9] === null &&
                squares[selectedPiece.pieceIndex + 9].classList.contains("noPieces") !== true) {
                    selectedPiece.nine = true;
            }
        }
    }
    else {
        if(board[selectedPiece.pieceIndex +  7] === null &&
            squares[selectedPiece.pieceIndex + 7].classList.contains("noPieces") !== true) {
                selectedPiece.seven = true;
        }
        if(board[selectedPiece.pieceIndex +  9] === null &&
            squares[selectedPiece.pieceIndex + 9].classList.contains("noPieces") !== true) {
                selectedPiece.nine = true;
        }
        if(selectedPiece.isKing) {
            if(board[selectedPiece.pieceIndex - 7] === null &&
                squares[selectedPiece.pieceIndex - 7].classList.contains("noPieces") !== true) {
                    selectedPiece.minusSeven = true;
            }
            if(board[selectedPiece.pieceIndex -  9] === null &&
                squares[selectedPiece.pieceIndex - 9].classList.contains("noPieces") !== true) {
                    selectedPiece.minusNine = true;
            }
        }
    }
    checkJumps();
}

function checkJumps() {
    if(redTurn) {
        if(board[selectedPiece.pieceIndex - 14] === null 
        && squares[selectedPiece.pieceIndex - 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.pieceIndex - 7] < 12) {
            selectedPiece.minusFourteen = true;
        }
        if (board[selectedPiece.pieceIndex - 18] === null 
        && squares[selectedPiece.pieceIndex - 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.pieceIndex - 9] < 12) {
            selectedPiece.minusEighteen = true;
        }
        if (board[selectedPiece.pieceIndex + 14] === null 
        && squares[selectedPiece.pieceIndex + 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.pieceIndex + 7] < 12) {
            selectedPiece.fourteen = true;
        }
        if (board[selectedPiece.pieceIndex + 18] === null 
        && squares[selectedPiece.pieceIndex + 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.pieceIndex + 9] < 12) {
            selectedPiece.eighteen = true;
        }
    } else {
        if(board[selectedPiece.pieceIndex + 14] === null 
        && squares[selectedPiece.pieceIndex + 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.pieceIndex + 7] >= 12
        && board[selectedPiece.pieceIndex + 7] !== null) {
            selectedPiece.fourteen = true;
        }
        if (board[selectedPiece.pieceIndex + 18] === null 
        && squares[selectedPiece.pieceIndex + 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.pieceIndex + 9] >= 12
        && board[selectedPiece.pieceIndex + 9] !== null) {
            selectedPiece.eighteen = true;
        }
        if (board[selectedPiece.pieceIndex - 14] === null 
        && squares[selectedPiece.pieceIndex - 14].classList.contains("noPieceHere") !== true
        && board[selectedPiece.pieceIndex - 7] >= 12 
        && board[selectedPiece.pieceIndex - 7] !== null) {
            selectedPiece.minusFourteen = true;
        }
        if (board[selectedPiece.pieceIndex - 18] === null 
        && squares[selectedPiece.pieceIndex - 18].classList.contains("noPieceHere") !== true
        && board[selectedPiece.pieceIndex - 9] >= 12
        && board[selectedPiece.pieceIndex - 9] !== null) {
            selectedPiece.minusEighteen = true;
        }
    }
    
    applyRestrictions();
}

function applyRestrictions() {
    if(!selectedPiece.isKing) {
        if(redTurn) {
            selectedPiece.seven = false;
            selectedPiece.nine = false;
            selectedPiece.fourteen = false;
            selectedPiece.eighteen = false;
        }
        else {
            selectedPiece.minusSeven = false;
            selectedPiece.minusNine = false;
            selectedPiece.minusFourteen = false;
            selectedPiece.minusEighteen = false;
        }
    }
    styleSelected();
}

function styleSelected() {
    if(selectedPiece.seven || selectedPiece.nine || selectedPiece.fourteen || selectedPiece.eighteen ||
        selectedPiece.minusSeven || selectedPiece.minusNine || selectedPiece.minusFourteen || selectedPiece.minusEighteen) {
            document.getElementById(selectedPiece.pieceId).style.border = "3px solid yellow";
            addSquareClicks();
    }
}

function addSquareClicks() {
    if(selectedPiece.seven) {
        squares[selectedPiece.pieceIndex + 7].setAttribute("onclick", "move(7)");
    }
    if(selectedPiece.nine) {
        squares[selectedPiece.pieceIndex + 9].setAttribute("onclick", "move(9)");
    }
    if(selectedPiece.fourteen) {
        squares[selectedPiece.pieceIndex + 14].setAttribute("onclick", "move(14)");
    }
    if(selectedPiece.eighteen) {
        squares[selectedPiece.pieceIndex + 18].setAttribute("onclick", "move(18)");
    }
    if(selectedPiece.minusSeven) {
        squares[selectedPiece.pieceIndex - 7].setAttribute("onclick", "move(-7)");
    }
    if(selectedPiece.minusNine) {
        squares[selectedPiece.pieceIndex - 9].setAttribute("onclick", "move(-9)");
    }
    if(selectedPiece.minusFourteen) {
        squares[selectedPiece.pieceIndex - 14].setAttribute("onclick", "move(-14)");
    }
    if(selectedPiece.minusEighteen) {
        squares[selectedPiece.pieceIndex - 18].setAttribute("onclick", "move(-18)");
    }
}

function move(amount) {
    document.getElementById(selectedPiece.pieceId).remove();
    squares[selectedPiece.pieceIndex].innerHTML = "";
    if(redTurn) {
        if(selectedPiece.isKing) {
            squares[selectedPiece.pieceIndex + amount].innerHTML = `<div class = "red-piece king" id="${selectedPiece.pieceId}">`;
        }
        else {
            squares[selectedPiece.pieceIndex + amount].innerHTML = `<div class = "red-piece" id="${selectedPiece.pieceId}">`;
        }
        redPieces = document.querySelectorAll(".red-piece");
    }
    else {
        if(selectedPiece.isKing) {
            squares[selectedPiece.pieceIndex + amount].innerHTML = `<div class = "black-piece king" id="${selectedPiece.pieceId}">`;
        }
        else {
            squares[selectedPiece.pieceIndex + amount].innerHTML = `<div class = "black-piece" id="${selectedPiece.pieceId}">`;
        }
        blackPieces = document.querySelectorAll(".black-piece");
    }

    if(amount == 14 || amount == -14 || amount == 18 || amount == -18) {
        //If jumped
        update(selectedPiece.pieceIndex, selectedPiece.pieceIndex + amount, selectedPiece.pieceIndex +(amount/2));
    }
    else {
        //Normal move
        update(selectedPiece.pieceIndex, selectedPiece.pieceIndex + amount);
    }

}

function update(old, curr, jumped) {
    board[old] = null;
    board[curr] = parseInt(selectedPiece.pieceId);
    if(redTurn && selectedPiece.pieceId >= 12 && curr < 8) {
        //if red piece gets to last row
        document.getElementById(selectedPiece.pieceId).classList.add("king");
    }
    if(!redTurn && selectedPiece.pieceId < 12 && curr > 56) {
        //if black piece gets to last row
        document.getElementById(selectedPiece.pieceId).classList.add("king");
    }
    
    if(jumped) {
        board[jumped] = null;
        if(redTurn && selectedPiece.pieceId >= 12) {
            //if red jumps
            squares[jumped].innerHTML = "";
            blackTally -= 1;
        }
        if(!redTurn && selectedPiece.pieceId < 12) {
            //if black jumps
            squares[jumped].innerHTML = "";
            redTally -= 1;
        }
    }
    
    removeSquareWhenClicked();
    clearEventListeners();
}

function clearEventListeners() {
    for(let i=0; i<playerPieces.length; i++) {
        playerPieces[i].removeEventListener("click", getPlayerPieces);
    }
    winCheck();
}

function winCheck() {
    if(blackTally <= 0) {
        //If red wins
        alert("Red Wins! Please reload the page to play again.");
    }
    else if(redTally <= 0) {
        //If black wins
        alert("Black Wins! Please reload the page to play again.");
    }
    else {
        changeTurn();
    }
    
}


function changeTurn() {

    if(redTurn) {
        redTurn = false;
        
        for(let i=0; i < redTurnText.length; i++) {
            redTurnText[i].style.color = "gray";
            redTurnText[i].style.fontWeight = "normal";
            blackTurnText[i].style.color = "black";
            blackTurnText[i].style.fontWeight = "bold"
        }
    }
    else {
        redTurn = true;
        for(let i=0; i < blackTurnText.length; i++) {
            blackTurnText[i].style.color = "gray";
            blackTurnText[i].style.fontWeight = "normal";
            redTurnText[i].style.color = "black";
            redTurnText[i].style.fontWeight = "bold"
        }
    }
    resetSelectedPiece();
    addListeningEvents();
}

addListeningEvents();