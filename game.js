// Game set up and set up functions
const boardHeight = 8;
const boardWidth = 8;
const numOfCells = boardHeight * boardWidth;
let boardArray = [];
let pieces = []; // Array to store pieces
let pieceCounter = 0; // Counter to assign unique identifiers to pieces

// sets up the initial empty board array
function setUpBoardArray(height, width) {
    let board = [];
    for (let y = 0; y < height; y++) {
        let row = [];
        for (let x = 0; x < width; x++) {
            row.push(0);
        }
        board.push(row);
    }
    return board;
}

// to find the position in the array
function findPosition(cell) {
    let x = cell % 8;
    let y = Math.floor(cell / 8);
    return [x, y];
}

// Sets up white checkers
function populateWhite(board, i, j) {
    if (i === 0 && j % 2 !== 0) {
        board[i][j] = { color: 'white', king: false, id: pieceCounter++, row: i, col: j };
        pieces.push(board[i][j]);
    } else if (i === 1 && j % 2 !== 1) {
        board[i][j] = { color: 'white', king: false, id: pieceCounter++, row: i, col: j };
        pieces.push(board[i][j]);
    } else if (i === 2 && j % 2 !== 0) {
        board[i][j] = { color: 'white', king: false, id: pieceCounter++, row: i, col: j };
        pieces.push(board[i][j]);
    }
}

// Sets up black checkers
function populateBlack(board, i, j) {
    if (i === 5 && j % 2 !== 1) {
        board[i][j] = { color: 'red', king: false, id: pieceCounter++, row: i, col: j };
        pieces.push(board[i][j]);
    } else if (i === 6 && j % 2 !== 0) {
        board[i][j] = { color: 'red', king: false, id: pieceCounter++, row: i, col: j };
        pieces.push(board[i][j]);
    } else if (i === 7 && j % 2 !== 1) {
        board[i][j] = { color: 'red', king: false, id: pieceCounter++, row: i, col: j };
        pieces.push(board[i][j]);
    }
}

// Sets up the Checkers to the starting position
function populateBoard(board) {
    for (let i = 0; i < boardHeight; i++) {
        for (let j = 0; j < boardWidth; j++) {
            populateWhite(board, i, j);
            populateBlack(board, i, j);
        }
    }
}


// Renders the board
function renderCheckers(board) {
    let counter = 0;
    for (let row = 0; row < boardHeight; row++) {
        for (let col = 0; col < boardWidth; col++) {
            let square = document.getElementById(`${counter}`);
            if (board[row][col] !== 0) {
                let piece = board[row][col];
                square.innerHTML = `<div class="piece ${piece.color}" id="${piece.color.slice(0,1) + piece.id}">${piece.id}</div>`;
            } else {
                square.innerHTML = '';
            }
            counter++;
        }
    }

}


document.addEventListener('DOMContentLoaded', () => {
    let board = document.querySelector('#board');
    let color = 'white';
    let grid = ``;
    let turn = 'White';
    for (let i = 0; i < numOfCells; i++) {
        grid += `<div class="${color} cell" id="${i}"></div>`;
        if (color === 'white') {
            color = 'black';
        } else if (color === 'black') {
            color = 'white';
        }
        if ((i + 1) % 8 === 0) {
            if (color === 'white') {
                color = 'black';
            } else {
                color = 'white';
            }
        }
    }
    board.innerHTML = grid;
    boardArray = setUpBoardArray(boardHeight, boardWidth);
    populateBoard(boardArray);
    renderCheckers(boardArray);
    addEventListeners();
    displayTurn(turn);

});

// Game logic and functions

// add query selector to get all the pieces
function addEventListeners() {
    let piecesArray = document.querySelectorAll('.piece');
    piecesArray.forEach(piece => {
        piece.addEventListener('click', function () {
            console.log('piece clicked');
            if (piece.id.length === 3) {
                selectPiece(parseInt(piece.id.slice(-2)));
            } else{
                selectPiece(parseInt(piece.id.slice(-1)));
            }
        });
    });
}

// add turns and move logic

// chnages the turn
function changeTurn(turn) {
    if (turn === 'White') {
        return 'Red';
    } else {
        return 'White';
    }
}

// displays the current turn
function displayTurn(turn) {
    let turnDisplay = document.querySelector('#turn');
    turnDisplay.innerHTML = `${turn}'s turn`;
}

// select a piece to move
function selectPiece(pieceId) {
    boardArray.forEach(row => {
        row.forEach(cell => {
            if (cell !== 0) {
                if (cell.id === pieceId) {
                    console.log(cell);
                    document.getElementById(`${cell.color.slice(0,1) + cell.id}`).classList.toggle('selected');
                }
            }
        });
    });
}

// this will move the position of the piece and display it on the board
function movePiece(piece, row, col) {
    let oldRow = piece.row;
    let oldCol = piece.col;

    // Clear the old position in the board array
    boardArray[oldRow][oldCol] = 0;

    // Update the piece's position
    piece.row = row;
    piece.col = col;

    // Move the piece to the new position in the board array
    boardArray[row][col] = piece;

    // Re-render the board
    renderCheckers(boardArray);
}