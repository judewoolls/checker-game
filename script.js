let color = 'white';
let grid = ``;
const boardHeight = 8;
const boardWidth = 8;
const numOfCells = boardHeight * boardWidth

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
})
