// The main js script
/* 
a. Need to unselect a piece if the player clicks on a different piece - minor fix
b. spotted an error it forces the same piece to move for the take again move but it
   doesnt make it make the move that takes the next piece as it should.


3. I need to add the logic for when a piece is kinged
4. I need to add the logic for when a piece is kinged and can take again
5. I need to add the logic for when a piece is kinged and can take again multiple times
6. I need to add the logic for when a piece is kinged and can take again and then move

How i am going to implement the kinged pieces. The number assigned to the piece will be changed to 3 if the piece is kinged and is white
and 4 if the piece is kinged and is black. This will allow me to differentiate between the two types of pieces. I will also need to add
the logic to check if a piece is kinged and can take again. I will also need to add the logic to check if a piece is kinged and can take
again multiple times. I will also need to add the logic to check if a piece is kinged and can take again and then move.

I will need to add to the current checks for color the opposing king number as well as the normal number.

Also need to add more to the valid move functions to check for kinged pieces and their moves.

also the check for kinging a piece needs to be added to the valid move functions

a piece is kinged if its white and reaches row[7] or if its black and reaches row[0]

*/


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
        board[i][j] = [1, pieceCounter++];
        pieces.push(board[i][j]);
    } else if (i === 1 && j % 2 !== 1) {
        board[i][j] = [1, pieceCounter++];
        pieces.push(board[i][j]);
    } else if (i === 2 && j % 2 !== 0) {
        board[i][j] = [1, pieceCounter++];
        pieces.push(board[i][j]);
    }
}

// Sets up black checkers
function populateBlack(board, i, j) {
    if (i === 5 && j % 2 !== 1) {
        board[i][j] = [2, pieceCounter++];
        pieces.push(board[i][j]);
    } else if (i === 6 && j % 2 !== 0) {
        board[i][j] = [2, pieceCounter++];
        pieces.push(board[i][j]);
    } else if (i === 7 && j % 2 !== 1) {
        board[i][j] = [2, pieceCounter++];
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
            let item = document.getElementById(`${counter}`);
            if (board[row][col] && board[row][col][0] === 1) {
                item.innerText = 'White';
                item.style.color = 'Orange';
            } else if (board[row][col] && board[row][col][0] === 2) {
                item.innerText = 'Black';
                item.style.color = 'Orange';
            } else if (board[row][col] && board[row][col][0] === 3) {
                item.innerText = 'KingWhite';
                item.style.color = 'Orange';
            } else if (board[row][col] && board[row][col][0] === 4) {
                item.innerText = 'KingBlack';
                item.style.color = 'Orange';
            } 
            else {
                item.innerText = '';
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
    document.getElementById('instructions-button').addEventListener('click', function () {
        document.getElementById('instructions-modal').classList.toggle('hidden');
        document.getElementById('instructions-modal').classList.toggle('show');
    });
    document.getElementById('instructions-close').addEventListener('click', function () {
        document.getElementById('instructions-modal').classList.toggle('hidden');
        document.getElementById('instructions-modal').classList.toggle('show');
    });
    document.getElementById('reset-button').addEventListener('click', function () {
        // hide the modal
        document.getElementById('gameOver-modal').classList.toggle('hidden');
        document.getElementById('gameOver-modal').classList.toggle('show');
        // clear the board array
        boardArray = setUpBoardArray(boardHeight, boardWidth);
        populateBoard(boardArray);
        renderCheckers(boardArray);
        turn = 'white';
        displayTurn(turn);
    });
});

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
    if (previousCell !== null) {
        document.getElementById(previousCell).style.color = 'orange';
    }
    activePiece = null;
    previousCell = null;
    clearInterval(activeSelectionInterval);
}

// Renders whose turn it is to the screen
function displayTurn(turn) {
    const turnString = turn === 'white' ? 'White' : 'Black';
    document.getElementById('turn').innerText = `${turnString}`;
}

// Updates the array after a move 
function updateArray(cell, currentTurn) {
    let [x, y] = findPosition(cell);
    let piece = boardArray[findPosition(previousCell)[1]][findPosition(previousCell)[0]];
    boardArray[y][x] = piece;
    let [prevX, prevY] = findPosition(previousCell);
    boardArray[prevY][prevX] = 0;
}

