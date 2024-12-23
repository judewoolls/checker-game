let color = 'white';
let grid = ``;
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

document.addEventListener('DOMContentLoaded', function() {
    let board = document.querySelector('#board');
    for (let i = 0; i < numOfCells; i++) {
        grid += `<div class="${color} cell"></div>`;
        if (color === 'white') {
            color = 'black';
            console.log('black')
        } else if (color === 'black') {
            color = 'white';
            console.log('white')
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
    console.log(boardArray);
})
