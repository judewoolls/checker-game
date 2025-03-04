// The main js script
const boardHeight = 8;
const boardWidth = 8;
const numOfCells = boardHeight * boardWidth
const boardArray = [];

// sets up the initial empty board array
function setUpBoardArray(height, width) {
    for (let y = 0; y < height; y++) {
        let row = [];
        for (let x = 0; x < width; x++) {
            row.push(0);
        }
        boardArray.push(row);
    }
    return boardArray;
}
// Sets up white checkers
function populateWhite(board, i, j) {
    if (i === 0 && j % 2 !== 0) {
        board[i][j] = 1;
    } else if (i === 1 && j % 2 !== 1) {
        board[i][j] = 1;
    } else if (i === 2 && j % 2 !== 0) {
        board[i][j] = 1;
    }
}
// Sets up black checkers
function populateBlack(board, i, j) {
    if (i === 5 && j % 2 !== 1) {
        board[i][j] = 2;
    } else if (i === 6 && j % 2 !== 0) {
        board[i][j] = 2;
    } else if (i === 7 && j % 2 !== 1) {
        board[i][j] = 2;
    }
}
// Sets up the Checkers to the starting position
function populateBoard(board) {
    for (let i = 0; i < boardHeight; i++) {
        for (let j = 0; j < boardWidth; j++) {
            populateWhite(board, i, j);
            populateBlack(board, i, j)
        }
    }
}
// Renders the board
function renderCheckers(board) {
    let counter = 0;
    for (let row = 0; row < boardHeight; row++) {
        for (let col = 0; col < boardWidth; col++) {
            if (board[row][col] === 1) {
                item = document.getElementById(`${counter}`)
                item.innerText = 'White'
                item.style.color = 'Orange';
            } else if (board[row][col] === 2) {
                item = document.getElementById(`${counter}`)
                item.innerText = 'Black'
                item.style.color = 'Orange';
            }
            counter++;
        }
    }
}

// runs when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    let board = document.querySelector('#board');
    let color = 'white';
    let grid = ``;
    for (let i = 0; i < numOfCells; i++) {
        grid += `<div class="${color} cell" id="${i}"></div>`;
        if (color === 'white') {
            color = 'black';
        } else if (color === 'black') {
            color = 'white';
        }
        if ((i + 1) % 8 === 0) {
            if (color === 'white') {
                color = 'black'
            } else {
                color = 'white'
            }
        }
    }
    board.innerHTML = grid;
    const boardArray = setUpBoardArray(boardHeight, boardWidth);
    populateBoard(boardArray)
    renderCheckers(boardArray)
    console.log(boardArray);
    document.getElementById('instructions-button').addEventListener('click', function () {
        document.getElementById('instructions-modal').classList.toggle('hidden');
        document.getElementById('instructions-modal').classList.toggle('show');
    })
    document.getElementById('instructions-close').addEventListener('click', function () {
        document.getElementById('instructions-modal').classList.toggle('hidden');
        document.getElementById('instructions-modal').classList.toggle('show');
    })
})

// For checking which cell is clicked
// 0 - 7
// 8 - 15
// 16 - 23
// ...63

// to find the position in the array
function findPosition(cell) {
    let x = cell % 8;
    let y = Math.floor(cell / 8);
    return [x, y];
}

// used to change the color of the piece that the user has selected to move
function activePieceColorSwap(flip, event) {
    activeSelectionInterval = setInterval(() => {
        if (flip === 0) {
            document.getElementById(event.target.id).style.color = 'red';
            flip = 1;
        } else if (flip === 1) {
            document.getElementById(event.target.id).style.color = 'blue';
            flip = 0;
        }
    }, 500);
}

// used when unselecting a piece is required
function unselectPiece() {
    activePiece = null;
    previousCell = null;
}

// Renders whose turn it is to the screen
function displayTurn(turn) {
    document.getElementById('turn').innerText = `${turn}`;
}

// Updates the array after a move 
function updateArray(cell, currentTurn) {
    let [x, y] = findPosition(cell);
    if (currentTurn === 'white') {
        boardArray[y][x] = 1;
    } else {
        boardArray[y][x] = 2;
    }
    let [prevX, prevY] = findPosition(previousCell);
    boardArray[prevY][prevX] = 0;
}

