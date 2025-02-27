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