function removePiece(cell) {
    // remove the piece from the board
    const position = findPosition(cell);
    boardArray[position[1]][position[0]] = 0;
    document.getElementById(cell).innerText = '';
}

function winningText(winner) {
    document.getElementById('winner-text').innerText = `Congratulations to the ${winner} player!`;
}

function checkForWinner() {
    let whiteCount = 0;
    let blackCount = 0;
    for (let i = 0; i < boardHeight; i++) {
        for (let j = 0; j < boardWidth; j++) {
            if (boardArray[i][j] && boardArray[i][j][0] === 1) {
                whiteCount++;
            } else if (boardArray[i][j] && boardArray[i][j][0] === 2) {
                blackCount++;
            }
        }
    }
    if (whiteCount === 0) {
        document.getElementById('gameOver-modal').classList.toggle('hidden');
        document.getElementById('gameOver-modal').classList.toggle('show');
        winningText('Black');
    } else if (blackCount === 0) {
        document.getElementById('gameOver-modal').classList.toggle('hidden');
        document.getElementById('gameOver-modal').classList.toggle('show');
        winningText('White');
    }
}

// valid black move  -- So diagonally up left or right  up is minus
function validBlackMove(cell, executeMove = true) {
    let startPosition = findPosition(previousCell);
    let endPosition = findPosition(cell);

    // check the y value first
    if (endPosition[1] === (startPosition[1] - 1)) {
        // check the correct x value
        if (endPosition[0] === (startPosition[0] + 1) || endPosition[0] === (startPosition[0] - 1)) {
            return 'move';
        }
    } else if (endPosition[1] === (startPosition[1] - 2)) { // check for jump move
        if (endPosition[0] === (startPosition[0] + 2) || endPosition[0] === (startPosition[0] - 2)) {
            if (endPosition[0] - startPosition[0] < 0) { // checks moves to the left
                // check if there is an opposition piece and the landing spot is empty
                if (boardArray[startPosition[1] - 1][startPosition[0] - 1][0] === 1 && boardArray[endPosition[1]][endPosition[0]] === 0) {
                    if (executeMove) {
                        // remove the opposing piece
                        removePiece((startPosition[1] - 1) * 8 + (startPosition[0] - 1));
                    }
                    return 'take';
                }
            } else if (endPosition[0] - startPosition[0] > 0) { // checks moves to the right
                if (boardArray[startPosition[1] - 1][startPosition[0] + 1][0] === 1 && boardArray[endPosition[1]][endPosition[0]] === 0) {
                    if (executeMove) {
                        // remove the opposing piece
                        removePiece((startPosition[1] - 1) * 8 + (startPosition[0] + 1));
                    }
                    return 'take';
                }
            }
        }
    }
    return false;
}

// valid white move  -- So diagonally down left or right
function validWhiteMove(cell, executeMove = true) {
    let startPosition = findPosition(previousCell);
    let endPosition = findPosition(cell);

    // check the y value first
    if (endPosition[1] === (startPosition[1] + 1)) {
        // check the correct x value
        if (endPosition[0] === (startPosition[0] + 1) || endPosition[0] === (startPosition[0] - 1)) {
            return 'move';
        }
    } else if (endPosition[1] === (startPosition[1] + 2)) { // check for jump move
        if (endPosition[0] === (startPosition[0] + 2) || endPosition[0] === (startPosition[0] - 2)) {
            if (endPosition[0] - startPosition[0] < 0) { // checks moves to the left
                // check if there is an opposition piece and the landing spot is empty
                if (boardArray[startPosition[1] + 1][startPosition[0] - 1][0] === 2 && boardArray[endPosition[1]][endPosition[0]] === 0) {
                    if (executeMove) {
                        // remove the opposing piece
                        removePiece((startPosition[1] + 1) * 8 + (startPosition[0] - 1));
                    }
                    return 'take';
                }
            } else if (endPosition[0] - startPosition[0] > 0) { // checks moves to the right
                if (boardArray[startPosition[1] + 1][startPosition[0] + 1][0] === 2 && boardArray[endPosition[1]][endPosition[0]] === 0) {
                    if (executeMove) {
                        // remove the opposing piece
                        removePiece((startPosition[1] + 1) * 8 + (startPosition[0] + 1));
                    }
                    return 'take';
                }
            }
        }
    }
    return false;
}

