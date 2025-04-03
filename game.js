// Game set up and set up functions
const boardHeight = 8;
const boardWidth = 8;
const numOfCells = boardHeight * boardWidth;
let boardArray = [];
let pieces = []; // Array to store pieces
let pieceCounter = 0; // Counter to assign unique identifiers to pieces
let turn = 'white'; // Variable to keep track of the current turn

// this is the game state object
// it will be used to keep track of the game state
// it will be used to store the board, the turn, the selected piece and the possible moves
const gameState = {
    board: [],
    turn: 'white',
    selectedPiece: null,
    possibleMoves: []
};


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
function populateRed(board, i, j) {
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
            populateRed(board, i, j);
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
    turn = 'red';
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
    addEventListenersCells();
});

// Game logic and functions

// add query selector to get all the pieces
function addEventListeners() {
    let piecesArray = document.querySelectorAll('.piece');
    piecesArray.forEach(piece => {
        piece.addEventListener('click', function () {
            console.log('piece clicked');
            if (piece.id.length === 3) {
                DisplaySelectPiece(parseInt(piece.id.slice(-2)));
            } else{
                DisplaySelectPiece(parseInt(piece.id.slice(-1)));
            }
            let pieceId = parseInt(piece.id.slice(-2)) || parseInt(piece.id.slice(-1)); // check if the piece id is 2 or 1 digit
            // we checked the last two digits first because it could be 3 digits but has to be 2 digits
            let selectedPiece = pieces.find(piece => piece.id === pieceId);
            if (selectedPiece) {
                console.log(selectedPiece.color + ' ' + selectedPiece.id);
                calculatePossibleMoves(selectedPiece) === 0 ? console.log('No possible moves') : displayPossibleMoves(calculatePossibleMoves(selectedPiece));
            } else {
                console.log('No piece found');
            }
        });
    });
}

function addEventListenersCells() {
    document.querySelectorAll('.cell').forEach(cell => {
        if (!cell.innerHTML) {
            cell.addEventListener('click', function () {
                console.log('cell clicked');
            });
        }
    })
}

function removeEventListenersCells() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.removeEventListener('click', function () {
            console.log('cell clicked');
        });
    })
}

// add turns and move logic

// chnages the turn
function changeTurn(turn) {
    if (turn === 'white') {
        return 'red';
    } else {
        return 'white';
    }
}

// displays the current turn
function displayTurn(turn) {
    let turnDisplay = document.querySelector('#turn');
    turnDisplay.innerHTML = `${turn.slice(0,1).toUpperCase() + turn.slice(1, turn.length)}'s turn`;
}

// select a piece to move
function DisplaySelectPiece(pieceId) {
    boardArray.forEach(row => {
        row.forEach(cell => {
            if (cell !== 0) {
                if (cell.id === pieceId && cell.color === turn) {
                    console.log(cell);
                    // used to toggle the highlight of the un/selected piece
                    const item = document.getElementById(`${cell.color.slice(0,1) + cell.id}`).classList.toggle('selected');
                }
            }
        });
    });
}

// this will move the position of the piece and display it on the board
// this function will be called when a piece is selected and a valid move is made
// it takes the new row and column as arguments
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
    addEventListeners();  // need to be added after each move
}


// function check white moves
function basicWhiteMoves(piece,row, col) {
    let rows = piece.row;
    let columns = piece.col;
    let possibleMoves = [];
    if (rows < 7 && columns > 0) {
        if (boardArray[rows + 1][columns - 1] === 0) {
            possibleMoves.push({position: [rows + 1, columns - 1], take: false});
        }
    }
    if (rows < 7 && columns < 7) {
        if (boardArray[rows + 1][columns + 1] === 0) {
            possibleMoves.push({position: [rows + 1, columns + 1], take: false});
        }
    }
    return possibleMoves;
}

