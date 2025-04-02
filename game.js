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

// Sets up white checkers
function populateWhite(board, i, j) {
    if (i === 0 && j % 2 !== 0) {
        board[i][j] = { color: 'white', king: false, id: pieceCounter++ };
        pieces.push(board[i][j]);
    } else if (i === 1 && j % 2 !== 1) {
        board[i][j] = { color: 'white', king: false, id: pieceCounter++ };
        pieces.push(board[i][j]);
    } else if (i === 2 && j % 2 !== 0) {
        board[i][j] = { color: 'white', king: false, id: pieceCounter++ };
        pieces.push(board[i][j]);
    }
}

// Sets up black checkers
function populateBlack(board, i, j) {
    if (i === 5 && j % 2 !== 1) {
        board[i][j] = { color: 'red', king: false, id: pieceCounter++ };
        pieces.push(board[i][j]);
    } else if (i === 6 && j % 2 !== 0) {
        board[i][j] = { color: 'red', king: false, id: pieceCounter++ };
        pieces.push(board[i][j]);
    } else if (i === 7 && j % 2 !== 1) {
        board[i][j] = { color: 'red', king: false, id: pieceCounter++ };
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
                square.innerHTML = `<div class="piece ${piece.color}">${piece.id}</div>`;
            }
            counter++;
        }
    }

}


document.addEventListener('DOMContentLoaded', () => {
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
});