function validKingMove(cell, executeMove = true, teamColor) {
    let startPosition = findPosition(previousCell);
    let endPosition = findPosition(cell);

    /**
     * Add the king moves into this function
     * Check for the positions and the team color
     * Each time a move is made check for the color of the piece
     * So the moves will check for the color of the piece and the position
     * It will check the opposing color and check if the position is empty
     * It will allow player to move the kingPiece in any diagnal direction
     * 
     */
    if (startPosition[1] - endPosition[1] === startPosition[0] - endPosition[0] || startPosition[1] - endPosition[1] === endPosition[0] - startPosition[0]) {
        // check for the direction of the move
        let directionX = endPosition[0] - startPosition[0] > 0 ? 1 : -1;
        let directionY = endPosition[1] - startPosition[1] > 0 ? 1 : -1;
        let x = startPosition[0] + directionX;
        let y = startPosition[1] + directionY;
        let take = false;
        while (x !== endPosition[0] && y !== endPosition[1]) {
            if (boardArray[y][x] !== 0) {
                // check if the piece is the same color
                if (boardArray[y][x][0] === teamColor) {
                    return false;
                } else {
                    take = true;
                }
            }
            x += directionX;
            y += directionY;
        }
        if (take) {
            return 'take';
        } else {
            return 'move';
        }
    }
    return false;
}

// Function to check if the piece can take again
function canTakeAgain(cell, currentTurn) {
    let [x, y] = findPosition(cell);

    function isValidJump(newX, newY, opponentPiece) {
        if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
            let midX = (x + newX) / 2;
            let midY = (y + newY) / 2;
            return boardArray[midY][midX][0] === opponentPiece && boardArray[newY][newX] === 0;
        }
        return false;
    }

    if (currentTurn === 'white') {
        return isValidJump(x + 2, y + 2, 2) || isValidJump(x - 2, y + 2, 2);
    } else {
        return isValidJump(x + 2, y - 2, 1) || isValidJump(x - 2, y - 2, 1);
    }
}

function setPieceToKing(piece, position) {
    if (piece[0] == 1 && position[1] == 7) {
        piece[0] = 3;
    } else if (piece[0] == 2 && position[1] == 0) {
        piece[0] = 4;
    }
    return piece;
}

// Game variables
let turn = 'white';
let activePiece = null;
let activePieceIndex = null;
let previousCell = null;
let activeSelectionInterval = null;
let flip = 0;
let mustTakeAgain = false;
let capturingPiece = null; // Track the piece that made the capture

function displayActivePiece() {
    const activePieceDisplay = document.getElementById('active-piece');
    if (activePiece) {
        activePieceDisplay.innerText = turn === 'white' ? 'White' : 'Black';
    } else {
        activePieceDisplay.innerText = 'None Selected';
    }
}

function getColor(piece) {
    if (piece[0] === 1 || piece[0] === 3) {
        return 'white';
    }
    if (piece[0] === 2 || piece[0] === 4) {
        return 'black';
    }
}