function checkForPossibleWhiteTake(piece, row, col) {
    let rows = piece.row;
    let columns = piece.col;
    let possibleMoves = [];

    // Check for possible take to the left
    if (rows < 6 && columns > 1) {
        if (
            boardArray[rows + 1][columns - 1] !== 0 && // Ensure the cell is not empty
            boardArray[rows + 1][columns - 1].color === 'red' && // Check if the piece is red
            boardArray[rows + 2][columns - 2] === 0 // Check if the landing spot is empty
        ) {
            possibleMoves.push({ position: [rows + 2, columns - 2], take: true });
        }
    }

    // Check for possible take to the right
    if (rows < 6 && columns < 6) {
        if (
            boardArray[rows + 1][columns + 1] !== 0 && // Ensure the cell is not empty
            boardArray[rows + 1][columns + 1].color === 'red' && // Check if the piece is red
            boardArray[rows + 2][columns + 2] === 0 // Check if the landing spot is empty
        ) {
            possibleMoves.push({ position: [rows + 2, columns + 2], take: true });
        }
    }

    return possibleMoves;
}

// functoin for red moves
function basicRedMoves(piece, row, col) {
    let rows = piece.row;
    let columns = piece.col;
    let possibleMoves = [];
    if (rows > 0 && columns > 0) {
        if (boardArray[rows - 1][columns - 1] === 0) {
            possibleMoves.push({position: [rows - 1, columns - 1], take: false});
        }
    }
    if (rows > 0 && columns < 7) {
        if (boardArray[rows - 1][columns + 1] === 0) {
            possibleMoves.push({position: [rows - 1, columns + 1], take: false});
        }
    }
    return possibleMoves;
}

function checkForPossibleRedTake(piece, row, col) {
    let rows = piece.row;
    let columns = piece.col;
    let possibleMoves = [];

    // Check for possible take to the left
    if (rows > 1 && columns > 1) {
        if (
            boardArray[rows - 1][columns - 1] !== 0 && // Ensure the cell is not empty
            boardArray[rows - 1][columns - 1].color === 'white' && // Check if the piece is white
            boardArray[rows - 2][columns - 2] === 0 // Check if the landing spot is empty
        ) {
            possibleMoves.push({ position: [rows - 2, columns - 2], take: true });
        }
    }

    // Check for possible take to the right
    if (rows > 1 && columns < 6) {
        if (
            boardArray[rows - 1][columns + 1] !== 0 && // Ensure the cell is not empty
            boardArray[rows - 1][columns + 1].color === 'white' && // Check if the piece is white
            boardArray[rows - 2][columns + 2] === 0 // Check if the landing spot is empty
        ) {
            possibleMoves.push({ position: [rows - 2, columns + 2], take: true });
        }
    }

    return possibleMoves;
}

// check if the move is valid
function calculatePossibleMoves(piece) {
    let rows = piece.row;
    let columns = piece.col;
    let possibleMoves = [];
    console.log('calculating possible moves' + piece.color);

    if (piece.king === true) {
        // do king moves later
    } else {
        if (piece.color === 'white' && turn === 'white') {
            // Check for possible take first
            // Concatenate the results instead of pushing arrays
            possibleMoves = possibleMoves.concat(checkForPossibleWhiteTake(piece, rows, columns));
            if (possibleMoves.length === 0) {
                possibleMoves = possibleMoves.concat(basicWhiteMoves(piece, rows, columns));
            }
        } else if (piece.color === 'red' && turn === 'red') {
            // Check for possible take first
            // Concatenate the results instead of pushing arrays
            possibleMoves = possibleMoves.concat(checkForPossibleRedTake(piece, rows, columns));
            if (possibleMoves.length === 0) {
                possibleMoves = possibleMoves.concat(basicRedMoves(piece, rows, columns));
            }
        }
    }

    console.log(possibleMoves); // Debugging
    return possibleMoves;
}


// after calculating the possible moves, we will display them on the board
function displayPossibleMoves(possibleMoves) {
    possibleMoves.forEach(move => {
        let cell = document.getElementById(`${move.position[0] * 8 + move.position[1]}`);
        cell.classList.add('possible-move');
        });
};