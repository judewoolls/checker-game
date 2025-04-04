document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('instructions-button').addEventListener('click', function () {
            document.getElementById('instructions-modal').classList.toggle('hidden');
            document.getElementById('instructions-modal').classList.toggle('show');
        });
        document.getElementById('instructions-close').addEventListener('click', function () {
            document.getElementById('instructions-modal').classList.toggle('hidden');
            document.getElementById('instructions-modal').classList.toggle('show');
        });
    });

// functions to display and close the end game modal
// export them to be used in game.js
function displayEndGameModal() {
    document.getElementById('end-game-modal').classList.toggle('hidden');
    document.getElementById('end-game-modal').classList.toggle('show');
}
// will be added to the close button in the modal
function closeEndGameModal() {
    document.getElementById('end-game-modal').classList.toggle('hidden');
    document.getElementById('end-game-modal').classList.toggle('show');
}