// Game logic that is checked whenever there is a click on the screen
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('cell') && activePiece === null) {
        activePiece = document.getElementById(event.target.id).innerText.toLowerCase();
        activePiece = getColor(boardArray[findPosition(parseInt(event.target.id))[1]][findPosition(parseInt(event.target.id))[0]]);
        previousCell = parseInt(event.target.id);
        flip = 0;
        if (activePiece === 'white' && turn === 'white') {
            activePieceColorSwap(flip, event);
        } else if (activePiece === 'black' && turn === 'black') {
            activePieceColorSwap(flip, event);
        } else {
            unselectPiece();
        }
        displayActivePiece(); // Call displayActivePiece when a piece is selected
    } else if (event.target.classList.contains('cell') && activePiece !== null) {
        let moveResult = false;
        let piece = boardArray[findPosition(previousCell)[1]][findPosition(previousCell)[0]];
        if (mustTakeAgain && capturingPiece !== piece[1]) {
            // If must take again, ensure the same piece is moving
            console.log('must take again with the same piece');
            unselectPiece();
            displayActivePiece(); // Call displayActivePiece when a piece is unselected
            return;
        }
        if (turn === 'white') {
            if (activePiece === 'white' && document.getElementById(event.target.id).innerText === '') {
                // check for valid move
                moveResult = validWhiteMove(parseInt(event.target.id));
                if (moveResult) {
                    // change the display
                    document.getElementById(event.target.id).innerText = 'White';
                    document.getElementById(previousCell).innerText = '';
                    updateArray(event.target.id, turn); // should update the array after a move 
                    console.log(moveResult);
                    if (moveResult === 'take' && canTakeAgain(parseInt(event.target.id), 'white')) {
                        console.log('must take again');
                        mustTakeAgain = true;
                        capturingPiece = piece[1]; // Track the capturing piece
                    } else {
                        console.log(moveResult);
                        console.log('switch turn');
                        turn = 'black';
                        mustTakeAgain = false;
                        capturingPiece = null;
                    }
                }
                unselectPiece();
                displayActivePiece(); // Call displayActivePiece when a piece is unselected
            } else if (activePiece === 'black') {
                unselectPiece();
                displayActivePiece(); // Call displayActivePiece when a piece is unselected
            }
        } else if (turn === 'black') {
            if (activePiece === 'black' && document.getElementById(event.target.id).innerText === '') {
                // check for valid move
                moveResult = validBlackMove(parseInt(event.target.id));
                if (moveResult) {
                    // change the display
                    document.getElementById(event.target.id).innerText = 'Black';
                    document.getElementById(previousCell).innerText = '';
                    updateArray(event.target.id, turn); // should update array after a move
                    console.log(canTakeAgain(parseInt(event.target.id), 'black'));
                    if (moveResult === 'take' && canTakeAgain(parseInt(event.target.id), 'black')) {
                        console.log('must take again');
                        mustTakeAgain = true;
                        capturingPiece = piece[1]; // Track the capturing piece
                    } else {
                        console.log('switched turn');
                        turn = 'white';
                        mustTakeAgain = false;
                        capturingPiece = null;
                    }
                }
                unselectPiece();
                displayActivePiece(); // Call displayActivePiece when a piece is unselected
            } else if (activePiece === 'white') {
                unselectPiece();
                displayActivePiece(); // Call displayActivePiece when a piece is unselected
            }
        } else if (activePiece === 'KingBlack' && document.getElementById(event.target.id).innerText === '') {
            // check for valid move
            moveResult = validKingMove(parseInt(event.target.id), true, 4);
            if (moveResult) {
                // change the display
                document.getElementById(event.target.id).innerText = 'KingBlack';
                document.getElementById(previousCell).innerText = '';
                updateArray(event.target.id, turn); // should update array after a move
                if (moveResult === 'take' && canTakeAgain(parseInt(event.target.id), 'black')) {
                    console.log('must take again');
                    mustTakeAgain = true;
                    capturingPiece = piece[1]; // Track the capturing piece
                } else {
                    console.log('switched turn');
                    turn = 'white';
                    mustTakeAgain = false;
                    capturingPiece = null;
                }
            }
            unselectPiece();
            displayActivePiece(); // Call displayActivePiece when a piece is unselected
        } else if (activePiece === 'KingWhite' && document.getElementById(event.target.id).innerText === '') {
            // check for valid move
            moveResult = validKingMove(parseInt(event.target.id), true, 3);
            if (moveResult) {
                // change the display
                document.getElementById(event.target.id).innerText = 'KingWhite';
                document.getElementById(previousCell).innerText = '';
                updateArray(event.target.id, turn); // should update array after a move
                if (moveResult === 'take' && canTakeAgain(parseInt(event.target.id), 'white')) {
                    console.log('must take again');
                    mustTakeAgain = true;
                    capturingPiece = piece[1]; // Track the capturing piece
                } else {
                    console.log('switched turn');
                    turn = 'black';
                    mustTakeAgain = false;
                    capturingPiece = null;
                }
            }
            unselectPiece();
            displayActivePiece(); // Call displayActivePiece when a piece is unselected
        } else {
            unselectPiece();
            displayActivePiece(); // Call displayActivePiece when a piece is unselected
        }
        // Check if the piece should be kinged
        let newPiece = setPieceToKing(piece, findPosition(parseInt(event.target.id)));
        if (newPiece !== piece) {
            boardArray[findPosition(parseInt(event.target.id))[1]][findPosition(parseInt(event.target.id))[0]] = newPiece;
        }
        clearInterval(activeSelectionInterval); // Clear the interval whenever the active piece is reset
        displayTurn(turn);
        renderCheckers(boardArray);
    }
    checkForWinner();
});