function removePiece(cell) {
    // remove the piece from the board
    const position = findPosition(cell);
    boardArray[position[1]][position[0]] = 0;
    document.getElementById(cell).innerText = '';
}

// valid black move  -- So diagonally up left or right  up is minus
function validBlackMove(cell) {
    let startPosition = findPosition(previousCell);
    let endPosition = findPosition(cell);

    // check the y value first
    if (endPosition[1] === (startPosition[1] - 1)) {
        // check the correct x value
        if (endPosition[0] === (startPosition[0] + 1) || endPosition[0] === (startPosition[0] - 1)) {
            console.log('valid BLACK move');
            return true;
        }
    } else if (endPosition[1] === (startPosition[1] - 2)) { // check for jump move
        if (endPosition[0] === (startPosition[0] + 2) || endPosition[0] === (startPosition[0] - 2)) {
            if (endPosition[0] - startPosition[0] < 0) { // checks moves to the left
                // check if there is an opposition piece and the landing spot is empty
                if (boardArray[startPosition[1] - 1][startPosition[0] - 1] === 1 && boardArray[endPosition[1]][endPosition[0]] === 0) {
                    // remove opposing piece
                    removePiece((startPosition[1] - 1) * 8 + (startPosition[0] - 1));
                    console.log('valid BLACK move');
                    return true;
                }
            } else if (endPosition[0] - startPosition[0] > 0) { // checks moves to the right
                if (boardArray[startPosition[1] - 1][startPosition[0] + 1] === 1 && boardArray[endPosition[1]][endPosition[0]] === 0) {
                    // remove the opposing piece
                    removePiece((startPosition[1] - 1) * 8 + (startPosition[0] + 1));
                    console.log('valid BLACK move');
                    return true;
                }
            }
        }
    }
    return false;
}

// valid white move  -- So diagonally down left or right
function validWhiteMove(cell) {
    startPosition = findPosition(previousCell)
    endPosition = findPosition(cell)
    // check the y value first
    if (endPosition[1] === (startPosition[1] + 1)) {
        // check the correct x value
        if (endPosition[0] === (startPosition[0] + 1) || endPosition[0] === (startPosition[0] - 1)) {
            console.log('valid WHITE move');
            return true;
        }
    }
    return false;
}

// Game variables
let turn = 'white';
let activePiece = null;
let activePieceIndex = null;
let previousCell = null;
let activeSelectionInterval = null;
let flip = 0;

// Game logic that is checked whenever there is a click on the screen
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('cell') && activePiece === null) {
        activePiece = document.getElementById(event.target.id).innerText.toLowerCase();
        previousCell = parseInt(event.target.id);
        flip = 0;
        if (activePiece === 'white' && turn === 'white') {
            activePieceColorSwap(flip, event);
        } else if (activePiece === 'black' && turn === 'black') {
            activePieceColorSwap(flip, event);
        } else {
            unselectPiece();
        }
    } else if (event.target.classList.contains('cell') && activePiece !== null) {
        if (turn === 'white') {
            if (activePiece === 'white' && document.getElementById(event.target.id).innerText === '') {
                // check for valid move
                if (validWhiteMove(parseInt(event.target.id))) {
                    // change the display
                    document.getElementById(event.target.id).innerText = 'White';
                    document.getElementById(previousCell).innerText = '';
                    updateArray(event.target.id, turn); // should update the array after a move 
                    turn = 'black';
                }
                unselectPiece();
            } else if (activePiece === 'black') {
                unselectPiece();
            }
        } else if (turn === 'black') {
            if (activePiece === 'black' && document.getElementById(event.target.id).innerText === '') {
                // check for valid move
                if (validBlackMove(parseInt(event.target.id))) {
                    // change the display
                    document.getElementById(event.target.id).innerText = 'Black';
                    document.getElementById(previousCell).innerText = '';
                    updateArray(event.target.id, turn); // should update array after a move
                    turn = 'white';
                }
                unselectPiece();
            } else if (activePiece === 'white') {
                unselectPiece();
            }
        }
        clearInterval(activeSelectionInterval); // Clear the interval whenever the active piece is reset
        displayTurn(turn);
        renderCheckers(boardArray);
        console.log(boardArray);
    }
});