const buttons = [...document.querySelectorAll('button')];

buttons.forEach((el, index) => el.addEventListener('click', function() {
    // random number between 0 and limit: Math.floor(Math.random() * (limit+1))
    const randomInt =  Math.floor((Math.random()*3));
    window.location.href = `http://127.0.0.1:5500/12_ROCK-PAPER-SCISSORS/STARTER-FILES/winner.html?user=${index}&computer=${randomInt}`;
}))