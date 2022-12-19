const playAgainButton = document.querySelector('.play-again');
const userPickElement = document.querySelector('.your-pick');
const computerPickElement = document.querySelector('.computer-pick');


const queryString = window.location.search;
const queryParams = new URLSearchParams(queryString);
const userPick = queryParams.get('user');
const computerPick = queryParams.get('computer');
let winner = '';

const numberToShapeMap = {
    0: 'rock', 
    1: 'paper',
    2: 'scissors'
};
const updateUI = function(winner) {
    userPickElement.insertAdjacentHTML('beforeend', `
        <img src="./images/${numberToShapeMap[userPick]}.png" alt="${numberToShapeMap[userPick]}" />  
    `);
    computerPickElement.insertAdjacentHTML('beforeend', `
        <img src="./images/${numberToShapeMap[computerPick]}.png" alt="${numberToShapeMap[computerPick]}" />
    `);
    if (winner == 'user') {
        document.querySelector('body').classList.add('you-win');
        document.title = 'You Win!';
    } else if (winner == 'computer') {
        document.querySelector('body').classList.add('computer-wins');
        document.title = 'Computer Wins!';
    } else {
        document.querySelector('body').classList.add('draw');
        document.title = 'Its a draw!';
    }
}


const chooseWinner = function(userSelection, compSelection) {
    const difference = userSelection - compSelection;
    if (difference == 0) {
        console.log('its a draw');
        winner = 'draw';
    } else if (difference == 1 || difference == -2) {
        winner = 'user';
    } else {
        winner = 'computer';
    }
};
chooseWinner(userPick, computerPick);
updateUI(winner);

playAgainButton.addEventListener('click', function() {
    window.location.href = 'http://127.0.0.1:5500/12_ROCK-PAPER-SCISSORS/STARTER-FILES/index.html';
})

