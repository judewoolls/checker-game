// Used for setting up the board and rendering the checkers
// Also used for the instructions modal
const boardHeight = 8;
const boardWidth = 8;
const numOfCells = boardHeight * boardWidth

function setUpBoardArray(height, width) {
    const boardArray = [];
    for (let y = 0; y < height; y++) {
        let row = [];
        for (let x = 0; x < width; x++) {
            row.push(0);
        }
        boardArray.push(row);
    }
    return boardArray;
}

function populateWhite(board, i, j) {
    if (i === 0 && j % 2 !== 0) {
        board[i][j] = 1;
    } else if (i === 1 && j % 2 !== 1) {
        board[i][j] = 1;
    } else if (i === 2 && j % 2 !== 0) {
        board[i][j] = 1;
    }
}

function populateBlack(board, i, j) {
    if (i === 5 && j % 2 !== 1) {
        board[i][j] = 2;
    } else if (i === 6 && j % 2 !== 0) {
        board[i][j] = 2;
    } else if (i === 7 && j % 2 !== 1) {
        board[i][j] = 2;
    }
}

function populateBoard(board) {
    for (let i = 0; i < boardHeight; i++) {
        for (let j = 0; j < boardWidth; j++) {
            populateWhite(board, i, j);
            populateBlack(board, i, j)
        }
    }
}

function renderCheckers(board) {
    let counter = 0;
    for (let row = 0; row < boardHeight; row++) {
        for (let col = 0; col < boardWidth; col++) {
            if (board[row][col] === 1) {
                item = document.getElementById(`${counter}`)
                item.innerText = 'White'
            }  else if (board[row][col] === 2) {
                item = document.getElementById(`${counter}`)
                item.innerText = 'Black'
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


let turn = 'white';
let activePiece = null;
let activePieceIndex = null;
let previousCell = null;
let activeSelectionInterval = null;

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('cell') && activePiece === null) {
        activePiece = document.getElementById(event.target.id).innerText.toLowerCase();
        previousCell = parseInt(event.target.id);
        console.log(findPosition(previousCell));
        let flip = 0;
        if (activePiece === 'white' && turn === 'white') {
            activePieceColorSwap(flip, event);
        } else if (activePiece === 'black' && turn === 'black') {
            activePieceColorSwap(flip, event);
        }
    } else if ((event.target.classList.contains('cell') && activePiece !== null)) {
        if (turn === 'white') {
            if (activePiece === 'white' && document.getElementById(event.target.id).innerText === '') {
                document.getElementById(event.target.id).innerText = 'White';
                document.getElementById(previousCell).innerText = '';
                activePiece = null;
                previousCell = null;
                turn = 'black';
            } else if (activePiece === 'black') {
                activePiece = null;
                previousCell = null;
            }
        } else if (turn === 'black') {
            if (activePiece === 'black' && document.getElementById(event.target.id).innerText === '') {
                document.getElementById(event.target.id).innerText = 'Black';
                document.getElementById(previousCell).innerText = '';
                activePiece = null;
                previousCell = null;
                turn = 'white';
            } else if (activePiece === 'white') {
                activePiece = null;
                previousCell = null;
            }
        }
        clearInterval(activeSelectionInterval); // Clear the interval whenever the active piece is reset
    }
});