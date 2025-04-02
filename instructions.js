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
